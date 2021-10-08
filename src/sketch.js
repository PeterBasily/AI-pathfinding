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
var dropdown;
var current;

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
        if (rand <= 0.05) {
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
      document.getElementById('reset').disabled = true;
      document.getElementById('setStart').disabled = true;
      document.getElementById('MazeSelect').disabled = true;
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
  
  start.g = 0;
  start.h = start.mDistance(finish);
  start.f = start.h;
  current = start;

}
function setGrid(value) {
  grid = allGrids[value];
  start = undefined;
  finish = undefined;
}

function constructPath(cell){
  let path = [];
  let temp = cell;
  while(temp.parent != undefined){
    path.push(temp.parent);
    temp = temp.parent;
    
  }
  return path;
}


function runSearch(){
  
  if(!searching){
    return;
  }
  else{
    if(searchType === 'forward'){
      if(current.blocked){
        current = heap.extractMin();
      }
      
        current.visited = true;
        var neighbors = current.neighbors;
        for(let i = 0; i < neighbors.length; i++){
          if(!neighbors[i].visited){
            var g = current.g + 1;
            var h = neighbors[i].mDistance(finish);
            var f = h + g;
            if(heap.has(neighbors[i]) && neighbors[i].f > f ){
              neighbors[i].f = f;
              neighbors[i].g = g;
              neighbors[i].parent = current;

            }
            else if(!heap.has(neighbors[i])){
              neighbors[i].parent = current;
              neighbors[i].g = g;
              neighbors[i].h = h
              neighbors[i].f = f
            }
            
        }
          
          
        for(let i = 0; i < neighbors.length; i++){
          if(!neighbors[i].visited && !heap.has(neighbors[i])){
              heap.insert(neighbors[i])
            }
          }
          
        }        
  
        current = heap.extractMin();
        if(current.compareTo(finish)){
          searching = false;
        }
       
  
    }
    
    
    else if(searchType === 'backward'){
  
    }
    else if(searchType === 'adaptive'){
  
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
  init();
  dropdown = document.getElementById("MazeSelect");
  for (var i = 0; i < 50; i++) {
    var newOption = document.createElement('option');
    newOption.text = i;
    newOption.value = i;
    dropdown.options.add(newOption);
  }

};



function draw() {

  
  run();
  runSearch();
  if(current){
    path = constructPath(current);
    for(let i = 0; i < path.length; i++){
      path[i].highLight('blue')
    }
  }
  if(heap){
    for(let i = 0; i < heap.items.length; i++){
      heap.items[i].highLight('green')
    }
  }
  if (start) {
    start.highLight('red');
  }
  if (finish) {
    finish.highLight('orange');
  }


  





}

