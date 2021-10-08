class MinHeap{
    constructor(heuristic){
        this.heuristic = heuristic;
        this.items = [];
        this.size = 0;
    }

    insert = (cell) =>{
        if(this.size === 0){
            this.items.push(cell);
        }
        else{
            this.items.push(cell);
            this.bubbleUp(this.size);

        }
        this.size++;

    }
    bubbleUp = (index) =>{
        let parent;
        if(index % 2 === 1){
            parent = (index-1)/2;
        }
        else {
            parent = (index-2)/2;
        }
        if(!this.items[parent]){

        }
        else if(this.heuristic(this.items[index].f) < this.heuristic(this.items[parent].f)
                || (this.heuristic(this.items[index].f) === this.heuristic(this.items[parent].f))
                && (this.heuristic(this.items[index].h) < this.heuristic(this.items[parent].h)))
        {
            let temp = this.items[parent];
            this.items[parent] = this.items[index];
            this.items[index] = temp;
            this.bubbleUp(parent);
            

        }
    }
     

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

    bubbleDown = (index) =>{
        let left = 2 * (index + 1) - 1;
        let right = 2 * (index + 1);
        let largest = index;
        if(!(this.items[left] && this.items[right]))
        {

        }
        else{
            if (left <= this.items.length && this.heuristic(this.items[left].f) < this.heuristic(this.items[largest].f)){
                largest = left;
            }
    
            if (right <= this.items.length && this.heuristic(this.items[right].f) < this.heuristic(this.items[largest].f)){
                largest = right;
            }
    
            if (largest != index){
                let temp = this.items[largest];
                this.items[largest] = this.items[index];
                this.items[index] = temp;
                this.bubbleDown(largest);
            }
        }

        

    }
    getItems = () =>{
        return this.items;
    }
    has = (cell) =>{
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].compareTo(cell)){
                return true;
            }
        }
        return false;
    }
    
    isEmpty = () =>{
        if(this.size === 0){
            return true;
        }
        return false;

    }
    getSize = () =>{
        return this.size;
    }
}
