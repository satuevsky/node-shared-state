class RedisKeys{
    /**
     * @param {string} prefix
     * @param {RedisState} state
     * @param {number} [expire] - timeout in ms for auto removing keys
     * @param valuesType
     */
    constructor({prefix, expire, state, valuesType}){
        this.client = state.redisClient;
        this.valuesType = valuesType;
        this.prefix = prefix;
    }

    set(key, value, callback){
        this.client.set(this.prefix + ":" + key, value, callback);
    }

    get(key, callback){
        this.client.get(this.prefix + ":" + key, (err, val) => {
            if(err){
                callback && callback(err);
            }else{
                callback && callback(null, castValue(val, this.valuesType));
            }
        });
    }

    del(key, callback){
        this.client.del(this.prefix + ":" + key, callback);
    }
}

function castValue(val, type){
    if(val === undefined){
        return val;
    }

    switch (type){
        case String:
            return val;
        case Number:
            return Number(val);
        case Boolean:
            return !(!val || val === "0" || val === "false");
        default:
            return val;
    }
}


module.exports = RedisKeys;