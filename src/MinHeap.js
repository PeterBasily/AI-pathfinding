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
        if(this.heuristic(this.items[index]) < this.heuristic(this.items[parent])){
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

    bubbleDown = (index) =>{
        let left = 2 * (index + 1) - 1;
        let right = 2 * (index + 1);
        let largest = index;

        if (left <= this.items.length && this.heuristic(this.items[left]) < this.heuristic(this.items[largest])){
            largest = left;
        }

        if (right <= this.items.length && this.heuristic(items[right]) < this.heuristic(this.items[largest])){
            largest = right;
        }

        if (largest != index){
            let temp = this.items[largest];
            this.items[largest] = this.items[index];
            this.items[index] = temp;
            this.bubbleUp(largest);
        }

    }

    isEmpty = () =>{

    }
    getSize = () =>{

    }
    getMax = () =>{
    

    }

}