
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
var forward;  //not used anywhere?
var openList;
var closedList;
var counter;
var blankGrid = true;

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
}

function run() {
  canvas.position((windowWidth - 1010) / 2, 100);

  if (blankGrid) {
    background(100);
    for (i = 0; i < grid.length; i++) {
      grid[i].show();
    }
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

  counter = 0;
  var cur = start;    //s_start
  cur.visited = true;
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
      return;
    }
    var path = [];
    let temp = finish;
    while (temp != cur) {
      path.push(temp);
      temp = temp.tree;
    }
    let i = 0;
    while (!cur.blocked && path[i] != undefined) {
      cur = path[i++];
      cur.visited = true;
      cur.highLight('blue');
    }
    if (cur.blocked) {
      cur = cur.tree;
    }
  }
  cleanup();
  blankGrid = false;
}

//temporary tiebreaking based on h
function tieBreak(c1, c2) {
  if (c1.h == c2.h) {
    return;
  }
  if (c1.h < c2.h) {
    return c1;
  }
  return c2;
}

function computePath(tieBreak) {
  var s;
  while ((s = openList.peek(0)) != undefined) {
    //check for duplicate f values and break ties
    if (openList.size > 1) {
      let i = 1;
      while (i < openList.size && s.f == openList.peek(i).f) {
        s = tieBreak(s, openList.peek(i++));
        /*
        if(openList.peek(i) == undefined){    //NOTE: remove
          debugger;
        }
        if(s == undefined){
          debugger;
        }
        */
      }
    }

    openList.remove(s);

    if (s != start) {
      s.highLight('yellow');
    }

    if (finish.g <= s.f) {
      return;
    }
    closedList.push(s);
    //naively look for neighbors if an unvisited node is being expanded
    //ignore blocked cells if the node being expanded is visted (starting node)
    let visitable;
    if (s.visited) {
      visitable = s.getVisitable(grid);
    }
    else {
      visitable = s.getNeighbors(grid);
    }

    for (const succ of visitable) {
      if (succ.search < counter) {
        succ.g = Infinity;
        succ.search = counter;
      }
      if (succ.g > (s.g + 1)) {
        succ.g = (s.g + 1);
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
  for (const cell of grid) {
    cell.g = Infinity;
    cell.search = 0;
    cell.tree = undefined;
    cell.visited = false;
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




