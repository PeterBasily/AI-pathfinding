function Cell(i, j){
  this.i = i;
  this.j = j;
  this.blocked = true;
  this.visited = false;

  this.f;
  this.tree;
  this.search = 0;
  this.g = Infinity;

  this.h = function(goal){
    return Math.abs(goal.i - this.i) + Math.abs(goal.j - this.j);
  }

  this.getFValue = function(){
    return this.f;
  }

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
      fill(0,0,0);
      rect(x, y, 10, 10);
    }
  }
  this.highLight = function(fillColor){
    x = this.i * 10;
    y = this.j * 10;
    noStroke();
    fill(fillColor);
    rect(x, y, 10, 10)
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
    var r = floor(random(0, neighbors.length));
    return neighbors[r];

  }

  this.getNeighbors = function(grid){
    var neighbors = [];

    
    neighbors.push(grid[index(i, j-1)]);
    neighbors.push(grid[index(i+1,j)]);
    neighbors.push(grid[index(i, j+1)]);
    neighbors.push(grid[index(i-1,j)]);

    return neighbors;
  }

  this.getVisitableUnblocked = function(grid){
    var temp = this.getNeighbors(grid);

    for(let i = 0; i < allNeighbors.length; i++){
      if(allNeighbors[i] && !allNeighbors[i].blocked){
        temp.push(allNeighbors[i]);
      }
    }
    return temp;
  }
}

function getFValue(cell){
  return cell.f;
}

function getGValue(cell){
  return cell.g;
}


    
  