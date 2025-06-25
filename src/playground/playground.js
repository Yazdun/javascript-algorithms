import LinkedList from "../data-structures/linked-list/LinkedList";

class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  dequeue() {
    let removedNode = this.linkedList.deleteHead();

    return removedNode ? removedNode.value : null;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.linkedList.head.value;
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}

export default Queue;
