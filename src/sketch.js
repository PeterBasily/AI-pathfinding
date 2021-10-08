/*variables*/

var allGrids = []; //all 50 grids generated
var grid; //The current grid selected
var canvas; //our canvas
var reset; //bool used to reset all grids 
var start; //the starting node
var finish; //the finishing node
var searchType; //the search type
var searching = false; //bool used to start search
var heap; //The binary heap we are using to store our open list


/*Utility functions */ 
function init() {
  heap = new MinHeap(Math.floor);
  reset = true;
  for (let k = 0; k < 50; k++) {
    allGrids[k] = [];
    for (let j = 0; j < 101; j++) {
      for (let i = 0; i < 101; i++) {
        let cell = new Cell(i, j);
        allGrids[k].push(cell);
      }
    }
    for(let i = 0; i < allGrids[k].length; i++){
      allGrids[k][i].makeNeighbors(allGrids[k]);
    }

  }
  for (i = 0; i < 50; i++) {
    var visitedCells = [];
    grid = allGrids[i];
    var r = floor(random(0, grid.length))
    var current = grid[r];
    current.visited = true;
    visitedCells.push(current);
    
    while (visitedCells.length > 0) {
      current.visited = true;
      var next = current.checkNeighbors();
      if (next) {
        next.visited = true;
        visitedCells.push(current);

        let rand = Math.random();
        if (rand <= 0.2) {
          current.blocked = true;
        }
        else {
          current.blocked = false;
        }
        current = next;

      }
      else {
        current = visitedCells.pop();

      }

    }
  }
  visitedCells = [];
  for(let i = 0; i < grid.length; i++){
    grid[i].visited = false;
  }
  
}
function selectSearch(){
  if(start == undefined || finish == undefined){
    alert("Start/Goal not selected. Find two open nodes and try again!");
  }
  else{
  var elements = document.getElementsByTagName('input');
    for(i = 0; i < elements.length; i++){
      if(elements[i].checked){
        searchType = elements[i].value;
      }
      elements[i].disabled = true;

    }
      
      document.getElementById('runSearch').disabled = true;
      console.log(searchType);
      searching = true;
  }
  
}

function run() {
  canvas.position((windowWidth - 1010) / 2, 100);


  background(100);
  for (i = 0; i < grid.length; i++) {
    grid[i].show();
  }

}


function setStartAndFinish() {
  var r = floor(random(0, grid.length))
  var r2 = floor(random(0, grid.length))
  start = grid[r];
  finish = grid[r2];
  while (start.blocked || finish.blocked) {
    r = floor(random(0, grid.length))
    r2 = floor(random(0, grid.length))
    start = grid[r]
    finish = grid[r2]

  }
  start.f = 0;
  console.log(start)
  console.log(finish)

}
function setGrid(value) {
  grid = allGrids[value];
  for(let i = 0; i < grid.length; i++){
    grid[i].visited = false;
  }
  start = undefined;
  finish = undefined;
}

//Need to add tie breaking buttons and logic
function runSearch(){
  
  //Remove eventually
  if(searchType == undefined){
    alert("You done messed up!");
  }
  else if(searching === true){
    if(searchType === 'forward'){
      

    }
    else if(searchType === 'backward'){
  
    }
    else if(searchType === 'adaptive'){
  
    }
    if(succ === finish){
      searching === false;
  
    }

  }
  
  

}

/****************SETUP & DRAW FUNCTIONS **********************/

function setup() {
  frameRate(60)
  canvas = createCanvas(1010, 1010, P2D);
  canvas.parent('canvas_parent');
  canvas.elt.style.position = 'fixed';
  canvas.style('top', 100);
  canvas.style('left', (windowWidth - 1010) / 2);
  //canvas.position((windowWidth - 1010) / 2 );
  init();
  var dropdown = document.getElementById("MazeSelect");
  for (var i = 0; i < 50; i++) {
    var newOption = document.createElement('option');
    newOption.text = i;
    newOption.value = i;
    dropdown.options.add(newOption);
  }

};



function draw() {

  run();
  if (start) {
    start.highLight('red');
  }
  if (finish) {
    finish.highLight('orange');
  }
  

  





}


