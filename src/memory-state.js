let BaseState = require('./base-state'),
    Keys = require('./types/memory-keys'),
    Hashes = require('./types/memory-hashes');

class MemoryState extends BaseState{
    /**
     * @param {string} [prefix]
     */
    constructor({prefix}){
        super({prefix, types: {Keys, Hashes}});
    }
}

module.exports = MemoryState;