function add(){
		var number1 = document.getElementById("number1").value;
		var number2= document.getElementById('number2').value;
		
		var answer = parseFloat(number1) + parseFloat(number2);
		document.getElementById("answer").innerHTML= answer;
	}
	function multiply(){
		var number1 = document.getElementById("number1").value;
		var number2= document.getElementById('number2').value;
		
		var answer = parseFloat(number1) * parseFloat(number2);
		document.getElementById("answer").innerHTML= answer;
	}
	function subtract(){
		var number1 = document.getElementById("number1").value;
		var number2= document.getElementById('number2').value;
		
		var answer = parseFloat(number1)- parseFloat(number2);
		document.getElementById("answer").innerHTML= answer;
	}
	function divide(){
		var number1 = document.getElementById("number1").value;
		var number2= document.getElementById('number2').value;
		
		var answer = parseFloat(number1) / parseFloat(number2);
		document.getElementById("answer").innerHTML= answer;
	}
