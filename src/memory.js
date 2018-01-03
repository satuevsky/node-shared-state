/**
 * Created by Islam on 01.05.2017.
 */

let caches = {},
	BaseCache = require('./base-cache'),
    OrderedMap = require('./lib/ordered-map');



class MemoryCache extends BaseCache{

	/**
	 * @param {string}  [prefix] - unique id for cache
	 * @param {boolean} [hard] - if true then cache will not be clear
     * @param {number}  [capacity=5000] = caches capacity
     * @return {*}
     */
	constructor({prefix, hard, capacity = 5000} = {}){
		super();

		if(prefix){
			if(caches[prefix])return caches[prefix];
			caches[prefix] = this;
		}

		this.hard = hard;
	    this.valuesMap = hard ? new Map() : new OrderedMap({capacity});
	}

	set(key, value, callback){
		this.valuesMap.set(key, value);
		callback && callback();
	}

	get(key, callback){
		callback && callback(null, this.valuesMap.get(key));
	}

	rem(key, callback){
	    let ok = this.valuesMap.delete(key);
		callback && callback(null, ok);
	}

	inc(key, val=1, callback){
	    let newVal = null;
		if(this.hard){
		    let oldVal = this.valuesMap.get(val);
            newVal = oldVal ? oldVal+val : val;
		    this.valuesMap.set(key, newVal);
        }else{
		    newVal = this.valuesMap.inc(key, val)
        }
        callback && callback(null, newVal);
	}

	size(callback){
	    callback && callback(null, this.valuesMap.size);
    }
}

module.exports = MemoryCache;

