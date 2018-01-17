let OrderedMap = require('../lib/ordered-map');

class MemoryKeys{
    /**
     * @param {number} [expire] - timeout in ms for auto removing keys
     * @param [valuesType] - values type, uses on get values.
     */
    constructor({expire, valuesType}){
        this.valuesType = valuesType || String;
        this.map = !expire ? new Map() : new OrderedMap({expire});
    }

    set(key, value, callback){
        this.map.set(key, value);
        callback && callback();
    }

    get(key, callback){
        let value = this.map.get(key);
        callback && callback(null, castValue(value, this.valuesType));
    }

    del(key, callback){
        let exist = this.map.delete(key);
        callback && callback(null, exist);
    }
}

function castValue(value, type){
    if(value === undefined){
        return value;
    }

    switch (type){
        case Number:
            return Number(value);
        case Boolean:
            return !!value;
        case String:
            return String(value);
    }
}

module.exports = MemoryKeys;