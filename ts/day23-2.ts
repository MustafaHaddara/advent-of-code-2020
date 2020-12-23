import { SolveFunc } from './types';

export const solve: SolveFunc = (lines) => {
  const cups: FastLinkedList = starting_state(lines);

  let current = cups.head;
  for (let i = 0; i < 10000000; i++) {
    rotate(cups, current);
    current = current.next;
  }

  const cup1 = find(cups, 1);
  return cup1.next.val * cup1.next.next.val;
};

export const testInput = ['389125467'];

type LinkedListNode = {
  val: number;
  next: LinkedListNode;
  prev: LinkedListNode;
};

type FastLinkedList = {
  lookup: Map<number, LinkedListNode>;
  head: LinkedListNode;
};

const find = (l: FastLinkedList, val: number): LinkedListNode => l.lookup.get(val);

const has = (l: FastLinkedList, val: number): boolean => l.lookup.has(val);

const remove = (l: FastLinkedList, head: LinkedListNode, num_to_remove: number): LinkedListNode => {
  const prev = head.prev;
  prev.next = null;
  head.prev = null;
  let last = head;
  for (let i = 0; i < num_to_remove; i++) {
    l.lookup.delete(last.val);
    last = last.next;
  }
  prev.next = last;
  last.prev.next = null;
  last.prev = prev;
  return head;
};

const insert = (l: FastLinkedList, predecessor: number, chunk: LinkedListNode) => {
  const p = find(l, predecessor);
  const old_next = p.next;
  p.next = chunk;
  chunk.prev = p;
  let last = chunk;
  while (last.next !== null) {
    l.lookup.set(last.val, last);
    last = last.next;
  }
  l.lookup.set(last.val, last);

  last.next = old_next;
  old_next.prev = last;
};

const starting_state = (lines): FastLinkedList => {
  const state: number[] = lines[0].split('').map((c) => parseInt(c));
  let next = 10;
  while (state.length < 1000000) {
    state.push(next);
    next++;
  }

  const lookup: Map<number, LinkedListNode> = new Map();
  let first = null;
  let prev = null;
  for (let i = 0; i < state.length; i++) {
    const num = state[i];
    const node = {
      val: num,
      next: null,
      prev: prev,
    };
    if (first === null) first = node;

    lookup.set(num, node);
    if (prev !== null) prev.next = node;
    prev = node;
  }

  // join the loop at the end
  prev.next = first;
  first.prev = prev;
  return {
    lookup,
    head: first,
  };
};

const rotate = (cups: FastLinkedList, current: LinkedListNode) => {
  const toMove = remove(cups, current.next, 3);
  let target = current.val - 1;
  //   console.log(has(cups, target));
  while (!has(cups, target)) {
    target -= 1;
    if (target <= 0) {
      target = 1000000;
    }
  }
  insert(cups, target, toMove);
};
