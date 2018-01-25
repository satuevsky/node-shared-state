class MemorySets{
    constructor(){
        this.setsMap = new Map();
    }

    /**
     * Add member to list.
     * @param {string} key
     * @param {*} member
     * @param cb
     */
    add(key, member, cb){
        let set = this.setsMap.get(key),
            added = 0;
        if(!set){
            set = new Set();
            this.setsMap.set(key, set);
        }

        if(!set.has(member)){
            added = 1;
        }
        set.add(member);
        cb && cb(null, added);
    }

    /**
     * Remove member from a set.
     * @param key
     * @param member
     * @param cb
     */
    rem(key, member, cb){
        let set = this.setsMap.get(key),
            deleted = 0;

        if(set && set.delete(member)){
            deleted = 1;
            if(set.size === 0){
                this.setsMap.delete(key);
            }
        }

        cb && cb(null, deleted);
    }

    /**
     * Returns all the members of the set value stored at key.
     * @param key
     * @param cb
     */
    members(key, cb){
        let set = this.setsMap.get(key),
            result = [];

        if(set){
            set.forEach((member) => {
                result.push(member);
            });
        }

        cb(null, result);
    }

    /**
     * Get the set size.
     * @param key
     * @param cb
     */
    card(key, cb){
        let set = this.setsMap.get(key),
            size = set ? set.size : 0;

        cb(null, size);
    }
}

module.exports = MemorySets;