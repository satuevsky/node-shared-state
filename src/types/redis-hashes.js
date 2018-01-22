let {parse, stringify, parseHash, stringifyHash} = require('./redis-utils');

class RedisHashes{
    /**
     * @param prefix
     * @param {number} [expire] - timeout in ms for auto removing hashes
     * @param state
     */
    constructor({prefix, state, expire}){
        this.client = state.redisClient;
        this.prefix = prefix;
    }

    set(key, hash, callback){
        this.client.hmset(this.prefix + ":" + key, stringifyHash(hash), callback);
    }

    setProp(key, propName, value, callback){
        this.client.hset(this.prefix + ":" + key, propName, stringify(value), callback);
    }

    get(key, callback){
        this.client.hgetall(this.prefix + ":" + key, (err, hash) => {
            callback(err, hash && parseHash(hash));
        });
    }

    getProp(key, propName, callback){
        this.client.hget(this.prefix + ":" + key, propName, (err, value) => {
            callback && callback(err, !err && parse(value));
        });
    }

    del(key, callback){
        this.client.del(this.prefix + ":" + key, callback);
    }

    delProp(key, propName, callback){
        this.client.hdel(this.prefix + ":" + key, propName, callback);
    }
}

module.exports = RedisHashes;