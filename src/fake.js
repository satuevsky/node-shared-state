/**
 * Created by Islam on 01.05.2017.
 */

let BaseCache = require('./base-cache'),
	SimpleCache = require('./memory');



class FakeCache extends BaseCache{
	constructor(params){
		super(params);
		params = params || {};
		if(params.hard){
			return new SimpleCache(params);
		}
	}
}

module.exports = FakeCache;