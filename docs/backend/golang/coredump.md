---
title: go coredump调试笔记
---



### 1.概述

 一个核心转储文件（ core dump file ）中包含程序进程运行时的内存信息和进程状态。它主要用于程序的问题调试，以及在运行过程中理解程序的状态。这些对于我们诊断程序问题原因和分析生产环境中的服务问题有非常大的帮助。 

 **注意**: 接下来的操作都是在Linux系统终端中执行 



### 2.准备

​    1) 安装 [delve](https://github.com/derekparker/delve)  ，用来分析 core dump 文件

```shell
go get github.com/go-delve/delve/cmd/dlv
#或者
$ git clone https://github.com/go-delve/delve.git $GOPATH/src/github.com/go-delve/delve
$ cd $GOPATH/src/github.com/go-delve/delve
$ make install
```



​	2) ulimit -c unlimited， 设置core dump最大容量 为无限制

​		**注意**:可能会设置不成功，可查看 https://www.cnblogs.com/qiumingcheng/p/11668423.html 

​		**永久生效方法**

```shell
vi /etc/profile
#添加
ulimit -u 10000
ulimit -n 4096
ulimit -d unlimited
ulimit -m unlimited
ulimit -s unlimited
ulimit -t unlimited
ulimit -v unlimited
ulimit -c unlimited

```

添加后sudo  source /etc/profile 使生效

​	3) 

```shell
#设置core文件路径
sudo echo '/home/origin/goCoreDump/core_%e.%p' | sudo tee /proc/sys/kernel/core_pattern 
```
 	  **注意**: core文件路径必须提前创建，并且进程用户有写权限，可以设置成777的权限 

​	

### 3.启动

```shell
GOTRACEBACK=crash nohup ./hello &
```



### 4.分析

```shell
dlv core ./hello core.546
```

进入交互界面后可用命令stack、bt、ls、help查看信息





参考文档:

 https://segmentfault.com/a/1190000010684345 

 https://zhuanlan.zhihu.com/p/62825675 

 [CoreDumpDebugging](https://github.com/golang/go/wiki/CoreDumpDebugging )