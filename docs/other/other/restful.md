---
title: REST
---
### 什么是REST

 **URL定位资源，用HTTP动词（GET,POST,DELETE, PUT ）描述操作。** 

实际上只是一种设计风格，它并不是标准。 

REST -- REpresentational State Transfer
首先，之所以晦涩是因为前面主语被去掉了，全称是 Resource Representational State Transfer：通俗来讲就是：资源在网络中以某种表现形式进行状态转移。分解开来：
Resource：资源，即数据（前面说过网络的核心）。比如 newsfeed，friends等；
Representational：某种表现形式，比如用JSON，XML，JPEG等；
State Transfer：状态变化。通过HTTP动词实现。



### 设计



1、REST 是面向资源的，这个概念非常重要，而资源是通过 URI 进行暴露。**
URI 的设计只要负责把资源通过合理方式暴露出来就可以了。对资源的操作与它无关，操作是通过 HTTP动词来体现，所以REST 通过 URI 暴露资源时，会强调不要在 URI 中出现动词。

比如：左边是错误的设计，而右边是正确的

```
GET /rest/api/getDogs --> GET /rest/api/dogs 获取所有小狗狗 
GET /rest/api/addDogs --> POST /rest/api/dogs 添加一个小狗狗 
GET /rest/api/editDogs/:dog_id --> PUT /rest/api/dogs/:dog_id 修改一个小狗狗 
GET /rest/api/deleteDogs/:dog_id --> DELETE /rest/api/dogs/:dog_id 删除一个小狗狗
```

左边的这种设计，很明显不符合REST风格，上面已经说了，URI 只负责准确无误的暴露资源，而 getDogs/addDogs...已经包含了对资源的操作，这是不对的。相反右边却满足了，它的操作是使用标准的HTTP动词来体现。

**2、REST很好地利用了HTTP本身就有的一些特征，如HTTP动词、HTTP状态码、HTTP报头等等**
REST API 是基于 HTTP的，所以你的API应该去使用 HTTP的一些标准。这样所有的HTTP客户端（如浏览器）才能够直接理解你的API（当然还有其他好处，如利于缓存等等）。REST 实际上也非常强调应该利用好 HTTP本来就有的特征，而不是只把 HTTP当成一个传输层这么简单了。

HTTP动词

```text
GET     获取一个资源 
POST    添加一个资源 
PUT     修改一个资源 
DELETE  删除一个资源 
```

实际上，这四个动词实际上就对应着增删改查四个操作，这就利用了HTTP动词来表示对资源的操作。

HTTP状态码

```text
200 OK 
400 Bad Request 
500 Internal Server Error
```

在 APP 与 API 的交互当中，其结果无非就三种状态：

这三种状态与上面的状态码是一一对应的。

HTTP报头



```text
Authorization 认证报头 
Cache-Control 缓存报头 
Cnotent-Type  消息体类型报头 
......
```

报头还有很多，不一一列举。HTTP报头是描述HTTP请求或响应的元数据，它的作用是客户端 与 服务器端进行相互通信时，告诉对方应该如何处理本次请求。



###	REST和SOAP

**rest协议是面向资源的**

*假如要管理一些用户，那么将用户看作是一种资源：*

```
get /users/{userId}  获取userId对应的user信息
post /users 创建一个新的user
put /users/{userId} 更改userId对应的user信息
delete /users/{userId} 删除userId对应的user。
```

**soap是面向服务的**

*还是管理用户，将对用户的操作看成服务：*


```
post /users/getUser
post /users/creatUser
post /users/updateUser
post /users/deleteUser
```





参考资料:[怎样用通俗的语言解释REST，以及RESTful？]( https://www.zhihu.com/question/28557115 )