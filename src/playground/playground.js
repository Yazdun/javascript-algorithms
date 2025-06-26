import LinkedList from "../data-structures/linked-list/LinkedList";

class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  push(value) {
    this.linkedList.prepend(value);
  }

  pop() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  peek() {
    return this.linkedList.head ? this.linkedList.head.value : null;
  }

  toArray() {
    return this.linkedList.toArray().map((i) => i.value);
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}

export default Stack;
