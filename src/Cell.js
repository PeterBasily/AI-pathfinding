class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.blocked = true;
    this.visited = false;

    this.f;
    this.tree;
    this.search = 0;
    this.g = Infinity;
  }

  h = (goal) => {
    return Math.abs(goal.i - this.i) + Math.abs(goal.j - this.j);
  }

  show = () => {

    let x = this.i * 10;
    let y = this.j * 10;
    stroke(255);
    
    if (this.blocked) {
      noFill();
      rect(x, y, 10, 10);
    }
    else {
      noStroke();
      fill(0, 0, 0);
      rect(x, y, 10, 10);
    }
  }

  highLight = (fillColor) => {
    let x = this.i * 10;
    let y = this.j * 10;
    noStroke();
    fill(fillColor);
    rect(x, y, 10, 10)
  }

  index = (i, j) => {
    if (i < 0 || j < 0 || i > 100 || j > 100) {
      return -1;
    }
    return i + j * 101;
  }
  
  checkNeighbors = (grid) => {
    var temp = [];
    var neighbors = [];
  
  
    temp.push(grid[this.index(this.i, this.j - 1)]);
    temp.push(grid[this.index(this.i + 1, this.j)]);
    temp.push(grid[this.index(this.i, this.j + 1)]);
    temp.push(grid[this.index(this.i - 1, this.j)]);
  
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] && !temp[i].visited) {
        neighbors.push(temp[i]);
      }
    }
    var r = floor(random(0, neighbors.length));
    return neighbors[r];
  
  }
  
  getNeighbors = (grid) => {
    var neighbors = [];
  
  
    neighbors.push(grid[this.index(this.i, this.j - 1)]);
    neighbors.push(grid[this.index(this.i + 1, this.j)]);
    neighbors.push(grid[this.index(this.i, this.j + 1)]);
    neighbors.push(grid[this.index(this.i - 1, this.j)]);
  
    return neighbors;
  }
  
  getVisitable = (grid) => {
    var temp = this.getNeighbors(grid);
    var ret = [];
  
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] && !temp[i].blocked) {
        ret.push(temp[i]);
      }
    }
    return ret;
  }
}


