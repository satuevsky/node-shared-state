let {parse, stringify} = require('./redis-utils');

class RedisSets{
    constructor({prefix, state}){
        this.prefix = prefix;
        this.client = state.redisClient;
    }

    /**
     * Add member to list.
     * @param {string} key
     * @param {*} member
     * @param cb
     */
    add(key, member, cb){
        key = this.prefix + ':' + key;
        member = stringify(member);

        this.client.sadd(key, member, cb);
    }

    /**
     * Remove member from a set.
     * @param key
     * @param member
     * @param cb
     */
    rem(key, member, cb){
        key = this.prefix + ':' + key;
        member = stringify(member);

        this.client.srem(key, member, cb);
    }

    /**
     * Returns all the members of the set value stored at key.
     * @param key
     * @param cb
     */
    members(key, cb){
        this.client.smembers(this.prefix + ':' + key, (err, items) => {
            cb(err, items && items.map(parse));
        });
    }

    /**
     * Get the set size.
     * @param key
     * @param cb
     */
    card(key, cb){
        this.client.scard(this.prefix + ':' + key, cb);
    }
}

module.exports = RedisSets;