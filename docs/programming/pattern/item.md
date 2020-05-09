---
title: 23种设计模式简介
---

## 1. SINGLETON 单例模式

　　单例模式：单例模式确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例单例模式。单例模式只应在有真正的“单一实例”的需求时才可使用。



　　俺有6个漂亮的老婆，她们的老公都是我，我就是我们家里的老公Sigleton，她们只要说道“老公”，都是指的同一个人，那就是我(刚才做了个梦啦，哪有这么好的事)。

```go
package main

import (
	"sync"
	"fmt"
)

type  Single struct{
	data int
}

var singleton * Single
var once sync.Once //内核信号，时时刻刻智能运行一个

func GetInterface()*Single{
	//once.Do(func (){singleton=&Single{100}}) 单例
	singleton=&Single{100}
	return singleton
}
func main(){
	i1:=GetInterface()
	i2:=GetInterface()
	if i1==i2{
		fmt.Println("相等")
	}else{
		fmt.Println("不等")
	}
}
```



## 2. FACTORY METHOD 工厂方法模式

　　工厂方法模式：核心工厂类不再负责所有产品的创建，而是将具体创建的工作交给子类去做，成为一个抽象工厂角色，仅负责给出具体工厂类必须实现的接口，而不接触哪一个产品类应当被实例化这种细节。



　　请MM去麦当劳吃汉堡，不同的MM有不同的口味，要每个都记住是一件烦人的事情，我一般采用Factory Method模式，带着MM到服务员那儿，说“要一个汉堡”，具体要什么样的汉堡呢，让MM直接跟服务员说就行了。



**简单工厂**

一个工厂，通过传递不同参数选择实例化不同的产品

缺点： 简单工厂对于增加新的产品，无能为力 ，(要增加新工厂)。不符合  符合开放-封闭原则 

```go
package main

import "fmt"

//中国人，你好
//英国人 ,hello
//---------------------------------
type API interface{//接口
	Say(name string)string
}
//---------------------------------
func NewAPI(str string)API{
	if str=="en"{
		return &English{}
	}else if str=="cn"{
		return &Chinese{}
	} else{
		return nil
	}
}
//---------------------------------
type  Chinese struct{}
func (*Chinese)	Say(name string)string{
	return "你好"+name
}
//---------------------------------
type  English struct{}
func (*English)	Say(name string)string{
	return "hello"+name
}
//---------------------------------
type  Japanese struct{}
func (*Japanese)	Say(name string)string{
	return "鬼子你好"+name
}
//---------------------------------
func main11(){
	api:=NewAPI("cn")
	server:=api.Say("张海涛")
	fmt.Println(server)
}
func main12(){
	api:=NewAPI("en")
	server:=api.Say("Alex")
	fmt.Println(server)
}
```



**工厂方法**

一个产品，有很多的工厂生产。

优点：同时增加某一类”东西“并不需要修改工厂类，只需要添加生产这类”东西“的工厂即可 。符合开放-封闭原则 

缺点： 在增加新的产品时，也必须增加新的工厂类 

```go
package main
import "fmt"
// A X B
//X操作
//A B  操作数
// x=+  A+B  x=-  A-b  x=%  A%B
// left, right,
//---------------------------------
//实际运行类的接口
type  Operator interface {
	Setleft(int)
	SetRight(int)
	Result()int
}
//工厂接口
type OperatorFactory interface {
	Create()Operator
}
//---------------------------------
//数据
type OperatorBase struct {
	left,right int
}
//赋值
func (op*OperatorBase)Setleft(left int){
	op.left=left
}
func (op*OperatorBase)SetRight(right int){
	op.right=right
}
//---------------------------------
//操作的抽象
type PlusOperatorFactory struct {}
//操作类中包含操作数
type PlusOperator struct {
	*OperatorBase
}
//实际运行
func (o PlusOperator)Result()int{
	return o.right+o.left
}
func (PlusOperatorFactory)Create()Operator{
	return  &PlusOperator{&OperatorBase{}}
}
//---------------------------------
//操作的抽象
type SubOperatorFactory struct {}
//操作类中包含操作数
type SubOperator struct {
	*OperatorBase
}
//实际运行
func (o SubOperator)Result()int{
	return o.left-o.right
}
func (SubOperatorFactory)Create()Operator{
	return  &SubOperator{&OperatorBase{}}
}
//---------------------------------
func main(){
	var fac OperatorFactory;
	//fac=PlusOperatorFactory{}
	fac=SubOperatorFactory{}
	op:=fac.Create()
	op.Setleft(20)
	op.SetRight(10)
	fmt.Println(op.Result())
}
```





**抽象工厂**

很多产品，有很多的工厂生产。

优点：针对产品族；
缺点：针对产品族。
所以，只有对应产品族的情况下，才需要使用抽象工厂模式。 

```go
package Abstract_Factory
import "fmt"

//sqlsever
//mysql      sql
//oracle

//订单
//订单报表
//---------------------------------
type OrderMainDAO interface {   //订单记录
	SaveOrderMain() //保存，
	//DeleleOrderMain()
	//SearchOrderMain()
}
type OrderDetailDAO interface { //订单详情
	SaveOrderDetail()//保存
}
type DAOFactory interface { //抽象工厂接口
	CreateOrderMainDAO()  OrderMainDAO
	CreateOrderDetailDAO() OrderDetailDAO
}
//---------------------------------
//mysql针对两个接口的实现
type MySQLMainDAO struct{

}
func (*MySQLMainDAO) SaveOrderMain() {
	fmt.Println("Mysql  main save ")
}
type MySQLDetailDAO struct {

}
func (*MySQLDetailDAO)SaveOrderDetail(){
	fmt.Println("mysql detail save ")
}
//---------------------------------

//抽象工厂
type  MySQLFactory struct{

}
func (*MySQLFactory ) CreateOrderMainDAO() OrderMainDAO{
	return & MySQLMainDAO{}
}
func (*MySQLFactory ) CreateOrderDetailDAO() OrderDetailDAO{
	return & MySQLDetailDAO{}
}
//---------------------------------
//抽象工厂
type  OracleFactory struct{

}


func (* OracleFactory ) CreateOrderMainDAO() OrderMainDAO{
	return &  OracleMainDAO{}
}
func (* OracleFactory ) CreateOrderDetailDAO() OrderDetailDAO{
	return &  OracleDetailDAO{}
}
//---------------------------------

//Oracle针对两个接口的实现
type OracleMainDAO struct{

}
func (*OracleMainDAO) SaveOrderMain() {
	fmt.Println("Oracle  main save ")
}
type OracleDetailDAO struct {

}
func (*OracleDetailDAO)SaveOrderDetail(){
	fmt.Println("Oracle detail save ")
}
//---------------------------------
func main2(){
	//抽象工厂
	var factory DAOFactory
	//factory=&Abstract_Factory.MySQLFactory{}
	factory=&OracleFactory{}
	factory.CreateOrderMainDAO().SaveOrderMain()
	factory.CreateOrderDetailDAO().SaveOrderDetail()
}
```



## 3. FACTORY 工厂模式

　　工厂模式：客户类和工厂类分开。消费者任何时候需要某种产品，只需向工厂请求即可。消费者无须修改就可以接纳新产品。缺点是当产品修改时，工厂类也要做相应的修改。如：如何创建及如何向客户端提供。



　　追MM少不了请吃饭了，麦当劳的鸡翅和肯德基的鸡翅都是MM爱吃的东西，虽然口味有所不同，但不管你带MM去麦当劳或肯德基，只管向服务员说“来四个鸡翅”就行了。麦当劳和肯德基就是生产鸡翅的Factory。



## 4. BUILDER 建造模式

　　建造模式：**将产品的内部表象和产品的生成过程分割开来，从而使一个建造过程生成具有不同的内部表象的产品对象**。建造模式使得产品内部表象可以独立的变化，客户不必知道产品内部组成的细节。建造模式可以强制实行一种分步骤进行的建造过程。



　　MM超级爱听的就是“我爱你”这句话了，见到不同地方的MM，要能够用她们的方言跟她说这句话哦，我有一个多种语言翻译机，上面每种语言都有一个按键，见到MM我只要按对应的键，它就能够用相应的语言说出“我爱你”这句话了，国外的MM也可以轻松搞掂，这就是我的“我爱你”builder。（这一定比美军在伊拉克用的翻译机好卖）

```go
package Builder

import "fmt"
//-------------------------------
type  Builder interface {
	Part1()
	Part2()
	Part3()
}
//"1"+"2"+"3"="123"
//1+2+3=6

type Director struct {
	builder  Builder //建造者的接口
}
//创造接口
func NewDirector(	builder  Builder )*Director{
	return &Director{builder:builder}
}

func (d* Director)Makedata(){
	d.builder.Part1()
	d.builder.Part2()
	d.builder.Part3()
}
//-------------------------------
type IntBuilder struct {
	result int64
}

func (sb *IntBuilder)Part1(){
	sb.result+=1
}
func (sb *IntBuilder)Part2(){
	sb.result+=2
}
func (sb *IntBuilder)Part3(){
	sb.result+=3
}
func (sb *IntBuilder)GetResult() int64{
	return sb.result
}
//-------------------------------

type StringBuilder struct {
	result string
}

func (sb *StringBuilder)Part1(){
	sb.result+="1"
}
func (sb *StringBuilder)Part2(){
	sb.result+="2"
}
func (sb *StringBuilder)Part3(){
	sb.result+="3"
}
func (sb *StringBuilder)GetResult()string{
	return sb.result
}
//-------------------------------
func main3(){
	//builder:=&Builder.StringBuilder{}
	builder:=&IntBuilder{}
	dict:=NewDirector(builder)
	dict.Makedata()
	fmt.Println(builder.GetResult())
}
```



## 5. PROTOTYPE 原型模式

　　原型模式允许动态的增加或减少产品类，产品类不需要非得有任何事先确定的等级结构，原始模型模式适用于任何的等级结构。缺点是每一个类都必须配备一个克隆方法。



　　跟MM用QQ聊天，一定要说些深情的话语了，我搜集了好多肉麻的情话，需要时只要copy出来放到QQ里面就行了，这就是我的情话prototype了。 原型模式：通过给出一个原型对象来指明所要创建的对象的类型，然后用复制这个原型对象的方法创建出更多同类型的对象。

```go
package main

import "fmt"

//原型对象需要实现的接口
//map  map[""1232]=1232
//拷贝原有的对象
type Cloneable interface{
	Clone() Cloneable
}

//原型对象的类
type PrototypeManger struct{
	prototypes map[string]Cloneable
}
//构造初始化
func NewPrototypeManger() * PrototypeManger{
	return &PrototypeManger{make(map[string]Cloneable)}
}
//抓取
func (p* PrototypeManger)Get(name string)Cloneable{
	return p.prototypes[name]
}
//设置
func (p* PrototypeManger)Set(name string, prototype Cloneable){
	p.prototypes[name]=prototype
}
type Type1 struct{
	name string
}
func (t*Type1)Clone() Cloneable{
	//tc:=*t
	//return &tc 深复制
	return t
}

type Type2 struct{
	name string
}
func (t*Type2)Clone() Cloneable{
	tc:=*t //开辟内存新建变量，存储指针指向的内容
	return &tc //返回地址
}

func main(){
	mgr:=NewPrototypeManger()
	t1:=&Type1{name:"type1"}
	mgr.Set("t1",t1)
	t11:=mgr.Get("t1")
	t22:=t11.Clone()//复制
	if t11==t22{
		fmt.Println("浅复制")
	}else{
		fmt.Println("深复制")
	}
}
```



## 6. ADAPTER 适配器模式

　　适配器（变压器）模式：把一个类的接口变换成客户端所期待的另一种接口，从而使原本因接口原因不匹配而无法一起工作的两个类能够一起工作。适配类可以根据参数返还一个合适的实例给客户端。



　　在朋友聚会上碰到了一个美女Sarah，从拉斯维加斯来的，可我不会说粤语，她不会说普通话，只好求助于我的朋友kent了，他作为我和Sarah之间的Adapter，让我和Sarah可以相互交谈了(也不知道他会不会耍我)。

```go
package main
import "fmt"
//适配的目标接口
type Target interface {
	Request(int ,int)string
}
type adapter struct {
	Adaptee
}
func  NewAdapter(adaptee  Adaptee )Target {
	return &adapter{adaptee}
}
//接口包装
func (adap *adapter) Request(a,b int)string{
	return adap.SpecficRequest(a,b)
}
//被适配
type Adaptee interface {
	SpecficRequest(int ,int) string
}
//载体，被适配的目标类
type adapeeImpl struct {}

//工厂函数
func NewAdaptee ()Adaptee {
	return  &adapeeImpl{}
}
//实际函数
func (ada*  adapeeImpl)SpecficRequest(a,b int) string{
	fmt.Println(a,b)
	return"SpecficRequest你妹"
}
func  main(){
	adapee:=NewAdaptee()//适配器
	target:=NewAdapter(adapee)//传递进入
	res:=target.Request(1,2)
	fmt.Println(res)
}
```



## 7. BRIDGE 桥梁模式

　　桥梁模式：将抽象化与实现化脱耦，使得二者可以独立的变化，也就是说将他们之间的强关联变成弱关联，也就是指在一个软件系统的抽象化和实现化之间使用组合/聚合关系而不是继承关系，从而使两者可以独立的变化。



　　早上碰到MM，要说早上好，晚上碰到MM，要说晚上好；碰到MM穿了件新衣服，要说你的衣服好漂亮哦，碰到MM新做的发型，要说你的头发好漂亮哦。不要问我“早上碰到MM新做了个发型怎么说”这种问题，自己用BRIDGE组合一下不就行了。

```go
package main
import "fmt"
//-----------------------------------
type ComonMessage struct {
	method MessageImlementer
}
func NewComonMessage(method MessageImlementer)*ComonMessage {
	return  &ComonMessage{method:method}
}
func (com *  ComonMessage )SendMessage(text,to string){
	com.method.Send(text,to)
}
//-----------------------------------
// SMS短信
// Email

type AbstractMessage interface {
	SendMessage(text,to string)//发送快，发送普通速速
}

type MessageImlementer interface {
	Send(text,to string)//短信，邮件
}
//-----------------------------------
type MessageEmail struct {

}
func ViaEmail() MessageImlementer{
	return &MessageEmail{}
}

func (msms* MessageEmail)Send(text,to string) {  //邮件发送
	fmt.Printf("send %s to %s via Email",text,to)
}
//-----------------------------------
type MessageSMS struct {

}
func ViaSMS() MessageImlementer{
	return &MessageSMS{}
}

func (msms* MessageSMS)Send(text,to string) { //短信发送
	fmt.Printf("send %s to %s via SMS",text,to)
}
//-----------------------------------
type UrgencyMessage struct{
	method MessageImlementer
}
func NewUrencyMessage(method MessageImlementer) * UrgencyMessage{
	return &UrgencyMessage{method:method}
}
func (m*UrgencyMessage)SendMessage(text,to string){
	m.method.Send(fmt.Sprintf("发送到[%s]",text),to) //h很快速度发送
}
func main(){
	//m:=NewComonMessage(ViaSMS())
	//m:=NewComonMessage(ViaEmail())
	//m.SendMessage("baBy 你好","nimei")
	m:=NewUrencyMessage(ViaEmail())
	m.SendMessage("baBy 你好","nimei")
}
```



## 8. COMPOSITE 合成模式

　　合成模式：合成模式将对象组织到树结构中，可以用来描述整体与部分的关系。合成模式就是一个处理对象的树结构的模式。合成模式把部分与整体的关系用树结构表示出来。合成模式使得客户端把一个个单独的成分对象和由他们复合而成的合成对象同等看待。



　　Mary今天过生日。“我过生日，你要送我一件礼物。”“嗯，好吧，去商店，你自己挑。”“这件T恤挺漂亮，买，这条裙子好看，买，这个包也不错，买。”“喂，买了三件了呀，我只答应送一件礼物的哦。”“什么呀，T恤加裙子加包包，正好配成一套呀，小姐，麻烦你包起来。”“……”，MM都会用Composite模式了，你会了没有？

```go
package main

import "fmt"
//有的时候是父节点，叶子
type Component interface {
	Parent() Component
	SetParent( Component)
	Name()string
	SetName(string)
	AddChild( Component)
	Print(string)
}
const (
	LeafNode=iota
	CompositeNode
)

type component struct {
	parent Component
	name string
}

func  NewComonent(kind int ,name string)Component{
	var c Component
	switch kind {
	case LeafNode:  //根据不同的类型
		c=NewLeaf()
	case CompositeNode:
		c=NewComposite()
	}
	c.SetName(name)
	return c
}




func (c* component)Parent() Component{
	return c.parent
}
func (c* component)SetParent(parent Component){
	c.parent=parent
}
func (c* component)Name()string{
	return c.name
}
func (c* component)SetName(name string){
	c.name=name
}
func (c* component)AddChild( Component){

}
func (c* component)Print(string){

}

type  Leaf struct {
	component
}
func NewLeaf()*Leaf{ //开辟一个叶子
	return &Leaf{}
}
func (c*Leaf)Print(pre string){
	fmt.Println(pre,c.Name())
}
type Composite struct{
	component
	childs [] Component //叶子集合
}
//创建一个组合结构体
func NewComposite()*Composite{
	return &Composite{childs:make([]Component,0)}
}
func (c* Composite)AddChild(child Component){
	child.SetParent(c)
	c.childs=append(c.childs,child)//加入孩子节点
}
func (c* Composite)Print(pre string){//打印显示每一个节点
	fmt.Println(pre,c.name)
	pre+="  "
	for _,comp:=range c.childs{
		comp.Print(pre)
	}
}
func main4(){
	//root;
	root:=NewComonent(CompositeNode,"root")
	r1:=NewComonent(CompositeNode,"r1")
	r2:=NewComonent(CompositeNode,"r2")
	r3:=NewComonent(CompositeNode,"r3")

	l1:=NewComonent(LeafNode,"l1")
	l2:=NewComonent(LeafNode,"l2")
	l3:=NewComonent(LeafNode,"l3")

	root.AddChild(r1)
	root.AddChild(r2)
	r1.AddChild(r3)

	r1.AddChild(l1)

	r2.AddChild(l2)
	r2.AddChild(l3)
	root.Print("")


}
```



## 9. DECORATOR 装饰模式

　　装饰模式：装饰模式以对客户端透明的方式扩展对象的功能，是继承关系的一个替代方案，提供比继承更多的灵活性。动态给一个对象增加功能，这些功能可以再动态的撤消。增加由一些基本功能的排列组合而产生的非常大量的功能。



　　Mary过完轮到Sarly过生日，还是不要叫她自己挑了，不然这个月伙食费肯定玩完，拿出我去年在华山顶上照的照片，在背面写上“**的的礼物，就是爱你的Fita”，再到街上礼品店买了个像框（卖礼品的MM也很漂亮哦），再找隔壁搞美术设计的Mike设计了一个漂亮的盒子装起来……，我们都是Decorator，最终都在修饰我这个人呀，怎么样，看懂了吗？

```go
package Deacorator

import "fmt"
type  AddComponent struct {
	Component
	num int
}

func WarpAddComponent(c  Component,num int )Component{
	return  &AddComponent{c,num}
}
//+
func (mul *AddComponent)Calc()int {
	return mul.Component.Calc()+mul.num
}
//-----------------------------------
type  Component interface {
	Calc()int
}
type ConcreateComponent struct{

}
func (*ConcreateComponent )Calc()int {
	return 0
}
//-----------------------------------
type  MulComponent struct {
	Component
	num int
}

func WarpMulComponent(c  Component,num int )Component{
	return  &MulComponent{c,num}
}
//乘法
func (mul *MulComponent)Calc()int {
	return mul.Component.Calc()*mul.num
}
//-----------------------------------

func main6(){
	var c Component=&ConcreateComponent{}
	//c=Deacorator.WarpAddComponent(c,10)
	c=WarpMulComponent(c,10)
	fmt.Println(c.Calc())
}
```



## 10. FACADE 门面（外观）模式

　　门面模式：外部与一个子系统的通信必须通过一个统一的门面对象进行。门面模式提供一个高层次的接口，使得子系统更易于使用。每一个子系统只有一个门面类，而且此门面类只有一个实例，也就是说它是一个单例模式。但整个系统可以有多个门面类。



　　我有一个专业的Nikon相机，我就喜欢自己手动调光圈、快门，这样照出来的照片才专业，但MM可不懂这些，教了半天也不会。幸好相机有Facade设计模式，把相机调整到自动档，只要对准目标按快门就行了，一切由相机自动调整，这样MM也可以用这个相机给我拍张照片了。

```go

```



## 11. FLYWEIGHT 享元模式

　　享元模式：FLYWEIGHT在拳击比赛中指最轻量级。享元模式以共享的方式高效的支持大量的细粒度对象。享元模式能做到共享的关键是区分内蕴状态和外蕴状态。内蕴状态存储在享元内部，不会随环境的改变而有所不同。外蕴状态是随环境的改变而改变的。外蕴状态不能影响内蕴状态，它们是相互独立的。将可以共享的状态和不可以共享的状态从常规类中区分开来，将不可以共享的状态从类里剔除出去。客户端不可以直接创建被共享的对象，而应当使用一个工厂对象负责创建被共享的对象。享元模式大幅度的降低内存中对象的数量。



　　每天跟MM发短信，手指都累死了，最近买了个新手机，可以把一些常用的句子存在手机里，要用的时候，直接拿出来，在前面加上MM的名字就可以发送了，再不用一个字一个字敲了。共享的句子就是Flyweight，MM的名字就是提取出来的外部特征，根据上下文情况使用。

```go
import "fmt"

type ImageFlyWeight struct {
	data string
}
//初始化
func NewImageFlyweight(filename string)*ImageFlyWeight{
	data:=fmt.Sprintf("image data %s",filename)
	return &ImageFlyWeight{data}
}
func  (i*ImageFlyWeight  )Data() string{ //截取数据
	return i.data
}
//----------------------------------------------

var imgflyfactory* ImageFlyWeightFactory

type ImageFlyWeightFactory struct{
	 maps map[string]*ImageFlyWeight
}

//对象初始化，不会反复初始化，
func GetImageFlyWeightFactory()* ImageFlyWeightFactory {
	if imgflyfactory==nil{
		imgflyfactory=& ImageFlyWeightFactory{make( map[string]*ImageFlyWeight)}
	}
	return imgflyfactory
}

func  (imf *ImageFlyWeightFactory)Get(filename string) *ImageFlyWeight{
	image:=imf.maps[filename] //取出，map去掉重复
	if image ==nil{
		image=NewImageFlyweight(filename) //存储进入
		imf.maps[filename]=image
	}
	return image
}
//----------------------------------------------
type ImageViewer struct {
	*ImageFlyWeight
}
func NewImageViewer(filename string)*ImageViewer{
	image:=GetImageFlyWeightFactory().Get(filename)
	return &ImageViewer{image}
}
func (i*ImageViewer)Display(){
	fmt.Printf("Display %s\n",i.Data())
}
//----------------------------------------------
func main2(){
	v1:=NewImageViewer("1.jpg")
	v1.Display()
	v2:=NewImageViewer("1.jpg")
	v2.Display()
	if v1.ImageFlyWeight==v2.ImageFlyWeight{
		fmt.Println("节约内存")
	}else{
		fmt.Println("langfei内存")
	}
}
```



## 12. PROXY 代理模式

　　代理模式：代理模式给某一个对象提供一个代理对象，并由代理对象控制对源对象的引用。代理就是一个人或一个机构代表另一个人或者一个机构采取行动。某些情况下，客户不想或者不能够直接引用一个对象，代理对象可以在客户和目标对象直接起到中介的作用。客户端分辨不出代理主题对象与真实主题对象。代理模式可以并不知道真正的被代理对象，而仅仅持有一个被代理对象的接口，这时候代理对象不能够创建被代理对象，被代理对象必须有系统的其他角色代为创建并传入。



　　跟MM在网上聊天，一开头总是“hi,你好”,“你从哪儿来呀？”“你多大了？”“身高多少呀？”这些话，真烦人，写个程序做为我的Proxy吧，凡是接收到这些话都设置好了自己的回答，接收到其他的话时再通知我回答，怎么样，酷吧。

```go

```



## 13. CHAIN OF RESPONSIBLEITY 责任链模式

　　责任链模式：在责任链模式中，很多对象由每一个对象对其下家的引用而接起来形成一条链。请求在这个链上传递，直到链上的某一个对象决定处理此请求。客户并不知道链上的哪一个对象最终处理这个请求，系统可以在不影响客户端的情况下动态的重新组织链和分配责任。处理者有两个选择：承担责任或者把责任推给下家。一个请求可以最终不被任何接收端对象所接受。



　　晚上去上英语课，为了好开溜坐到了然后一排，哇，前面坐了好几个漂亮的MM哎，找张纸条，写上“Hi,可以做我的女朋友吗？如果不愿意请向前传”，纸条就一个接一个的传上去了，糟糕，传到**排的MM把纸条传给老师了，听说是个老一手女呀，快跑!

```go
package test
import "fmt"
type DepManager struct {

}
func NewDepManager()*DepManager{
	return &DepManager{}
}
func NewDepManagerChain()*RequestChain{
	return &RequestChain{&DepManager{},nil}
}


func (dm *DepManager) HaveRight(money int )bool  {
	return  money <5000
}
func (dm *DepManager) HandleFeeRequest(name string,money int )bool{
	if name=="lixiang"{
		fmt.Printf("DepManager  授权%s %d\n",name,money)
		return true
	}
	fmt.Printf("DepManager not 授权%s %d\n",name,money)
	return false
}
//-----------------------------------------
type GenaralManager struct {

}
func NewGenaralManager()*GenaralManager{
	return &GenaralManager{}
}
func NewGenaralManagerChain()*RequestChain{
	return &RequestChain{&GenaralManager{},nil}
}

func (pm *GenaralManager) HaveRight(money int )bool  {
	return true
}
func (pm *GenaralManager) HandleFeeRequest(name string,money int )bool{
	if name=="weishangyin"{
		fmt.Printf("GenaralManager  授权%s %d\n",name,money)
		return true
	}
	fmt.Printf("GenaralManager not 授权%s %d\n",name,money)
	return false
}
//-----------------------------------------
//主管  经理  总经理  董事长
//50 100   150   200
type Manger interface {
	HaveRight(money int )bool  //判断权限
	HandleFeeRequest(name string,money int )bool//向后传递
}
//-----------------------------------------

type ProjectManager struct {

}
func NewProjectManager()*ProjectManager{
	return &ProjectManager{}
}
func NewProjectManagerChain()*RequestChain{
	return &RequestChain{&ProjectManager{},nil}
}

func (pm *ProjectManager) HaveRight(money int )bool  {
	return  money <1000
}
func (pm *ProjectManager) HandleFeeRequest(name string,money int )bool{
	if name=="hupeng"{
		fmt.Printf("ProjectManager 授权%s %d\n",name,money)
		return true
	}
	fmt.Printf("ProjectManager not 授权%s %d\n",name,money)
	return false
}
//-----------------------------------------

type RequestChain struct{
	Manger
	successor *RequestChain //处理成功
}

//判断责任链在哪里结束
func (rc* RequestChain)SetSuceessor(endrc *RequestChain){
	rc.successor=endrc
}
//权力判断
func  (rc* RequestChain)HaveRight(money int)bool{
	return true
}
//向后传递,有权利当场处理，没有权利放弃，向后传递
func (rc* RequestChain)HandleFeeRequest(name string,money int )bool{
	if rc.Manger.HaveRight(money){
		return rc.Manger.HandleFeeRequest(name,money)
	}
	if rc.successor!=nil{
		return rc.successor.HandleFeeRequest(name,money)
	}
	return false
}

func main1(){
	c1:=NewProjectManagerChain()
	c2:=NewDepManagerChain()
	c3:=NewGenaralManagerChain()

	c1.SetSuceessor(c2)
	c2.SetSuceessor(c3)

	var c Manger =c1
	c.HandleFeeRequest("hupeng",1500)
	c.HandleFeeRequest("hupeng",500)
	c.HandleFeeRequest("lixiang",4500)
	c.HandleFeeRequest("lixiang",11500)
	c.HandleFeeRequest("weishangyin",4500)
	c.HandleFeeRequest("weishangyin",11500)
}
```



## 14. COMMAND 命令模式

　　命令模式：命令模式把一个请求或者操作封装到一个对象中。命令模式把发出命令的责任和执行命令的责任分割开，委派给不同的对象。命令模式允许请求的一方和发送的一方独立开来，使得请求的一方不必知道接收请求的一方的接口，更不必知道请求是怎么被接收，以及操作是否执行，何时被执行以及是怎么被执行的。系统支持命令的撤消。



　　俺有一个MM家里管得特别严，没法见面，只好借助于她弟弟在我们俩之间传送信息，她对我有什么指示，就写一张纸条让她弟弟带给我。这不，她弟弟又传送过来一个COMMAND，为了感谢他，我请他吃了碗杂酱面，哪知道他说：“我同时给我姐姐三个男朋友送COMMAND，就数你最小气，才请我吃面。”

```go
package test
import "fmt"

type Box struct {
	Washclothes Command
	WarmBed Command
}

func  NewBox(Washclothes ,WarmBed Command) *Box{
	return &Box{Washclothes ,WarmBed}
}


func ( b*Box )GoWashclothes(){
	fmt.Println("给妹子买了一束花")
	b.Washclothes.Execute()
}
func ( b*Box )GoWarmBed(){
	fmt.Println("给妹子买了一个iphone max")
	b.WarmBed.Execute()
}
//-----------------------------------------
type Command interface {
	Execute() //执行
}

//-----------------------------------------
type MMCommand1 struct {
	mb*MotherBoard
}
func NewMMCommand1(mb *MotherBoard)*MMCommand1{
	return &MMCommand1{mb}
}

func (mmc1 MMCommand1 )Execute(){
	mmc1.mb.WashClothes() //洗衣服
}
//-----------------------------------------
type MMCommand2 struct {
	mb*MotherBoard
}
func NewMMCommand2(mb *MotherBoard)*MMCommand2{
	return &MMCommand2{mb}
}

func (mmc1 MMCommand2 )Execute(){
	mmc1.mb.Warmbed()//洗衣服
}
//-----------------------------------------
type MotherBoard struct {

}

func (*MotherBoard)WashClothes(){
	fmt.Println("委派妹子去洗衣服了")
}
func (*MotherBoard)Warmbed(){
	fmt.Println("委派妹子去暖床了")
}
//-----------------------------------------
func main9(){
	mb:=&MotherBoard{}
	cmd1:=NewMMCommand1(mb)
	cmd2:=NewMMCommand2(mb)

	box1:=NewBox(cmd1,cmd2)
	box1.GoWarmBed()
	box1.GoWashclothes()
	//box2:=NewBox(cmd1,cmd2)
	//box2.GoWarmBed()
	//box2.GoWashclothes()
}
```



## 15. INTERPRETER 解释器模式

　　解释器模式：给定一个语言后，解释器模式可以定义出其文法的一种表示，并同时提供一个解释器。客户端可以使用这个解释器来解释这个语言中的句子。解释器模式将描述怎样在有了一个简单的文法后，使用模式设计解释这些语句。在解释器模式里面提到的语言是指任何解释器对象能够解释的任何组合。在解释器模式中需要定义一个代表文法的命令类的等级结构，也就是一系列的组合规则。每一个命令对象都有一个解释方法，代表对命令对象的解释。命令对象的等级结构中的对象的任何排列组合都是一个语言。



　　俺有一个《泡MM真经》，上面有各种泡MM的攻略，比如说去吃西餐的步骤、去看电影的方法等等，跟MM约会时，只要做一个Interpreter，照着上面的脚本执行就可以了。

```go
package test

import (
	"strconv"
	"strings"
	"fmt"
)

type AddNode struct {
	left,right Node
}
func (a *AddNode)Interpret()int {
	return a.left.Interpret()+a.right.Interpret()
}
//------------------------------------
//节点，返回一个数据
type Node interface {
	Interpret () int
}
type ValNode struct {
	val int
}
func (valn *ValNode)Interpret () int {
	return valn.val
}
//------------------------------------
type Parser struct {
	exp []string
	index int
	prev Node
}
func (p*Parser)Parse(exp string){
	p.exp=strings.Split(exp," ")
	for {
		if p.index >= len(p.exp){
			return
		}
		switch p.exp[p.index] {
		case "+":
			p.prev=p.newAddNode()
		case "-":
			p.prev=p.newSubNode()
		default:
			p.prev=p.newValNode()
		}
	}
}

func (p*Parser)newAddNode()Node{
	p.index++
	return &AddNode{p.prev,p.newValNode()}
}
func (p*Parser)newSubNode()Node{
	p.index++
	return &SubNode{p.prev,p.newValNode()}
}
func (p*Parser)newValNode()Node{
	v,_:= strconv.Atoi(p.exp[p.index]) //转换类型
	p.index++
	return &ValNode{v}
}
func (p*Parser) Result()Node{
	return p.prev
}
//------------------------------------
type SubNode struct {
	left,right Node
}
func (a *SubNode)Interpret()int {
	return a.left.Interpret()-a.right.Interpret()
}
//------------------------------------
func main3(){
	//1+2
	//1+2+3
	//1+2+3+5-4
	p :=&Parser{}
	fmt.Print("start\n")
	p.Parse("1 + 3 - 2 + 5 - 6 + 7 - 10")
	fmt.Println(p.Result().Interpret())
}
```



## 16. ITERATOR 迭代子模式

　　迭代子模式：迭代子模式可以顺序访问一个聚集中的元素而不必暴露聚集的内部表象。多个对象聚在一起形成的总体称之为聚集，聚集对象是能够包容一组对象的容器对象。迭代子模式将迭代逻辑封装到一个独立的子对象中，从而与聚集本身隔开。迭代子模式简化了聚集的界面。每一个聚集对象都可以有一个或一个以上的迭代子对象，每一个迭代子的迭代状态可以是彼此独立的。迭代算法可以独立于聚集角色变化。



　　我爱上了Mary，不顾一切的向她求婚。Mary：“想要我跟你结婚，得答应我的条件” 我：“什么条件我都答应，你说吧” Mary：“我看上了那个一克拉的钻石” 我：“我买，我买，还有吗？” Mary：“我看上了湖边的那栋别墅” 我：“我买，我买，还有吗？” Mary：“我看上那辆法拉利跑车” 我脑袋嗡的一声，坐在椅子上，一咬牙：“我买，我买，还有吗？” ……

```go

```



## 17. MEDIATOR 调停者模式

　　调停者模式：调停者模式包装了一系列对象相互作用的方式，使得这些对象不必相互明显作用。从而使他们可以松散偶合。当某些对象之间的作用发生改变时，不会立即影响其他的一些对象之间的作用。保证这些作用可以彼此独立的变化。调停者模式将多对多的相互作用转化为一对多的相互作用。调停者模式将对象的行为和协作抽象化，把对象在小尺度的行为上与其他对象的相互作用分开处理。



　　四个MM打麻将，相互之间谁应该给谁多少钱算不清楚了，幸亏当时我在旁边，按照各自的筹码数算钱，赚了钱的从我这里拿，赔了钱的也付给我，一切就OK啦，俺得到了四个MM的电话。

```go
package test
import "fmt"
type  CPU struct{
	data string
}

func (c*CPU) Process(data string){
	fmt.Println("CPU is running ",data)

}
//---------------------------------------
type  Disk struct{
	data string
}
func (d * Disk)Store(data string){
	fmt.Println("disk is running ",data)
}
//---------------------------------------
type  GPU struct{
	data string
}
func (g *GPU)Display(data string){
	fmt.Println("GPU is running ",data)
}
//---------------------------------------

type MediatorX struct {
	Ccpu *CPU
	Cgpu *GPU
	Cdisk *Disk
	Cmem *MEM
}
var mediator * MediatorX=nil

func GetMediatorInstace()*MediatorX{
	if mediator==nil{
		mediator=&MediatorX{nil,nil,nil,nil}
		mediator.Ccpu=&CPU{}
		mediator.Cgpu=&GPU{}
		mediator.Cmem=&MEM{}
		mediator.Cdisk=&Disk{}
	}
	return mediator
}
func (m*MediatorX)Changed(i interface{}){
	switch inst:=i.(type) {
	case *CPU:
		m.Ccpu.Process(inst.data)
	case *GPU:
		m.Cgpu.Display(inst.data)
	case *Disk:
		m.Cdisk.Store(inst.data)
	case *MEM:
		m.Cmem.Dump(inst.data)
	default:

	}
}
//---------------------------------------
type  MEM struct{
	data string
}
func (m*MEM)Dump(data string){
	fmt.Println("MEM is running ",data)
}
//---------------------------------------
func main6(){
	meditor:=GetMediatorInstace()
	fmt.Println(meditor)
	meditor.Ccpu.Process("hello")
	meditor.Cgpu.Display("hello")
	meditor.Cdisk.Store("hello")
	meditor.Cmem.Dump("gogogo")
	meditor.Changed(meditor.Ccpu)
	meditor.Changed(meditor.Cmem)
}
```



## 18. MEMENTO 备忘录模式

　　备忘录模式：备忘录对象是一个用来存储另外一个对象内部状态的快照的对象。备忘录模式的用意是在不破坏封装的条件下，将一个对象的状态捉住，并外部化，存储起来，从而可以在将来合适的时候把这个对象还原到存储起来的状态。



　　同时跟几个MM聊天时，一定要记清楚刚才跟MM说了些什么话，不然MM发现了会不高兴的哦，幸亏我有个备忘录，刚才与哪个MM说了什么话我都拷贝一份放到备忘录里面保存，这样可以随时察看以前的记录啦。

```go
package MEMENTO

import "fmt"

type MMfeel struct {
	Tall int
	Rich int
	Handsome int
}


var States []MMfeel=make([]MMfeel,0)
var Stateslength int =0
func (mmf*MMfeel)A第一次见面(tall int,rich int,handsome int){

	mmf.Tall=tall
	mmf.Rich=rich
	mmf.Handsome=handsome
	fmt.Println("当前状态",mmf.Tall,mmf.Rich,mmf.Handsome)
	States=append(States,*mmf)
}
func (mmf*MMfeel)A去韩国(){
	mmf.Handsome =mmf.Handsome+30
	States=append(States,*mmf)
}
func (mmf*MMfeel)A中彩票(){
	mmf.Rich+=5000000
	States=append(States,*mmf)
}
func (mmf*MMfeel)A断腿骨(){
	mmf.Tall+=10
	States=append(States,*mmf)
}
func (mmf*MMfeel)A妹子的分数(){
	fmt.Println("当前状态",mmf.Tall,mmf.Rich,mmf.Handsome)
}
func main8(){
	var xiaoxianglong *MMfeel=&MMfeel{0,0,0}
	xiaoxianglong.A第一次见面(170,500000,70)
	xiaoxianglong.A中彩票()
	xiaoxianglong.A去韩国()
	xiaoxianglong.A断腿骨()
	xiaoxianglong.A妹子的分数()
	fmt.Println(States)
}
```



## 19. OBSERVER 观察者模式

　　观察者模式：观察者模式定义了一种一队多的依赖关系，让多个观察者对象同时监听某一个主题对象。这个主题对象在状态上发生变化时，会通知所有观察者对象，使他们能够自动更新自己。



　　想知道咱们公司**MM情报吗？加入公司的MM情报邮件组就行了，tom负责搜集情报，他发现的新情报不用一个一个通知我们，直接发布给邮件组，我们作为订阅者（观察者）就可以及时收到情报啦。

```go
package test

import "fmt"
type Observer interface {
	Update(subject *Subject)
}
//---------------------------------------
//读取类
type Reader struct {
	name string
}

func NewReader(name string)*Reader{
	return &Reader{name:name}
}

func (r *Reader)Update(subject *Subject){
	fmt.Printf("%s 收到 %s\n",r.name,subject.context)
}
//---------------------------------------

type  Subject struct {
	obs  [] Observer  //群聊
	context string   //更新群聊的信息
}

func NewSubject ()*Subject{
	return &Subject{obs:make([]Observer,0)}
}
func (s* Subject)Attch(o Observer){
	s.obs=append(s.obs,o)//加入群聊
}



func (s* Subject)notify(){
	for _,o:=range s.obs{//每个人都发一次
		o.Update(s)  //更新通知
	}
}
func (s* Subject)UpdateContext(context string){
	s.context=context
	s.notify()//更新之后通知
}

//---------------------------------------

func main2(){
	subject:=NewSubject()
	r1:=NewReader("lixiang")
	r2:=NewReader("hupeng")
	r3:=NewReader("zhangbo")
	subject.Attch(r1)
	subject.Attch(r2)
	subject.Attch(r3)
	subject.UpdateContext("妹子来了")
	r4:=NewReader("yangjie")
	subject.Attch(r4)
	subject.UpdateContext("漂亮妹子来了")
}
```



## 20. STATE 状态模式

　　状态模式：状态模式允许一个对象在其内部状态改变的时候改变行为。这个对象看上去象是改变了它的类一样。状态模式把所研究的对象的行为包装在不同的状态对象里，每一个状态对象都属于一个抽象状态类的一个子类。状态模式的意图是让一个对象在其内部状态改变的时候，其行为也随之改变。状态模式需要对每一个系统可能取得的状态创立一个状态类的子类。当系统的状态变化时，系统便改变所选的子类。



　　跟MM交往时，一定要注意她的状态哦，在不同的状态时她的行为会有不同，比如你约她今天晚上去看电影，对你没兴趣的MM就会说“有事情啦”，对你不讨厌但还没喜欢上的MM就会说“好啊，不过可以带上我同事么？”，已经喜欢上你的MM就会说“几点钟？看完电影再去泡吧怎么样？”，当然你看电影过程中表现良好的话，也可以把MM的状态从不讨厌不喜欢变成喜欢哦。

```go
package test

import "fmt"

type Sunday struct {

}

func (sd *Sunday)Today(){
	fmt.Println("Sunday\n")
}
func (sd *Sunday)Next(ctx *DayContext){
	ctx.today=&Monday{}
}

type Monday struct {

}

func (sd * Monday)Today(){
	fmt.Println(" Monday\n")
}
func (sd * Monday)Next(ctx *DayContext){
	ctx.today=&Tuesday {}
}

type Tuesday struct {

}

func (sd *  Tuesday)Today(){
	fmt.Println(" Monday\n")
}
func (sd *  Tuesday)Next(ctx *DayContext){
	ctx.today=&Wednesday {}
}
type Wednesday  struct {

}

func (sd * Wednesday )Today(){
	fmt.Println(" Wednesday \n")
}
func (sd * Wednesday )Next(ctx *DayContext){
	ctx.today=&Thursday {}
}
type Thursday struct {

}

func (sd * Thursday)Today(){
	fmt.Println(" Thursday\n")
}
func (sd * Thursday)Next(ctx *DayContext){
	ctx.today=& Friday {}
}

type Friday struct {

}

func (sd * Friday)Today(){
	fmt.Println(" Friday\n")
}
func (sd * Friday)Next(ctx *DayContext){
	ctx.today=& Saturday {}
}
type Saturday struct {

}

func (sd * Saturday)Today(){
	fmt.Println(" Saturday\n")
}
func (sd * Saturday)Next(ctx *DayContext){
	ctx.today=& Sunday {}
}
//------------------------------------------

//每个星期行为
type Week interface {
	Today()
	Next(*DayContext )
}
//星期数据结构
type DayContext struct {
	today Week
}
func NewDayContext()*DayContext{
	return &DayContext{&Sunday{}}
}
func ( dc*DayContext)Today(){
	dc.today.Today()  //今天
}
func ( dc*DayContext)Next( ){
	dc.today.Next(dc)//m明天
}
//---------------------------------------------------
func main4(){
	ctx:=NewDayContext()
	todayAndNext :=func(){
		ctx.Today()
		ctx.Next()
	}
	for i:=0;i<98;i++{
		todayAndNext()
	}

}
```



## 21. STRATEGY 策略模式

　　策略模式：**策略模式针对一组算法，将每一个算法封装到具有共同接口的独立的类中**，从而使得它们可以相互替换。策略模式使得算法可以在不影响到客户端的情况下发生变化。策略模把行为和环境分开。环境类负责维持和查询行为类，各种算法在具体的策略类中提供。由于算法和环境独立开来，算法的增减，修改都不会影响到环境和客户端。



　　跟不同类型的MM约会，要用不同的策略，有的请电影比较好，有的则去吃小吃效果不错，有的去海边浪漫最合适，单目的都是为了得到MM的芳心，我的追MM锦囊中有好多Strategy哦。

```go
package Strategy

import "fmt"

type MMContext struct {
	Name string
	Age  int
	paoStrategy  MMStrategy
}
func NewMMContext(name string,age int,mms MMStrategy)*MMContext{
	return &MMContext{name,age ,mms}
}
func (mm *MMContext)Pao(){
	mm.paoStrategy.Pao(mm)
}

type MMStrategy interface {
	Pao(*MMContext)
}
type Girl struct{

}
func (*Girl)Pao(ctx *MMContext){
	fmt.Println("带妹子去看遍世间繁华",ctx.Name)
}
type Women struct{

}
func (*Women)Pao(ctx *MMContext){
	fmt.Println("带大妈取做旋转木马",ctx.Name)
}
func main7(){
	//ctx:=Strategy.NewMMContext("marry",18,&Strategy.Girl{})
	ctx:=NewMMContext("alis",28,&Strategy.Women{})
	//if age<18  facotry

	ctx.Pao()
}
```



## 22. TEMPLATE METHOD 模板模式

　　模板方法模式：模板方法模式准备一个抽象类，将部分逻辑以具体方法以及具体构造子的形式实现，然后声明一些抽象方法来迫使子类实现剩余的逻辑。不同的子类可以以不同的方式实现这些抽象方法，从而对剩余的逻辑有不同的实现。先制定一个珠峰逻辑框架，而将逻辑的细节留给具体的子类去实现。



　　看过《如何说服女生上床》这部经典文章吗？女生从认识到上床的不变的步骤分为巧遇、打破僵局、展开追求、接吻、前戏、动手、爱抚、进去八大步骤(Template method)，但每个步骤针对不同的情况，都有不一样的做法，这就要看你随机应变啦(具体实现)。

```go
package Template

import "fmt"

type Downloader interface {
	Download(url string)
}
type  template struct {
	implement
	url  string
}
type implement interface {
	download()
	save()
}

func Newtemplate(impl implement)*template  {
	return &template{impl,""}
}

func (t * template)Download(url string){
	fmt.Println("模板下载start")
	t.url=url
	t.implement.download()
	t.implement.save()
	fmt.Println("模板下载end")
}
func (t * template)save(){
	fmt.Println("模板下载保存")

}
//------------------------------------------------
type  FtpDownLoader struct {
	*template
}
func NewFtpDownLoader()Downloader{
	downloader:=&FtpDownLoader{}
	template:=Newtemplate(downloader)
	downloader.template=template
	return downloader
}

func (hd*FtpDownLoader)download(){
	fmt.Printf("ftp down %s \n",hd.url)
}

func (hd*FtpDownLoader) save(){
	fmt.Printf("ftp save %s \n")
}

//------------------------------------------------

type  HttpDownLoader struct {
	*template
}
func NewHttpDownLoader()Downloader{
	downloader:=&HttpDownLoader{}
	template:=Newtemplate(downloader)
	downloader.template=template
	return downloader
}

func (hd*HttpDownLoader) download(){
	fmt.Printf("http down %s \n",hd.url)
}

func (hd*HttpDownLoader) save(){
	fmt.Printf("http save \n")
}
//------------------------------------------------
func main5(){
	var  downloader Downloader=NewHttpDownLoader();
	downloader.Download("http://tsinghua.edu.cn/ai.zip")
	var  downloader1 Downloader=NewFtpDownLoader();
	downloader1.Download("ftp://tsinghua.edu.cn/ai.zip")
}
```



## 23. VISITOR 访问者模式

　　访问者模式：访问者模式的目的是封装一些施加于某种数据结构元素之上的操作。一旦这些操作需要修改的话，接受这个操作的数据结构可以保持不变。访问者模式适用于数据结构相对未定的系统，它把数据结构和作用于结构上的操作之间的耦合解脱开，使得操作集合可以相对自由的演化。访问者模式使得增加新的操作变的很容易，就是增加一个新的访问者类。访问者模式将有关的行为集中到一个访问者对象中，而不是分散到一个个的节点类中。当使用访问者模式时，要将尽可能多的对象浏览逻辑放在访问者类中，而不是放到它的子类中。访问者模式可以跨过几个类的等级结构访问属于不同的等级结构的成员类。



　　情人节到了，要给每个MM送一束鲜花和一张卡片，可是每个MM送的花都要针对她个人的特点，每张卡片也要根据个人的特点来挑，我一个人哪搞得清楚，还是找花店老板和礼品店老板做一下Visitor，让花店老板根据MM的特点选一束花，让礼品店老板也根据每个人特点选一张卡，这样就轻松多了。

```go
package test
import "fmt"

type AnalysisVisitor struct {

}
func (* AnalysisVisitor )Visit(customer Customer){
	switch c:=customer.(type){
	case * EnterpriseCustomer:
		fmt.Println("Analysis  Enterprise  customer",c.name)
	}
}

//---------------------------------------------
type Customer interface { //接待者
	Accept(Visitor )
}
type Visitor interface {//访问者
	Visit(Customer)
}
//---------------------------------------------
type CustomerCol struct{
	customers[]  Customer  //接待者集合
}

func (c *CustomerCol)Add(customer  Customer){
	c.customers=append(c.customers,customer) //叠加
}
func (c *CustomerCol)Accept(visitor Visitor){ //每个服务者，接受访问者
	for _,customer := range c.customers{
		customer.Accept(visitor)
	}
}
//---------------------------------------------
type EnterpriseCustomer struct {
	name string
}

func NewEnterpriseCustomer(name string)*EnterpriseCustomer{
	return  &EnterpriseCustomer{name:name}
}
func (ec *EnterpriseCustomer)Accept(visitor Visitor){
	visitor.Visit(ec)
}
//---------------------------------------------
type IndividualCustomer struct {
	name string
}

func NewIndividualCustomer(name string)*IndividualCustomer{
	return  &IndividualCustomer{name:name}
}
func (ec *IndividualCustomer)Accept(visitor Visitor){
	visitor.Visit(ec)
}

//---------------------------------------------
type SerivceRequesttVisitor struct {

}
func (* SerivceRequesttVisitor )Visit(customer Customer){
	switch c:=customer.(type){
	case * EnterpriseCustomer:
		fmt.Println("serving  Enterprise  customer",c.name)
	case *IndividualCustomer:
		fmt.Println("serving  Individual Customer",c.name)
	}
}

//---------------------------------------------
func main(){
	c:=CustomerCol{}
	c.Add(NewEnterpriseCustomer("Microsoft"))

	c.Add(NewIndividualCustomer("billgates"))
	c.Add(NewEnterpriseCustomer("Google"))
	//c.Accept(&SerivceRequesttVisitor{} )
	c.Accept(&AnalysisVisitor{})
}
```




## 设计模式小结
装饰器模式 一个类增加一个功能,不改变原有类的情况增加功能
享元模式 节约内存
责任链模式 根据每个的级别分配不同的权限，向后传或者向前传
观察者模式 一个类发生要通知其他所有的类
解释器模式  解释加减乘除
状态机模式 不同状态来回切换展示不同的行为