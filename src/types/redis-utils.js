function stringify(value){
    if(value == null){
        return "";
    }else{
        return JSON.stringify(value);
    }
}

function stringifyHash(hash) {
    let result = Object.create(null),
        propName;

    for(propName in hash){
        result[propName] = stringify(hash[propName]);
    }

    return result;
}

function parse(string){
    if(!string){
        return null;
    }else{
        return JSON.parse(string);
    }
}

function parseHash(hash) {
    let result = {},
        propName;

    for(propName in hash){
        result[propName] = parse(hash[propName]);
    }

    return result;
}

module.exports = {
    parse,
    stringify,
    parseHash,
    stringifyHash
};