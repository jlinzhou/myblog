---
title: docker
---

删除当前所有运行的容器

```
docker rm -f $(docker ps -q)
```

当前目录下docker build

默认读Dockerfile

```
docker build -t test .
```

运行

```
docker run -d -p9080:8080 --name myt 
-v /root/test:/uer/local/test
--privileged=true
zzjjll
```



centos安装docker

```
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache fast
yum install -y docker-ce
systemctl start docker
docker version

mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://ty7u9hg6.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker
```



ubuntu配置文件在/etc/default/docker

centos在/etc/sysconfig/docker