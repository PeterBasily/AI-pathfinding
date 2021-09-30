
var grid = [];
var visitedCells = [];
var current;
var canvas;


function setup()
{
  frameRate(240)
  
  canvas = createCanvas(1010, 1010);
  canvas.position((windowWidth-1010)/2, 100);
  for(let j = 0; j < 101; j++){
    for(let i = 0; i < 101; i++){
      let cell = new Cell(i, j); 
      grid.push(cell);
      
    }
  }
  
  current = grid[0];
};
    



function draw()
{
  canvas.position((windowWidth-1010)/2, 100);
  
  
    background(100);
    current.highLight();
    current.visited = true;
    
    for(i = 0; i < grid.length; i++){
      
      grid[i].show();

      var next = current.checkNeighbors(grid);
      
    }
    if(next){
      next.visited = true;
      visitedCells.push(current);
      current.blocked = false;
      current = next;
      
    }
    else if(visitedCells.length > 0){
      current = visitedCells.pop();
      
    }

      
    
  
      
      
    
}

  


