
var allGrids = [];
var grid;
var visitedCells = [];
var current;
var canvas;
var reset;

function init(){
  reset = true;
  for(let k = 0; k < 50; k++){
    allGrids[k] = [];
    for(let j = 0; j < 101; j++){
      for(let i = 0; i < 101; i++){
        let cell = new Cell(i, j); 
        allGrids[k].push(cell); 
      }
    }
  }
  for(i = 0; i < 50; i++){
    visitedCells = [];
    grid = allGrids[i];
    current = grid[0];
    current.visited = true;
    visitedCells.push(current);
    while(visitedCells.length > 0){
      current.visited = true;
      var next = current.checkNeighbors(grid);
      if(next){
        next.visited = true;
        visitedCells.push(current);
        current.blocked = false;
        current = next;
        
      }
      else {
        current = visitedCells.pop();
        
      }

    }
  }
}

function run(){
  canvas.position((windowWidth-1010)/2, 100);
  
  
  background(100);
  for(i = 0; i < grid.length; i++){
    grid[i].show();
  }
  
}




function setup()
{
  frameRate(30)
  canvas = createCanvas(1010, 1010);
  canvas.position((windowWidth-1010)/2, 100);
  init();
  var button = createButton("reset");
  button.mousePressed(init);
  var dropdown = document.getElementById("MazeSelect");
  for(var i = 0; i < 50; i++){
    var newOption = document.createElement('option');
    newOption.text = i;
    newOption.value = i;
    dropdown.options.add(newOption);
  }
  
};
    
function setGrid(value){
  grid = allGrids[value];
}


function draw()
{

  run();
  

  
    
        
    
}

  


