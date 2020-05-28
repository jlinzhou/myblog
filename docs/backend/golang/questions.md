---
title: 常见问题
---



## Golang中defer、return、返回值之间执行顺序的坑

1. 多个defer的执行顺序为“后进先出”；
2. 所有函数在执行RET返回指令之前，都会先检查是否存在defer语句，若存在则先逆序调用defer语句进行收尾工作再退出返回；
3. 匿名返回值是在return执行时被声明，有名返回值则是在函数声明的同时被声明，因此在defer语句中只能访问有名返回值，而不能直接访问匿名返回值；
4. return其实应该包含前后两个步骤：第一步是给返回值赋值（若为有名返回值则直接赋值，若为匿名返回值则先声明再赋值）；第二步是调用RET返回指令并传入返回值，而RET则会检查defer是否存在，若存在就先逆序插播defer语句，最后RET携带返回值退出函数；

‍‍**因此，**‍‍defer、return、返回值三者的执行顺序应该是：return最先给返回值赋值；接着defer开始执行一些收尾工作；最后RET指令携带返回值退出函数。



参考资料:[Golang中defer、return、返回值之间执行顺序的坑]( https://my.oschina.net/henrylee2cn/blog/505535 )

##  Go string 实现原理剖析

 string是8比特字节的集合，通常但并不一定是UTF-8编码的文本。 

**string 数据结构**

源码包`src/runtime/string.go:stringStruct`定义了string的数据结构：

```go
type stringStruct struct {
	str unsafe.Pointer
	len int
}
```

其数据结构很简单：

- stringStruct.str：字符串的首地址；
- stringStruct.len：字符串的长度；

参考资料：[Go string 实现原理剖析（你真的了解string吗）]( https://www.jishuwen.com/d/2MWe )





## channel，为什么它可以做到线程安全？

Channel是Go中的一个核心类型，可以把它看成一个管道，通过它并发核心单元就可以发送或者接收数据进行通讯(communication),Channel也可以理解是一个先进先出的队列，通过管道进行通信。

**Golang的Channel,发送一个数据到Channel 和 从Channel接收一个数据 都是 原子性的。**而且Go的设计思想就是:不要通过共享内存来通信，而是通过通信来共享内存，前者就是传统的加锁，后者就是Channel。也就是说，设计Channel的主要目的就是在多任务间传递数据的，这当然是安全的。