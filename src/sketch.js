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
var closedList = new Set();
var visitedList = [];
var pathLength = 0;
var fstart; //used as temp pointer for start
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
        if (rand <= 0.3) {
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
    grid[i].parent = undefined;
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
  resetCells();
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
  var elements = document.getElementsByTagName('input');
  for(i = 0; i < elements.length; i++){
    elements[i].disabled = false;
  }

  document.getElementById('runSearch').disabled = false;
  document.getElementById('reset').disabled = false;
  document.getElementById('setStart').disabled = false;
  document.getElementById('MazeSelect').disabled = false;
  
  heap = new MinHeap(compareCells);
  current = undefined;
  closedList = new Set()
}

function computePath(goal, heap){
 
  while(heap.peek() && goal.g > heap.peek().f){
    current = heap.extractMin();
       
    var neighbors = current.neighbors;
    for(let i = 0; i < neighbors.length; i++){
      if(current.g === 0){
        if(neighbors[i].blocked){
          closedList.add(neighbors[i])
        }
        
      }
      if(neighbors[i].search < iterations){
        neighbors[i].g = Infinity;
        neighbors[i].search = iterations;
      }
      if(neighbors[i].g > current.g+1){        
        neighbors[i].g = current.g+1;
        neighbors[i].parent = current;
        if(heap.has(neighbors[i])){
          heap.remove(neighbors[i]);
        }
        neighbors[i].h = neighbors[i].mDistance(goal);
        neighbors[i].f = neighbors[i].g + neighbors[i].h;
        if(!closedList.has(neighbors[i]))
          heap.insert(neighbors[i])
      }
    }

  }
}

function runSearch(){
  
  if(!searching){
    return;
  }
  else{
    if(searchType === 'forward'){
      
      if(iterations === 0){
        for(let i = 0; i < grid.length; i++){
          grid[i].search = 0;
          fstart = start;
        }
        pathLength = 0;
        path = [];
        visitedList = [];

                
      }
      if(fstart != finish){
        var myheap = new MinHeap(compareCells)
        iterations++;
        fstart.g = 0;
        fstart.h = fstart.mDistance(finish);
        fstart.f = fstart.g + fstart.h;
        fstart.search = iterations;
        finish.g = Infinity;
        finish.search = iterations;
        myheap.insert(fstart);
        computePath(finish, myheap);
        
        
        
        if(myheap.isEmpty()){
          alert('I cannot reach the target')
          endSearch();
          return;
        }
        path = constructPath(finish);
        
        for(let i = 0; i < visitedList.length; i++){
          visitedList[i].highLight('green')
          
        }     
        while(path.length > 0 && !path[path.length-1].blocked){
          pathLength++;
          temp = fstart;      
          fstart = path.pop();
          var ns = fstart.neighbors;
          for(let i = 0; i < ns.length; i++){
            if(ns[i].blocked){
              closedList.add(ns[i]);
            }
          }
          visitedList.push(temp);
          
          fstart.highLight('red')
          fstart.g = temp.g+1;
          fstart.f = fstart.g + fstart.h;
          temp.parent = undefined;
          fstart.parent = undefined;
          
          
          

        
        }
        closedList.add(path[path.length-1])
             
        
        
        
        
      }
      else{
        endSearch()
        
      }
      
  }
    
    else if(searchType === 'backward'){
       
       
      if(iterations === 0){
        for(let i = 0; i < grid.length; i++){
          grid[i].search = 0;
          fstart = finish;
        }
        pathLength = 0;
        path = [];
        visitedList = [];

                
      }
      if(fstart != start){
        var myheap = new MinHeap(compareCells)
        iterations++;
        fstart.g = 0;
        fstart.h = fstart.mDistance(start);
        fstart.f = fstart.g + fstart.h;
        fstart.search = iterations;
        start.g = Infinity;
        start.search = iterations;
        myheap.insert(fstart);
        computePath(start, myheap);
        
        
        
        if(myheap.isEmpty()){
          alert('I cannot reach the target')
          endSearch();
          return;
        }
        path = constructPath(start);
        
        for(let i = 0; i < visitedList.length; i++){
          visitedList[i].highLight('green')
          
        }     
        while(path.length > 0 && !path[path.length-1].blocked){
          pathLength++;
          temp = fstart;      
          fstart = path.pop();
          var ns = fstart.neighbors;
          for(let i = 0; i < ns.length; i++){
            if(ns[i].blocked){
              closedList.add(ns[i]);
            }
          }
          visitedList.push(temp);
          
          fstart.highLight('red')
          fstart.g = temp.g+1;
          fstart.f = fstart.g + fstart.h;
          temp.parent = undefined;
          fstart.parent = undefined;
          
          
          

        
        }
        closedList.add(path[path.length-1])
             
        
        
        
        
      }
      else{
        endSearch()
        
      }
  
    }
    else if(searchType === 'adaptive'){
      if(iterations === 0){
        current = start;
        current.g = 0;
      }
      if(current.compareTo(finish)){
        endSearch();
      
      }
    
      
      else{      
        current.visited = true;
        path = constructPath(current);
        iterations++;
        var neighbors = current.neighbors;
        for(let i = 0; i < neighbors.length; i++){
          if(!neighbors[i].visited && !neighbors[i].blocked){
            var g = current.g + 1;
            var h = neighbors[i].mDistance(finish) - g;
            var f = h + g;
            if(heap.has(neighbors[i]) && (neighbors[i].f > f)){
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
    

  }
  
  

}
function compareCells(cell1, cell2){
  if(cell1.f === cell2.f){
    if(cell1.g > cell2.g){
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
 
  if(current){
    current.highLight('yellow')
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
  document.getElementById('counter').innerHTML = '<h2> path length: ' + pathLength + '</h2>';





}

