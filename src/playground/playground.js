import Comparator from "../utils/comparator/Comparator.js";

export class DoublyLinkedListNode {
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export class DoublyLinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  toArray() {
    const nodes = [];

    let pointer = this.head;

    while (pointer) {
      nodes.push(pointer);
      pointer = pointer.next;
    }

    return nodes;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  append(value) {
    let newNode = new DoublyLinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }

    return this;
  }

  prepend(value) {
    let newNode = new DoublyLinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    return this;
  }

  fromArray(arr) {
    arr.forEach((i) => this.append(i));
  }

  delete(value) {
    let deletedNode = null;
    let currNode = this.head;

    while (currNode) {
      if (this.compare.equal(currNode.value, value)) {
        deletedNode = currNode;

        if (this.head === deletedNode) {
          this.head = this.head.next;
          if (this.head) this.head.previous = null;
          else this.tail = null;
        } else if (this.tail === deletedNode) {
          this.tail = this.tail.previous;
          if (this.tail) this.tail.next = null;
          else this.head = null;
        } else {
          let nextNode = deletedNode.next;
          let prevNode = deletedNode.previous;
          prevNode.next = nextNode;
          nextNode.previous = prevNode;
        }
      }

      currNode = currNode.next;
    }
    return deletedNode;
  }

  deleteTail() {
    if (!this.tail) return null;

    let deletedNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedNode;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deletedNode;
  }

  deleteHead() {
    if (!this.head) return null;

    let deletedNode = this.head;

    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      return deletedNode;
    }

    this.head = this.head.next;
    this.head.previous = null;

    return deletedNode;
  }

  find({ value, callback }) {
    if (!this.head) return null;
    let currNode = this.head;
    while (currNode) {
      if (callback && callback(currNode.value)) return currNode;
      if (value !== undefined && this.compare.equal(currNode.value, value))
        return currNode;

      currNode = currNode.next;
    }
    return null;
  }

  reverse() {
    let currNode = this.head;
    let prevNode,
      nextNode = null;

    while (currNode) {
      prevNode = currNode.previous;
      nextNode = currNode.next;

      currNode.next = prevNode;
      currNode.previous = nextNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
const linkedList = new DoublyLinkedList();

linkedList.append(1).append(2).append(3).append(4);

linkedList.reverse();

console.log(linkedList.toString());

linkedList.reverse().reverse();

console.log(linkedList.toString());
