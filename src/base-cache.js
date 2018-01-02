/**
 * Created by Islam on 06.05.2017.
 */

module.exports = class BaseCache{
	get(key, cb){
		cb && cb();
	}
	set(key, value, cb){
		cb && cb();
	}
	rem(key, cb){
		cb && cb();
	}
	inc(key, val, cb){
		cb && cb();
	}
};