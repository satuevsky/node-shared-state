let {parse, stringify, parseHash, stringifyHash} = require('./redis-utils');

class RedisHashes{
    /**
     * @param prefix
     * @param {number} [expire] - timeout in ms for auto removing hashes
     * @param state
     */
    constructor({prefix, state, expire}){
        this.prefix = prefix;
        this.expire = expire;
        this.client = state.redisClient;
    }

    set(key, hash, cb){
        key = this.prefix + ":" + key;
        hash = stringifyHash(hash);

        if(!this.expire){
            this.client.hmset(key, hash, cb);
        }else{
            this.client.multi()
                .hmset(key, hash, cb)
                .pexpire(key, this.expire)
                .exec();
        }
    }

    setProp(key, propName, value, cb){
        key = this.prefix + ":" + key;
        value = stringify(value);

        if(!this.expire){
            this.client.hset(key, propName, value, cb);
        }else{
            this.client.multi()
                .hset(key, propName, value, cb)
                .pexpire(key, this.expire)
                .exec();
        }
    }

    get(key, cb){
        key = this.prefix + ":" + key;

        let executor = this.expire ? this.client.multi() : this.client;
        executor.hgetall(key, (err, hash) => {
            cb && cb(err, hash && parseHash(hash));
        });
        if(this.expire){
            executor.pexpire(key, this.expire);
            executor.exec();
        }
    }

    getProp(key, propName, cb){
        key = this.prefix + ":" + key;

        let executor = this.expire ? this.client.multi() : this.client;
        executor.hget(key, propName, (err, value) => {
            cb && cb(err, !err && parse(value));
        });
        if(this.expire){
            executor.pexpire(key, this.expire);
            executor.exec();
        }
    }

    del(key, cb){
        this.client.del(this.prefix + ":" + key, cb);
    }

    delProp(key, propName, cb){
        this.client.hdel(this.prefix + ":" + key, propName, cb);
    }
}

module.exports = RedisHashes;