---
title: 排序
---





# 九大排序算法

### 综合比较

**1、稳定性**

归并排序、冒泡排序、插入排序。基数排序是稳定的

选择排序、快速排序、希尔排序、堆排序是不稳定的

**2、时间复杂度**

 最基础的四个算法：冒泡、选择、插入、快排中，快排的时间复杂度最小O(n*log2n)，其他都是O（n2）

| 排序法 | 平均时间 | 最差情形    | 稳定度 | 额外空间 | 备注                          |
| ------ | -------- | ----------- | ------ | -------- | ----------------------------- |
| 冒泡   | O(n2)    | O(n2)       | 稳定   | O(1)     | n小时较好                     |
| 选择   | O(n2)    | O(n2)       | 不稳定 | O(1)     | n小时较好                     |
| 插入   | O(n2)    | O(n2)       | 稳定   | O(1)     | 大部分已排序时较好            |
| 基数   | O(logRB) | O(logRB)    | 稳定   | O(n)     | B是真数(0-9)，R是基数(个十百) |
| Shell  | O(nlogn) | O(ns) 1<s<2 | 不稳定 | O(1)     | s是所选分组                   |
| 快速   | O(nlogn) | O(n2)       | 不稳定 | O(nlogn) | n大时较好                     |
| 归并   | O(nlogn) | O(nlogn)    | 稳定   | O(1)     | n大时较好                     |
| 堆     | O(nlogn) | O(nlogn)    | 不稳定 | O(1)     | n大时较好                     |



### 选择排序

算法思想：选择排序，从头至尾扫描序列，找出最小的一个元素，和第一个元素交换，接着从剩下的元素中继续这种选择和交换方式，最终得到一个有序序列。 

```golang
func selectSort(a []int) []int {
	if len(a) <= 1 {
		return a
	}
	for i := 0; i < len(a); i++ {
		min := i
		for j := i + 1; j < len(a); j++ {
			if a[min] > a[j] {
				min = j
			}
		}
		if min != i {
			a[i], a[min] = a[min], a[i]
		}

	}
	return a
}
```



### 插入排序

 将一个记录插入到已排序好的有序表中，从而得到一个新，记录数增1的有序表。即：先将序列的第1个记录看成是一个有序的子序列，然后从第2个记录逐个进行插入，直至整个序列有序为止。 

```golang
func insertSort(a []int) []int {
	length := len(a)
	if length <= 1 {
		return a
	}
	for i := 0; i < length; i++ {
		back := a[i]
		j := i - 1
		for j > 0 && back < a[j] {
			a[j+1] = a[j]
			j--
		}
		a[j+1] = back
	}

	return a
}
```



### 冒泡排序

 在要排序的一组数中，对当前还未排好序的范围内的全部数，自上而下对相邻的两个数依次进行比较和调整，让较大的数往下沉，较小的往上冒。即：每当两相邻的数比较后发现它们的排序与排序要求相反时，就将它们互换。 

```golang
func bubbleSort(a []int) []int {
	for i := 0; i < len(a); i++ {
		for j := i + 1; j < len(a); j++ {
			if a[j] < a[j-1] {
				a[j], a[j-1] = a[j-1], a[j]
			}
		}
	}
	return a
}
```



## 堆排序

 堆排序是一种树形选择排序，是对直接选择排序的有效改进。 

![](https://upload-images.jianshu.io/upload_images/1940317-9c37b4be1b7c96d1.gif?imageMogr2/auto-orient/strip|imageView2/2/w/950/format/webp)



### 快速排序

**基本思想：**

1）选择一个基准元素,通常选择第一个元素或者最后一个元素,

2）通过一趟排序讲待排序的记录分割成独立的两部分，其中一部分记录的元素值均比基准元素值小。另一部分记录的 元素值比基准值大。

3）此时基准元素在其排好序后的正确位置

4）然后分别对这两部分记录用同样的方法继续进行排序，直到整个序列有序。

```golang

func quickSort(a []int) []int {
	length := len(a)
	if length <= 1 {
		return a
	}
	splitdata := a[0]
	low := make([]int, 0)
	mid := make([]int, 0)
	high := make([]int, 0)
	mid = append(mid, splitdata)

	for i := 1; i < len(a); i++ {
		if a[i] < splitdata {
			low = append(low, a[i])
		} else if a[i] > splitdata {
			high = append(high, a[i])
		} else {
			mid = append(mid, a[i])
		}
	}
	low, high = quickSort(low), quickSort(high)
	myarr := append(append(low, mid...), high...)

	return myarr
}
```



### 归并排序

 归并（Merge）排序法是将两个（或两个以上）有序表合并成一个新的有序表，即把待排序序列分为若干个子序列，每个子序列是有序的。然后再把有序子序列合并为整体有序序列。 

![](https://www.cxyxiaowu.com/wp-content/uploads/2019/12/1575556975-646803d6678ecbb.jpg)

```golang

func merge(leftarr []int,rightarr []int) []int{
	leftindex:=0//左边索引
	rightindex:=0//右边索引
	lastarr:=[]int {}//最终的数组
	for leftindex<len(leftarr) &&  rightindex<len(rightarr){
		if leftarr[leftindex]  <rightarr[rightindex]{
			lastarr=append(lastarr,leftarr[leftindex] )
			leftindex++

		}else if leftarr[leftindex]  >rightarr[rightindex]{
			lastarr=append(lastarr,rightarr[rightindex] )
			rightindex++
		} else{
			lastarr=append(lastarr,rightarr[rightindex] )
			lastarr=append(lastarr,leftarr[leftindex])
			leftindex++
			rightindex++
		}
	}
	for leftindex< len(leftarr){  //把没有结束的归并过来
		lastarr=append(lastarr,leftarr[leftindex] )
		leftindex++
	}
	for rightindex<len(rightarr){  //把没有结束的归并过来
		lastarr=append(lastarr,rightarr[rightindex] )
		rightindex++
	}
	return  lastarr
}

func MergeSort(arr[] int) []int{
	length:=len(arr)
	if length<=1{
		return arr  //小与10改用插入排序
	}else if length>1 &&length <5{
		return InsertSortX(arr)
	} else{
		mid:=length/2
		leftarr:=MergeSort(arr[:mid])
		rightarr:=MergeSort(arr[mid:])

		return merge(leftarr,rightarr)
	}
}


func InsertSortX(arr [] int) []int{
	length:=len(arr)//数组长度
	if length <=1{
		return arr //一个元素的数组，直接返回
	}else{
		for i:=1;i<length;i++{ //跳过第一个
			backup :=arr[i] //备份插入的数据
			j:=i-1  //上一个位置循环找到位置插入
			for j>=0 &&backup<arr[j]{
				arr[j+1]=arr[j]  //从前往后移动
				j--
			}
			arr[j+1]=backup  //插入
			fmt.Println(arr)
		}

		return  arr


	}
}
```







### 希尔排序

**基本思想：**

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。

```golang
func shellSortStep(a []int, start int, gap int) {
	for i := start + gap; i < len(a); i += gap {
		back := a[i]
		j := i - gap
		for j > 0 && back < a[j] {
			a[j+gap] = a[j]
			j -= gap
		}
		a[j+gap] = back
	}
}
func shellSort(a []int) []int {
	if len(a) <= 1 {
		return a
	}
	gap := len(a) / 2
	for gap > 0 {
		for i := 0; i < gap; i++ {
			shellSortStep(a, i, gap)
		}
		gap /= 2
	}

	return a
}
```





### 桶排序

```golang
func  SelectSortMaxx(arr[] int) int{
	length:=len(arr)//数组长度
	if length <=1{
		return arr[0] //一个元素的数组，直接返回
	}else{
		max:=arr[0] //假定第一个最大
		for i:=1;i<length;i++{
			if arr[i]>max{ //任何一个比我的大的数，最大的
				max=arr[i]
			}
		}
		return max
	}
}

func  RadixSort(arr[] int) []int{
	max:= SelectSortMaxx(arr) //寻找数组极大值 99991
	for  bit:=1;max/bit>0;bit*=10{
		//按照数量级分段
		arr=BitSort(arr ,bit )//每次处理一个级别的排序
		fmt.Println(arr)
	}
	return arr
}
func  BitSort(arr[]int ,bit int)[]int{
	length:=len(arr)//数组长度
	bitcounts:=make([]int,10)//统计长度0,1,2,3,4,5,6,7,8,9
	for i:=0;i<length;i++{
		num:=(arr[i]/bit)%10  //分层处理，bit=1000的，三位数不参与排序了，bit=10000的四位数不参与排序
		bitcounts[num]++  //统计余数相等个数
	}
	fmt.Println(bitcounts)
	//  0 1 2 3  4 5
	//  1 0 3 0  0  1
	//  1 1 4 4  4  5
	for i:=1;i<10;i++{
		bitcounts[i]+=bitcounts[i-1] //叠加，计算位置
	}
	fmt.Println(bitcounts)


	tmp:=make([]int ,10)//开辟临时数组
	for i:=length-1;i>=0;i--{
		num:=(arr[i]/bit)%10
		tmp[bitcounts[num]-1]=arr[i] //计算排序的位置
		bitcounts[num]--
	}



	for i:=0;i<length;i++{
		arr[i]=tmp[i] //保存数组
	}
	return arr
}
```







顺序栈--入栈操作受数组上界的约束有可能发生栈上溢，且需要地址连续的存储单元。
链栈--无须地址连续，便于多个栈共享存储单元，且不存在栈满上溢情况。
顺序队列--需地址连续且有假上溢现象（需改为循环队列才可解决假上溢）
链式队列--特别适合于数据元素变动比较大的情况，且不存在队列满而产生的溢出问题。 

**栈(Stack)：**
优点：提供后进先出的存储方式，添加速度快，允许重复；
缺点：只能在一头操作数据，存取其他项很慢；

**队列(Queue)：**
优点：提供先进先出的存储方式，添加速度快，允许重复；
缺点：只能在一头添加，另一头获取，存取其他项很慢；