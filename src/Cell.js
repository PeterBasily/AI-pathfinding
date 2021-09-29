function Cell(i, j){
  this.i = i;
  this.j = j;
  this.blocked = true;
  this.visited = false;
  
  this.show = function(){
    x = this.i * 10;
    y = this.j * 10;
    stroke(255);
    if(this.blocked){
      
      noFill();
      rect(x, y, 10, 10);
    }
    else {
      noStroke();
      fill(255,155,155,100);
      rect(x, y, 10, 10);
    }

   
    
   
    
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
    
  