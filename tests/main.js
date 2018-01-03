let mocha = require('mocha'),
    assert = require('assert'),
    MemoryCache = require('../src/memory');

let cache = new MemoryCache({prefix: "c1", capacity: 3});

describe("MemoryCache", () => {
    cache.set("key1", 111);
    cache.set("key2", 111);
    cache.set("key3", 111);
    cache.set("key4", 111);
    cache.inc("key3", 1);
    cache.inc("key5", 2);
    cache.rem("key4");
    checkSize(2);
    checkVal("key1", undefined);
    checkVal("key4", undefined);
    checkVal("key3", 112);
    checkVal("key5", 2);


    function checkSize(n) {
        it('should cache size is ' + n, function () {
            cache.size((err, size) => {
                assert.equal(err, null);
                assert.equal(size, n);
            })
        });
    }

    function checkVal(key, val) {
        it(`should cache key value is ${key}=${val}`, function () {
            cache.get(key, (err, v) => {
                assert.equal(err, null);
                assert.equal(v, val);
            })
        });
    }
});