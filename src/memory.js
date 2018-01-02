/**
 * Created by Islam on 01.05.2017.
 */

let caches = {},
	BaseCache = require('./base-cache');



class MemoryCache extends BaseCache{

	/**
	 *
	 * @param {Object} params
	 * @param {String} params.prefix - unique id for cache
	 * @param {Boolean} params.hard - if true then cache will not be clear
	 * @return {*}
	 */

	constructor(params){
		super();
		params = params || {};
		if(params.prefix){
			if(caches[params.prefix])return caches[params.prefix];
			caches[params.prefix] = this;
		}

		this.hard = params.hard;
		this.capacity = this.hard ? 0 : 5000;
		this.values = new Map();
		this._first = null;
		this._last = null;
	}

	set(key, val, callback){
		if(!this.values.has(key)){
			if(!this.hard && this.values.size >= this.capacity){
				removeElem(this, this._first);
			}
			addElem(this, key, val);
		}else{
			let elem = this.values.get(key);
			elem.v = val;
			if(!this.hard)
				moveTop(this, elem);
		}
		callback && callback();
	}

	get(key, callback){
		let elem;
		if(this.values.has(key)){
			elem = this.values.get(key);
			if(!this.hard)
				moveTop(this, elem);
		}
		callback && callback(null, elem && elem.v);
	}

	rem(key, cb){
		let elem;
		if(this.values.has(key)){
			elem = this.values.get(key);
			removeElem(this, elem);
		}
		cb && cb(null, !!elem);
	}

	inc(key, val, cb){
		let elem;
		if(this.values.has(key)){
			elem = this.values.get(key);
			elem.v += val;
		}else{
			elem = addElem(this, key, val);
		}
		cb && cb(null, elem.v);
	}
}


module.exports = MemoryCache;


function addElem(self, key, v){
	let elem = {
		key, v,
        next: self._first,
		prev: null,
	};

	if(!self.values.size){
		self._last = elem;
	}else{
		self._first.prev = elem;
	}

	self._first = elem;
	self.values.set(key, elem);

	return elem;
}
function removeElem(self, elem){
	self.values.delete(elem.key);

	if(elem.next){
		elem.next.prev = elem.prev;
	}else{
		self._last = elem.prev;
	}

	if(elem.prev){
		elem.prev.next = elem.next;
	}else{
		self._firts = elem.next;
	}
}
function moveTop(self, elem){
	if(self._first === elem)return;

	if(elem.next){
		elem.next.prev = elem.prev;
	}else{
		self._last = elem.prev;
	}

	elem.prev.next = elem.next;
	elem.prev = null;
	elem.next = self._first;
	elem.next.prev = elem;
	self._first = elem;
}

