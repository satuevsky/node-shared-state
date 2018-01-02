/**
 * Created by Islam on 26.12.2016.
 */

let MemoryCache = require('./src/memory'),
	RedisCache = require('./src/redis'),
	FakeCache = require('./src/fake');

module.exports = {
	MemoryCache,
	RedisCache,
	FakeCache
};