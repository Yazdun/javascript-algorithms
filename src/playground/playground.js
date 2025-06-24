import Comparator from "../utils/comparator/Comparator";

export class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(cb) {
    return cb ? cb(this.value) : String(this.value);
  }
}

export class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  toArray() {
    const arr = [];

    if (!this.head) {
      return arr;
    }

    let pointer = this.head;

    while (pointer) {
      arr.push(pointer);
      pointer = pointer.next;
    }

    return arr;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  append(val) {
    let newNode = new LinkedListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  prepend(val) {
    let newNode = new LinkedListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    return this;
  }

  insert(val, rawIdx) {
    let newNode = new LinkedListNode(val);

    if (rawIdx < 0 || rawIdx === 0) {
      this.prepend(val);
      return true;
    }

    let current = this.head;
    let idx = 1;

    while (current) {
      if (rawIdx === idx) break;
      current = current.next;
      idx++;
    }

    if (current) {
      newNode.next = current.next;
      current.next = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    return true;
  }

  delete(value) {
    let deletedNode = null;

    if (!this.head) {
      return deletedNode;
    }

    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  deleteHead() {
    let deletedHead = this.head;

    if (!this.head) {
      return null;
    }

    if (!this.head.next) {
      this.tail = null;
    }

    this.head = deletedHead.next;

    return deletedHead;
  }

  deleteTail() {
    let deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let current = this.head;

    while (current.next) {
      if (current.next.next === null) {
        deletedTail = current.next;
        current.next = null;
        this.tail = current;
      } else {
        current = current.next;
      }
    }

    return deletedTail;
  }

  fromArray(arr) {
    arr.forEach((el) => this.append(el));
  }

  find({ value, callback }) {
    if (!this.head) return null;
    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) return currentNode;
      if (this.compare.equal(currentNode.value, value)) return currentNode;
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  reverse() {
    let currNode = this.head;
    let nextNode = null;
    let prevNode = null;
    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }
    this.tail = this.head;
    this.head = prevNode;
    return this;
  }
}
