function draw(){
		var min = parseInt(document.getElementById("min").value);
		var max= parseInt(document.getElementById('max').value);
		var numberArray = [];
		var squareArray = [];
		var cubeArray = [];
		var temp = min;
		var counter = 0;
		while(temp<=max){
			numberArray[counter]= temp;
			squareArray[counter]= temp*temp;
			cubeArray[counter] = temp*temp*temp;
			temp += min;
			counter++;
		}
		updateTable(numberArray,squareArray,cubeArray);
	}
	
function updateTable(numberArray, squareArray, cubeArray)
{
var dataTable
	=document.getElementById('data');

dataTable.innerHTML = '';//empty

//Header row
var row=dataTable.insertRow(0);
var numberCell=row.insertCell(0);
var squareCell=row.insertCell(1);
var cubeCell=row.insertCell(2);

numberCell.innerHTML='N';
squareCell.innerHTML='N&#178';
cubeCell.innerHTML='N&#179';

//Insert data
for(var i=0; i<numberArray.length; i++)
{
var row=dataTable.insertRow(-1);
var numberCell=row.insertCell(0);
var squareCell=row.insertCell(1);
var cubeCell=row.insertCell(2);
numberCell.innerHTML=numberArray[i];
squareCell.innerHTML=squareArray[i];
cubeCell.innerHTML=cubeArray[i];
}
}//end 
