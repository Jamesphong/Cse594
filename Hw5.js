<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>Tetris</title>
  <style>
    html, body, canvas 
   {
      margin: 0;
      padding: 0
    }
    html, body 
    { 
      width:100%; 
      height:100%; 
      overflow:hidden;
     }
  </style>
</head>

<body>
  <canvas id="canvas" width="250" height="450"></canvas>
  
  <script type="text/javascript"> 
    var CELL_SIZE = 25;
    var INTERVAL = 500; 
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var inactiveBlocks = [];
    var activeBlock = new Block(0);

    function clearGrid() 
    {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 10 * CELL_SIZE, 18 * CELL_SIZE);
    }

    function Cell(x, y) 
    {
      this.x = x;
      this.y = y;
    }

    this.draw = function() 
	{
		for (var i = 0; i < this.cells.length; ++i) this.cells[i].draw();
	}
  
  this.drop = function() 
  {
	++this.y;
	for (var i = 0; i < this.cells.length; ++i) this.cells[i].drop();
  }
  
  this.moveLeft = function() 
  {
	for(var i = 0; i < inactiveBlocks.length; i++) 
	{
	  if(activeBlock.wouldCollideLeft(inactiveBlocks[i])) return false;
	}
	return true;
  }
  this.moveRight = function() 
  {
	for(var i = 0; i < inactiveBlocks.length; i++) 
	{
	  if(activeBlock.wouldCollideRight(inactiveBlocks[i])) return false;
	}
	return true;
  }
  this.moveLeft = function() 
  {
	for (var i = 0; i < this.cells.length; ++i) 
	{
	  if(this.cells[i].x <= 0) return false;
	}
	if(activeBlock.moveLeft()) 
	{
	  for (var i = 0; i < this.cells.length; ++i) this.cells[i].moveL();
	  this.x--;
	}
	console.log("moveLeft");
  }
  this.moveRight = function() 
  {
	for (var i = 0; i < this.cells.length; ++i) 
	{
	  if(this.cells[i].x >= 9) return false;
	}
	if(activeBlock.moveRight()) 
	{
	  for (var i = 0; i < this.cells.length; ++i) this.cells[i].moveR();
	  this.x++;
	}
	console.log("moveRight");
  }
  this.moveDown = function() 
  {
	if(activeBlock.canDrop()) 
	{
	  activeBlock.drop();
	}
	console.log("moveDown");
  }
  
  this.rotate = function() 
  {  
    var newCells = [];
    var oldCells = activeBlock.cells;
    this.rotation++;
    if(this.rotation === 4) this.rotation = 0;
	
    for(var i = 0; i < 4; i++) 
	{
	  newCells.push(new Cell(ctx, this.type, blockRotations[this.type][this.rotation][i][0] + this.x, blockRotations[this.type][this.rotation][i][1] + this.y));
    	}
    
	for(var i = 0; i < 4; i++) 
	{
	  if(newCells[i].x > 9) 
	  {
	    while(newCells[i].x > 9) for(var j = 0; j < 4; j++) newCells[j].moveL();
	  }
	  if(newCells[i].x < 0) 
	  {
	    while(newCells[i].x < 0) for(var k = 0; k < 4; k++) newCells[k].moveR();
	  }
	  if(newCells[i].y > 17) 
	  {
	    while(newCells[i].y > 17) for(var k = 0; k < 4; k++) newCells[k].y--;
	  }
    	}
    activeBlock.cells = newCells;
    for(var j = 0; j < inactiveBlocks.length; j++) 
	{
	  if(activeBlock.overLap(inactiveBlocks[j])) 
	  {
	    activeBlock.cells = oldCells;
	    if(this.rotation > 0) this.rotation--;
	    else this.rotation = 4;
	  }
    	}
  }

Block.prototype.CollideDown = function(otherBlock) {
  for (var i = 0; i < 4; ++i) 
  {
	var cell = this.cells[i];
	for (var j = 0; j < otherBlock.cells.length; ++j) 
	{
	  var otherCell = otherBlock.cells[j];
	  if (otherCell.x == cell.x && otherCell.y == cell.y + 1) 
	  {
		return true;
	  }
	}
  }
  return false;
};

Block.prototype.overLap = function(otherBlock) 
{
  for (var i = 0; i < 4; ++i) 
  {
	var cell = this.cells[i];
	for (var j = 0; j < otherBlock.cells.length; ++j) 
	{
	  var otherCell = otherBlock.cells[j];
	  if (otherCell.y == cell.y && otherCell.x == cell.x) 
	  {
		return true;
	  }
	}
  }
  return false;
};

Block.prototype.CollideLeft = function(otherBlock) 
{
  for (var i = 0; i < 4; ++i) 
  {
	var cell = this.cells[i];
	for (var j = 0; j < otherBlock.cells.length; ++j) 
	{
	  var otherCell = otherBlock.cells[j];
	  if (otherCell.y == cell.y && otherCell.x == cell.x - 1) 
	  {
		return true;
	  }
	}
  }
  return false;
};

Block.prototype.CollideRight = function(otherBlock) 
{
  for (var i = 0; i < 4; ++i) 
  {
	var cell = this.cells[i];
	for (var j = 0; j < otherBlock.cells.length; ++j) 
	{
	  var otherCell = otherBlock.cells[j];
	  if (otherCell.y == cell.y && otherCell.x == cell.x + 1) 
	  {
		return true;
	  }
	}
  }
  return false;
};

Block.prototype.canDrop = function() 
{
  for(var i = 0; i < 4; i++) 
  { 
	if(this.cells[i].y >= 17) return false;
  }
  for (var i = 0; i < inactiveBlocks.length; i++) 
  {
	if (activeBlock.CollideDown(inactiveBlocks[i])) 
	{
	  return false;
	}
  }
  return true;
}

Block.prototype.fullDrop = function() 
{
  clearBlock(ctx, activeBlock, 5, -1);
  while(this.canDrop()) this.drop();
  inactiveBlocks.push(activeBlock);
  inactiveBlocks[inactiveBlocks.length - 1].draw();
  activeBlock = new Block(ctx, nextBlock.type, 5, -1);
  nextBlock = new Block(nex, Math.floor(Math.random()*7), 1, 1);

    activeBlock.draw();
    var interval = setInterval(function() 
    {
      clearGrid();
      for (var i = 0; i < inactiveBlocks.length; ++i) inactiveBlocks[i].draw();
      if (activeBlock.canDrop()) 
       {
        activeBlock.drop();
       } 
      
      else 
      {
        inactiveBlocks.push(activeBlock);
        activeBlock = new Block(0);
        
        if (activeBlock.canDrop() === false) 
	 {
          clearInterval(interval);
          }
       }
      activeBlock.draw();
     }, INTERVAL;})
}

  </script>

</body>
</html>
