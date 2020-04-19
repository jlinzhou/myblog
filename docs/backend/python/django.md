---
title: django
---

## 1.创建和启动
### 创建项目
django-admin startproject test1
### 创建应用
python manage.py startapp booktest
### 安装应用
INSTALLED_APPS下添加应用的名称
### 启动开发服务器
python manage.py runserver 0.0.0.0:8000

## 2.模型设计
### 使用mysql数据库
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'test2', #数据库名字，
        'USER': 'root', #数据库登录用户名
        'PASSWORD': 'mysql', #数据库登录密码
        'HOST': 'localhost', #数据库所在主机
        'PORT': '3306', #数据库端口
    }
}
```
```python
from django.db import models
class BookInfo(models.Model):
    btitle = models.CharField(max_length=20)
    bpub_date = models.DateField()
```

### 迁移文件
```python
python manage.py makemigrations
python manage.py migrate
```
### 注册模型类
```python
class BookInfoAdmin(admin.ModelAdmin):
    list_display = ['id', 'btitle', 'bpub_date']
admin.site.register(BookInfo, BookInfoAdmin)
```
## 3.后台管理
### 管理界面本地化
```python
LANGUAGE_CODE = 'zh-hans' #使用中国语言
TIME_ZONE = 'Asia/Shanghai' #使用中国上海时间
```
### 创建管理员
```python
python manage.py createsuperuser
```
## 4.视图
在模板中输出变量语法如下，变量可能是从视图中传递过来的，也可能是在模板中定义的。
{{变量名}}
在模板中编写代码段语法如下：
{%代码段%}


配置静态文件路径
```python
DEBUG = True
...
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
```

在html上面加上 {%load staticfiles%}

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("index")

from django.shortcuts import render

def index(request):
    context={'title':'图书列表','list':range(10)}
    return render(request,'booktest/index.html',context)
```

在浏览器中使用javascript发起ajax请求时，返回json格式的数据
```python
from django.http import JsonResponse
...
def json1(request):
    return render(request,'booktest/json1.html')
def json2(request):
    return JsonResponse({'h1':'hello','h2':'world'})
```
当一个逻辑处理完成后，不需要向客户端呈现数据，而是转回到其它页面，如添加成功、修改成功、删除成功后显示数据列表，而数据的列表视图已经开发完成，此时不需要重新编写列表的代码，而是转到这个视图就可以，此时就需要模拟一个用户请求的效果，从一个视图转到另外一个视图，就称为重定向。
在django.shortcuts模块中为重定向类提供了简写函数redirect。

1）修改booktest/views.py文件中red1视图，代码如下：
```python
from django.shortcuts import redirect
...
def red1(request):
    return redirect('/')
```