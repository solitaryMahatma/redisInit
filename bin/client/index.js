"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require('redis');
var Client = /** @class */ (function () {
    function Client() {
        this.options = {
            host: 'localhost',
            port: 6379
        };
        this.fail = { core: 666 };
        this.success = { core: 1 };
        this.db = { selectDb: 0 };
        this.client = redis.createClient(this.options);
    }
    Client.prototype.setMsg = function (message, bool) {
        var msg = bool ? (message + "--成功") : (message + '--失败');
        return { msg: msg };
    };
    Client.prototype.feedback = function (resolve, error, redisResult, FailMsg, successMsg) {
        var feedback = {};
        var result = { data: redisResult };
        if (error) {
            Object.assign(feedback, error, this.fail, FailMsg, this.db);
        }
        else {
            Object.assign(feedback, result, this.success, successMsg, this.db);
        }
        resolve(feedback);
    };
    Client.prototype.methodsSet = function () {
        var _this = this;
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            var _a;
            switch (rest.length) {
                case 1:
                    resolve('参数有误');
                    break;
                case 2:
                    _this.client[rest[0]](function (error, redisResult) {
                        var msg = rest[1];
                        _this.feedback(resolve, error, redisResult, _this.setMsg(msg, false), _this.setMsg(msg, true));
                    });
                    break;
                case 3:
                    _this.client[rest[0]](rest[2], function (error, redisResult) {
                        var msg = rest[1];
                        _this.feedback(resolve, error, redisResult, _this.setMsg(msg, false), _this.setMsg(msg, true));
                    });
                    break;
                case 4:
                    _this.client[rest[0]](rest[2], rest[3], function (error, redisResult) {
                        var msg = rest[1];
                        _this.feedback(resolve, error, redisResult, _this.setMsg(msg, false), _this.setMsg(msg, true));
                    });
                    break;
                case 5:
                    _this.client[rest[0]](rest[2], rest[3], rest[4], function (error, redisResult) {
                        var msg = rest[1];
                        _this.feedback(resolve, error, redisResult, _this.setMsg(msg, false), _this.setMsg(msg, true));
                    });
                    break;
                default:
                    var rest2 = rest.slice(2, rest.length);
                    (_a = _this.client)[rest[0]].apply(_a, rest2.concat([function (error, redisResult) {
                            var msg = rest[1];
                            _this.feedback(resolve, error, redisResult, _this.setMsg(msg, false), _this.setMsg(msg, true));
                        }]));
                    break;
            }
        });
    };
    //字符串操作 start
    Client.prototype.set = function (key, value) {
        var methodName = 'set';
        var msg = '设置存储在给定键中的值';
        return this.methodsSet(methodName, msg, key, value);
    };
    Client.prototype.get = function (key) {
        var methodName = 'get';
        var msg = '获取存储在给定键中的值';
        return this.methodsSet(methodName, msg, key);
    };
    Client.prototype.del = function (key) {
        var methodName = 'del';
        var msg = '删除存储在给定键中的值(任意类型)/删除一个(或多个)keys';
        return this.methodsSet(methodName, msg, key);
    };
    Client.prototype.incrby = function (key, increment) {
        var methodName = 'incrby';
        var msg = '将键存储的值加上整数increment';
        return this.methodsSet(methodName, msg, key, increment);
    };
    Client.prototype.decrby = function (key, increment) {
        var methodName = 'decrby';
        var msg = '将键存储的值减去整数increment';
        return this.methodsSet(methodName, msg, key, increment);
    };
    Client.prototype.incrbyfloat = function (key, increment) {
        var methodName = 'incrbyfloat';
        var msg = '将键存储的值加上浮点数increment';
        return this.methodsSet(methodName, msg, key, increment);
    };
    Client.prototype.append = function (key, new_value) {
        var methodName = 'append';
        var msg = '将值value追加到给定键当前存储值的末尾';
        return this.methodsSet(methodName, msg, key, new_value);
    };
    Client.prototype.getrange = function (key, start_index, end_index) {
        var methodName = 'getrange';
        var msg = '获取指定键的index范围内的所有字符组成的子串';
        return this.methodsSet(methodName, msg, key, start_index, end_index);
    };
    Client.prototype.setrange = function (key, offset, new_string) {
        var methodName = 'setrange';
        var msg = '将指定键值从指定偏移量开始的子串设为指定值';
        return this.methodsSet(methodName, msg, key, offset, new_string);
    };
    //字符串操作 end
    //数据库操作 start
    Client.prototype.flushdb = function () {
        var methodName = 'flushdb';
        var msg = '清空当前数据库数据';
        return this.methodsSet(methodName, msg);
    };
    Client.prototype.select = function (num) {
        var methodName = 'select';
        var msg = '选择数据库空间 [0-15]';
        return this.methodsSet(methodName, msg, num);
    };
    Client.prototype.exists = function (key) {
        var methodName = 'exists';
        var msg = '查询一个key是否存在';
        return this.methodsSet(methodName, msg, key);
    };
    Client.prototype.expire = function (key, seconds) {
        var methodName = 'expire';
        var msg = '设置一个key的过期的秒数';
        return this.methodsSet(methodName, msg, key, seconds);
    };
    Client.prototype.pexpire = function (key, milliseconds) {
        var methodName = 'pexpire';
        var msg = '设置一个key的过期的毫秒数';
        return this.methodsSet(methodName, msg, key, milliseconds);
    };
    Client.prototype.expireat = function (key, timestamp) {
        var methodName = 'expireat';
        var msg = '设置一个UNIX时间戳的过期时间(秒)';
        return this.methodsSet(methodName, msg, key, timestamp);
    };
    Client.prototype.pexpireat = function (key, milliseconds_timestamp) {
        var methodName = 'pexpireat';
        var msg = '设置一个UNIX时间戳的过期时间(毫秒)';
        return this.methodsSet(methodName, msg, key, milliseconds_timestamp);
    };
    Client.prototype.persist = function (key) {
        var methodName = 'persist';
        var msg = '移除key的过期时间';
        return this.methodsSet(methodName, msg, key);
    };
    //数据库操作 end
    //set集合 start
    Client.prototype.smembers = function (key) {
        var methodName = 'smembers';
        var msg = '返回集合中包含的所有元素';
        return this.methodsSet(methodName, msg, key);
    };
    Client.prototype.sismenber = function (key, value) {
        var methodName = 'sismenber';
        var msg = '检查给定的元素是否存在于集合中 1/0';
        return this.methodsSet(methodName, msg, key, value);
    };
    Client.prototype.srem = function (key, value) {
        var methodName = 'srem';
        var msg = '如果给定的元素在集合中，则移除此元素 1/0';
        return this.methodsSet(methodName, msg, key, value);
    };
    Client.prototype.scad = function (key) {
        var methodName = 'scad';
        var msg = '返回集合包含的元素的数量';
        return this.methodsSet(methodName, msg, key);
    };
    Client.prototype.spop = function (key) {
        var methodName = 'spop';
        var msg = '随机地移除集合中的一个元素，并返回此元素';
        return this.methodsSet(methodName, msg, key);
    };
    Client.prototype.smove = function (source_key, dest_key, item) {
        var methodName = 'smove';
        var msg = '集合元素的迁移';
        return this.methodsSet(methodName, msg, source_key, dest_key, item);
    };
    //待测
    Client.prototype.sdiff = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var methodName = 'sdiff';
        var msg = '返回那些存在于第一个集合，但不存在于其他集合的元素(差集)';
        return this.methodsSet.apply(this, [methodName, msg].concat(rest));
    };
    Client.prototype.sdiffstore = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var methodName = 'sdiffstore';
        var msg = '将sdiff操作的结果存储到指定的键中';
        return this.methodsSet.apply(this, [methodName, msg].concat(rest));
    };
    Client.prototype.sinter = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var methodName = 'sinter';
        var msg = '返回那些同事存在于所有集合中的元素(交集)';
        return this.methodsSet.apply(this, [methodName, msg].concat(rest));
    };
    Client.prototype.sinterstore = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var methodName = 'sinterstore';
        var msg = '将sinter操作的结果存储到指定的键中';
        return this.methodsSet.apply(this, [methodName, msg].concat(rest));
    };
    Client.prototype.sunion = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var methodName = 'sinterstore';
        var msg = '返回那些至少存在于一个集合中的元素(并集)';
        return this.methodsSet.apply(this, [methodName, msg].concat(rest));
    };
    Client.prototype.sunionstore = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var methodName = 'sunionstore';
        var msg = '将sunion操作的结果存储到指定的键中';
        return this.methodsSet.apply(this, [methodName, msg].concat(rest));
    };
    //set集合 end
    //hash 散列 start
    Client.prototype.hset = function (hash_key, sub_key, value) {
        var methodName = 'hset';
        var msg = '在散列里面关联起给定的键值对(不支持数组、字符串) 1(新增)/0(更新)';
        return this.methodsSet(methodName, msg, hash_key, sub_key, value);
    };
    Client.prototype.hget = function (hash_key, sub_key) {
        var methodName = 'hget';
        var msg = '获取指定散列键的值';
        return this.methodsSet(methodName, msg, hash_key, sub_key);
    };
    Client.prototype.hgetall = function (hash_key) {
        var methodName = 'hgetall';
        var msg = '获取散列包含的键值对 json';
        return this.methodsSet(methodName, msg, hash_key);
    };
    Client.prototype.hdel = function (hash_key, sub_key) {
        var methodName = 'hdel';
        var msg = '如果给定键存在于散列里面，则移除这个键';
        return this.methodsSet(methodName, msg, hash_key, sub_key);
    };
    Client.prototype.hmset = function (hash_key, obj) {
        var methodName = 'hmset';
        var msg = '为散列里面的一个或多个键设置值 OK';
        return this.methodsSet(methodName, msg, hash_key, obj);
    };
    Client.prototype.hmget = function (hash_key, array) {
        var methodName = 'hmset';
        var msg = '从散列里面获取一个或多个键的值 array';
        return this.methodsSet(methodName, msg, hash_key, array);
    };
    Client.prototype.hlen = function (hash_key) {
        var methodName = 'hlen';
        var msg = '返回散列包含的键值对数量';
        return this.methodsSet(methodName, msg, hash_key);
    };
    Client.prototype.hexists = function (hash_key, sub_key) {
        var methodName = 'hexists';
        var msg = '检查给定键是否在散列中  1/0';
        return this.methodsSet(methodName, msg, hash_key, sub_key);
    };
    Client.prototype.hkeys = function (hash_key) {
        var methodName = 'hkeys';
        var msg = '获取散列包含的所有键 array';
        return this.methodsSet(methodName, msg, hash_key);
    };
    Client.prototype.hvals = function (hash_key) {
        var methodName = 'hvals';
        var msg = '获取散列包含的所有值 array';
        return this.methodsSet(methodName, msg, hash_key);
    };
    Client.prototype.hincrby = function (hash_key, sub_key, increment) {
        var methodName = 'hincrby';
        var msg = '将存储的键值以指定增量增加 返回增长后的值 (注：假如当前value不为为字符串，则会无输出，程序停止在此处)';
        return this.methodsSet(methodName, msg, hash_key, sub_key, increment);
    };
    Client.prototype.hincrbyfloat = function (hash_key, sub_key, increment) {
        var methodName = 'hincrbyfloat';
        var msg = '将存储的键值以指定浮点数增加 返回增长后的值 (注：假如当前value不为为字符串，则会无输出，程序停止在此处)';
        return this.methodsSet(methodName, msg, hash_key, sub_key, increment);
    };
    //hash 散列 end
    //zset 有序集合 start
    Client.prototype.zadd = function (zset_key, score, key) {
        var methodName = 'zadd';
        var msg = '将一个带有给定分支的成员添加到有序集合中';
        return this.methodsSet(methodName, msg, zset_key, score, key);
    };
    //待测
    Client.prototype.zrange = function () {
        var methodName = 'zrange';
        var msg = '根据元素在有序排列中的位置，从中取出元素';
        return this.methodsSet(methodName, msg);
    };
    Client.prototype.zrangebyscore = function () {
        var methodName = 'zrangebyscore';
        var msg = '获取有序集合在给定分值范围内的所有元素';
        return this.methodsSet(methodName, msg);
    };
    Client.prototype.zrem = function () {
        var methodName = 'zrem';
        var msg = '如果给定成员存在于有序集合，则移除';
        return this.methodsSet(methodName, msg);
    };
    Client.prototype.zcard = function (key) {
        var methodName = 'zcard';
        var msg = '获取一个有序集合中的成员数量      有序集的元素个数';
        return this.methodsSet(methodName, msg, key);
    };
    return Client;
}());
exports.default = new Client();
