import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../utils/comparator/Comparator';

export default class DoublyLinkedList {

    /**
     * 
     * @param {Function} comparatorFunction 
     */
    constructor(comparatorFunction) {
        /** @var DoublyLinkedListNode */
        this.head = null;

        /** @var DoublyLinkedListNode */
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * 
     * @param {*} value 
     * @returns {DoublyLinkedListNode}
     */
    prepend(value) {
        //Make a new node
        const newNode = new DoublyLinkedListNode(value, this.head);

        if(this.head)
            this.head.previous = newNode;
        this.head = newNode;

        if(!this.tail)
            this.tail = newNode;


        return this;
    }

    /**
     * 
     * @param {*} value 
     * @returns {DoublyLinkedListNode}
     */
    append(value) {
        /*Make a new node*/
        const newNode = new DoublyLinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }

        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;

        return this;
    }

    /**
     * @param {*} value
     * @memberof DoublyLinkedListNode
     * @returns {DoublyLinkedListNode}
     */
    delete(value) {
        if (!this.head)
            return null;
            
        let deletedNode = null;
        let currentNode = this.head;

        while(currentNode) {
            if(this.compare.equal(currentNode.value, value)) {
                deletedNode = currentNode;
                if(deletedNode === this.head) {
                    this.head = deletedNode.next;

                    if(this.head)
                        this.head.previous = null;
                    
                    if(deletedNode === this.tail)
                        this.tail = null;
                } else if(this.deletedNode === this.tail){
                    this.tail = this.deletedNode.previous;
                    this.tail.next = null;
                } else {
                    const previous = deletedNode.previous;
                    const next = deletedNode.next;
                    previous.next = next;
                    next.previous = previous;
                }
            }

            currentNode = currentNode.next
        }

        return deletedNode;
    }

    /**
     *
     *
     * @param {object} findParams
     * @param {*} findParams.value
     * @param {Function} [findParams.callback]
     * @memberof DoublyLinkedList
     */
    find({
        value = undefined,
        callback = undefined
    }) {
        if (!this.head)
            return null;

        let currentNode = this.head;

        while (currentNode) {
            //If callback is specified, then try to find by callback
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @memberof DoublyLinkedList
     * @returns {DoublyLinkedListNode[]}
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     *
     *
     * @param {Function} callback
     * @memberof LinkedList
     * @returns {string}
     */
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }
}