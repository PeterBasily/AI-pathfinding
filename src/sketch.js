
var allGrids = [];
var grid;
var visitedCells = [];
var current;
var canvas;
var reset;
var r;
var r2;
var start;
var finish;
var openList;
var closedList;
var counter;
var blankGrid = true;
var clearLastSearch = false;

function init() {
  //reset = true;   NOTE: not used, delete if needed
  for (let k = 0; k < 50; k++) {
    allGrids[k] = [];
    for (let j = 0; j < 101; j++) {
      for (let i = 0; i < 101; i++) {
        let cell = new Cell(i, j);
        allGrids[k].push(cell);
      }
    }
  }
  for (let i = 0; i < 50; i++) {
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
}

function run() {
  canvas.position((windowWidth - 1010) / 2, 100);

  if (blankGrid || clearLastSearch) {
    background(100);
    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }
  }
  if (start) {
    start.highLight('red');
  }
  if (finish) {
    finish.highLight('orange');
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
    start = grid[r];
    finish = grid[r2];

  }
  console.log(start);
  console.log(finish);
  clearLastSearch = true;
}




function setup() {
  frameRate(300);
  canvas = createCanvas(1010, 1010, P2D);
  canvas.parent('canvas_parent');
  canvas.elt.style.position = 'fixed';
  canvas.style('top', 100);
  canvas.style('left', (windowWidth - 1010) / 2);
  //canvas.position((windowWidth - 1010) / 2 );
  init();
  var dropdown = document.getElementById("MazeSelect");
  for (let i = 0; i < 50; i++) {
    var newOption = document.createElement('option');
    newOption.text = i;
    newOption.value = i;
    dropdown.options.add(newOption);
  }

};

function setGrid(value) {
  grid = allGrids[value];
  start = undefined;
  finish = undefined;
  blankGrid = true;
}

function getFValue(cell) {
  if (cell == undefined) {
    debugger;
  }
  if (cell.f == undefined) {
    debugger;
  }
  return cell.f;
}

function startSearch(){
  clearLastSearch = true;
  run();
  clearLastSearch = false;
  runSearch();
}

//NOTE: Need to add tie breaking buttons and logic
function runSearch() {
  if (start == undefined || finish == undefined) {
    alert("Start/Goal not selected. Find two open nodes and try again!");
  }
  var searchType;
  var radioGroup = document.getElementsByName("searchType");
  for (const rButton of radioGroup) {
    if (rButton.checked) {
      searchType = rButton.value;
    }
  }

  //NOTE: add tie breaking buttons
  {
    var tieBreakingFunction = tieBreak;
  }

  //NOTE: Remove eventually
  if (searchType == undefined) {
    alert("SearchType input not working");
  }
  blankGrid = false;  //flag to prevent draw() overwriting search
  counter = 0;
  var cur = start;    //s_start
  cur.walked = true;
  while (cur != finish) {
    counter++;
    cur.g = 0;
    cur.search = counter;
    finish.g = Infinity;
    finish.search = counter;
    //finish.g = Infinity;  //NOTE: Done in constructor
    openList = new MinHeap(getFValue);
    closedList = [];
    cur.f = cur.g + cur.h(finish);
    openList.insert(cur);
    computePath(tieBreakingFunction);

    if (openList.size == 0) {
      //NOTE: sanity check
      if (finish.tree != undefined) {
        alert("Error: Open List empty with goal reachable");
      }
      alert("No valid paths exist");
      cleanup();
      break;
    }

    //reconstructing path (NOTE: put this in a function later)
    var path = [];
    let temp = finish;
    while (temp != cur) {
      path.push(temp);
      temp = temp.tree;
    }
    let i = 1;
    while (!path[path.length - i].blocked) {
      cur = path[path.length - i];
      cur.walked = true;
      cur.highLight('pink');  //DEBUG
      i++;
      if(path[path.length - i] == finish){
        cur = finish;
        break;
      }

    }
    
    path[path.length - i].walked = true;
  }
  //draw path
  path = [];
  let temp = finish;
  while (temp != start) {
      path.push(temp);
      temp = temp.tree;
  }
  let i = 1;
  while(path[path.length - i] != finish){
    cur = path[path.length - i];
    cur.highlight("blue");
    i++;
  }
  cleanup();
}

//temporary tiebreaking based on h
function tieBreak(c1, c2) {
  if (c1.h(finish) > c2.h(finish)) {
    return c2;
  }
  return c1;
}

function computePath(tieBreak) {
  var s;
  while ((s = openList.peek(0)) != undefined) {
    //check for duplicate f values and break ties
    if (openList.size > 1) {
      let i = 1;
      while (i < openList.size && s.f == openList.peek(i).f) {
        s = tieBreak(s, openList.peek(i++));
        /*    DEBUG
        if(openList.peek(i) == undefined){
          debugger;
        }
        if(s == undefined){
          debugger;
        }
        */
      }
    }

    openList.remove(s);

    if (s != start && s != finish && !s.blocked && !s.walked) {
      s.highLight('yellow');
    }

    if (finish.g <= s.f) {
      return;
    }
    closedList.push(s);
    //naively look for neighbors if an unvisited node is being expanded
    //ignore blocked cells if the node being expanded is visted (starting node)
    let visitable;
    if (s.walked) {
      visitable = s.getVisitable(grid);
    }
    else {
      visitable = s.getNeighbors(grid);
    }

    for (const succ of visitable) {
      if(succ == undefined){  //edge of board
        continue;
      }
      if (succ.search < counter) {
        succ.g = Infinity;
        succ.search = counter;
      }
      if(s.actionCost(succ, grid) == Infinity){
        continue;
      }
      if (succ.g > (s.g + s.actionCost(succ, grid))) {
        succ.g = (s.g + s.actionCost(succ, grid));
        succ.tree = s;
        openList.remove(succ);
        succ.f = succ.g + succ.h(finish);
        openList.insert(succ);
      }
    }
  }
}

//resets values to their defaults so search can be ran on the same grid
function cleanup() {
  debugger;
  counter = 0;
  for (const cell of grid) {
    cell.g = Infinity;
    cell.search = 0;
    cell.tree = undefined;
    cell.walked = false;
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




