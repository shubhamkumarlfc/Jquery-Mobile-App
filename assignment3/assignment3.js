function redirectPage(){
	try{
		
	alert(" disclaimer page");
	$.mobile.changePage("#legalNotice");
	}
	catch(e){
		if (window.navigator.vendor === "Google Inc.") {
			if(e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
		}
		console.log(e);
	}
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
