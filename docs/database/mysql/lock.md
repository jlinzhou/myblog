---
title: 锁
---

链接: https://juejin.im/post/5b82e0196fb9a019f47d1823 

### 乐观锁

​	不是数据库自带的，需要自己实现。

​	更新数据时很乐观，认为不会冲突，冲突了会放弃这次更新。

### 悲观锁

​	在操作数据时会出现数据冲突。

​	分为**共享锁**和**排他锁**。

​	共享锁为读锁，只用于表级 ，本次事务可以读不能写，其他事务只能读。 lock in share mode.

​	排他锁为写锁， 用于行级 ，本次事务可以读可以写，其他事务增删改查都不行。 for update .

### 行锁

 多个事务操作同一行数据时，后来的事务处于阻塞等待状态 

### 表锁

 如何加表锁？ innodb 的行锁是在有索引的情况下，没有索引的表是锁定全表的。 





​	

