class Cell{
  constructor(i, j)
{
  this.neighbors = [];
  this.i = i;
  this.j = j;
  this.blocked = true;
  this.visited = false;

  this.h;
  this.f = Infinity;
  this.tree;
  this.search;
  this.g = Infinity;
  this.parent = undefined;

}  

  
  show = function(){

    var x = this.i * 10;
    var y = this.j * 10;
    stroke(255);
    if(this.blocked){
      
      noFill();
      rect(x, y, 10, 10);
    }
    else {
      noStroke();
      fill(0,0,0);
      rect(x, y, 10, 10);
    }

    
  }
  highLight = function(fillColor){
    var x = this.i * 10;
    var y = this.j * 10;
    noStroke();
    fill(fillColor);
    rect(x, y, 10, 10)
  }

  index = (i, j) =>{
    if(i < 0 || j < 0 || i > 100 || j > 100){
      return -1;
    }
    return i + j * 101;
  }
  makeNeighbors = function(grid){
    var temp = [];
    temp.push(grid[this.index(this.i, this.j-1)]);
    temp.push(grid[this.index(this.i+1,this.j)]);
    temp.push(grid[this.index(this.i, this.j+1)]);
    temp.push(grid[this.index(this.i-1,this.j)]);
    for(let i = 0; i < temp.length; i++){
      if(temp[i]){
        this.neighbors.push(temp[i]);
      }
    }
    
  }
  
  checkNeighbors = function(){
    var openNeighbors = [];

     
    for(let i = 0; i < this.neighbors.length; i++){
      if(!this.neighbors[i].visited){
          openNeighbors.push(this.neighbors[i]);
        }
    }
    var r = floor(random(0, openNeighbors.length));
    return openNeighbors[r];


  }
  mDistance = (cell) => {
    this.h = (this.i-cell.i) + (this.j-cell.j);
  }
}
    
  