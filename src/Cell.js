function Cell(i, j){
  this.i = i;
  this.j = j;
  this.blocked = false;
  this.visited = false;
  
  this.show = function(){
    x = this.i * 10;
    y = this.j * 10;
    stroke(255);
    noFill(); 
    if(this.blocked){
      fill(0);
    }
    if(!this.blocked && this.visited){
      fill(255,155,155,100);
    }

   
    rect(x, y, 10, 10);
   
    
  }
  function index(i, j){
    if(i < 0 || j < 0 || i > 100 || j > 100){
      return -1;
    }
    return i + j * 101;
  }
  
  this.checkNeighbors = function(grid){
    var temp = [];
    var neighbors = [];


    temp.push(grid[index(i, j-1)]);
    temp.push(grid[index(i+1,j)]);
    temp.push(grid[index(i, j+1)]);
    temp.push(grid[index(i-1,j)]);
    console.log(temp)


    for(let i = 0; i < temp.length; i++){
      if(temp[i] && !temp[i].visited){
        neighbors.push(temp[i]);
      }
    }
    console.log(neighbors)
    var r = floor(random(0, neighbors.length));
    return neighbors[r];


  }
}
    
  