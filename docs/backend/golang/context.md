---
title: context
---
  [`context.Context`](https://github.com/golang/go/blob/71bbffbc48d03b447c73da1f54ac57350fc9b36a/src/context/context.go#L62-L154) 的主要作用还是在多个 Goroutine 组成的树中**同步取消信号**以减少对资源的消耗和占用 

Deadline() 返回 [`context.Context`](https://github.com/golang/go/blob/df2999ef43ea49ce1578137017949c0ee660608a/src/context/context.go#L62-L154) 被取消的时间 

 Done() 返回一个 Channel，这个 Channel 会在**当前工作完成或者上下文被取消之后**关闭，多次调用 `Done` 方法会返回同一个 Channel 

 `Err`方法返回取消的错误原因，因为什么Context被取消。 

 `Value`方法获取该Context上绑定的值，是一个键值对，所以要通过一个Key才可以获取对应的值，这个值一般是线程安全的。 

```go
type Context interface {
	Deadline() (deadline time.Time, ok bool)
	Done() <-chan struct{}
	Err() error
	Value(key interface{}) interface{}
}
```

 [`context`](https://github.com/golang/go/tree/master/src/context) 包中最常用的方法还是 [`context.Background`](https://github.com/golang/go/blob/df2999ef43ea49ce1578137017949c0ee660608a/src/context/context.go#L208-L210)、[`context.TODO`](https://github.com/golang/go/blob/df2999ef43ea49ce1578137017949c0ee660608a/src/context/context.go#L216-L218) 

 [`context.WithCancel`](https://github.com/golang/go/blob/df2999ef43ea49ce1578137017949c0ee660608a/src/context/context.go#L232-L236) 函数能够从 [`context.Context`](https://github.com/golang/go/blob/df2999ef43ea49ce1578137017949c0ee660608a/src/context/context.go#L62-L154) 中衍生出一个新的子上下文并返回用于取消该上下文的函数（CancelFunc） 



例子:

 ## 使用 Context 同步信号



```go
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	go handle(ctx, 500*time.Millisecond)
	select {
	case <-ctx.Done():
		fmt.Println("main", ctx.Err())
	}
}

func handle(ctx context.Context, duration time.Duration) {
	select {
	case <-ctx.Done():
		fmt.Println("handle", ctx.Err())
	case <-time.After(duration):
		fmt.Println("process request with", duration)
	}
}
```

因为过期时间大于处理时间，所以我们有足够的时间处理该『请求』，运行上述代码会打印出如下所示的内容：

```go
$ go run context.go
process request with 500ms
main context deadline exceeded
```

`handle` 函数没有进入超时的 `select` 分支，但是 `main` 函数的 `select` 却会等待 [`context.Context`](https://github.com/golang/go/blob/df2999ef43ea49ce1578137017949c0ee660608a/src/context/context.go#L62-L154) 的超时并打印出 `main context deadline exceeded`。

如果我们将处理『请求』时间增加至 1500ms，整个程序都会因为上下文的过期而被中止，：

```go
$ go run context.go
main context deadline exceeded
handle context deadline exceeded
```



## Context控制多个goroutine

```go
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	go watch(ctx,"【监控1】")
	go watch(ctx,"【监控2】")
	go watch(ctx,"【监控3】")

	time.Sleep(10 * time.Second)
	fmt.Println("可以了，通知监控停止")
	cancel()
	//为了检测监控过是否停止，如果没有监控输出，就表示停止了
	time.Sleep(5 * time.Second)
}

func watch(ctx context.Context, name string) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println(name,"监控退出，停止了...")
			return
		default:
			fmt.Println(name,"goroutine监控中...")
			time.Sleep(2 * time.Second)
		}
	}
}
```

 示例中启动了3个监控goroutine进行不断的监控，每一个都使用了Context进行跟踪，当我们使用`cancel`函数通知取消时，这3个goroutine都会被结束。这就是Context的控制能力，它就像一个控制器一样，按下开关后，所有基于这个Context或者衍生的子Context都会收到通知，这时就可以进行清理操作了，最终释放goroutine，这就优雅的解决了goroutine启动后不可控的问题。 



## WithValue传递元数据

```go
var key string="name"

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	//附加值
	valueCtx:=context.WithValue(ctx,key,"【监控1】")
	go watch(valueCtx)
	time.Sleep(10 * time.Second)
	fmt.Println("可以了，通知监控停止")
	cancel()
	//为了检测监控过是否停止，如果没有监控输出，就表示停止了
	time.Sleep(5 * time.Second)
}

func watch(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			//取出值
			fmt.Println(ctx.Value(key),"监控退出，停止了...")
			return
		default:
			//取出值
			fmt.Println(ctx.Value(key),"goroutine监控中...")
			time.Sleep(2 * time.Second)
		}
	}
}
```

在前面的例子，我们通过传递参数的方式，把`name`的值传递给监控函数。在这个例子里，我们实现一样的效果，但是通过的是Context的Value的方式。

我们可以使用`context.WithValue`方法附加一对K-V的键值对，这里Key必须是等价性的，也就是具有可比性；Value值要是线程安全的。





## Context 使用原则

1. 不要把Context放在结构体中，要以参数的方式传递
2. 以Context作为参数的函数方法，应该把Context作为第一个参数，放在第一位。
3. 给一个函数方法传递Context的时候，不要传递nil，如果不知道传递什么，就使用context.TODO
4. Context的Value相关方法应该传递必须的数据，不要什么数据都使用这个传递
5. Context是线程安全的，可以放心的在多个goroutine中传递



ctx, cancel := context.WithCancel(context.Background())

valueCtx:=context.WithValue(ctx,key,"【监控1】")

ctx.Value(key)

cancel()

ctx.Done()