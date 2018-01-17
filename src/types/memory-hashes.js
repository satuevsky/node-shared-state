let OrderedMap = require('../lib/ordered-map');

class MemoryHashes{
    /**
     * @param {number} [expire] - timeout in ms for auto removing hashes
     */
    constructor({expire}){
        this.map = !expire ? new Map() : new OrderedMap({expire});
    }

    set(key, hash, callback){
        this.map.set(key, hash);
        callback && callback();
    }

    setProp(key, propName, value, callback){
        let hash = this.map.get(key);
        if(!hash){
            hash = {};
            this.map.set(key, hash);
        }
        hash[propName] = value;
        callback && callback();
    }

    get(key, callback){
        callback && callback(null, this.map.get(key));
    }

    getProp(key, propName, callback){
        let hash = this.map.get(key);
        callback && callback(null, hash && hash[propName]);
    }

    del(key, callback){
        let exist = this.map.delete(key);
        callback && callback(null, exist);
    }

    delProp(key, propName, callback){
        let hash = this.map.get(key);
        delete hash[propName];
        callback && callback();
    }
}

module.exports = MemoryHashes;