let {castHash, castValue} = require('./redis-utils');

class RedisHashes{
    /**
     * @param prefix
     * @param {number} [expire] - timeout in ms for auto removing hashes
     * @param state
     * @param {object} [propTypes]
     */
    constructor({prefix, state, expire, propTypes = {}}){
        this.client = state.redisClient;
        this.propTypes = {
            types: propTypes,
            propNames: Object.keys(propTypes)
        };
        this.prefix = prefix;
    }

    set(key, hash, callback){
        this.client.hmset(this.prefix + ":" + key,  hash, callback);
    }

    setProp(key, propName, value, callback){
        this.client.hset(this.prefix + ":" + key, propName, value, callback);
    }

    get(key, callback){
        this.client.hgetall(this.prefix + ":" + key, (err, hash) => {
            callback(err, hash && castHash(hash, this.propTypes));
        });
    }

    getProp(key, propName, callback){
        this.client.hget(this.prefix + ":" + key, propName, (err, val) => {
            callback && callback(err, castValue(val, this.propTypes.types[propName]));
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