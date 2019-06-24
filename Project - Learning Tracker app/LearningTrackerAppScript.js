

/** 


This application is a multi user application. Enjoy !! 


**/




$(document).on("pageshow", function () {
  if ($('.ui-page-active').attr('id') =="pageUserInfo") {
    fillUserProfile();
  }  else if ($('.ui-page-active').attr('id') ==
    "pageRecords") {
    editRecordsPage();
  }
  else if ($('.ui-page-active').attr('id') ==
    "pageAdvice") {
	drawSuggestionGraph();	
    resizeGraph();
  } else if ($('.ui-page-active').attr('id') ==
    "pageGraph") {
    drawLineGraph();
    resizeGraph();
  }

});

function resizeGraph() {
  if ($(window).width() < 700) {
    $("#GraphCanvas").css({
      "width": $(window).width() - 50
    });
    $("#AdviceCanvas").css({
      "width": $(window).width() - 50
    });
  }
}

// Attach event handler for window resizing event
$(window).resize(function () {
  resizeGraph();
});

// to set the null value to current user as this will logout as well to make secure application
function info(){
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	currentUserObj = null;
	localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
}

function redirectPage(){
	var user=[];
	var userMatched = false;
	if (typeof (Storage) === "undefined") {
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	} 
	else if(document.getElementById("passcode").value === "9999"){
		if (localStorage.getItem("user") ==null || localStorage.getItem("user") ==[])
		localStorage.setItem("user", JSON.stringify(user));
		user = JSON.parse(localStorage.getItem("user")); 
		// Default user
			var newObj = {
				"FirstName": 'Admin',
				"LastName": 'User',
				"DateOfBirth": '1945-08-15',
				"NewPassword": '9999',
				"Email": 'Admin@LearningTracker.com',
				"Gender": 'Male',
				"agreedToLegal":null,
				"currentRecordIndex": null,
				"tbRecords": [{"Date": "2019-06-04", "LearningType": "Semester 1 - Mcda - UI/UX", "HoursSpend": "16"},
				{"Date": "2019-06-04", "LearningType": "Semester 1 - Mcda - Statistics", "HoursSpend": "6"},
				{"Date": "2019-06-04", "LearningType": "Semester 1 - Mcda - Software Dev.", "HoursSpend": "26"}]
				};
				currentUserObj = newObj;
				localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
				userMatched = true;
				$("#btnEnter").attr("href","#legalNotice").button();
			
		}
	else if (localStorage.getItem("user") ==null) {
		localStorage.setItem("user", JSON.stringify(user));
		user = JSON.parse(localStorage.getItem("user"));
	} 
	else if (localStorage.getItem("user") !=null && document.getElementById("passcode").value != "9999") {
		user = JSON.parse(localStorage.getItem("user"));
		var currentUserObj=null;
		localStorage.setItem("currentUser",currentUserObj); // Making sure there is null in current user
		for (var i=0;i<user.length;i++){	
		//if the password matches
			var password = user[i].NewPassword;
			var userName = user[i].Email;
			
			if (document.getElementById("passcode").value === password && document.getElementById("username").value === userName )
			{	
				localStorage.setItem("currentUser", JSON.stringify(user[i]));
				//if not agreed yet - Implemented this for multiple users 
				if (user[i].agreedToLegal === null) 
			   {
					$("#btnEnter").attr("href","#legalNotice").button();
					userMatched = true;
				} 
				else if (user[i].agreedToLegal === true) 
				{
					   $("#btnEnter").attr("href","#pageMenu").button();
					   userMatched = true;
				}
			}
		}
	}
	if ( userMatched==false)
	alert("Incorrect username/password, please try again.");
	}
	
function addValueToPassword(button) {
    var currVal = $("#passcode").val();
    if (button === "bksp") {
        $("#passcode").val(currVal.substring(0, currVal.length - 1));
    } else {
        $("#passcode").val(currVal.concat(button));
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);

};

function validateCredentials(firstName,lastName,dob,password,email,gender){
	var currentDate = new Date();
	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1;
	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	}
	if (mm < 10) {
	  mm = '0' + mm;
	}
	currentDate = yyyy+'-'+mm+'-'+dd;

	
	if (firstName=="" || firstName==null || lastName=="" || lastName==null) { // first name and last name validation
		return false;
	}
	if (dob=="" || dob== null ){ // date of birth validation for null or empty or current date
		return false;
	}
	if (dob >= currentDate ){ // date of birth validation for current date
		alert ("Date of birth cannot be more than current date");
		return false;
	}
	if (password=="" || password == null){ // password null validation
		return false;
	}
	if (email=="" || email == null ){ // email null validation
		return false;
	}
    if (gender=="" || gender == null || gender == "Choose Gender" ){ // gender null validation
		alert("Please choose Gender");
		return false;
		
	}
	if (!validateEmail(email)) // email pattern validation using regex
	{
		alert("Please fill valid email.");
		return false;
	}
	return true;
}

// Logout functionality - sets the current user to null and goes back to home page-Login
function logoutUser() {
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	currentUserObj = null;
	localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
	
}


function saveSignUpUser() {
	if(validateCredentials($("#signupFirstName").val(),$("#signupLastName").val(),$("#dateOfBirth").val(), $("#confirmPassword").val(),$("#signupEmail").val(),$("#signgenderType option:selected").val())){
	var newObj = {
		"FirstName": $("#signupFirstName").val(),
		"LastName": $("#signupLastName").val(),
		"DateOfBirth": $("#dateOfBirth").val(),
		"NewPassword": $("#confirmPassword").val(),
		"Email": $("#signupEmail").val(),
		"Gender": $("#signgenderType option:selected").val(),
		"agreedToLegal":null,
		"tbRecords": []
	};
	var currentObj = {
		"FirstName": $("#signupFirstName").val(),
		"LastName": $("#signupLastName").val(),
		"DateOfBirth": $("#dateOfBirth").val(),
		"NewPassword": $("#confirmPassword").val(),
		"Email": $("#signupEmail").val(),
		"Gender": $("#signgenderType option:selected").val(),
		"agreedToLegal":null,
		"currentRecordIndex": null,
		"tbRecords": []
	};
	var user = localStorage.getItem("user");
	if (user == null) {
		user = [];//if not found, create a new array
	}
	else {
		user = JSON.parse(user); //if found convert back to a JSON object
	}//end if-else

	user.push(newObj); //now add the new object
	
	
	try{
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("currentUser", JSON.stringify(currentObj));
		alert("Saving information......");
		$.mobile.changePage("#legalNotice");
		window.location.reload();
	}
	catch(e) {
		if (window.navigator.vendor === "Google Inc.") {
			if(e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else if ( e== QUOTA_EXCEEDED_ERR) {
				alert("Error: Saving to local storage.");
			}
			
			console.log(e);
		}
	}
}
}	
		
function saveDisclaimer(){
	var user = JSON.parse(localStorage.getItem("user"));
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	//var currentUser = document.getElementById("username").value;
	for (var i = 0; i < user.length; i++) {
		if (currentUserObj.NewPassword == "9999"){ // Default user
			currentUserObj.agreedToLegal = true;
			break;
		}
		else if(currentUserObj.Email === user[i].Email){ //look for match with current user
		   
		   user[i].agreedToLegal = true;  // now if the user agrees, change to true
		   currentUserObj.agreedToLegal = true;
		   break;  //exit loop since you found the user and changed the value
	   }
	}
	localStorage.setItem("user", JSON.stringify(user));
	localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
	$("#noticeYes").attr("href","#pageMenu").button();
}

function fillUserProfile() { // to show exisiting details of current user
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	if (currentUserObj != null){
		$("#profileFirstName").val(currentUserObj.FirstName);
			$("#profileLastName").val(currentUserObj.LastName);
			$("#profiledateOfBirth").val(currentUserObj.DateOfBirth);
			$("#profileEmail").val(currentUserObj.Email);
			$("#editPassword").val(currentUserObj.NewPassword);
			$('#profilegenderType option[value=' + currentUserObj.Gender + ']').attr('selected', 'selected');
			$("#profilegenderType option:selected").val(currentUserObj.Gender);
			try{
			$('#profilegenderType').selectmenu('refresh',true);}
			catch(e){
				// to catch the refresh error because the select menu may not be initialized yet
			}

	}
		
}	


function saveUserForm(){
	var user = JSON.parse(localStorage.getItem("user"));
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	//var currentUser = document.getElementById("username").value;
	for (var i = 0; i < user.length; i++) {
		
		if (currentUserObj.NewPassword== "9999"){ // Default user
			currentUserObj.FirstName = $("#profileFirstName").val();
			currentUserObj.LastName = $("#profileLastName").val();
			currentUserObj.DateOfBirth = $("#profiledateOfBirth").val();
			currentUserObj.NewPassword = $("#editPassword").val();
			currentUserObj.Email =  $("#profileEmail").val();
			currentUserObj.Gender = $("#profilegenderType option:selected").val();
			break;
		}
		else if(currentUserObj.Email === user[i].Email){ //look for match with current user
			// updating the current user
			currentUserObj.FirstName = $("#profileFirstName").val();
			currentUserObj.LastName = $("#profileLastName").val();
			currentUserObj.DateOfBirth = $("#profiledateOfBirth").val();
			currentUserObj.NewPassword = $("#editPassword").val();
			currentUserObj.Email =  $("#profileEmail").val();
			currentUserObj.Gender = $("#profilegenderType option:selected").val();
			user[i].FirstName = currentUserObj.FirstName; // saving the current user details in main users object
			user[i].LastName = currentUserObj.LastName;
			user[i].DateOfBirth = currentUserObj.DateOfBirth;
			user[i].NewPassword = currentUserObj.NewPassword;
			user[i].Email = currentUserObj.Email;
			user[i].Gender = currentUserObj.Gender;
		   break;  //exit loop since you found the user and changed the value
	   }
	}
	try {
      localStorage.setItem("user", JSON.stringify(user));
	  localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
      alert("Saving Information");
	  alert("Details Saved succesfully !!");
	  window.location.reload();
	  //$.mobile.navigate('#pageUserInfo');
	  fillUserProfile();
	  //$("#btnUserUpdate").attr("href","#pageMenu").button();
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
}	

function editRecordsPage()	{
	var user = JSON.parse(localStorage.getItem("user"));
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	if (currentUserObj != null) {
		$("#recordFirstName").text(" "+currentUserObj.FirstName+" "+currentUserObj.LastName);
		$("#recordLastName").text(" "+currentUserObj.LastName);
		$("#recorddateOfBirth").text(" "+currentUserObj.DateOfBirth);
		$("#recordEmail").text(" "+currentUserObj.Email);
		$("#recordPassword").text(" "+currentUserObj.NewPassword);
		$("#recordGender").text(" "+currentUserObj.Gender);
		if (currentUserObj.tbRecords != null)
			showTable();	
	}
	
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function showTable(){
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));

	if(!isEmpty(currentUserObj.tbRecords)){
	$("#tblRecords").html( 	// Initializing Headers
		"   <thead>" +
        "   <tr>" +
        "     <td>Date</td>" +
		"     <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
        "     <td>Learning Type</td>" +
		"     <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
        "     <td>Hours Spend</td>" +
		"     <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
		"     <td>Edit/Delete</td>" +
        "   </tr>"+
		"   </thead>"
    );
	for(var j=0; j<currentUserObj.tbRecords.length; j++)
	{
		
		$("#tblRecords").append( 
        "   <tr>" +
        "     <td>"+currentUserObj.tbRecords[j].Date+"</td>" +
		"     <td></td>" +
        "     <td>"+currentUserObj.tbRecords[j].LearningType+"</td>" +
		"     <td></td>" +
        "     <td>"+currentUserObj.tbRecords[j].HoursSpend+"</td>" +
		"     <td></td>" +
		"     <td><a href='#pageNewRecordForm' data-theme='c' type='submit' id='btnEditRecord"+j+"' data-icon='edit' data-iconpos='notext'  data-inline='true' data-role='button' data-mini='true' onclick='editCurrentRecord("+j+")'' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' title='' class='ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-notext ui-btn-up-c'><span class='ui-btn-inner'><span class='ui-btn-text'></span><span class='ui-icon ui-icon-edit ui-icon-shadow'>&nbsp;</span></span></a>"+ 
		"<a type='submit' id='btnDelRecord"+j+"' data-theme='c' data-icon='delete' data-role='button' data-iconpos='notext'  data-inline='true' data-mini='true' onclick='deleteRecord("+j+")' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' title='' class='ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-notext ui-btn-up-c'><span class='ui-btn-inner'><span class='ui-btn-text'></span><span class='ui-icon ui-icon-delete ui-icon-shadow'>&nbsp;</span></span></a></td>" +
        "   </tr>"
    );
	}
	}

}

function editCurrentRecord(recordIndex){
	var user = JSON.parse(localStorage.getItem("user"));
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	currentUserObj.currentRecordIndex = recordIndex;
	localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
	if (currentUserObj.NewPassword== "9999"){ // Default user
		$("#datLearningDate").val(currentUserObj.tbRecords[recordIndex].Date);
		$("#txtType").val(currentUserObj.tbRecords[recordIndex].LearningType);
		$("#txtHours").val(currentUserObj.tbRecords[recordIndex].HoursSpend);
	}
	else {
	for (var i = 0; i < user.length; i++) {

		if(currentUserObj.Email === user[i].Email){ //look for match with current user
		   user[i]=currentUserObj;		
			$("#datLearningDate").val(currentUserObj.tbRecords[recordIndex].Date);
			$("#txtType").val(currentUserObj.tbRecords[recordIndex].LearningType);
			$("#txtHours").val(currentUserObj.tbRecords[recordIndex].HoursSpend);
			
		   break;  //exit loop since you found the user and changed the value
	   }
	}
	}

}

function deleteRecord(recordIndex){
	var user = JSON.parse(localStorage.getItem("user"));
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	currentUserObj.tbRecords.splice(recordIndex,1);
	if (currentUserObj.NewPassword== "9999"){ // Default user
			if (currentUserObj.tbRecords.length == 0) {
				currentUserObj.tbRecords = [];
			}
			localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
		}
		
	else{	
	for (var i = 0; i < user.length; i++) {
		
		
		if(currentUserObj.Email === user[i].Email){ //look for match with current user
		   user[i]=currentUserObj;
		   if (currentUserObj.tbRecords.length == 0) {
				/* No items left in records, remove entire 
					 * array from localStorage
					 */	
				currentUserObj.tbRecords = []; 
				user[i].tbRecords=currentUserObj.tbRecords;
			}
			//otherwise save it back
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
			
		   break;  //exit loop since you found the user and changed the value
	   }
	}
	}
	
	showTable();
	$.mobile.navigate('#pageRecords');
	window.location.reload();
	
}

function clearRecordHistory(){
	var user = JSON.parse(localStorage.getItem("user"));
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	currentUserObj.tbRecords = [] ;
	
	if(currentUserObj.NewPassword== "9999"){
		localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
		window.location.reload();
		showTable();
	}
	else{
	for (var i = 0; i < user.length; i++) {
		if(currentUserObj.Email === user[i].Email){
			user[i].tbRecords=currentUserObj.tbRecords;
			break;
		}
	}
	localStorage.setItem("user", JSON.stringify(user));
	localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
	window.location.reload();
	showTable();
	}
	
}

function checkAddOrEditRecord(){
	var user = JSON.parse(localStorage.getItem("user"));
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	var currentRecordIndex = currentUserObj.currentRecordIndex;
	var record = {
      "Date": $('#datLearningDate').val(),
      "LearningType": $('#txtType').val(),
      "HoursSpend": $('#txtHours').val()
	};
	if (currentUserObj.NewPassword== "9999"){ // Default user
			
			if(currentRecordIndex!=null){
				currentUserObj.tbRecords[currentRecordIndex].Date = $("#datLearningDate").val();
				currentUserObj.tbRecords[currentRecordIndex].LearningType = $("#txtType").val();
				currentUserObj.tbRecords[currentRecordIndex].HoursSpend = $("#txtHours").val();
				currentUserObj.currentRecordIndex=null;
			}  
			else if (currentRecordIndex==null){ // to check whether to add or edit
				currentUserObj.tbRecords.push(record);
			}
			
		}
	else {
	for (var i = 0; i < user.length; i++) {
		if(currentUserObj.Email === user[i].Email){ //look for match with current user
			if(currentRecordIndex==null){ // to check whether to add or edit
				//now add the new object
				currentUserObj.tbRecords.push(record);
				user[i] = currentUserObj;
				break;  //exit loop since you found the user and changed the value
			}
			else{
				currentUserObj.tbRecords[currentRecordIndex].Date = $("#datLearningDate").val();
				currentUserObj.tbRecords[currentRecordIndex].LearningType = $("#txtType").val();
				currentUserObj.tbRecords[currentRecordIndex].HoursSpend = $("#txtHours").val();
				user[i].tbRecords = currentUserObj.tbRecords;
				currentUserObj.currentRecordIndex=null;
				break;
			}  
	}
	}
	}
	
	try{
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("currentUser", JSON.stringify(currentUserObj));
		alert("Record Added Successfully");
		//$("#noticeYes").attr("href","#pageMenu").button();
		showTable();
		$.mobile.navigate('#pageRecords');
		window.location.reload();
	}
	catch(e) {
		if (window.navigator.vendor === "Google Inc.") {
			if(e == DOMException.QUOTA_EXCEEDED_ERR) {
				alert("Error: Local Storage limit exceeds.");
			}
			else if ( e== QUOTA_EXCEEDED_ERR) {
				alert("Error: Saving to local storage.");
			}
			
			console.log(e);
		}
	}
}

/** ******************************************************* **/
/** Graph  Functions **/
/** ******************************************************* **/

function drawSuggestionGraph(){
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	var learningHours = 0;
	for (var i=0;i<currentUserObj.tbRecords.length;i++){
		learningHours+= parseInt(currentUserObj.tbRecords[i].HoursSpend);
	}
	var canvas = document.getElementById("AdviceCanvas");
	var canvasContext = canvas.getContext("2d");
	drawAdviceCanvas(canvasContext,learningHours);
	
}

function drawLineGraph(){
	var currentUserObj = JSON.parse(localStorage.getItem("currentUser"));
	var LearningHoursArr = [] ;
	var Datearr = [];
	for (var i=0;i<currentUserObj.tbRecords.length;i++){
		LearningHoursArr.push(parseInt(currentUserObj.tbRecords[i].HoursSpend));
		Datearr.push(currentUserObj.tbRecords[i].Date);
	}
	drawLines(LearningHoursArr, Datearr);
	
}

function drawAdviceCanvas(ctx, learningHours) {
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Your current Learning Hours are " + learningHours +  ".", 25, 320);

    ctx.fillText(
      "Your target Learning range is: 50-100 Hours",  25, 350);
    levelwrite(ctx, learningHours);
    levelMeter(ctx, learningHours);
}

//For deciding what to write for given values
function levelwrite(ctx, learningHours) {
  if ((learningHours >= 1) && (learningHours <= 10)) {
    writeAdvice(ctx, "red");
  } else if ((learningHours > 10) && (learningHours <= 50)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "green");
  }
}

function writeAdvice(ctx, level) {
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (level == "red") {
    adviceLine1 = "Please take care of the Learning Hours.";
    adviceLine2 = "Its way less than the minimum limit.";
  } else if (level == "yellow") {
    adviceLine1 = "The Learning Hours needs to be checked!!";
  } else if (level = "green") {
    adviceLine1 =
      "Your Learning Hours are on point.Good Work !!";
  }
  ctx.fillText("Your Learning Hours are " + level +
    ".", 25, 380);
  ctx.fillText(adviceLine1, 25, 410);
  ctx.fillText(adviceLine2, 25, 440);
}

function levelMeter(ctx, learningHours) {
  if (learningHours <= 100) {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 100, learningHours)
      .Set("chart.colors.ranges", [
        [50, 100, "#0f0"],
        [10, 50, "yellow"],
        [1, 10, "red"]
      ]);
  } else {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, learningHours, learningHours)
      .Set("chart.colors.ranges", [
        [50, 100, "#0f0"],
        [10, 50, "yellow"],
        [0.01, 0.1, "red"],
        [100.01, learningHours, "#0f0"]
      ]);
  }
  drawMeter(cg);
}

// Meter properties
function drawMeter(g) {
     g.Set("chart.value.text.units.post", " Hours")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 10)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
	.Set("chart.text.color", "black")
    .Set("chart.value.text.decimals", 0)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "Learning Hours Limit")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}


function drawLines(learningHoursArr, Datearr) {
  var expenseLine = new RGraph.Line("GraphCanvas", learningHoursArr, 0, 0)
        .Set("labels", Datearr)
    .Set("colors", ["blue"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
	.Set("gutter.right", 40)
    .Set("gutter.left", 40)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.labels.ingraph", [, , ["Hours",
      "blue", "yellow", -1, 80
    ], , ])
    .Set("chart.title", "Learning Hours")
    .Draw();
}
