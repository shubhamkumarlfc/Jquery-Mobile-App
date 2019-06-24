function save_university(){
		var name = $("#name").val();
		var address = $("#address").val();
		var phone = $("#phone").val(); 
		try{
			if(validateUserForm(name,address,phone)){
			//create an object
				var newObj = {
					"Name": name,
					"Address": address,
					"PhoneNumber": phone
				};
				
				var universities = localStorage.getItem("universities");

				// no data stored yet, create a new one
				if (universities == null) {
					universities = [];//if not found, create a new array
				}
				else {
					universities = JSON.parse(universities); //if found convert back to a JSON object
				}//end if-else

				universities.push(newObj); //now add the new object

				//the save its string representation
				localStorage.setItem("universities", JSON.stringify(universities));
				alert("Record saved Successfully");
				window.location.reload();

			}
		}
		catch(e){
			if (window.navigator.vendor === "Google Inc.") {
			if(e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else if ( e== QUOTA_EXCEEDED_ERR) {
				alert("Error: Saving to local storage.");
			}
			
			console.log(e);
		}
			alert("Some Error occured due to your Browser");
		}
}

/** Validate the User Form **/
function validateUserForm(name,address,phone) { 

	//check empty fields
	if (name == '') {
		alert("Please enter the name of the university!");
		$("#name").focus();
		return false;
	}
	if (address == '') {
		alert("Please enter the address of the university!");
		$("#address").focus();
		return false;
	}
	if (phone == '') {
		alert("Please enter the phone number of the university!");
		$("#phone").focus();
		return false;
	}
	if (phone == '') {
		alert("Please enter the phone number of the university!");
		$("#phone").focus();
		return false;
	}
	// address Validation for first character number
	var firstChar = address.trim().substr(0, 1);
	 if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }
	
	// phone number validation for number and hyphens
	var tokens = phone.split('-');
	for (var i = 0; i < tokens.length; i++) {
		if (isNaN(tokens[i])) {
			alert("Please use only numbers or hyphens!");
			$("#phone").focus();
			return false;
		}//end if
	}//end for
	var pattern = /[a-z]/i;
	
	//address validation for alphabets
	if (!(pattern.test(address))) {
		alert("Address should contain letters!");
		$("#address").focus();
		return false;
	}

	
	return true;
}

function search_universities(){
	//check if exists
	try{
		var universities = localStorage.getItem("universities");
		var univMatched = false;
		if (universities == null) {
			//no record whatsoever, let the user know
			alert("No record found");
		}
		else {
			//if data exist, convert to JSON object
			universities = JSON.parse(universities);

			//go through each record
			for (var i = 0; i < universities.length; i++) {

				var name = universities[i].Name;//Name attribute   
				//if the name matches
				if ($('#searchKey').val().toLowerCase() == name.toLowerCase()) {
					var address = universities[i].Address; // Address attribute
					var phone = universities[i].PhoneNumber; //PhoneNumber attribute
					univMatched = true;
					//now fill the fields
					$("#name").val(name);
					$("#address").val(address);
					$("#phone").val(phone);
					break;
					

				}//end if
			}//end for
			if(univMatched)
			alert(" Record Found" );
			else
			alert("No record found");
			
		}
	}
		catch(e){
			if (window.navigator.vendor === "Google Inc.") {
			if(e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else if ( e== QUOTA_EXCEEDED_ERR) {
				alert("Error: Saving to local storage.");
			}
			
			console.log(e);
		}
			alert("Some Error occured due to your Browser");
		}
}

function delete_university (){
	try{
		var universities = localStorage.getItem("universities");

		if (universities == null) {
			//no record whatsoever, let the user know
			alert("No record found to be deleted");
		}
		else {
			//if data exist, convert to JSON object
			universities = JSON.parse(universities);
			for (var i = 0; i < universities.length; i++) {
			//use name field instead of searchKey
				if ($('#name').val().toLowerCase() == universities[i].Name.toLowerCase()) {

					//remove item at i, 1 object 
					universities.splice(i, 1);

					if (universities.length == 0) {
						/* No items left in records, remove entire 
						 * array from localStorage
						 */
						localStorage.removeItem("universities");
					} else {
						//otherwise save it back
						localStorage.setItem("universities", JSON.stringify(universities));
					}
					alert("Record deleted");
						
					//now clean up the form
					$("#name").val('');
					$("#address").val('');
					$("#phone").val('');                                
					window.location.reload();
					return;//job done, get outa here

					
				}
				
			}
			alert("Record not found");
		}	
	}
	catch(e){
		if (window.navigator.vendor === "Google Inc.") {
			if(e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else if ( e== QUOTA_EXCEEDED_ERR) {
				alert("Error: Saving to local storage.");
			}
			
			console.log(e);
		}
			alert("Some Error occured due to your Browser");
	}
}

function display_universities(){
	try{
		var dataTable=document.getElementById('data');
		var universities = localStorage.getItem("universities");
		dataTable.innerHTML = '';//empty
		if (universities == null) {
			//no record whatsoever, let the user know
			alert("No Records exist to show.");
		}
		else {
			universities = JSON.parse(universities);
			//Header row
			var row=dataTable.insertRow(0);
			var nameCell=row.insertCell(0);
			var addressCell=row.insertCell(1);
			var phoneCell=row.insertCell(2);

			nameCell.innerHTML='&nbsp;Name&nbsp; ';
			addressCell.innerHTML='&nbsp;Address&nbsp; ' ;
			phoneCell.innerHTML='&nbsp;Phone&nbsp;';

			//Insert data
			for(var i=0; i<universities.length; i++)
			{
				var row=dataTable.insertRow(-1);
				var nameCell=row.insertCell(0);
				var addressCell=row.insertCell(1);
				var phoneCell=row.insertCell(2);
				nameCell.innerHTML="&nbsp;"+universities[i].Name+"&nbsp; ";
				addressCell.innerHTML="&nbsp; "+universities[i].Address+"&nbsp; ";
				phoneCell.innerHTML="&nbsp; "+universities[i].PhoneNumber+"&nbsp; ";
			}
			$("#data").focus();
		}
		
	}
	catch(e){
		if (window.navigator.vendor === "Google Inc.") {
			if(e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else if ( e== QUOTA_EXCEEDED_ERR) {
				alert("Error: Saving to local storage.");
			}
			
			console.log(e);
		}
			alert("Some Error occured due to your Browser");
	}
}