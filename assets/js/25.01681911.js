(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{414:function(v,_,t){"use strict";t.r(_);var s=t(24),r=Object(s.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h3",{attrs:{id:"事务的基本要素"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事务的基本要素"}},[v._v("#")]),v._v(" 事务的基本要素")]),v._v(" "),t("ol",[t("li",[v._v("原子性：事务是一个原子操作单元，其对数据的修改，要么全都执行，要么全都不执行")]),v._v(" "),t("li",[v._v("一致性：事务开始前和结束后，数据库的完整性约束没有被破坏。")]),v._v(" "),t("li",[v._v("隔离性：同一时间，只允许一个事务请求同一数据，不同的事务之间彼此没有任何干扰。")]),v._v(" "),t("li",[v._v("持久性：事务完成后，事务对数据库的所有更新将被保存到数据库，不能回滚。")])]),v._v(" "),t("h3",{attrs:{id:"事务的并发问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事务的并发问题"}},[v._v("#")]),v._v(" 事务的并发问题")]),v._v(" "),t("ol",[t("li",[t("strong",[v._v("脏读")]),v._v("：事务A读取了事务B更新的数据，然后B回滚操作，那么A读取到的数据是脏数据")]),v._v(" "),t("li",[t("strong",[v._v("不可重复读")]),v._v("：事务A多次读取同一数据，事务B在事务A多次读取的过程中，对数据作了更新并提交，导致事务A多次读取同一数据时，结果不一致。")]),v._v(" "),t("li",[t("strong",[v._v("幻读")]),v._v("：A事务读取了B事务已经提交的新增数据。注意和不可重复读的区别，这里是新增，不可重复读是更改（或删除）。select某记录是否存在，不存在，准备插入此记录，但执行 insert 时发现此记录已存在，无法插入，此时就发生了幻读。")])]),v._v(" "),t("h3",{attrs:{id:"mysql事务隔离级别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql事务隔离级别"}},[v._v("#")]),v._v(" MySQL事务隔离级别")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("事务隔离级别")]),v._v(" "),t("th",[v._v("脏读")]),v._v(" "),t("th",[v._v("不可重复读")]),v._v(" "),t("th",[v._v("幻读")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("读未提交")]),v._v(" "),t("td",[v._v("是")]),v._v(" "),t("td",[v._v("是")]),v._v(" "),t("td",[v._v("是")])]),v._v(" "),t("tr",[t("td",[v._v("不可重复读")]),v._v(" "),t("td",[v._v("否")]),v._v(" "),t("td",[v._v("是")]),v._v(" "),t("td",[v._v("是")])]),v._v(" "),t("tr",[t("td",[v._v("可重复读")]),v._v(" "),t("td",[v._v("否")]),v._v(" "),t("td",[v._v("否")]),v._v(" "),t("td",[v._v("是")])]),v._v(" "),t("tr",[t("td",[v._v("串行化")]),v._v(" "),t("td",[v._v("否")]),v._v(" "),t("td",[v._v("否")]),v._v(" "),t("td",[v._v("否")])])])]),v._v(" "),t("p",[v._v("在MySQL可重复读的隔离级别中并不是完全解决了幻读的问题，而是解决了读数据情况下的幻读问题。而对于修改的操作依旧存在幻读问题，就是说MVCC对于幻读的解决时不彻底的。 通过索引加锁，间隙锁，next key lock可以解决幻读的问题。（即加共享锁lock in share mode或排他锁 for update）")]),v._v(" "),t("p",[v._v("MySQL默认的**RR级别 **, "),t("strong",[v._v("REPEATABLE READ")])]),v._v(" "),t("h3",{attrs:{id:"mysql的逻辑结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql的逻辑结构"}},[v._v("#")]),v._v(" Mysql的逻辑结构")]),v._v(" "),t("ul",[t("li",[v._v("最上层的服务类似其他"),t("strong",[v._v("CS结构")]),v._v("，比如连接处理，授权处理。")]),v._v(" "),t("li",[v._v("第二层是"),t("strong",[v._v("Mysql的服务层")]),v._v("，包括SQL的解析分析优化，存储过程触发器视图等也在这一层实现。")]),v._v(" "),t("li",[v._v("最后一层是"),t("strong",[v._v("存储引擎的实现")]),v._v("，类似于Java接口的实现，Mysql的执行器在执行SQL的时候只会关注API的调用，完全屏蔽了不同引擎实现间的差异。比如Select语句，先会判断当前用户是否拥有权限，其次到缓存（内存）查询是否有相应的结果集，如果没有再执行解析sql，优化生成执行计划，调用API执行。")])]),v._v(" "),t("h3",{attrs:{id:"sql执行顺序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sql执行顺序"}},[v._v("#")]),v._v(" SQL执行顺序")]),v._v(" "),t("p",[v._v("SQL的执行顺序：from---where--group by---having---select---order by")]),v._v(" "),t("h3",{attrs:{id:"mvcc简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mvcc简介"}},[v._v("#")]),v._v(" MVCC简介")]),v._v(" "),t("ol",[t("li",[t("p",[v._v("什么是MVCC\nMVCC是一种"),t("strong",[v._v("多版本并发控制机制")]),v._v("。")])]),v._v(" "),t("li",[t("p",[v._v("MVCC是为了解决什么问题?\n大多数的MYSQL事务型存储引擎,如,InnoDB，Falcon以及PBXT都不使用一种简单的行锁机制.事实上,他们都和MVCC–多版本并发控制来一起使用.\n大家都应该知道,"),t("strong",[v._v("锁机制可以控制并发操作,但是其系统开销较大,而MVCC可以在大多数情况下代替行级锁,使用MVCC,能降低其系统开销.")])])]),v._v(" "),t("li",[t("p",[v._v("MVCC实现\n"),t("strong",[v._v("MVCC是通过保存数据在某个时间点的快照来实现的")]),v._v(". 不同存储引擎的MVCC. 不同存储引擎的MVCC实现是不同的,典型的有乐观并发控制和悲观并发控制.")])]),v._v(" "),t("li",[t("p",[v._v("MVCC 具体实现分析\n下面,我们通过InnoDB的MVCC实现来分析MVCC使怎样进行并发控制的.\nInnoDB的MVCC，是通过在每行记录后面保存"),t("strong",[v._v("两个隐藏的列")]),v._v("来实现的.")]),v._v(" "),t("p",[v._v("1.DATA_TRX_ID表示最近修改该行数据的**事务ID **")]),v._v(" "),t("p",[v._v("2.DATA_ROLL_PTR则表示指向"),t("strong",[v._v("该行回滚段的指针")]),v._v("，该行上所有旧的版本，在undo中都通过链表的形式组织，而该值，正式指向undo中该行的历史记录链表")]),v._v(" "),t("p",[v._v("(这两个列，分别保存了这个行的"),t("strong",[v._v("创建时间")]),v._v("，一个保存的是行的"),t("strong",[v._v("删除时间")]),v._v("。这里存储的并不是实际的时间值,而是系统版本号(可以理解为事务的ID)，每开始一个新的事务，系统版本号就会自动递增，事务开始时刻的系统版本号会作为事务的ID.下面看一下在REPEATABLE READ隔离级别下,MVCC具体是如何操作的.)")]),v._v(" "),t("p",[v._v("原文链接：https://blog.csdn.net/whoamiyang/article/details/51901888")])])]),v._v(" "),t("p",[v._v("undoLog 也就是我们常说的回滚日志文件 主要用于事务中执行失败，进行回滚")]),v._v(" "),t("p",[v._v("redoLog 是重做日志文件是记录数据修改之后的值，用于持久化到磁盘中")]),v._v(" "),t("p",[v._v("binlog由Mysql的Server层实现,是逻辑日志,记录的是sql语句的原始逻辑")]),v._v(" "),t("h3",{attrs:{id:"innodb的行锁模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#innodb的行锁模式"}},[v._v("#")]),v._v(" InnoDB的行锁模式")]),v._v(" "),t("p",[v._v("​\t共享锁为读锁，只用于表级 ，本次事务可以读不能写，其他事务只能读。 lock in share mode.")]),v._v(" "),t("p",[v._v("​\t排他锁为写锁， 用于行级 ，本次事务可以读可以写，其他事务增删改查都不行。 for update .")]),v._v(" "),t("h3",{attrs:{id:"mysql如何保证一致性和持久性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql如何保证一致性和持久性"}},[v._v("#")]),v._v(" Mysql如何保证一致性和持久性")]),v._v(" "),t("p",[v._v("MySQL为了保证ACID中的一致性和持久性，使用了WAL(Write-Ahead Logging,"),t("strong",[v._v("先写日志再写磁盘")]),v._v(")。Redo log就是一种WAL的应用。当数据库忽然掉电，再重新启动时，MySQL可以通过Redo log还原数据。也就是说，每次事务提交时，不用同步刷新磁盘数据文件，只需要同步刷新Redo log就足够了。")]),v._v(" "),t("h3",{attrs:{id:"为什么选择b-树作为索引结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么选择b-树作为索引结构"}},[v._v("#")]),v._v(" 为什么选择B+树作为索引结构")]),v._v(" "),t("ul",[t("li",[v._v("Hash索引：Hash索引底层是哈希表，哈希表是一种以key-value存储数据的结构，所以多个数据在存储关系上是完全没有任何顺序关系的，所以，对于"),t("strong",[v._v("区间查询是无法直接通过索引查询的")]),v._v("，就需要全表扫描。所以，哈希索引只适用于等值查询的场景。而B+ 树是一种"),t("strong",[v._v("多路平衡查询树，所以他的节点是天然有序的")]),v._v("（左子节点小于父节点、父节点小于右子节点），所以对于范围查询的时候不需要做全表扫描")]),v._v(" "),t("li",[v._v("二叉查找树："),t("strong",[v._v("解决了排序的基本问题")]),v._v("，但是由于"),t("strong",[v._v("无法保证平衡")]),v._v("，可能退化为链表。")]),v._v(" "),t("li",[v._v("平衡二叉树："),t("strong",[v._v("通过旋转解决了平衡的问题")]),v._v("，但是"),t("strong",[v._v("旋转操作效率太低")]),v._v("。")]),v._v(" "),t("li",[v._v("红黑树：通过舍弃严格的平衡和引入红黑节点，解决了\t"),t("strong",[v._v("AVL旋转效率过低")]),v._v("的问题，但是在磁盘等场景下，"),t("strong",[v._v("树仍然太高，IO次数太多")]),v._v("。")]),v._v(" "),t("li",[v._v("B+树：在B树的基础上，将"),t("strong",[v._v("非叶节点改造为不存储数据纯索引节点")]),v._v("，进一步"),t("strong",[v._v("降低了树的高度")]),v._v("；此外将"),t("strong",[v._v("叶节点使用指针连接成链表")]),v._v("，范围查询更加高效。")])]),v._v(" "),t("h3",{attrs:{id:"b-树的叶子节点都可以存哪些东西"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#b-树的叶子节点都可以存哪些东西"}},[v._v("#")]),v._v(" B+树的叶子节点都可以存哪些东西")]),v._v(" "),t("p",[v._v("(可能存储的是整行数据，也有可能是主键的值。B+树的叶子节点存储了整行数据的是主键索引，也被称之为聚簇索引。而索引B+ Tree的叶子节点存储了主键的值的是非主键索引，也被称之为非聚簇索引)")]),v._v(" "),t("h3",{attrs:{id:"覆盖索引"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#覆盖索引"}},[v._v("#")]),v._v(" 覆盖索引")]),v._v(" "),t("p",[v._v("指一个查询语句的执行只用从索引中就能够取得，不必从数据表中读取。也可以称之为实现了索引覆盖。")]),v._v(" "),t("p",[v._v("**索引包含所有满足查询需要的数据的索引 **")]),v._v(" "),t("h3",{attrs:{id:"查询在什么时候不走（预期中的）索引"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查询在什么时候不走（预期中的）索引"}},[v._v("#")]),v._v(" 查询在什么时候不走（预期中的）索引")]),v._v(" "),t("p",[v._v("​\tlike、不等于、参与计算、对null判断、or没有索引、查询集过大、非最左前缀")]),v._v(" "),t("ol",[t("li",[v._v("模糊查询 %like")]),v._v(" "),t("li",[v._v("索引列参与计算,使用了函数")]),v._v(" "),t("li",[v._v("非最左前缀顺序")]),v._v(" "),t("li",[v._v("where对null判断")]),v._v(" "),t("li",[v._v("where不等于")]),v._v(" "),t("li",[v._v("or操作有至少一个字段没有索引")]),v._v(" "),t("li",[v._v("需要回表的查询结果集过大（超过配置的范围）")])]),v._v(" "),t("h3",{attrs:{id:"数据库优化指南"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库优化指南"}},[v._v("#")]),v._v(" 数据库优化指南")]),v._v(" "),t("ol",[t("li",[v._v("创建并使用正确的索引")]),v._v(" "),t("li",[v._v("只返回需要的字段")]),v._v(" "),t("li",[v._v("减少交互次数（批量提交）")]),v._v(" "),t("li",[v._v("设置合理的Fetch Size（数据每次返回给客户端的条数）")])]),v._v(" "),t("h3",{attrs:{id:"索引类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#索引类型"}},[v._v("#")]),v._v(" 索引类型")]),v._v(" "),t("p",[t("strong",[v._v("从逻辑角度")])]),v._v(" "),t("p",[v._v("1、"),t("strong",[v._v("主键索引")]),v._v("：主键索引是一种特殊的唯一索引，不允许有空值 ADD PRIMARY KEY")]),v._v(" "),t("p",[v._v("2、普通索引或者"),t("strong",[v._v("单列索引")])]),v._v(" "),t("p",[v._v("​\t ADD INDEX index_name ( "),t("code",[v._v("column")]),v._v(" )")]),v._v(" "),t("p",[v._v("​\t "),t("code",[v._v("唯一任务是")]),v._v(" "),t("strong",[v._v("加快对数据的访问速度")])]),v._v(" "),t("p",[v._v("3、联合索引 ADD INDEX index_name ( )")]),v._v(" "),t("p",[v._v("​\t联合索引，对多个字段同时建立索引，最左前缀原则")]),v._v(" "),t("p",[v._v("4、"),t("strong",[v._v("唯一索引")])]),v._v(" "),t("p",[v._v("​\t ADD UNIQUE")]),v._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[v._v("不允许两行具有相同的索引值 \n")])])]),t("p",[t("strong",[v._v("主键索引和唯一索引的区别：")]),v._v("\n(1) "),t("code",[v._v("对于主键")]),v._v("/unique constraint ， oracle/sql server/mysql等都"),t("code",[v._v("会自动建立唯一索引")]),v._v("；\n(2) "),t("code",[v._v("主键不一定只包含一个字段")]),v._v("，所以"),t("code",[v._v("在主键的其中一个字段")]),v._v("建"),t("code",[v._v("唯一索引")]),v._v("还是有必要的；\n(3) 主键"),t("code",[v._v("可作外键")]),v._v("，唯一索引不可；\n(4) 主键"),t("code",[v._v("不可为空")]),v._v("，唯一索引可；\n(5) 主键"),t("code",[v._v("可是多个字段的组合")]),v._v("；\n(6) 主键与唯一索引不同的是：\na.有"),t("code",[v._v("not null")]),v._v("属性；\nb.每个表"),t("code",[v._v("只能有一个")]),v._v("。\n(7) 主键索引一定是唯一索引， "),t("code",[v._v("唯一索引不是主键索引")]),v._v("\n(8) 主键"),t("code",[v._v("可以与外键 构成 参照完整性约束")]),v._v("， "),t("code",[v._v("防止数据不一致")])])])}),[],!1,null,null,null);_.default=r.exports}}]);