let test = require('./common-test'),
    {MemoryState, RedisState} = require('../index');

let redis = new RedisState({prefix: "test"}),
    memory = new MemoryState({prefix: "test"});


describe("Memory", () => {
    test({state: memory});
});
describe("Redis", () => {
    test({state: redis});
});

