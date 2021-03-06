---
title: 微服务
---

### 单体式开发

运行在同一个进程中的。比如MVC只是逻辑上的分层，并不是物理上的分层

缺点：1） 随着项目的扩展，复杂性逐渐变高   2）维护成本大    3）可扩展性差





### 微服务架构

特性

​	1）单一职责:符合高内聚、低耦合原则以及单一职责原则

​	2) 轻量级通信：每个服务与语言无关、平台无关

​	3) 独立性：每个服务独立开发、测试和部署

​	4）进程隔离

缺点

​	1）运维要求较高

​	2）分布式的复杂性

​	3）接口调整成本高

​	4）重复劳动

单体架构与分布式微服务区别

![](assets/img/aloneandmirco.png)

优点：

​	1) 开发简单

​	2) 快速响应需求变化

​	3）随时随地更新

​	4）系统更加稳定可靠



微服务课程的几个重要的组件

​	跨语言，跨平台 通讯格式 protobuf

​	通讯协议 gRPC

​	调度管理服务发现 consul

​	微服务的框架 micro

​	部署 docker



### protobuf

与平台无关，语言无关，可扩展的序列化结构数据格式

protobuf、json、xml格式比较

​	1.json:一般用于web项目，因为浏览器对json数据支持非常好

​	2.xml:在webservice中应用最为广泛，比json更加冗余。

​	3.protobuf:  二进制数据格式，传输比json快

protobuf类似xml，但是比它更小、更快、更简单，缺点就是功能简单，无法表示复杂的概念



用法
下载protoc  下载地址：https://github.com/google/protobuf/releases

安装go get -v -u github.com/golang/protobuf/protoc-gen-go

编译proto文件 protoc --go_out=./  *.proto 



### RPC

 protoc --go_out=plugins=grpc:./  *.proto 



### consul

 

安装链接https://www.consul.io/downloads.html 

consul采取的是C/S架构，client主要是接受所有的请求，然后统一发送给server层

etcd与redis的区别

etcd分布式存储,更强调的是各个节点之间的通信，同步，确保各个节点上数据和事务的一致性，单节点的写入能力并不强，适合做服务发现
redis更像是内存型缓存，虽然也有cluster做主从同步和读写分离
但节点间的一致性主要强调的是数据，并不在乎事务，因此读写能力很强，qps甚至可以达到10万+

consul与etcd zookeeper区别

![](assets/img/consulandetcd.png)

​	

	consul  agent  -server  -bootstrap-expect=2     -config-dir F:/go/微服务/各种软件/consul/consul_server1/etc/consul.d -data-dir=F:/go/微服务/各种软件/consul/consul_server1/data -node=agent_1  -ui -bind=192.168.1.5  -client=0.0.0.0



consul  agent  -server  -bootstrap-expect=2     -config-dir F:/go/微服务/各种软件/consul/consul_server2/etc/consul.d -data-dir=F:/go/微服务/各种软件/consul/consul_server2/data -node=agent_2  -ui -bind=192.168.1.5  -client=0.0.0.0 -join 192.168.1.5:8311



consul  agent  -data-dir=F:/go/微服务/各种软件/consul/consul_client/data  -node=agent_3     -client=0.0.0.0 -join 192.168.1.5:8311

./consul join 192.168.1.5:8311



### micro



 go get github.com/micro/protoc-gen-micro

分别是传输、代理、服务注册

2020-02-16 14:48:21.262585 I | Transport [http] Listening on [::]:55813
2020-02-16 14:48:21.263574 I | Broker [http] Connected to [::]:55814
2020-02-16 14:48:21.384483 I | Registry [mdns] Registering node: greeter-bcc8b4de-d2c3-4445-a542-ff8f66920917



默认的注册中心是MDNS ,默认的broker是httpbroker，也可以换成其他的mq

### Docker-Compose安装

安装方法一：
下载Docker-Compose：

```
sudo curl -L https://github.com/docker/compose/releases/download/1.23.0-rc3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

安装Docker-Compose：
`sudo chmod +x /usr/local/bin/docker-compose`

docker-compose up







etcdctl get / --prefix