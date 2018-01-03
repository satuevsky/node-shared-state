class OrderedMap extends Map {
    constructor({capacity} = {}) {
        super();
        this.capacity = capacity;
        this._first = null; //first element
        this._last = null;  //last element
    }

    set(key, value) {
        if (!super.has(key)) {    //if has not key then add new element to top
            let elem = {
                key, value,
                next: this._first,
                prev: null,
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
}

module.exports = OrderedMap;