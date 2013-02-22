// Return a random integer between 0 and 1000
function rand() {
  return Math.floor(Math.random() * 1000);
}

function f1(cb) {
  console.log('f1 starts');
  setTimeout(cb, rand());
}

function f2(cb) {
  console.log('f2 starts');
  setTimeout(cb, rand());
}

function f3(cb) {
  console.log('f3 starts');
  setTimeout(cb, rand());
}

function onEnd() {
  console.log('onEnd called');
}



var a = 3;

f1(function()
{ 
  a--;
  console.log('f1 completed');
  console.log(a);
  
  if (a==0)
  {
	 onEnd();
  }

});
f2(function()
{
  a--;
  console.log('f2 completed');
  console.log(a);
  
  if (a==0)
  {
	 onEnd();
  }
 });
f3(function() 
{ 
  a--;
  console.log('f3 completed');
  console.log(a);
  
  if (a==0)
  {
	onEnd();
  }

 });

onEnd();
