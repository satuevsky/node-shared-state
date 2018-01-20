const stateInstances = new Map();

class BaseState {

    /**
     * BaseState's constructor.
     * @param {string} [prefix]
     * @param {object} types
     * @param types.Keys - constructor for creating KeyValues instance.
     * @param types.Hashes - constructor for creating Hashes instance.
     * @constructor
     */
    constructor({prefix, types}){
        prefix = prefix || "@DEF_INSTANCE";
        let instance = stateInstances.get(prefix);
        if(!instance){
            instance = this;
            instance.types = types;
            instance.prefix = prefix;
            instance.typeInstances = new Map();
            stateInstances.set(prefix, instance);
        }
        return instance;
    }

    /**
     * Get instance for storing key-value pairs.
     * @param {string} [prefix] - prefix for Keys instance.
     * @param [valuesType]
     * @param [...params]
     */
    Keys({prefix, valuesType, ...params}){
        return getStore(this, 'Keys', prefix, 'K', {valuesType, ...params});
    }

    /**
     * Get instance for storing key-value pairs.
     * @param {string} [prefix]
     * @param {object} [propTypes]
     * @param [...params]
     */
    Hases({prefix, propTypes, ...params}){
        return getStore(this, 'Hashes', prefix, 'H', {propTypes, ...params});
    }
}

function getStore(stateInstance, type, prefix, typePrefix, params){
    prefix = `${stateInstance.prefix}:${typePrefix}:${prefix || (prefix || '@DEF')}`;
    let instance = stateInstance.typeInstances.get(prefix);
    if(!instance){
        instance = new stateInstance.types[type]({
            prefix,
            state: stateInstance,
            ...params
        });
        stateInstance.typeInstances.set(prefix, instance);
    }
    return instance;
}

module.exports = BaseState;