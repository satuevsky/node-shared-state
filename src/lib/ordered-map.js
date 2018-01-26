class OrderedMap extends Map {
    constructor({capacity, expire} = {}) {
        super();
        this.capacity = capacity;
        this.expire = expire;
        this.head = null;   //first element
        this.tail = null;   //last element

        if(expire){
            runAutoremover(this);
        }
    }

    set(key, value) {
        if (!super.has(key)) {    //if has not key then add new element to top
            let elem = {
                key,
                value,
                next: this.head,
                prev: null,
                time: Date.now()
            };

            if (!super.size) {
                //if map is empty then this new element should be last too
                this.tail = elem;
            } else {
                //else set this element as previous for current first element
                this.head.prev = elem;
            }

            //set new element as first
            this.head = elem;
            super.set(key, elem);

            //remove last element if capacity is overflow
            if(this.capacity && this.capacity < super.size){
                this.delete(this.tail.key);
            }
        } else {
            let elem = super.get(key);
            elem.value = value;
            moveToTop(this, elem);
        }
        return this;
    }

    get(key) {
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
                this.tail = elem.prev;
            }

            if (elem.prev) {
                elem.prev.next = elem.next;
            } else {
                this.head = elem.next;
            }
            return super.delete(elem.key);
        }
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
        if(map.tail && Date.now() - map.tail.time >= map.expire){
            map.delete(map.tail.key);
        }

        let timeout =  map.expire;
        if(map.tail){
            timeout -= Date.now() - map.tail.time
        }
        setTimeout(check, timeout);
    }
}


function moveToTop(self, elem) {
    if (elem !== self.head) {
        if (elem.next) {
            elem.next.prev = elem.prev;
        } else {
            self.tail = elem.prev;
        }

        elem.prev.next = elem.next;
        elem.prev = null;
        elem.next = self.head;
        self.head.prev = elem;
        self.head = elem;
    }
    elem.time = Date.now();
}

module.exports = OrderedMap;