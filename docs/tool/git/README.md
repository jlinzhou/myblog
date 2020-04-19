---
title: git
---

生成ssh密钥。
```git
ssh-keygen -t rsa -C "772945866@qq.com"
```
主目录下的.ssh文件件，下面有两个文件。
公钥为id_rsa.pub
私钥为id_rsa
查看公钥内容，复制此内容
```git
git clone +地址
```


上传分支

(1)项目克隆到本地之后，执行如下命令创建分支smart.
```git
git checkout -b smart
```
(2)创建一个code.txt并提交一个版本。
```git
git add text.txt
git commit -m ‘版本1’
```
(3)推送分支
```git
git push origin smart
```
 从远程分支上拉取代码
 ```git
git pull orgin smart
```
