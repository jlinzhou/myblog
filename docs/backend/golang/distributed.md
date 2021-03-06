---
title: 分布式技术原理
---

## 分布式基础

### CAP

CAP 理论可以表述为，一个分布式系统最多只能同时满足**一致性（Consistency）、可用性（Availability）和分区容忍性（Partition Tolerance）**这三项中的两项。

**一致性**是指“所有节点同时看到相同的数据”，即更新操作成功并返回客户端完成后，所有节点在同一时间的数据完全一致，等同于所有节点拥有数据的最新版本。



**可用性**是指“任何时候，读写都是成功的”，即服务一直可用，而且是正常响应时间。我们平时会看到一些 IT 公司的对外宣传，比如系统稳定性已经做到 3 个 9、4 个 9，即 99.9%、99.99%，这里的 N 个 9 就是对可用性的一个描述，叫做 SLA，即服务水平协议。比如我们说月度 99.95% 的 SLA，则意味着每个月服务出现故障的时间只能占总时间的 0.05%，如果这个月是 30 天，那么就是 21.6 分钟。



**分区容忍性**具体是指“当部分节点出现消息丢失或者分区故障的时候，分布式系统仍然能够继续运行”，即系统容忍网络出现分区，并且在遇到某节点或网络分区之间网络不可达的情况下，仍然能够对外提供满足一致性和可用性的服务。



在分布式系统中，由于系统的各层拆分，P 是确定的，CAP 的应用模型就是 CP 架构和 AP 架构。分布式系统所关注的，就是在 Partition Tolerance 的前提下，如何实现更好的 A，和更稳定的 C。



**注解**: [CAP理论详解及证明](https://blog.csdn.net/yd578196774/article/details/81566655)



### Paxos 算法

Paxos 算法在分布式领域具有非常重要的地位，开源分布式锁组件 Google Chubby 的作者 Mike Burrows 说过，这个世界上只有一种一致性算法，那就是 Paxos 算法，其他的算法都是残次品。

 解决了什么问题呢？
答：解决了一致性问题。 

 Paxos 协议/算法 就是少数服从多数，标准的 [鸽笼原理/抽屉原理](https://link.jianshu.com/?t=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E6%8A%BD%E5%B1%89%E5%8E%9F%E7%90%86%2F233776%3Ffr%3Daladdin%26fromid%3D8942185%26fromtitle%3D%E9%B8%BD%E7%AC%BC%E5%8E%9F%E7%90%86) 

**资料:**

[如何浅显易懂地解说 Paxos 的算法？](https://link.jianshu.com?t=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F19787937)
 [图解 Paxos 一致性协议](https://link.jianshu.com?t=http%3A%2F%2Fblog.xiaohansong.com%2F2016%2F09%2F30%2FPaxos%2F)
 [分布式系列文章——Paxos算法原理与推导](https://link.jianshu.com?t=http%3A%2F%2Fwww.cnblogs.com%2Flinbingdong%2Fp%2F6253479.html)
 [Paxos算法 维基百科，自由的百科全书](https://link.jianshu.com?t=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FPaxos%E7%AE%97%E6%B3%95)
 [Paxos Made Simple【翻译】](https://link.jianshu.com?t=https%3A%2F%2Fwenku.baidu.com%2Fview%2Fbf8e118fa0116c175f0e4853.html%3Ffrom%3Dsearch)
 [The Part-Time Parliament(Paxos算法中文翻译)](https://link.jianshu.com?t=https%3A%2F%2Fwenku.baidu.com%2Fview%2F87276e1dfad6195f312ba6d7.html)





### ZooKeeper 

在分布式场景中，ZooKeeper 的应用非常广泛，比如**数据发布和订阅、命名服务、配置中心、注册中心、分布式锁**等。

ZooKeeper 是通过 **Zab** 协议来保证分布式事务的最终一致性。**Zab**（ZooKeeper Atomic Broadcast，ZooKeeper 原子广播协议）支持崩溃恢复，基于该协议，ZooKeeper 实现了一种主备模式的系统架构来保持集群中各个副本之间数据一致性。

 Zab协议有两种模式，它们分别是**恢复模式**和**广播模式**。 

**一、广播模式**

广播模式类似一个简单的两阶段提交：Leader发起一个请求，收集选票，并且最终提交。两段提交要求协调者必须等到所有的参与者全部反馈ACK确认消息后，再发送commit消息。而Zab协议中 Leader 只要半数以上的Follower成功反馈ACK确认即可，不需要收到全部Follower反馈ACK确认。

**二、恢复模式**

Leader 服务器出现崩溃或者由于网络原因导致**Leader 服务器失去了与过半 Follower 的联系**，那么就会进入崩溃恢复模式。为了保证进度，恢复过程中必须选举出一个新Leader，并且最终让所有的Server拥有一个正确的状态。恢复模式主要包括两部分：**Leader选举 和 数据恢复**

**三、Zab 与 Paxos 算法的联系与区别**

Paxos 的思想在很多分布式组件中都可以看到，Zab 协议可以认为是基于 Paxos 算法实现的，先来看下两者之间的联系：

* 都存在一个 Leader 进程的角色，负责协调多个 Follower 进程的运行

* 都应用 Quorum 机制，Leader 进程都会等待超过半数的 Follower 做出正确的反馈后，才会将一个提案进行提交

* 在 Zab 协议中，Zxid 中通过 epoch 来代表当前 Leader 周期，在 Paxos 算法中，同样存在这样一个标识，叫做 Ballot Number

两者之间的区别是，Paxos 是理论，Zab 是实践，Paxos 是论文性质的，目的是设计一种通用的分布式一致性算法，而 Zab 协议应用在 ZooKeeper 中，是一个特别设计的崩溃可恢复的原子消息广播算法。

Zab 协议增加了崩溃恢复的功能，当 Leader 服务器不可用，或者已经半数以上节点失去联系时，ZooKeeper 会进入恢复模式选举新的 Leader 服务器，使集群达到一个一致的状态。



### ETCD

etcd注册中心 

* 分布式一致性系统 

* 基于raft一致性协议 

etcd使用场景 

* 服务注册和发现 

* 共享配置 

* 分布式锁 

* eader选举



### 常用的服务发现对比（Consul、zookeeper、etcd、eureka）



| **Feature** | **Consul** | **Zookeeper** | **Etcd** | **Eureka** |
| ---- | ---- | ---- | ---- | ---- |
|**服务健康检查**| 服务状态，内存，硬盘等 | (弱)长连接，keepalive | 连接心跳 | 可配支持 |
|**多数据中心**|  &nbsp;支持   |    &nbsp;—    |    &nbsp;—    |    &nbsp;—    |
|**kv存储服务**|  &nbsp;支持   |  &nbsp;支持   |  &nbsp;支持   |    &nbsp;—    |
|**一致性**|  &nbsp;raft   |  &nbsp;paxos  |  &nbsp;raft   |    &nbsp;—    |
|**CAP定理**|   &nbsp;CA    |   &nbsp;CP    |   &nbsp;CP    |   &nbsp;AP    |
|**使用接口(多语言能力)**|&nbsp;支持http和dns| &nbsp;客户端  |&nbsp;http/grpc|&nbsp;http（sidecar）|
|**watch支持**|&nbsp;全量/支持long polling|  &nbsp;支持   |&nbsp;支持 long polling|支持 long polling/大部分增量|
|**自身监控**| &nbsp;metrics |    &nbsp;—    | &nbsp;metrics | &nbsp;metrics |
|**安全**|&nbsp;acl /https |   &nbsp;acl   |&nbsp;https支持（弱）|    &nbsp;—    |
|**Spring Cloud集成**| &nbsp;已支持  | &nbsp;已支持  | &nbsp;已支持  | &nbsp;已支持  |

* 服务的健康检查
  Euraka 使用时需要显式配置健康检查支持；Zookeeper,Etcd 则在失去了和服务进程的连接情况下任务不健康，而 Consul 相对更为详细点，比如内存是否已使用了90%，文件系统的空间是不是快不足了。

* 多数据中心支持
  Consul 通过 WAN 的 Gossip 协议，完成跨数据中心的同步；而且其他的产品则需要额外的开发工作来实现；

* KV 存储服务
  除了 Eureka ,其他几款都能够对外支持 k-v 的存储服务，所以后面会讲到这几款产品追求高一致性的重要原因。而提供存储服务，也能够较好的转化为动态配置服务哦。

* 产品设计中 CAP 理论的取舍
  Eureka 典型的 AP,作为分布式场景下的服务发现的产品较为合适，服务发现场景的可用性优先级较高，一致性并不是特别致命。其次 CA 类型的场景 Consul,也能提供较高的可用性，并能 k-v store 服务保证一致性。 而Zookeeper,Etcd则是CP类型 牺牲可用性，在服务发现场景并没太大优势；

* 多语言能力与对外提供服务的接入协议
  Zookeeper的跨语言支持较弱，其他几款支持 http11 提供接入的可能。Euraka 一般通过 sidecar的方式提供多语言客户端的接入支持。Etcd 还提供了Grpc的支持。 Consul除了标准的Rest服务api,还提供了DNS的支持。

* Watch的支持（客户端观察到服务提供者变化）
  Zookeeper 支持服务器端推送变化，Eureka 2.0(正在开发中)也计划支持。 Eureka 1,Consul,Etcd则都通过长轮询的方式来实现变化的感知；

* 自身集群的监控
  除了 Zookeeper ,其他几款都默认支持 metrics，运维者可以搜集并报警这些度量信息达到监控目的；

* 安全
  Consul,Zookeeper 支持ACL，另外 Consul,Etcd 支持安全通道https.

* Spring Cloud的集成
  目前都有相对应的 boot starter，提供了集成能力。




参考资料: [常用的服务发现对比](https://blog.csdn.net/weixin_38055381/article/details/84138952 )

## 分布式事务

### 基本概念

数据库事务的特性（基本要素）包括原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）和持久性（Durabilily），简称 ACID。

数据库并发问题：脏读、不可重复读、幻读

数据库隔离级别：读未提交、读已提交、可重复读、序列化



**分布式事务产生的原因：**在实际开发中，分布式事务产生的原因主要来源于存储和服务的拆分。(分库分表)

**分布式事务解决方案：**典型的有**两阶段和三阶段提交协议、 TCC 分段(try-Confirm-Cancel)提交**，和基于消息队列的最终一致性设计。



### 分布式锁应用场景和实现

场景： 客户下单的时候，我们调用库存中心进行减库存 。

**Mysql(DBMS)实现分布式锁**

* 实现方式一：利用select … where … for update 排他锁

   需要注意的是“where name=lock ”，name字段必须要走索引，否则会锁表。有些情况下，比如表不大，mysql优化器会不走这个索引，导致锁表问题。 

* 实现方式二：version 乐观锁

   所谓乐观锁与前边最大区别在于基于CAS思想，是不具有互斥性，不会产生锁等待而消耗资源，操作过程中认为不存在并发冲突，只有update version失败后才能觉察到。 

  ```mysql
  select ...,version 
   update  table set version+1 where version=xx
  ```

**Redis实现分布式锁**

 Redis提供一些命令SETNX，GETSET，可以方便实现分布式锁机制 

加锁：加锁实际上就是在redis中，给Key键设置一个值，为避免死锁，并给定一个过期时间。

解锁：解锁的过程就是将Key键删除





## 分布式服务

 RPC（Remote Procedure Call Protocol）——远程过程调用协议，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议 



 **RPC 和 REST 区别**

*  所属类别不同
	REST 是一种软件架构风格。这种风格的典型应用，就是HTTP；RPC实现客户端像调用本地服务(方法)一样调用服务器的服务(方法)
	
* 使用方式不同

   HTTP 接口只关注服务提供方，对于客户端怎么调用并不关心。接口只要保证有客户端调用时，返回对应的数据就行了。而RPC则要求客户端接口保持和服务端的一致 。

* 面向对象不同

    RPC，所谓的远程过程调用 ，是面向方法的 ，REST：是面向资源的 

* 序列化协议不同

     REST 是 基于 HTTP 协议，而 RPC 可以基于 TCP/UDP，也可以基于 HTTP 协议进行传输的 



### 为什么微服务需要 API 网关

**API网关是什么？**

API网关可以提供一个单独且统一的API入口用于访问内部一个或多个API。它们典型的会提供访问频率限制层和安全层。但诸如Tyk.io这样的API管理层会提供分析，计费和生命周期管理功能。

**微服务API网关的优势**

（1）阻止将内部的敏感信息暴露给外部的客户端

API网关通过提供微服务绑定和解绑的能力来将外部的公开API与内部微服务API分离开。这样就具备重构和裁切微服务而不会影响外部绑定的客户端的能力。它同时对客户端隐藏了服务发现和服务版本这些细节，因为它对所有微服务提供单一的访问点。

（2）为服务增加额外的安全层

API网关通过提供额外的安全层帮助阻止大规模攻击。这些攻击包括SQL注入，XML解析漏洞和DoS攻击。

（3）可以支持混合通讯协议

不同于外部API一般使用HTTP或REST，内部微服务可以从使用不用通讯协议中收获益处。这些协议可以是ProtoBuf或AMQP，甚至是诸如SOAP，JSON-RPC或者XML-RPC这样的系统集成协议。API网关可以对这些协议提供统一的外部REST接口，这就允许开发团队挑选一款最适合于内部架构的协议。

（4）降低微服务的复杂度

微服务中有一些常见的要点，诸如使用API令牌进行授权，访问控制和调用频次限制。这每个点都需要每个服务区增加额外的时间去实现它们。API网关将这些要点从你的代码中提取出来，允许你的服务只关注于它们需要关注的任务。

（5）微服务模拟和虚拟化

随着微服务API从外部API中分离出来，你可以模拟你的服务去做设计验证或者很方便的做集成测试。



**如何实现分布式调用跟踪**

面临的问题或痛点 

* 如果user服务某个请求特别慢,如何去定位? 

* 如果user服务某个请求频繁报错了,如何定位? 

* 1年以后,user服务的调用依赖图,还有人能够快速的给出吗

  解决方法

trace_id概念 

* 为每个请求分配唯一的id, 通常叫做trace_id 

* 日志聚合



## 分布式存储

**读写分离如何在业务中落地**

当我们的数据量很大时，数据库服务器的压力变大，这时候我们需要从架构方面来解决这一问题，在一个网站中读的操作很多，写的操作很少，这时候我们需要配置读写分离，把读操作和写操作分离出来，最大程度的利用好数据库服务器。

读写分离的实现原理就是：在执行SQL语句的时候，判断到底是读操作还是写操作，把读的操作转向到读服务器上（从服务器，一般是多台），写的操作转到写的服务器上（主服务器，一般是一台，视数据量来看）</u>。

当然为了保证多台数据库数据的一致性，需要**主从复制**。

主从复制的实现原理是：<u>mysql中有一种日志，叫做bin日志（二进制日志），会记录下所有修改过数据库的sql语句。</u>

主从复制的原理实际是多台服务器都开启bin日志，然后主服务器会把执行过的sql语句记录到bin日志中，之后从服务器读取这个bin日志，把该日志的内容保存到自己中继日志里面，从服务器再把中继日志中记录的sql语句同样的执行一遍。这样从服务器上的数据就和主服务器相同了。

**存储拆分后，如何解决唯一主键问题?**

（1）利用数据库自身的自增类型（如 MySQL的 auto_increment 字段）等先生成一个唯一 ID 再和数据一起插入切分后的集群 。

（2）通过设置每个集群中自增 ID 起始点（auto_increment_offset），将各个集群的ID进行绝对的分段来实现全局唯一。 

（3） 通过设置每个集群中自增 ID 起始点（auto_increment_offset）以及 ID 自增步长（auto_increment_increment），让目前每个集群的起始点错开 1，步长选择大于将来基本不可能达到的切分集群数，达到将 ID 相对分段的效果来满足全局唯一的效果。 

例如： 4台数据库，第一台mysql主键从1开始每次加4，第二台从2开始每次加4，以此类推。。

```mysql
修改MySQL【默认自动增长的步长】
set global auto_increment_increment=1; — 设置序列的增长值
show global variables; — 显示所有的global变量
show global variables like ‘%test%’ — 查询包含test字符串的global变量
```



（4） 表的主键不是使用自增列，而是【业务设计的唯一字段】 ， 例如交易网站里一定会有订单表，流水表这样的设计，订单表里有订单号，流水表里有流水号 。使用**整数哈希求余的算法**，字符串如果进行哈希运算会得出一个值，这个值是该字符串的唯一标志，如果我们稍微改变下字符串的内容，计算的哈希值肯定是不同，两个不同的哈希值对应两个不同字符串，一个哈希值有且只对应唯一一个字符串，加密算法里的**MD5，SHA**都是使用哈希算法的原理计算出一个唯一标示的哈希值，通过哈希值的匹配可以判断数据是否被篡改过。

参考资料：[分布式数据库中全局唯一主键]( https://blog.csdn.net/weixin_30736301/article/details/94893415 )

**数据库分库分表，动态扩容缩容方案**

参考资料：[动态扩容缩容方案](https://blog.csdn.net/csdn681/article/details/103261139 ) 



**Nosql数据库有哪些，分别适用什么场景**

Redis：键值对数据库。 适合缓存场景。
Mongodb：分布式文件存储数据库。 适合字段变动很多的业务。如商品表的属性：冰箱的属性 与 酒的属性 大部分不一致，用JSON存储在Mongodb中，有查询与运算
HBase：列式存储数据库。 高压缩比，适用于统计类业务场景
Elasticsearch：全文检索数据库。 弥补关系型数据库 多属性like效率很慢的情况。



**MongoDB的使用场景**

 MongoDB目前只支持单文档事务，需要复杂事务支持的场景暂时不适合；只支持行级的事务，或者说支持原子性，单行的操作要么全部成功，要么全部失败。 

 MongoDB的使用场景：
 1.敏捷开发。新应用，需求会变，适合字段变动很多的业务，数据模型无法确定，想快速迭代开发，MongoDB没有固定的Schema，所有花在提交、沟通和实施Schema变更的时间都生下来了。
 2.不需要事务及复杂 join 支持,例如日志等
 3.更高的写入负载
	MongoDB侧重高数据写入的性能，而非事务安全，适合业务系统中有大量“低价值”数据的场景。本身存的就是json格式数据。例如做日志系统。
 4.数据量很大或者将来会变得很大
	Mysql单表数据量达到5-10G时会出现明显的性能降级，需要做数据的水平和垂直拆分、库的拆分完成扩展，MongoDB内建了sharding、很多数据分片的特性，容易水平扩展，比较好的适应大数据量增长的需求。
 5.NoSQL适合存储非结构化数据，如文章、评论
 6.高可用性
	自带高可用，自动主从切换（副本集） 




 如果你还在为是否应该使用 MongoDB，不如来做几个选择题来辅助决策（注：以下内容改编自 MongoDB 公司 TJ 同学的某次公开技术分享）。 

| 应用特征                                           | Yes / No |
| :------------------------------------------------- | :------- |
| 应用不需要事务及复杂 join 支持                     | 必须 Yes |
| 新应用，需求会变，数据模型无法确定，想快速迭代开发 | ？       |
| 应用需要2000-3000以上的读写QPS（更高也可以）       | ？       |
| 应用需要TB甚至 PB 级别数据存储                     | ?        |
| 应用发展迅速，需要能快速水平扩展                   | ?        |
| 应用要求存储的数据不丢失                           | ?        |
| 应用需要99.999%高可用                              | ?        |
| 应用需要大量的地理位置查询、文本查询               | ？       |

参考资料：[ 什么场景应该用 MongoDB]( https://yq.aliyun.com/articles/64352 )



### 分布式缓存

**缓存穿透、缓存击穿、缓存雪崩区别和解决方案**

一、缓存处理流程

前台请求，后台先从缓存中取数据，取到直接返回结果，取不到时从数据库中取，数据库取到更新缓存，并返回结果，数据库也没取到，那直接返回空结果。

二、缓存穿透

描述：

<u>缓存穿透是指缓存和数据库中都没有的数据，而用户不断发起请求</u>，如发起为id为“-1”的数据或id为特别大不存在的数据。这时的用户很可能是攻击者，攻击会导致数据库压力过大。

解决方案：

接口层增加校验，如用户鉴权校验，id做基础校验，id<=0的直接拦截；
 从缓存取不到的数据，在数据库中也没有取到，这时也可以将key-value对写为key-null，缓存有效时间可以设置短点，如30秒（设置太长会导致正常情况也没法使用）。这样可以防止攻击用户反复用同一个id暴力攻击

三、缓存击穿

描述：

缓存击穿是指缓存中没有但数据库中有的数据（一般是缓存时间到期），这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力

解决方案：

设置热点数据永远不过期。
 加互斥锁，互斥锁参考代码如下：

说明：

1）缓存中有数据，直接走上述代码13行后就返回结果了

2）缓存中没有数据，第1个进入的线程，获取锁并从数据库去取数据，没释放锁之前，其他并行进入的线程会等待100ms，再重新去缓存取数据。这样就防止都去数据库重复取数据，重复往缓存中更新数据情况出现。

3）当然这是简化处理，理论上如果能根据key值加锁就更好了，就是线程A从数据库取key1的数据并不妨碍线程B取key2的数据，上面代码明显做不到这点。

四、缓存雪崩

描述：

缓存雪崩是指缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至down机。和缓存击穿不同的是,<u>缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库</u>。

解决方案：

缓存数据的过期时间设置随机，防止同一时间大量数据过期现象发生。
 如果缓存数据库是分布式部署，将热点数据均匀分布在不同搞得缓存数据库中。
 设置热点数据永远不过期。

参考资料： [缓存穿透、缓存击穿、缓存雪崩区别和解决方案](https://www.jianshu.com/p/c4282f612152)



**先更新数据库，还是先更新缓存**

延时双删策略

具体的步骤就是：

1）先删除缓存；

2）再写数据库；

3）休眠500毫秒；

4）再次删除缓存。

**失效策略：缓存过期都有哪些策略**

FIFO ，first in first out ，<u>最先进入缓存的数据</u>在缓存空间不够情况下(超出最大元素限制时)会被首先清理出去

LFU ， Less Frequently Used ，<u>一直以来最少被使用的元素</u>会被被清理掉。这就要求缓存的元素有一个hit 属性，在缓存空间不够得情况下,hit 值最小的将会被清出缓存。

LRU ，Least Recently Used ，<u>最近最少使用的</u>，缓存的元素有一个时间戳，当缓存容量满了，而又需要腾出地方来缓存新的元素的时候，那么现有缓存元素中时间戳离当前时间最远的元素将被清出缓存。

参考资料：[redis缓存失效策略]( https://www.cnblogs.com/dudu2mama/p/11366292.html )



**负载均衡：一致性哈希解决了哪些问题**

问题描述： 例如手机朋友网有n个服务器，为了方便用户的访问会在服务器上缓存数据，因此用户每次访问的时候最好能保持同一台服务器。已有的做法是根据ServerIPIndex[QQNUM%n]得到请求的服务器，这种方法很方便将用户分到不同的服务器上去。但是如果一台服务器死掉了，那么n就变为了n-1，那么ServerIPIndex[QQNUM%n]与ServerIPIndex[QQNUM%（n-1）]基本上都不一样了，所以大多数用户的请求都会转到其他服务器，这样会发生大量访问错误。

（n个服务器缓存，请求获取数据的话根据id%n获取对应缓存数据位置，宕机了就会造成缓存雪崩）

 问： 如何改进或者换一种方法，使得：

（1）一台服务器死掉后，不会造成大面积的访问错误，

（2）原有的访问基本还是停留在同一台服务器上；

（3）尽量考虑负载均衡。

 采用一致性哈希方法可以解决此问题 

参考资料：[一致性hash算法解决服务器负载均衡问题]( https://blog.csdn.net/liuxiangcpp6_0/article/details/52749584 )

### 分布式高可用

**缓存、降级和限流**

在开发高并发系统时有三把利器用来保护系统：缓存、降级和限流

缓存 缓存的目的是提升系统访问速度和增大系统处理容量
降级 降级是当服务出现问题或者影响到核心流程时，需要暂时屏蔽掉，待高峰或者问题解决后再打开
限流 限流的目的是通过对并发访问/请求进行限速，或者对一个时间窗口内的请求进行限速来保护系统，一旦达到限制速率则可以拒绝服务、排队或等待、降级等处理



## 微服务框架整体架构

**一、客户端调用（rpc）**

* 网络通信 
  * 连接管理 
      * 建立连接 
      * 发送数据包 
      * 接收数据包 
      * 超时控制 
      * TCP粘包问题解决 
  * 连接池 
* 数据传输问题 
  * 序列化：本地数据结构转成网络数据[字节流] 
  * 反序列化：网络数据[字节流]转成本地数据结构
  
* 负载均衡 
  * 随机算法 
  * 轮询算法 
  * 加权随机算法 
  * 加权轮询算法 
  * 一致性哈希算法 
* 服务发现 
  * 通过服务名发现服务的位置（ip列表） 

**二、服务框架** 

* 网络通信 
  * 连接管理 
    * 超时控制 
  * 数据传输 
    * 序列化 
    * 反序列化 

* 请求路由 
  * 通过客户端调用的方法，路由到业务对应的处理函数 

* 日志组件 
  * 服务访问记录 

**三、异常处理** 

* 限流和熔断 
  * 限流策略 
    * 令牌桶算法 
  * 熔断策略 
  * 电路熔断策略 
  * 自动摘除 
    * 服务注册、发现=》自动摘除

**四、服务治理** 

* 分布式追踪系统 
  * Dapper论文 
    * Zipkin：https://zipkin.apache.org/ 
    * Jaeger： https://www.jaegertracing.io/ 
    * Opentrace：https://opentracing.io/ 

* 服务监控 
  * Metrics采样打点 
  * Prometheus 
  * Grafana 展示