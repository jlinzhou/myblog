---
title: shell各种小练习
---


## mysql自动备份
```shell
#!/bin/bash
#auto backup mysql db
#by 2019
BAK_DIR=/data/backup/`date +%Y%m%d`
MYSQLDB=test
MYSQLUSR=root
MYSQLPW=a654321B
MYSQLCMD=/usr/bin/mysqldump
if [ $UID -ne 0 ];then
	echo "must to be user root"
	exit
fi
if [ ! -d $BAK_DIR ];then
	mkdir -p $BAK_DIR
else 
	echo "this $BAK_DIR is exits..,"
fi
$MYSQLCMD -u$MYSQLUSR -p$MYSQLPW $MYSQLDB>$BAK_DIR/$MYSQLDB.sql
if [ $? -eq 0 ];then
	echo -e "\033[32mthe mysql Backup $MYSQLDB successfully\033[0m"
else
	echo -e "\033[32mthe mysql backup $MYSQLDB failed\033[0m"	
fi
```

## mysql自动安装
```shell
#!/bin/bash
#by zjl 2019-11
#自动安装mysql
mysqlYum=mysql80-community-release-el7-1.noarch.rpm
mysqlPassword="a654321B"

echo -e "\033[32m是否卸载mysql?\033[0m"
select i in "卸载mysql" "不卸载mysql"
do
    case $i in 
        "卸载mysql")
            echo -e  "\033[32mYour choice is 卸载mysql\033[0m"
		for name in `yum list installed|grep mysql|awk '{ print $1 }'`
		do
			yum remove $name
		done
	break
        ;;
        "不卸载mysql")
            echo -e  "\033[32mYour choice is 不卸载mysql\033[0m"
	break
        ;;
    esac
done


echo -e "\033[32m是否删除mysql系统文件?\033[0m"
select i in "删除mysql系统文件" "不删除mysql系统文件"
do
    case $i in 
        "删除mysql系统文件")
            echo -e  "\033[32mYour choice is 删除mysql系统文件\033[0m"
        	
        	rm -rf /var/lib/mysql
	break
        ;;
        "不删除mysql系统文件")
            echo -e  "\033[32mYour choice is 不删除mysql系统文件\033[0m"
	break
        ;;
    esac
done

echo -e "\033[32m是否确定安装mysql？\033[0m"
select i in "是" "否"
do
    case $i in 
        "是")
            echo -e  "\033[32mYour choice is 是\033[0m"

		wget -i -c  https://repo.mysql.com//$mysqlYum
		yum -y install $mysqlYum
		yum -y install mysql-community-server
		systemctl start  mysqld.service

		findMysqlProcess=false
		for str2 in `systemctl status mysqld.service|awk '{ print $2}'`
 		do 
			if [[ "$str2" == "active" ]];then
				findMysqlProcess=true
			fi
 		done

		if [[ $findMysqlProcess == false ]];then
			echo -e " mysql error"
			exit	
		fi
		systemctl enable mysqld
                systemctl daemon-reload
	break
        ;;
        "否")
            echo -e  "\033[32mYour choice is 否\033[0m"
	break
        ;;
    esac
done
!
oldPassword=0
echo -e "\033[32m是否知道mysql初始密码?\033[0m"
select i in "是" "否"
do
    case $i in 
        "是")
            echo -e  "\033[32mYour choice is 是\033[0m"
	    read -p "please input password:" oldPassword
	break
        ;;
        "否")
            echo -e  "\033[32mYour choice is 否\033[0m"
		
	    for password in `grep 'temporary password' /var/log/mysqld.log|awk  '{ print $13}'`
		do
	             if [[ $mysqlPassword == 0 ]];then
	        	oldPassword=$password
   	             fi
	        done

	break
        ;;
    esac
done

sql="set global validate_password.policy=0;set global validate_password.length=1;ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '$mysqlPassword';use mysql;update user set host='%' where user ='root';FLUSH PRIVILEGES;GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;"
mysql -uroot -p$oldPassword -e"$sql"




#关闭mysql
#for pid in `ps -ef|grep mysql|grep -v grep|grep -v PPID|grep -v sh|awk '{ print $2}'`
#do 
#	kill -9 $pid 
#done


#卸载mysql
#for name in `yum list installed|grep mysql|awk '{ print $1 }'`
#do
#	yum remove $name
#done

#rm -rf /var/lib/mysql
#for name in `find / -name mysql`
#do 
# echo $name
#done
#wget -i -c  https://repo.mysql.com//$mysqlYum
#yum -y install $mysqlYum
#yum -y install mysql-community-server
#systemctl start  mysqld.service
#systemctl status mysqld.service
:<<!
findMysqlProcess=false
for str2 in `systemctl status mysqld.service|awk '{ print $2}'`
 do 
	if [[ "$str2" == "active" ]];then
		findMysqlProcess=true
	fi
 done

if [[ $findMysqlProcess == false ]];then
	echo -e " mysql error"
	exit	
fi
systemctl enable mysqld
systemctl daemon-reload


for password in `grep 'temporary password' /var/log/mysqld.log|awk  '{ print $13}'`
do
	if [[ $mysqlPassword == 0 ]];then
		mysqlPassword=$password
	fi
done


sql="set global validate_password.policy=0;set global validate_password.length=1;ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'a654321B';use mysql;update user set host='%' where user ='root';FLUSH PRIVILEGES;GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;"
mysql -uroot -p$mysqlPassword -e"$sql"

echo "11111111111111"

!

```

## redis自动安装
```shell
#!/bin/bash
#auto install redis
#by zjl 2019-11
#参考文档:https://blog.csdn.net/u012198893/article/details/97114216
redisFiles=redis-5.0.5.tar.gz
redisFilesDir=redis-5.0.5
redisUrl=http://download.redis.io/releases
redisPrefix=/usr/local/redis

rm -rf $redisPrefix
wget -c $redisUrl/$redisFiles && tar -zxvf $redisFiles && cd $redisFilesDir/src && make install PREFIX=$redisPrefix
cd ..
if [ $? -eq 0 ];then
	 mkdir $redisPrefix/etc && cp redis.conf $redisPrefix/etc/
	echo -e "\033[32m this redis install success\033[0m"
else
	echo -e "\033[32m this redis install error\033[0m"
	exit 0
fi

if [ $? -eq 0 ];then
	#sed -i 's/原字符串/新字符串/g' /home/1.txt
	sed -i "s/bind 127.0.0.1/# bind 127.0.0.1/g" $redisPrefix/etc/redis.conf
	sed -i "s/daemonize no/daemonize yes/g" $redisPrefix/etc/redis.conf
	sed -i "s#dir \.\/#dir $redisPrefix/rdb/#g" $redisPrefix/etc/redis.conf
	sed -i "s#logfile \"\"#logfile $redisPrefix\/log\/redis_log.log#g" $redisPrefix/etc/redis.conf
	sed -i "s/# requirepass foobared/requirepass 123456/g" $redisPrefix/etc/redis.conf
       	echo -e "\033[32m this redis move config success\033[0m"
else
	echo -e "\033[32m this redis move config error\033[0m"
	exit 0
fi
if [ $? -eq 0 ];then
	mkdir $redisPrefix/log && touch $redisPrefix/log/redis_log.log && chmod a+w $redisPrefix/log/redis_log.log && mkdir $redisPrefix/rdb && chmod a+w $redisPrefix/rdb/
	echo -e "\033[32m this redis update config success\033[0m"
else
	echo -e "\033[32m this redis update config error\033[0m"
	exit 0
fi
if [ $? -eq 0 ];then
	echo -e "\033[32m this redis finally  success!!!\033[0m"
else
	echo -e "\033[32m this redis mkdir  error\033[0m"
	exit 0
fi
```

## mongodb自动安装
```shell
#################################
#Author:         zjl #
#Version:                    #
#Mail:   772945866@qq.com          #
#Date:           2019-11-28       #
#Description:                #
#                            #
#################################
 
#!/bin/bash



mongoDBUrl=https://fastdl.mongodb.org/linux/
mongoDBVersion=mongodb-linux-x86_64-4.0.0
mongoDBFileType=.tgz
#下载并安装mongodb

DownInstallMongo(){
	wget -c $mongoDBUrl$mongoDBVersion$mongoDBFileType && tar zxvf $mongoDBVersion$mongoDBFileType &&  mv $mongoDBVersion /usr/mongodb



}
SetMongo(){

	sed -i '/export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL/iexport PATH=\/usr\/mongodb\/bin:$PATH' /etc/profile


	source /etc/profile && cd /usr/mongodb && touch mongodb.conf && mkdir db && mkdir log && chmod 777 db && chmod 777 log && cd log && touch mongodb.log

	mongoConf="port=27017 #端口\n
dbpath= /usr/mongodb/db #数据库存文件存放目录\n
logpath= /usr/mongodb/log/mongodb.log #日志文件存放路径\n
logappend=true #使用追加的方式写日志\n
fork=true #以守护进程的方式运行，创建服务器进程\n
maxConns=100 #最大同时连接数\n
#noauth=true #不启用验证\n
journal=true #每次写入会记录一条操作日志（通过journal可以重新构造出写入的数据）。\n
#即使宕机，启动时wiredtiger会先将数据恢复到最近一次的checkpoint点，然后重放后续的journal日志来恢复。\n
storageEngine=wiredTiger  #存储引擎有mmapv1、wiretiger、mongorocks\n
bind_ip = 0.0.0.0  #这样就可外部访问了，例如从win10中去连虚拟机中的MongoDB\n
auth = true #用户认证\n
"


	echo -e  $mongoConf > /usr/mongodb/mongodb.conf

}
StartMongo(){
	pid=`ps -aux|grep mongod |grep -v grep|grep -v sh|awk '{print $2}'`
	kill -9 $pid &&  mongod -f /usr/mongodb/mongodb.conf

}
SetMongo(){
mongo  <<EOF
use admin

db.createUser({user:"admin",pwd:"123456",roles:["root"]})

db.auth("admin", "123456")

use test

db.createUser({user: "test", pwd: "123456", roles: [{ role: "dbOwner", db: "test" }]})


EOF
}

DownInstallMongo
SetMongo
StartMongo
SetMongo


```