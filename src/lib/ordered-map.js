class OrderedMap extends Map {
    constructor({capacity, expire} = {}) {
        super();
        this.capacity = capacity;
        this.expire = expire;
        this._first = null; //first element
        this._last = null;  //last element

        if(expire){
            runAutoremover(this);
        }
    }

    set(key, value) {
        if (!super.has(key)) {    //if has not key then add new element to top
            let elem = {
                key, value,
                next: this._first,
                prev: null,
                time: Date.now()
            };

            if (!super.size) {
                //if map is empty then this new element should be last too
                this._last = elem;
            } else {
                //else set this element as previous for current first element
                this._first.prev = elem;
            }

            //set new element as first
            this._first = elem;
            super.set(key, elem);

            //remove last element if capacity is overflow
            if(this.capacity && this.capacity < super.size){
                this.delete(this._last.key);
            }
        } else {
            let elem = super.get(key);
            elem.value = value;
            moveToTop(this, elem);
        }
        return this;
    }

    get(key, callback) {
        let elem = super.get(key);

        if (elem) {
            moveToTop(this, elem);
        }

        return elem && elem.value;
    }

    delete(key) {
        let elem = super.get(key);

        //if element exist then remove them links
        if (elem) {
            if (elem.next) {
                elem.next.prev = elem.prev;
            } else {
                this._last = elem.prev;
            }

            if (elem.prev) {
                elem.prev.next = elem.next;
            } else {
                this._firts = elem.next;
            }
        }

        return super.delete(elem.key);
    }

    inc(key, value=1){
        let elem = super.get(key),
            newValue = elem ? elem.value + value : value;
        this.set(key, newValue);
        return newValue;
    }
}

function runAutoremover(map){
    setTimeout(check, map.expire);
    function check(){
        if(map._last && Date.now() - map._last.time > map.expire){
            map.delete(map._last.key);
        }
        let timeout = map._last ? Date.now() - map._last.time : map.expire;
        setTimeout(check, timeout);
    }
}


function moveToTop(self, elem) {
    if (elem !== self._first) {
        if (elem.next) {
            elem.next.prev = elem.prev;
        } else {
            self._last = elem.prev;
        }

        elem.prev.next = elem.next;
        elem.prev = null;
        elem.next = self._first;
        elem.next.prev = elem;
        self._first = elem;
    }
    elem.time = Date.now();
}

module.exports = OrderedMap;