let redis = require('redis'),
    BaseState = require('./base-state'),
    Keys = require('./types/redis-keys'),
    Hashes = require('./types/redis-hashes');

class RedisState extends BaseState{
    /**
     * @param {string} [prefix]
     * @param redisConnection - options for connection to redis
     */
    constructor({prefix, redisConnection}){
        super({prefix, types: {Keys, Hashes}});
        this.redisClient = redis.createClient(redisConnection);

        this.redisClient.on('error', (err) => {
            console.error("RedisState.constructor client error: ", err);
        });
    }
}

module.exports = RedisState;