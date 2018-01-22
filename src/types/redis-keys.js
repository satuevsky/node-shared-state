let {parse, stringify} = require('./redis-utils');

class RedisKeys{
    /**
     * @param {string} prefix
     * @param {RedisState} state
     * @param {number} [expire] - timeout in ms for auto removing keys
     * @param valuesType
     */
    constructor({prefix, state, expire}){
        this.prefix = prefix;
        this.expire = expire;
        this.client = state.redisClient;
    }

    set(key, value, callback){
        key = this.prefix + ":" + key;
        value = stringify(value);

        if(!this.expire){
            this.client.set(key, value, callback);
        }else{
            this.client.set(key, value, 'PX', this.expire, callback);
        }
    }

    get(key, callback){
        let executor = this.expire ? this.client.multi() : this.client;
        key = this.prefix + ":" + key;
        executor.get(key, (err, val) => {
            callback && callback(err, !err && parse(val));
        });
        if(this.expire){
            executor.pexpire(key, this.expire);
            executor.exec();
        }
    }

    del(key, callback){
        this.client.del(this.prefix + ":" + key, callback);
    }
}


module.exports = RedisKeys;