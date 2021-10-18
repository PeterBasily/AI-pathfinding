/*Author: Peter Basily
 *Date: 10/17/2021
 *Implementation of min-heap
 */

class MinHeap{
    constructor(fn){
        this.fn = fn;
        this.items = [];
        this.size = 0;
    }
    /*--Inserts a cell into the heap at the top then bubbles it up --*/
    insert = (cell) =>{
       
        this.items.push(cell);
        this.bubbleUp(this.size);

        
        this.size++;

    }
    /*-- Bubbles up the cell in the given index if it's less than its parent based on the tiebreaker functions --*/
    bubbleUp = (index) =>{
        let parent = Math.floor(index/2);
        
        if(!this.items[parent]){

        }
        else if(this.fn(this.items[index],this.items[parent]) < 0)
        {
            let temp = this.items[parent];
            this.items[parent] = this.items[index];
            this.items[index] = temp;
            this.bubbleUp(parent);
            

        }
    }
    /*-- Returns the top cell in the array --*/
    peek = function(){
        return this.items[0];
    }
     
    /*-- Removes a given cell --*/
    remove = (cell) =>{
        let index = this.items.indexOf(cell)
        if (index === -1){
            console.log("Item not found")
        }
        else{
            let lastIndex = this.size - 1
            this.items[index] = this.items[lastIndex];
            this.items.pop();
            
            if (heap.items[index]){
                this.bubbleDown(index);
            }
            this.size--;
        }

    }
    /* removes and returns the lowest value cell based on the fn given */
    extractMin = () => {
        if(this.size > 0){
            var min = this.items[0];
            this.items[0] = this.items[this.size-1];
            this.items.pop();
            this.size--;
            this.bubbleDown(0);
            return min;
          }
          else
            return undefined;
    }
    /* bubbles down the given index */
    bubbleDown = (index) =>{
        let left = 2 * index;
        let right = 2 * index + 1;
        let smallest = index;
        
        if (this.items[left] && this.fn(this.items[left],this.items[smallest]) < 0){
            smallest = left;
        }

        if (this.items[right] &&  this.fn(this.items[right],this.items[smallest]) < 0){
            smallest = right;
        }

        if (smallest != index){
            let temp = this.items[smallest];
            this.items[smallest] = this.items[index];
            this.items[index] = temp;
            this.bubbleDown(smallest);
        }
        

        

    }
    /* Returns the items array  */
    getItems = () =>{
        return this.items;
    }
    /* Checks if the heap contains a certain cell */
    has = (cell) =>{
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].compareTo(cell)){
                return true;
            }
        }
        return false;
    }
    /* returns true if heap is empty or false if it contains at least 1 item */
    isEmpty = () =>{
        if(this.size === 0){
            return true;
        }
        return false;

    }
    /* Returns the size of the heap */
    getSize = () =>{
        return this.size;
    }
}
