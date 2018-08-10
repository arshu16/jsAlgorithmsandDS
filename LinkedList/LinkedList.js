import LinkedListNode from './LinkedListNode';
import Comparator from '../utils/comparator/Comparator';

export default class LinkedList {

    /**
     * 
     * @param {Function} comparatorFunction 
     */
    constructor(comparatorFunction) {  
        /** @var LinkedListNode */
        this.head = null;

        /** @var LinkedListNode */
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * 
     * @param {*} value 
     * @returns {LinkedList}
     */
    prepend(value) {
        //Make a new node
        const newNode = new LinkedListNode(value);
        this.head = newNode;

        //Make a new tail if there isn't any
        if(!this.tail)
            this.tail = newNode;

        return this;
    }

    /**
     * 
     * @param {*} value 
     * @returns {LinkedList}
     */
    append(value) {
        /*Make a new node*/
        const newNode = new LinkedListNode(value);

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    /**
     * @param {*} value
     * @memberof LinkedList
     * @returns {LinkedList}
     */
    delete(value) {
        if(!this.head)
            return null;
        let deletedNode = null;

        //If head is to be deleted, then make the next node that is different 
        //from the head, to be a new head.
        while(this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        if(currentNode !== null) {
            //if next node is to be deleted, then make next node to next next one
            while(currentNode.next) {
                if(this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        //Check if tail is to be deleted
        if(this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return currentNode;
    }

    /**
     *
     *
     * @param {object} findParams
     * @param {*} findParams.value
     * @param {Function} [findParams.callback]
     * @memberof LinkedList
     */
    find({value = undefined, callback = undefined}) {
        if(!this.head) 
            return null;

        let currentNode = this.head;
        
        while (currentNode) {
            //If callback is specified, then try to find by callback
            if(callback && callback(currentNode.value)) {
                return currentNode;
            }

            if(value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        
        return null;
    }

    /**
     * @memberof LinkedList
     * @returns {LinkedListNode[]}
     */
    toArray() {
        const nodes = [];
        
        let currentNode = head;
        while(currentNode) {
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