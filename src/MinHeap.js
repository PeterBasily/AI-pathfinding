class MinHeap{
    constructor(fn){
        this.fn = fn;
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
        let left = 2 * index;
        let right = 2 * index + 1;
        let smallest = index;
        
        if (this.items[left] && (left <= this.items.length && this.fn(this.items[left],this.items[smallest]) < 0)){
            smallest = left;
        }

        if (this.items[right] && (right <= this.items.length && this.fn(this.items[right],this.items[smallest]) < 0)){
            smallest = right;
        }

        if (smallest != index){
            let temp = this.items[smallest];
            this.items[smallest] = this.items[index];
            this.items[index] = temp;
            this.bubbleDown(smallest);
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
