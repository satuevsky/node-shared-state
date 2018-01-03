/**
 * Created by Islam on 06.05.2017.
 */

module.exports = class BaseCache{
	get(key, cb){
		cb && cb(new Error("Method 'get' is not implemented"));
	}
	set(key, value, cb){
		cb && cb(new Error("Method 'set' is not implemented"));
	}
	rem(key, cb){
		cb && cb(new Error("Method 'rem' is not implemented"));
	}
	inc(key, val, cb){
		cb && cb(new Error("Method 'inc' is not implemented"));
	}

	size(cb){
	    cb && cb(new Error("Method 'size' is not implemented"))
    }
};