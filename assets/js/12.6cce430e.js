(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{401:function(t,o,e){"use strict";e.r(o);var s=e(24),r=Object(s.a)({},(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h3",{attrs:{id:"单体式开发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#单体式开发"}},[t._v("#")]),t._v(" 单体式开发")]),t._v(" "),e("p",[t._v("运行在同一个进程中的。比如MVC只是逻辑上的分层，并不是物理上的分层")]),t._v(" "),e("p",[t._v("缺点：1） 随着项目的扩展，复杂性逐渐变高   2）维护成本大    3）可扩展性差")]),t._v(" "),e("h3",{attrs:{id:"微服务架构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#微服务架构"}},[t._v("#")]),t._v(" 微服务架构")]),t._v(" "),e("p",[t._v("特性")]),t._v(" "),e("p",[t._v("​\t1）单一职责:符合高内聚、低耦合原则以及单一职责原则")]),t._v(" "),e("p",[t._v("​\t2) 轻量级通信：每个服务与语言无关、平台无关")]),t._v(" "),e("p",[t._v("​\t3) 独立性：每个服务独立开发、测试和部署")]),t._v(" "),e("p",[t._v("​\t4）进程隔离")]),t._v(" "),e("p",[t._v("缺点")]),t._v(" "),e("p",[t._v("​\t1）运维要求较高")]),t._v(" "),e("p",[t._v("​\t2）分布式的复杂性")]),t._v(" "),e("p",[t._v("​\t3）接口调整成本高")]),t._v(" "),e("p",[t._v("​\t4）重复劳动")]),t._v(" "),e("p",[t._v("单体架构与分布式微服务区别")]),t._v(" "),e("p",[e("img",{attrs:{src:"assets/img/aloneandmirco.png",alt:""}})]),t._v(" "),e("p",[t._v("优点：")]),t._v(" "),e("p",[t._v("​\t1) 开发简单")]),t._v(" "),e("p",[t._v("​\t2) 快速响应需求变化")]),t._v(" "),e("p",[t._v("​\t3）随时随地更新")]),t._v(" "),e("p",[t._v("​\t4）系统更加稳定可靠")]),t._v(" "),e("p",[t._v("微服务课程的几个重要的组件")]),t._v(" "),e("p",[t._v("​\t跨语言，跨平台 通讯格式 protobuf")]),t._v(" "),e("p",[t._v("​\t通讯协议 gRPC")]),t._v(" "),e("p",[t._v("​\t调度管理服务发现 consul")]),t._v(" "),e("p",[t._v("​\t微服务的框架 micro")]),t._v(" "),e("p",[t._v("​\t部署 docker")]),t._v(" "),e("h3",{attrs:{id:"protobuf"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#protobuf"}},[t._v("#")]),t._v(" protobuf")]),t._v(" "),e("p",[t._v("与平台无关，语言无关，可扩展的序列化结构数据格式")]),t._v(" "),e("p",[t._v("protobuf、json、xml格式比较")]),t._v(" "),e("p",[t._v("​\t1.json:一般用于web项目，因为浏览器对json数据支持非常好")]),t._v(" "),e("p",[t._v("​\t2.xml:在webservice中应用最为广泛，比json更加冗余。")]),t._v(" "),e("p",[t._v("​\t3.protobuf:  二进制数据格式，传输比json快")]),t._v(" "),e("p",[t._v("protobuf类似xml，但是比它更小、更快、更简单，缺点就是功能简单，无法表示复杂的概念")]),t._v(" "),e("p",[t._v("用法\n下载protoc  下载地址：https://github.com/google/protobuf/releases")]),t._v(" "),e("p",[t._v("安装go get -v -u github.com/golang/protobuf/protoc-gen-go")]),t._v(" "),e("p",[t._v("编译proto文件 protoc --go_out=./  *.proto")]),t._v(" "),e("h3",{attrs:{id:"rpc"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rpc"}},[t._v("#")]),t._v(" RPC")]),t._v(" "),e("p",[t._v("protoc --go_out=plugins=grpc:./  *.proto")]),t._v(" "),e("h3",{attrs:{id:"consul"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#consul"}},[t._v("#")]),t._v(" consul")]),t._v(" "),e("p",[t._v("安装链接https://www.consul.io/downloads.html")]),t._v(" "),e("p",[t._v("consul采取的是C/S架构，client主要是接受所有的请求，然后统一发送给server层")]),t._v(" "),e("p",[t._v("etcd与redis的区别")]),t._v(" "),e("p",[t._v("etcd分布式存储,更强调的是各个节点之间的通信，同步，确保各个节点上数据和事务的一致性，单节点的写入能力并不强，适合做服务发现\nredis更像是内存型缓存，虽然也有cluster做主从同步和读写分离\n但节点间的一致性主要强调的是数据，并不在乎事务，因此读写能力很强，qps甚至可以达到10万+")]),t._v(" "),e("p",[t._v("consul与etcd zookeeper区别")]),t._v(" "),e("p",[e("img",{attrs:{src:"assets/img/consulandetcd.png",alt:""}})]),t._v(" "),e("p",[t._v("​")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("consul  agent  -server  -bootstrap-expect=2     -config-dir F:/go/微服务/各种软件/consul/consul_server1/etc/consul.d -data-dir=F:/go/微服务/各种软件/consul/consul_server1/data -node=agent_1  -ui -bind=192.168.1.5  -client=0.0.0.0\n")])])]),e("p",[t._v("consul  agent  -server  -bootstrap-expect=2     -config-dir F:/go/微服务/各种软件/consul/consul_server2/etc/consul.d -data-dir=F:/go/微服务/各种软件/consul/consul_server2/data -node=agent_2  -ui -bind=192.168.1.5  -client=0.0.0.0 -join 192.168.1.5:8311")]),t._v(" "),e("p",[t._v("consul  agent  -data-dir=F:/go/微服务/各种软件/consul/consul_client/data  -node=agent_3     -client=0.0.0.0 -join 192.168.1.5:8311")]),t._v(" "),e("p",[t._v("./consul join 192.168.1.5:8311")]),t._v(" "),e("h3",{attrs:{id:"micro"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#micro"}},[t._v("#")]),t._v(" micro")]),t._v(" "),e("p",[t._v("go get github.com/micro/protoc-gen-micro")]),t._v(" "),e("p",[t._v("分别是传输、代理、服务注册")]),t._v(" "),e("p",[t._v("2020-02-16 14:48:21.262585 I | Transport [http] Listening on [::]:55813\n2020-02-16 14:48:21.263574 I | Broker [http] Connected to [::]:55814\n2020-02-16 14:48:21.384483 I | Registry [mdns] Registering node: greeter-bcc8b4de-d2c3-4445-a542-ff8f66920917")]),t._v(" "),e("p",[t._v("默认的注册中心是MDNS ,默认的broker是httpbroker，也可以换成其他的mq")]),t._v(" "),e("h3",{attrs:{id:"docker-compose安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-compose安装"}},[t._v("#")]),t._v(" Docker-Compose安装")]),t._v(" "),e("p",[t._v("安装方法一：\n下载Docker-Compose：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("sudo curl -L https://github.com/docker/compose/releases/download/1.23.0-rc3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose\n")])])]),e("p",[t._v("安装Docker-Compose：\n"),e("code",[t._v("sudo chmod +x /usr/local/bin/docker-compose")])]),t._v(" "),e("p",[t._v("docker-compose up")]),t._v(" "),e("p",[t._v("etcdctl get / --prefix")])])}),[],!1,null,null,null);o.default=r.exports}}]);