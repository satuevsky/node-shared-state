function castValue(value, type){
    if(value === undefined || type === undefined){
        return value;
    }

    switch (type){
        case String:
            return value;
        case Number:
            return Number(value);
        case Boolean:
            return !(!value || value === "0" || value === "false");
        default:
            return value;
    }
}

function castHash(hash, props){
    if(hash && props.propNames.length){
        let i = 0;
        for(; i < props.propNames.length; i++){
            let propName = props.propNames[i];
            if(Object.prototype.hasOwnProperty.call(hash, propName)){
                hash[propName] = castValue(hash[propName], props.types[propName]);
            }
        }
    }
    return hash;
}

module.exports = { castValue, castHash };