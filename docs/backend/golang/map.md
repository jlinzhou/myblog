---
title: 哈希表
---

### 概念

哈希表 能够根据 键（Key）直接访问内存中的存储位置 ，它是key值通过**哈希函数**映射成索引 

### 哈希冲突( 哈希碰撞 )

 同一个散列值很有可能对应多个不同的原始输入 

###  开放寻址法和链表法 

#### **1.开放寻址法**
 	开放寻址法的核心思想是，**如果出现了散列冲突，我们就重新探测一一个空闲位置**，将其插入。比如，我们可以使用线性探测法。当我们往散列表中插入数据时，如果某个数据经过散列函数散列之后，存储位置已经被占用了，我们就从当前位置开始，依次往后查找，看是否有空闲位置，如果遍历到尾部都没有找到空闲的位置，那么我们就再从表头开始找，直到找到为止。 
#### **2.链表法**

 **简单来讲就是在冲突的位置拉一条链表来存储数据。**

  链表法是一种比较常用的散列冲突解决办法,Redis使用的就是链表法来解决散列冲突。链表法的原理是:如果遇到冲突，他就会在原地址新建一个空间，然后以链表结点的形式插入到该空间。当插入的时候，我们只需要通过散列函数计算出对应的散列槽位，将其插入到对应链表中即可。







参考链接: 

   1.https://www.cnblogs.com/hunternet/p/11324945.html 

2. https://draveness.me/golang/docs/part2-foundation/ch03-datastructure/golang-hashmap/ 

