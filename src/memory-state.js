let BaseState = require('./base-state'),
    Keys = require('./types/memory-keys'),
    Sets = require('./types/memory-sets'),
    Hashes = require('./types/memory-hashes');


/**
 * MemoryState work as RedisState but
 * only in current process and MemoryState
 * faster than RedisState.
 */
class MemoryState extends BaseState{
    /**
     * @param {string} [prefix]
     */
    constructor({prefix}){
        super({prefix, types: {Keys, Hashes, Sets}});
    }
}

module.exports = MemoryState;