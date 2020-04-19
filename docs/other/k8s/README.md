---
title: k8s
---

# 一、k8s组成部分

## Master



### 1、kube-apiserver

​	封装了核心对象的增删改查操作，提供了统一的接口

### 2、  kube-controller

​	负责资源管理同步

### 3、  kube-scheduler

​	负责资源和Pod的匹配

## Node



### 1、kubelet

​	管理Pod的生命周期

### 2、kube-proxy

​	负责k8s的网络配置