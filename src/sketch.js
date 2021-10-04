
var allGrids = [];
var grid;
var visitedCells = [];
var current;
var canvas;
var reset;
var startSearch = false;
var r;
var r2;
var start;
var finish;

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
    var r = floor(random(0, grid.length))
    current = grid[r];
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
  visitedCells = [];
}

function run(){
  canvas.position((windowWidth-1010)/2, 100);
  
  
  background(100);
  for(i = 0; i < grid.length; i++){
    grid[i].show();
  }
  
}


function setStartAndFinish(){
  r = floor(random(0, grid.length))
  r2 = floor(random(0, grid.length))
  start = grid[r];
  finish = grid[r2];
  while(start.blocked || finish.blocked){
      r = floor(random(0, grid.length))
      r2 = floor(random(0, grid.length))
      start = grid[r]
      finish = grid[r2]
      start.highLight();
      finish.highLight();
    }
  }
    
    


function setup()
{
  frameRate(60)
  canvas = createCanvas(1010, 1010);
  canvas.position((windowWidth-1010)/2, 100);
  init();
  var button = createButton("reset");
  button.mousePressed(init);
  var button2 = createButton("Find 2 open nodes");
  button2.mousePressed(setStartAndFinish);
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
  start = undefined;
  finish = undefined;
}


function draw()
{

  run();
  if(start)
    start.highLight();
  if(finish)
    finish.highLight();
  

  
    
        
    
}

  


