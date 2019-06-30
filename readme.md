```
====
redis安装
====
```

```
====
配置持久化redis
====

```

```
* 我安装的是Redis-x64-3.2.100.msi, [redis下载地址](https://github.com/microsoftarchive/redis/releases) 

* 到redis安装目录下找到redis.windows.conf并用笔记打开它， 在 appendonly no处,把no改成yes保存并关闭

* 到redis安装目录 打开cmd窗口 并输入命令： redis-server.exe redis.windows.conf 或者 redis-server.exe "redis.windows.conf文件的绝对路径(注意此值一定要英文双引号包裹住)"， 此处没报错可以执行下一步，如果报错就重启电脑，重新执行这一步，只是更换上一次输入的命令，没有报错，执行下一步，如果还是报错，去网上找解决方案

* 查看任务管理器，在后台进程找到 redis-server.exe说明已经加入电脑服务计划，电脑每次开机redis-server.exe都能在后台进程找到，redis的每次操作行为在appendonly.aof文件；如果在应用进程找到redis-server.exe，说明redis.windows.conf 配置参数不生效或者appendonly no

* 开启 redis-cli.exe 应用程序

* 测试 set name xiaobai

* 观察redis安装目录下有无appendonly.aof文件生成, 如果有说明已经成功配置持久化redis服务，反之失败
```

```
====
成功开启持久化redis服务的标记
====
```

```
1. redis-cli的任何操作(redis的每次操作行为)appendonly.aof都有记录
2. redis服务(redis-server.exe)后台进程能够被找到
3. 重启电脑或者重启redis服务 都能通过keys *命令在上次关闭redis服务并且有数据的数据空间找到键值
```

###  开始项目 ###

* 1 创建项目目录

* 2 npm init 和 tsc --init初始化目录

* 3 cnpm i redis --save-dev 和 cnpm i @types/redis --save-dev (前者为js提供支持，后者为ts提供支持)

* 4 修改 tsconfig.json 中 "outDir"(ts转译js所在目录) "rootDir" (ts所在目录)

* 5 创建项目所需目录及文件

* 6 开始项目