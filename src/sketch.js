
var grid = [];
var visitedCells = [];
var current;
var canvas;
function setup()
{
  frameRate(5);
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
  
    background(100);
    current.visited = true;
    for(i = 0; i < grid.length; i++){
        
      grid[i].show();
      var next = current.checkNeighbors(grid);
      

      if(next){
        next.visited = true;
        visitedCells.push(current);
        let rand = Math.random();
        if(rand <= 0.3){
          current.blocked = true;
        }
        else{
          current.blocked = false;
        }
        current = next;
        
      }
      else if(visitedCells.length > 0){
        current = visitedCells.pop();
        
      }

      
    }
  
      
      
    
}

  


