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
            this.bubbleUp(this.size-1);

        }
        this.size++;

    }
    bubbleUp = (index) =>{
        var parent;
        if(this.items.length % 2 === 1){
            parent = (index-1)/2;
        }
        else {
            parent = (index-2)/2;
        }
        if(this.heuristic(this.items[index]) < this.heuristic(this.items[parent])){
            var temp = this.items[parent];
            this.items[parent] = this.items[index];
            this.items[index] = temp;
            this.bubbleUp(parent);
            

        }
    }

    remove = (cell) =>{

    }
    isEmpty = () =>{

    }
    getSize = () =>{

    }
    getMax = () =>{
    

    }

}