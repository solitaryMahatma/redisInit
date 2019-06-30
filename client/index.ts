const redis:any = require('redis');
class Client {
    private options: object = {
        host: 'localhost',
        port: 6379
    }
    private client: any;
    private fail: object = {core:666}
    private success: object = { core: 1 }
    private db:object = {selectDb: 0}
    constructor(){
        this.client = redis.createClient(this.options);
    }
    setMsg(message: string, bool:boolean):object{
        const msg = bool ? (message + "--成功") : (message+'--失败')
        return {msg}
    }
    feedback(resolve: any, error: any, redisResult:any, FailMsg: object, successMsg:object):void{
        const feedback = {}
        const result = { data: redisResult }
        if (error) {
            Object.assign(feedback, error, this.fail, FailMsg, this.db)
        } else {
            Object.assign(feedback, result, this.success, successMsg, this.db)
        }
        resolve(feedback)
    }
    methodsSet(...rest: Array<any>):Promise<unknown> {
        return new Promise(resolve => {
            switch (rest.length) {
                case 1:
                    resolve('参数有误');
                    break;
                case 2:
                    this.client[rest[0]]((error: any, redisResult: any) => {
                        const msg = rest[1]
                        this.feedback(resolve, error, redisResult, this.setMsg(msg, false), this.setMsg(msg, true))
                    })
                    break;
                case 3:
                    this.client[rest[0]](rest[2], (error: any, redisResult: any) => {
                        const msg = rest[1]
                        this.feedback(resolve, error, redisResult, this.setMsg(msg, false), this.setMsg(msg, true))
                    })
                    break;
                case 4:
                    this.client[rest[0]](rest[2], rest[3], (error: any, redisResult: any) => {
                        const msg = rest[1]
                        this.feedback(resolve, error, redisResult, this.setMsg(msg, false), this.setMsg(msg, true))
                    })
                    break;
                case 5:
                    this.client[rest[0]](rest[2], rest[3], rest[4], (error: any, redisResult: any) => {
                        const msg = rest[1]
                        this.feedback(resolve, error, redisResult, this.setMsg(msg, false), this.setMsg(msg, true))
                    })
                    break;
                default:
                    const rest2 = rest.slice(2, rest.length)
                    this.client[rest[0]](...rest2, (error: any, redisResult: any) => {
                        const msg = rest[1]
                        this.feedback(resolve, error, redisResult, this.setMsg(msg, false), this.setMsg(msg, true))
                    })
                    break;
            }
        });
    }

    //字符串操作 start
    set(key: string, value: any): Promise<unknown>{
        const methodName = 'set'
        const msg = '设置存储在给定键中的值'
        return this.methodsSet(methodName, msg, key, value)
    }
    get(key: string): Promise<unknown>{
        const methodName = 'get'
        const msg = '获取存储在给定键中的值'
        return this.methodsSet(methodName, msg, key)
    }

    del(key: string | Array<string>): Promise<unknown> {
        const methodName = 'del'
        const msg = '删除存储在给定键中的值(任意类型)/删除一个(或多个)keys'
        return this.methodsSet(methodName, msg, key)
    }

    incrby(key: string, increment: number): Promise<unknown> {
        const methodName = 'incrby'
        const msg = '将键存储的值加上整数increment'
        return this.methodsSet(methodName, msg, key, increment)
    }
    decrby(key: string, increment: number): Promise<unknown> {
        const methodName = 'decrby'
        const msg = '将键存储的值减去整数increment'
        return this.methodsSet(methodName, msg, key, increment)
    }
    incrbyfloat(key: string, increment: number): Promise<unknown> {
        const methodName = 'incrbyfloat'
        const msg = '将键存储的值加上浮点数increment'
        return this.methodsSet(methodName, msg, key, increment)
    }
    append(key: string, new_value: string | number): Promise<unknown> {
        const methodName = 'append'
        const msg = '将值value追加到给定键当前存储值的末尾'
        return this.methodsSet(methodName, msg, key, new_value)
    }
    getrange(key: string, start_index: number, end_index: number): Promise<unknown> {
        const methodName = 'getrange'
        const msg = '获取指定键的index范围内的所有字符组成的子串'
        return this.methodsSet(methodName, msg, key, start_index, end_index)
    }
    setrange(key: string, offset: number, new_string: string): Promise<unknown> {
        const methodName = 'setrange'
        const msg = '将指定键值从指定偏移量开始的子串设为指定值'
        return this.methodsSet(methodName, msg, key, offset, new_string)
    } 

    //字符串操作 end

    //数据库操作 start
    flushdb(): Promise<unknown>{
        const methodName = 'flushdb'
        const msg = '清空当前数据库数据'
        return this.methodsSet(methodName, msg)
    }

    select(num: number): Promise<unknown>{
        const methodName = 'select'
        const msg = '选择数据库空间 [0-15]'
        return this.methodsSet(methodName, msg, num)
    }
    
    exists(key: string): Promise<unknown>{
        const methodName = 'exists'
        const msg = '查询一个key是否存在'
        return this.methodsSet(methodName, msg, key)
    }
    
    expire(key: string, seconds: number): Promise<unknown>{
        const methodName = 'expire'
        const msg = '设置一个key的过期的秒数'
        return this.methodsSet(methodName, msg, key, seconds)
    }
    
    pexpire(key: string, milliseconds: number): Promise<unknown>{
        const methodName = 'pexpire'
        const msg = '设置一个key的过期的毫秒数'
        return this.methodsSet(methodName, msg, key, milliseconds)
    }

    expireat(key: string, timestamp: number): Promise<unknown>{
        const methodName = 'expireat'
        const msg = '设置一个UNIX时间戳的过期时间(秒)'
        return this.methodsSet(methodName, msg, key, timestamp)
    }
    
    pexpireat(key: string, milliseconds_timestamp: number): Promise<unknown>{
        const methodName = 'pexpireat'
        const msg = '设置一个UNIX时间戳的过期时间(毫秒)'
        return this.methodsSet(methodName, msg, key, milliseconds_timestamp)
    }
    
    persist(key: string): Promise<unknown>{
        const methodName = 'persist'
        const msg = '移除key的过期时间'
        return this.methodsSet(methodName, msg, key)
    } 
    //数据库操作 end

    //set集合 start
    
    smembers(key: string): Promise<unknown> {
        const methodName = 'smembers'
        const msg = '返回集合中包含的所有元素'
        return this.methodsSet(methodName, msg, key)
    }
    
    sismenber(key: string, value:any): Promise<unknown> {
        const methodName = 'sismenber'
        const msg = '检查给定的元素是否存在于集合中 1/0'
        return this.methodsSet(methodName, msg, key, value)
    }

    srem(key: string, value: any): Promise<unknown> {
        const methodName = 'srem'
        const msg = '如果给定的元素在集合中，则移除此元素 1/0'
        return this.methodsSet(methodName, msg, key, value)
    }

    scad(key: string): Promise<unknown> {
        const methodName = 'scad'
        const msg = '返回集合包含的元素的数量'
        return this.methodsSet(methodName, msg, key)
    }

    spop(key: string): Promise<unknown> {
        const methodName = 'spop'
        const msg = '随机地移除集合中的一个元素，并返回此元素'
        return this.methodsSet(methodName, msg, key)
    }

    smove(source_key: string, dest_key: string, item: any): Promise<unknown> {
        const methodName = 'smove'
        const msg = '集合元素的迁移'
        return this.methodsSet(methodName, msg, source_key, dest_key, item)
    }
    //待测
    sdiff(...rest:Array<any>): Promise<unknown> {
        const methodName = 'sdiff'
        const msg = '返回那些存在于第一个集合，但不存在于其他集合的元素(差集)'
        return this.methodsSet(methodName, msg, ...rest)
    }
    
    sdiffstore(...rest: Array<any>): Promise<unknown> {
        const methodName = 'sdiffstore'
        const msg = '将sdiff操作的结果存储到指定的键中'
        return this.methodsSet(methodName, msg, ...rest)
    }

    sinter(...rest: Array<any>): Promise<unknown> {
        const methodName = 'sinter'
        const msg = '返回那些同事存在于所有集合中的元素(交集)'
        return this.methodsSet(methodName, msg, ...rest)
    }

    sinterstore(...rest: Array<any>): Promise<unknown> {
        const methodName = 'sinterstore'
        const msg = '将sinter操作的结果存储到指定的键中'
        return this.methodsSet(methodName, msg, ...rest)
    }
    sunion(...rest: Array<any>): Promise<unknown> {
        const methodName = 'sinterstore'
        const msg = '返回那些至少存在于一个集合中的元素(并集)'
        return this.methodsSet(methodName, msg, ...rest)
    }
    sunionstore(...rest: Array<any>): Promise<unknown> {
        const methodName = 'sunionstore'
        const msg = '将sunion操作的结果存储到指定的键中'
        return this.methodsSet(methodName, msg, ...rest)
    }
    //set集合 end

    //hash 散列 start
    hset(hash_key: string, sub_key: string, value: any): Promise<unknown> {
        const methodName = 'hset'
        const msg = '在散列里面关联起给定的键值对(不支持数组、字符串) 1(新增)/0(更新)'
        return this.methodsSet(methodName, msg, hash_key, sub_key, value)
    }
    hget(hash_key: string, sub_key: string): Promise<unknown> {
        const methodName = 'hget'
        const msg = '获取指定散列键的值'
        return this.methodsSet(methodName, msg, hash_key, sub_key)
    }

    hgetall(hash_key: string): Promise<unknown> {
        const methodName = 'hgetall'
        const msg = '获取散列包含的键值对 json'
        return this.methodsSet(methodName, msg, hash_key)
    }

    hdel(hash_key: string, sub_key: string): Promise<unknown> {
        const methodName = 'hdel'
        const msg = '如果给定键存在于散列里面，则移除这个键'
        return this.methodsSet(methodName, msg, hash_key, sub_key)
    }

    hmset(hash_key: string, obj: object): Promise<unknown> {
        const methodName = 'hmset'
        const msg = '为散列里面的一个或多个键设置值 OK'
        return this.methodsSet(methodName, msg, hash_key, obj)
    }

    hmget(hash_key: string, array: Array<any>): Promise<unknown> {
        const methodName = 'hmset'
        const msg = '从散列里面获取一个或多个键的值 array'
        return this.methodsSet(methodName, msg, hash_key, array)
    }

    hlen(hash_key: string): Promise<unknown> {
        const methodName = 'hlen'
        const msg = '返回散列包含的键值对数量'
        return this.methodsSet(methodName, msg, hash_key)
    }

    hexists(hash_key: string, sub_key: string): Promise<unknown> {
        const methodName = 'hexists'
        const msg = '检查给定键是否在散列中  1/0'
        return this.methodsSet(methodName, msg, hash_key, sub_key)
    }

    hkeys(hash_key: string): Promise<unknown> {
        const methodName = 'hkeys'
        const msg = '获取散列包含的所有键 array'
        return this.methodsSet(methodName, msg, hash_key)
    }

    hvals(hash_key: string): Promise<unknown> {
        const methodName = 'hvals'
        const msg = '获取散列包含的所有值 array'
        return this.methodsSet(methodName, msg, hash_key)
    }

    hincrby(hash_key: string, sub_key: string, increment: number): Promise<unknown> {
        const methodName = 'hincrby'
        const msg = '将存储的键值以指定增量增加 返回增长后的值 (注：假如当前value不为为字符串，则会无输出，程序停止在此处)'
        return this.methodsSet(methodName, msg, hash_key, sub_key, increment)
    }
    hincrbyfloat(hash_key: string, sub_key: string, increment: number): Promise<unknown> {
        const methodName = 'hincrbyfloat'
        const msg = '将存储的键值以指定浮点数增加 返回增长后的值 (注：假如当前value不为为字符串，则会无输出，程序停止在此处)'
        return this.methodsSet(methodName, msg, hash_key, sub_key, increment)
    }
    //hash 散列 end

    //zset 有序集合 start
    zadd(zset_key: string, score: any, key: string): Promise<unknown> {
        const methodName = 'zadd'
        const msg = '将一个带有给定分支的成员添加到有序集合中'
        return this.methodsSet(methodName, msg, zset_key, score, key)
    }
    //待测
    zrange(): Promise<unknown> {
        const methodName = 'zrange'
        const msg = '根据元素在有序排列中的位置，从中取出元素'
        return this.methodsSet(methodName, msg)
    }

    zrangebyscore(): Promise<unknown> {
        const methodName = 'zrangebyscore'
        const msg = '获取有序集合在给定分值范围内的所有元素'
        return this.methodsSet(methodName, msg)
    }
    
    zrem(): Promise<unknown> {
        const methodName = 'zrem'
        const msg = '如果给定成员存在于有序集合，则移除'
        return this.methodsSet(methodName, msg)
    }

    zcard(key:string): Promise<unknown> {
        const methodName = 'zcard'
        const msg = '获取一个有序集合中的成员数量      有序集的元素个数'
        return this.methodsSet(methodName, msg, key)
    }
    //zset 有序集合 end
}

export default new Client()