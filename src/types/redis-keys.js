let {parse, stringify} = require('./redis-utils');

class RedisKeys{
    /**
     * @param {string} prefix
     * @param {RedisState} state
     * @param {number} [expire] - timeout in ms for auto removing keys
     * @param valuesType
     */
    constructor({prefix, state, expire}){
        this.client = state.redisClient;
        this.prefix = prefix;
    }

    set(key, value, callback){
        this.client.set(this.prefix + ":" + key, stringify(value), callback);
    }

    get(key, callback){
        this.client.get(this.prefix + ":" + key, (err, val) => {
            callback && callback(err, parse(val));
        });
    }

    del(key, callback){
        this.client.del(this.prefix + ":" + key, callback);
    }
}


module.exports = RedisKeys;