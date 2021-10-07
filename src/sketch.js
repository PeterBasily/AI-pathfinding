
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
var forward;
var heap = new MinHeap(Math.floor);

function init() {
  reset = true;
  for (let k = 0; k < 50; k++) {
    allGrids[k] = [];
    for (let j = 0; j < 101; j++) {
      for (let i = 0; i < 101; i++) {
        let cell = new Cell(i, j);
        allGrids[k].push(cell);
      }
    }
  }
  for (i = 0; i < 50; i++) {
    visitedCells = [];
    grid = allGrids[i];
    var r = floor(random(0, grid.length))
    current = grid[r];
    current.visited = true;
    visitedCells.push(current);
    while (visitedCells.length > 0) {
      current.visited = true;
      var next = current.checkNeighbors(grid);
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

function run() {
  canvas.position((windowWidth - 1010) / 2, 100);


  background(100);
  for (i = 0; i < grid.length; i++) {
    grid[i].show();
  }

}


function setStartAndFinish() {
  r = floor(random(0, grid.length))
  r2 = floor(random(0, grid.length))
  start = grid[r];
  finish = grid[r2];
  while (start.blocked || finish.blocked) {
    r = floor(random(0, grid.length))
    r2 = floor(random(0, grid.length))
    start = grid[r]
    finish = grid[r2]

  }
  console.log(start)
  console.log(finish)
}




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
  if(start == undefined || finish == undefined){
    alert("Start/Goal not selected. Find two open nodes and try again!");
  }
  var searchType;
  var radioGroup = document.getElementsByName("searchType");
  for(const rButton of radioGroup){
    if(rButton.checked){
      searchType = rButton.value;
    }
  }
  //Remove eventually
  if(searchType == undefined){
    alert("You done messed up!");
  }
  

}


function draw() {

  run();
  if (start) {
    start.highLight('red');
  }
  if (finish) {
    finish.highLight('orange');
  }







}


