(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{416:function(s,e,i){"use strict";i.r(e);var v=i(24),_=Object(v.a)({},(function(){var s=this,e=s.$createElement,i=s._self._c||e;return i("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[i("h3",{attrs:{id:"应用场景"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[s._v("#")]),s._v(" 应用场景")]),s._v(" "),i("ol",[i("li",[s._v("缓存")]),s._v(" "),i("li",[s._v("共享Session")]),s._v(" "),i("li",[s._v("消息队列系统")]),s._v(" "),i("li",[s._v("分布式锁")])]),s._v(" "),i("h3",{attrs:{id:"单线程的redis为什么快"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#单线程的redis为什么快"}},[s._v("#")]),s._v(" 单线程的Redis为什么快")]),s._v(" "),i("ol",[i("li",[s._v("纯内存操作")]),s._v(" "),i("li",[s._v("单线程操作，避免了频繁的上下文切换")]),s._v(" "),i("li",[s._v("合理高效的数据结构")]),s._v(" "),i("li",[s._v("采用了非阻塞I/O多路复用机制")])]),s._v(" "),i("h3",{attrs:{id:"redis-的数据结构"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis-的数据结构"}},[s._v("#")]),s._v(" Redis 的数据结构")]),s._v(" "),i("p",[s._v("字符串String、字典Hash、列表List、集合Set、有序集合SortedSet。")]),s._v(" "),i("p",[s._v("Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。")]),s._v(" "),i("p",[s._v("Pub/Sub。")]),s._v(" "),i("h3",{attrs:{id:"redis-的数据过期策略"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis-的数据过期策略"}},[s._v("#")]),s._v(" Redis 的数据过期策略")]),s._v(" "),i("p",[s._v("Redis 中数据过期策略采用定期删除+惰性删除策略")]),s._v(" "),i("p",[s._v("时删除策略就发生了一些改变，不在是每次扫描全部的 key 了，而是随机抽取一部分 key 进行检查，这样就降低了对 CPU 资源的损耗，惰性删除策略互补了为检查到的key，基本上满足了所有要求。")]),s._v(" "),i("h3",{attrs:{id:"如何解决-redis-缓存雪崩问题"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#如何解决-redis-缓存雪崩问题"}},[s._v("#")]),s._v(" 如何解决 Redis 缓存雪崩问题")]),s._v(" "),i("ol",[i("li",[s._v("使用 Redis 高可用架构：使用 Redis 集群来保证 Redis 服务不会挂掉")]),s._v(" "),i("li",[s._v("缓存时间不一致，给缓存的失效时间，加上一个随机值，避免集体失效")]),s._v(" "),i("li",[s._v("限流降级策略：有一定的备案，比如个性推荐服务不可用了，换成热点数据推荐服务")])]),s._v(" "),i("h2",{attrs:{id:"redis事物的了解cas-check-and-set-操作实现乐观锁"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis事物的了解cas-check-and-set-操作实现乐观锁"}},[s._v("#")]),s._v(" redis事物的了解CAS(check-and-set 操作实现乐观锁 )?")]),s._v(" "),i("p",[s._v("和众多其它数据库一样，Redis作为NoSQL数据库也同样提供了事务机制。在Redis中，MULTI/EXEC/DISCARD/WATCH这四个命令是我们实现事务的基石。")]),s._v(" "),i("h2",{attrs:{id:"redis如何做持久化的？"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis如何做持久化的？"}},[s._v("#")]),s._v(" Redis如何做持久化的？")]),s._v(" "),i("ol",[i("li",[i("p",[s._v("RDB做镜像全量持久化，AOF做增量持久化。\nRDB持久化也分两种：SAVE和BGSAVE。")]),s._v(" "),i("p",[s._v("SAVE是阻塞式的RDB持久化，当执行这个命令时redis的主进程把内存里的数据库状态写入到RDB文件中，直到该文件创建完毕的这段时间内redis将不能处理任何命令请求；\nBGSAVE属于非阻塞式的持久化，它会创建一个子进程专门去把内存中的数据库状态写入RDB文件里，同时主进程还可以处理来自客户端的命令请求。但子进程基本是复制的父进程，这等于两个相同大小的redis进程在系统上运行，会造成内存使用率的大幅增加。")]),s._v(" "),i("p",[s._v("fork是指redis通过创建子进程来进行bgsave操作，cow指的是copy on write，子进程创建后，父子进程共享数据段，父进程继续提供读写服务，写脏的页面数据会逐渐和子进程分离开来。")])]),s._v(" "),i("li",[i("p",[s._v("AOF的持久化 把所有的对Redis的服务器进行修改的命令都存到一个文件里，命令的集合。")])])]),s._v(" "),i("h3",{attrs:{id:"redis与mysql双写一致性方案"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis与mysql双写一致性方案"}},[s._v("#")]),s._v(" Redis与Mysql双写一致性方案")]),s._v(" "),i("p",[s._v("(先更新数据库，再删缓存。数据库的读操作的速度远快于写操作的，所以脏数据很难出现。可以对异步延时删除策略，保证读请求完成以后，再进行删除操作。)")]),s._v(" "),i("p",[s._v("https://zhuanlan.zhihu.com/p/59167071")]),s._v(" "),i("p",[s._v("不管是先写MySQL数据库，再删除Redis缓存；还是先删除缓存，再写库，都有可能出现数据不一致的情况。举一个例子：")]),s._v(" "),i("p",[s._v("1.如果删除了缓存Redis，还没有来得及写库MySQL，另一个线程就来读取，发现缓存为空，则去数据库中读取数据写入缓存，此时缓存中为脏数据。")]),s._v(" "),i("p",[s._v("2.如果先写了库，在删除缓存前，写库的线程宕机了，没有删除掉缓存，则也会出现数据不一致情况。")]),s._v(" "),i("p",[i("strong",[s._v("延时双删策略")])]),s._v(" "),i("p",[i("strong",[s._v("具体的步骤就是：")])]),s._v(" "),i("p",[s._v("1）先删除缓存；")]),s._v(" "),i("p",[s._v("2）再写数据库；")]),s._v(" "),i("p",[s._v("3）休眠500毫秒；")]),s._v(" "),i("p",[s._v("4）再次删除缓存。")]),s._v(" "),i("p",[i("strong",[s._v("从Redis缓存读数据流程")])]),s._v(" "),i("p",[i("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/15069341-2e0dda38b2c3b1a6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/553/format/webp",alt:""}})]),s._v(" "),i("h3",{attrs:{id:"redis并发竞争key的解决方案"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis并发竞争key的解决方案"}},[s._v("#")]),s._v(" Redis并发竞争key的解决方案")]),s._v(" "),i("ol",[i("li",[i("p",[s._v("分布式锁+时间戳")])]),s._v(" "),i("li",[i("p",[s._v("利用消息队列")]),s._v(" "),i("p",[s._v("分布式锁: 先拿setnx来争抢锁，抢到之后，再用expire给锁加一个过期时间防止锁忘记了释放。")])])]),s._v(" "),i("h3",{attrs:{id:"redis的管道pipeline"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis的管道pipeline"}},[s._v("#")]),s._v(" Redis的管道pipeline")]),s._v(" "),i("p",[s._v("对于单线程阻塞式的Redis，Pipeline可以满足批量的操作，把多个命令连续的发送给Redis Server，然后一一解析响应结果。Pipelining可以提高批量处理性能，提升的原因主要是TCP连接中减少了“交互往返”的时间。pipeline 底层是通过把所有的操作封装成流，redis有定义自己的出入输出流。在 sync() 方法执行操作，每次请求放在队列里面，解析响应包。")]),s._v(" "),i("h3",{attrs:{id:"redis和memcached的区别"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#redis和memcached的区别"}},[s._v("#")]),s._v(" Redis和memcached的区别")]),s._v(" "),i("ol",[i("li",[s._v("存储方式上：memcache会把数据全部存在内存之中，断电后会挂掉，数据不能超过内存大小。redis有部分数据存在硬盘上，这样能保证数据的持久性。")]),s._v(" "),i("li",[s._v("数据支持类型上：memcache对数据类型的支持简单，只支持简单的key-value，，而redis支持五种数据类型。")]),s._v(" "),i("li",[s._v("用底层模型不同：它们之间底层实现方式以及与客户端之间通信的应用协议不一样。redis直接自己构建了VM机制，因为一般的系统调用系统函数的话，会浪费一定的时间去移动和请求。")]),s._v(" "),i("li",[s._v("value的大小：redis可以达到1GB，而memcache只有1MB。")])]),s._v(" "),i("h3",{attrs:{id:"skiplist与平衡树、哈希表的比较"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#skiplist与平衡树、哈希表的比较"}},[s._v("#")]),s._v(" skiplist与平衡树、哈希表的比较")]),s._v(" "),i("ul",[i("li",[s._v("skiplist和各种平衡树（如AVL、红黑树等）的元素是有序排列的，而哈希表不是有序的。因此，在哈希表上只能做单个key的查找，不适宜做范围查找。所谓范围查找，指的是查找那些大小在指定的两个值之间的所有节点。")]),s._v(" "),i("li",[s._v("在做范围查找的时候，平衡树比skiplist操作要复杂。在平衡树上，我们找到指定范围的小值之后，还需要以中序遍历的顺序继续寻找其它不超过大值的节点。如果不对平衡树进行一定的改造，这里的中序遍历并不容易实现。而在skiplist上进行范围查找就非常简单，只需要在找到小值之后，对第1层链表进行若干步的遍历就可以实现。")]),s._v(" "),i("li",[s._v("平衡树的插入和删除操作可能引发子树的调整，逻辑复杂，而skiplist的插入和删除只需要修改相邻节点的指针，操作简单又快速。")]),s._v(" "),i("li",[s._v("从内存占用上来说，skiplist比平衡树更灵活一些。一般来说，平衡树每个节点包含2个指针（分别指向左右子树），而skiplist每个节点包含的指针数目平均为1/(1-p)，具体取决于参数p的大小。如果像Redis里的实现一样，取p=1/4，那么平均每个节点包含1.33个指针，比平衡树更有优势。")]),s._v(" "),i("li",[s._v("查找单个key，skiplist和平衡树的时间复杂度都为O(log n)，大体相当；而哈希表在保持较低的哈希值冲突概率的前提下，查找时间复杂度接近O(1)，性能更高一些。所以我们平常使用的各种Map或dictionary结构，大都是基于哈希表实现的。")]),s._v(" "),i("li",[s._v("从算法实现难度上来比较，skiplist比平衡树要简单得多。")])])])}),[],!1,null,null,null);e.default=_.exports}}]);