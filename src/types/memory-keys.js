let OrderedMap = require('../lib/ordered-map');

class MemoryKeys{
    /**
     * @param {number} [expire] - timeout in ms for auto removing keys
     * @param [valuesType] - values type, uses on get values.
     */
    constructor({expire}){
        this.map = !expire ? new Map() : new OrderedMap({expire});
    }

    set(key, value, callback){
        this.map.set(key, value);
        callback && callback();
    }

    get(key, callback){
        callback && callback(null, this.map.get(key));
    }

    del(key, callback){
        let exist = this.map.delete(key);
        callback && callback(null, exist);
    }
}

module.exports = MemoryKeys;