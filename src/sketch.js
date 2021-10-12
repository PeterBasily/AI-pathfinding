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
var iterations = 0; //counts the number iterations (cells visited)
var path = []
/*Utility functions */ 

function init() {
  heap = new MinHeap(compareCells);
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
    resetCells();
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
function resetCells(){
  for(let i = 0; i < grid.length;i++){
    grid[i].f = Infinity;
    grid[i].h = Infinity;
    grid[i].g = Infinity;
    grid[i].visited = false;
  }
  path = [];
  iterations = 0;

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


}
function setGrid(value) {
  grid = allGrids[value];
  start = undefined;
  finish = undefined;
  resetCells();
}

function constructPath(cell){
  let path = [cell];
  let temp = cell;
  while(temp.parent != undefined){
    path.push(temp.parent);
    temp = temp.parent;
    
  }
  return path;
}
function endSearch(){
  searching = false;
  for(let i = 0; i < path.length; i++){
    
  }
  var elements = document.getElementsByTagName('input');
  for(i = 0; i < elements.length; i++){
    elements[i].disabled = false;
  }

  document.getElementById('runSearch').disabled = false;
  document.getElementById('reset').disabled = false;
  document.getElementById('setStart').disabled = false;
  document.getElementById('MazeSelect').disabled = false;
  current = start;
  heap = new MinHeap(compareCells);
}

function runSearch(){
  
  if(!searching){
    return;
  }
  else{
    if(searchType === 'forward'){
      if(iterations === 0){
        current = start;
        current.g = 0;
      }
      if(current.compareTo(finish)){
        endSearch();
      
      }
    
      else if(current.blocked){
        if(heap.getSize() ===0){
          alert("Can't find route");
          endSearch();
        }
        else 
          current = heap.extractMin();
      }
      else{      
        current.visited = true;
        path = constructPath(current);
        iterations++;
        var neighbors = current.neighbors;
        for(let i = 0; i < neighbors.length; i++){
          if(!neighbors[i].visited){
            var g = current.g + 1;
            var h = neighbors[i].mDistance(finish);
            var f = h + g;
            if(heap.has(neighbors[i]) && (neighbors[i].f > f || (neighbors[i].f === f && neighbors[i].g > g))){
              heap.remove(neighbors[i]);
              neighbors[i].f = f;
              neighbors[i].g = g;
              neighbors[i].h = h;
              neighbors[i].parent = current;
              heap.insert(neighbors[i]);
              

            }
            else if(!heap.has(neighbors[i])){
              neighbors[i].parent = current;
              neighbors[i].g = g;
              neighbors[i].h = h
              neighbors[i].f = f;
              heap.insert(neighbors[i]);
            }
            
        }
          
      }    
      if(heap.getSize() > 0){
        current = heap.extractMin();
      }
      else{
        alert("Can't find route");
        endSearch();
      }
      }
      
       
  
    }
    
    
    else if(searchType === 'backward'){
  
    }
    else if(searchType === 'adaptive'){
  
    }
    

  }
  
  

}
function compareCells(cell1, cell2){
  if(cell1.f === cell2.f){
    if(cell1.g < cell2.g){
      return -1;
    }
    return 0;
  }
  if(cell1.f < cell2.f){
    return -1;
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
  
  for(let i = 0; i < path.length; i++){
      path[i].highLight('blue')
  }
  if(heap){
    for(let i = 0; i < heap.items.length; i++){
      heap.items[i].highLight('green')
    }
  }
  if (start) {
    start.highLight('purple');
  }
  if (finish) {
    finish.highLight('orange');
  }
  document.getElementById('counter').innerHTML = '<h2>cells visited: ' + iterations + '</h2>';


  





}

