let assert = require('assert'),
    RedisState = require('../src/redis-state');

let state = new RedisState({prefix: "test"});

describe("RedisState#Keys expire", () => {
    let expire = 100,
        keys = state.Keys({prefix: "hashes", expire});

    it("#set", (done) => {
        keys.set("keys_ttl_set", 111);
        setTimeout(() => {
            keys.get("keys_ttl_set", (err, val) => {
                assert.ifError(err);
                assert.equal(val, null);
                done();
            });
        }, expire + 10);
    });

    it("#get", (done) => {
        keys.set("keys_ttl_get", 222);

        setTimeout(() => {
            keys.get("keys_ttl_get", () => {});
        }, 50);

        setTimeout(() => {
            keys.get("keys_ttl_get", (err, val) => {
                assert.ifError(err);
                assert.equal(val, 222);
            });
        }, expire + 10);

        setTimeout(() => {
            keys.get("keys_ttl_get", (err, val) => {
                assert.ifError(err);
                assert.equal(val, null);
                done();
            });
        }, 2*expire + 20);
    });
});

describe("RedisState#Hashes expire", () => {
    let expire = 100,
        hashes = state.Hashes({prefix: "hashes", expire});

    it("#set", (done) => {
        hashes.set("hashes_ttl_set", {prop1: 123, prop2: "str123"});
        setTimeout(() => {
            hashes.get("hashes_ttl_set", (err, hash) => {
                assert.ifError(err);
                assert.equal(hash, null);
                done();
            });
        }, expire + 10);
    });

    it("#get", (done) => {
        hashes.set("hashes_ttl_get", {prop1: 123, prop2: "str123"});

        setTimeout(() => {
            hashes.get("hashes_ttl_get", () => {});
        }, 50);

        setTimeout(() => {
            hashes.get("hashes_ttl_get", (err, hash) => {
                assert.ifError(err);
                assert.notEqual(hash, null);
            });
        }, expire + 10);

        setTimeout(() => {
            hashes.get("hashes_ttl_get", (err, hash) => {
                assert.ifError(err);
                assert.equal(hash, null);
                done();
            });
        }, 2*expire + 20);
    });

    it("#setProp", (done) => {
        hashes.set("hashes_ttl_setProp", {prop1: 123, prop2: "str123"});

        setTimeout(() => {
            hashes.setProp("hashes_ttl_setProp", "prop1", 321, () => {});
        }, 50);

        setTimeout(() => {
            hashes.getProp("hashes_ttl_setProp", "prop1", (err, val) => {
                assert.ifError(err);
                assert.equal(val, 321);
            });
        }, expire + 10);

        setTimeout(() => {
            hashes.getProp("hashes_ttl_setProp", "prop1", (err, val) => {
                assert.ifError(err);
                assert.equal(val, null);
                done();
            });
        }, 2*expire + 20);
    });

    it("#getProp", (done) => {
        hashes.set("hashes_ttl_getProp", {prop1: 123, prop2: "str123"});

        setTimeout(() => {
            hashes.getProp("hashes_ttl_getProp", "prop1", () => {});
        }, 50);

        setTimeout(() => {
            hashes.getProp("hashes_ttl_getProp", "prop1", (err, val) => {
                assert.ifError(err);
                assert.equal(val, 123);
            });
        }, expire + 10);

        setTimeout(() => {
            hashes.getProp("hashes_ttl_getProp", "prop1", (err, val) => {
                assert.ifError(err);
                assert.equal(val, null);
                done();
            });
        }, 2*expire + 20);
    });
});