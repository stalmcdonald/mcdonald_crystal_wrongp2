//Crystal McDonald
//Visual Frameworks (VFW)
//Full Sail University
//October 19, 2011
//Project 4

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {

	//getElementById Function
	//creating shortcut function whenever we want to get element.
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}	
	
	//Variable defaults array for drop down menu
	var addGuest = ["--Choose A Guest--","Family","Friend","Work","VIP","Other"];
	var attendValue = "";
	var rsvpValue = "No";
	var errMsg = $('errors');
	var save = $("submit");
	var displayLink = $("displayLink");	
	var clearLink = $("clear");
	
	
	//create select field element an populate it w/ options. exchanged createGuests from makeCats.
	function createGuests() {
		//created variable to target form tag
		var formTag = document.getElementsByTagName("form"),  //form tag is an array. b/c plural getElements.
			//created a variable to target the list item  
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "guest");
		for(var i=0, j=addGuest.length; i<j;  i++) {
			var makeOption = document.createElement('option');
			var optText = addGuest[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		//attaches to the page
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected radio button.
	function getSelectedRadio() {
		var radios = document.forms[0].attend; 
		for(var i=0; i<radios.length; i++) {;
			if(radios[i].checked) {
				attendValue = radios[i].value;
			}
		}
	}
	
	function getCheckboxValue() {
		if($("RSVPd").checked) {
			rsvpValue = $("RSVPd").value;
		}else{
			rsvpValue = "No";
		}
	}
	
	//changing css properties to turn html on off
	function toggleControls(n) {
		switch(n) {
			case "on":
				$("guestForm").style.display = "none";
				//on an anchor tag 
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				//reloads page back to form
				$("addNew").style.display = "inline";
				break;
				//when not looking at data
			case "off":
				$("guestForm").style.display = "block";
				//on an anchor tag 
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				//reloads page back to form
				$("addNew").style.display = "none";
				//were hiding not leaving, data still there
				$("item").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(key) {
			//if no key, this is a brand new item ans we need new key
			if (!key){
				//everytime submit guest it generates a new id creating a new random number
				var id = Math.floor(Math.random() * 100000001);
			}else{
				//set id to the existing key we're editing to save over the data
				//The key is the same key being passed along from editSubmit even handler
				//to the validate function, and then passed here, into the storeData function.
				id = key;
			}
		
			//Gather up all our form field values and store in an object
			//object properties contain array w/ form label and input values. 
			getSelectedRadio();
			
			getCheckboxValue();
		
			var item   = {};
				item.guest = ["Add Guest:", $('guest').value];
				item.fname = ["First Name:", $('fname').value];
				item.lname = ["Last Name:", $('lname').value];
				item.date = ["Date Invitation Mailed:", $('date').value];
				item.RSVPd = ["RSVPd:", rsvpValue];  //checkbox
				item.attend = ["Attendance:", attendValue]; //radio
				item.additionalGuest= ["Additional Guests:", $("Additional").value];
				item.notes = ["Notes:", $("notes").value];
	
			//save data in local storage using stringify to convert object to a string with all of our values
			localStorage.setItem(id, JSON.stringify(item) );
			alert("Guest Saved!");
		}
		
	function validate(e) {
		//Define the elements we want to check
		var getGuest = $('guest');
		var getfname = $('fname');
		var getlname = $('lname');
		
		//reset error messages
		errMsg.innerHTML = "";
		getGuest.style.border = "1px solid black";
		getfname.style.border = "1px solid black";
		getlname.style.border = "1px solid black";	
		//Get Error messages
		var messageAry = [];
	
		//Group Validation
		if(getGuest.value==="--Choose A Guest--") {
			var guestError = "Please Choose a Guest.";
			getGuest.style.border = "1px solid red";
			messageAry.push(guestError);
		}
		//first name validation
		if(getfname.value ==="") {	
			var fNameError = "Please enter a first name.";	
			getfname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}

	    //last name validation
		if(getlname.value ==="") {
	
			var lNameError = "Please enter a last name.";
			getlname.style.border = "1px solid red";
			messageAry.push(lNameError);
	}
		
		//If there were errors, display them on the screen
		if(messageAry.length >= 1) {
		
			for(var i=0, j=messageAry.length; i <j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}	
			
			e.preventDefault();
			return false;
		}else{	
		
			//if all is okay, save our data. Send the key value (which came from the editData function.
			//Remember this key value was passed through the editSubmit event list as a property.
			storeData(this.key);
		
		}
			
	}
			
		
	function editItem() {
			//Grab data from item from local storage
			var value = localStorage.getItem(this.key);//same as editLink.key
			var item = JSON.parse(value);
			
			//show the form to edit item
			toggleControls("off");
		
			//populate the form fields with current localStorage values.
			$('guest').value = item.guest[1];
			$('fname').value = item.fname[1];
			$('lname').value = item.lname[1];
			$('date').value = item.date[1];
			if(item.RSVPd[1] == "Yes"){
				$("RSVPd").setAttribute("checked", "checked");
			}
			var radios = document.forms[0].attend;
			for(var i=0; i<radios.length; i++) {
				if(radios[i].value == "Attending" && item.attend[1] == "Attending"){
					radios[i].setAttribute("checked", "checked");
				}else if(radios[i].value == "Not Attending" && item.attend[1] == "Not Attending"){
					radios[i].setAttribute("checked", "checked");
				}else if(radios[i].value == "Maybe" && item.attend[1] == "Maybe"){
					radios[i].setAttribute("checked", "checked");
				}
			}
			$("Additional").value = item.additionalGuest[1];
			$("date").value = item.date[1];
			$("notes").value = item.notes[1];
			
			//Remove the intitial listener from the input 'save contact' button.
			save.removeEventListener("click", storeData);
			//change submit button value to say Edit button
			$('submit').value = "Edit Guest";
			var editSubmit = $('submit');
			//save the key value established in this function as a property of the edit submit
			//so we can use that value to Edit Button
			editSubmit.addEventListener("click", validate);
			editSubmit.key = this.key;
		}		
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete Guest?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Guest was deleted.");
			window.location.reload();
		}else{
			alert("Guest was NOT deleted.");
		}
	}	
		
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement('a');
	    editLink.href = "#";
		editLink.key = key;//property created to edit link function
		var editText = "Edit Guest";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Guest";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		}		
		
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0) {
			autoFillData();
			
			alert("There is no data in Local Storage so default data was added.");
		}
		//write data from local storage to the browser
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "item");
		//unordered list that holds items
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		//precaution for to display
		$("item").style.display = "block";
		//getting data out of local storage
		for(var i=0, len=localStorage.length; i<len; i++) {
			//putting key value pair in list item
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert string from local storage value back to an object using JSON.parse
			var obj = JSON.parse(value);
			//loop through all the data (loops inside of loops)
			//create another unordered list item (sublist)
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			
			getImage(obj.guest[1], makeSubList);
			
			for(var n in obj) {
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				//looks at obj property grabs 1st index of array for label and then second for the value
				var optSubText = obj[n][0]+" " +obj[n][1];
				//assigning to a variable
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
				}
				makeItemLinks(localStorage.key(i), linksLi ); //create edit & delete links for each item in localStorage
				//SelectLi.appendChild(makeSelect);
			}	
		}
		
		//Get the image for the right category.
		function getImage(guestCat, makeSubList) {
			var imageLi = document.createElement('li');
			makeSubList.appendChild(imageLi);
			var newImg = document.createElement('img');
			var setSrc = newImg.setAttribute("src", "images/"+ guestCat + ".png");
			imageLi.appendChild(newImg);
		}
		
		
		//JSON Object which will auto populate local storage.
		function autoFillData(){
			var json = {
				"guest1": {  
					"guest": ["Guest:", "VIP"],
					"fname": ["First Name:", "Queen Cercei"],
					"lname": ["Last Name:", "Lannister"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "4"],
					"notes": ["Notes:", "Announce upon arrival."]
				},
				"guest2": {  
					"guest": ["Guest:", "Work"],
					"fname": ["First Name:", "Lady Arya"],
					"lname": ["Last Name:", "Stark"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "0"],
					"notes": ["Notes:", "Will not relinquish 'Needle' upon entering."]
				},
				"guest3": {  
					"guest": ["Guest:", "Friend"],
					"fname": ["First Name:", "Lady Margaery"],
					"lname": ["Last Name:", "Tyrell"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Maybe"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "Allergies: Shellfish."]
				},
				"guest4": {  
					"guest": ["Guest:", "Family"],
					"fname": ["First Name:", "Jeyne"],
					"lname": ["Last Name:", "Poole"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Not Attending"],
					"additionalGuest": ["Additional Guests:", "0"],
					"notes": ["Notes:", "Will send some Spiced Wine."]
				},
				"guest5": {  
					"guest": ["Guest:", "VIP"],
					"fname": ["First Name:", "Lady Melisandre"],
					"lname": ["Last Name:", "Red Preist"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "4"],
					"notes": ["Notes:", "No Sacrifices."]
				},
				"guest6": {  
					"guest": ["Guest:", "Work"],
					"fname": ["First Name:", "Lady Lysa"],
					"lname": ["Last Name:", "Tully"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "0"],
					"notes": ["Notes:", "Loves Bunco."]
				},
				"guest7": {  
					"guest": ["Guest:", "Friend"],
					"fname": ["First Name:", "Princess Myrcella"],
					"lname": ["Last Name:", "Lannister"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Maybe"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "Recently engaged to the Prince of Dorne."]
				},
				"guest8": {  
					"guest": ["Guest:", "Other"],
					"fname": ["First Name:", "Lady Perra"],
					"lname": ["Last Name:", "Frey"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "1"],
					"notes": ["Notes:", "of House Royce."]
				},
				"guest9": {  
					"guest": ["Guest:", "Work"],
					"fname": ["First Name:", "Asha"],
					"lname": ["Last Name:", "Greyjoy"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "Bringing Dornish Wine"]
				},
				"guest10": {  
					"guest": ["Guest:", "Friend"],
					"fname": ["First Name:", "Queen Daenreys"],
					"lname": ["Last Name:", "Targaryen"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Maybe"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "Will need a place to house Dragons."]
					},
				"guest11": {  
					"guest": ["Guest:", "Friend"],
					"fname": ["First Name:", "Lady Cyrenna"],
					"lname": ["Last Name:", "Frey"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "4"],
					"notes": ["Notes:", "of House Swann."]
				},
				"guest12": {  
					"guest": ["Guest:", "Work"],
					"fname": ["First Name:", "Lady Jeyne"],
					"lname": ["Last Name:", "Westerling"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "0"],
					"notes": ["Notes:", "Recently married Robb Stark."]
				},
				"guest13": {  
					"guest": ["Guest:", "Friend"],
					"fname": ["First Name:", "Princess Arianne"],
					"lname": ["Last Name:", "Martell"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Maybe"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "Heir to Sunspear."]
				},
				"guest14": {  
					"guest": ["Guest:", "Family"],
					"fname": ["First Name:", "Lady Nym"],
					"lname": ["Last Name:", "Sand"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Not Attending"],
					"additionalGuest": ["Additional Guests:", "0"],
					"notes": ["Notes:", "Of old Volatanis."]
				},
				"guest15": {  
					"guest": ["Guest:", "VIP"],
					"fname": ["First Name:", "Lady Roslin"],
					"lname": ["Last Name:", "Frey"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "4"],
					"notes": ["Notes:", "Semi Tully."]
				},
				"guest16": {  
					"guest": ["Guest:", "Work"],
					"fname": ["First Name:", "Lady Alerie"],
					"lname": ["Last Name:", "Tyrell"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "0"],
					"notes": ["Notes:", "of House Hightower."]
				},
				"guest17": {  
					"guest": ["Guest:", "Friend"],
					"fname": ["First Name:", "Lady Leonette"],
					"lname": ["Last Name:", "Tyrell"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Maybe"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "of House Fossoway."]
				},
				"guest18": {  
					"guest": ["Guest:", "Other"],
					"fname": ["First Name:", "Lady Taena"],
					"lname": ["Last Name:", "Merriweather"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "1"],
					"notes": ["Notes:", "Will bring a cheese platter."]
				},
				"guest19": {  
					"guest": ["Guest:", "Work"],
					"fname": ["First Name:", "Aylce"],
					"lname": ["Last Name:", "Grace-Ford"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Attending"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "Bringing Eastern Spices"]
				},
				"guest20": {  
					"guest": ["Guest:", "Friend"],
					"fname": ["First Name:", "Lady Olenna"],
					"lname": ["Last Name:", "Tyrell"],
					"date": ["Date Invitation Mailed:", "11/1/11"],
					"RSVPd": ["RSVPd:", "Yes"],
					"attend": ["Attendance:", "Maybe"],
					"additionalGuest": ["Additional Guests:", "3"],
					"notes": ["Notes:", "of House Redwyne."]
				}
			};

			
			//Store the JSON OBJECT into Local Storage.
		for (var n in json) {
			var id = Math.floor(Math.random() * 100000001);
			localStorage.setItem(id,JSON.stringify(json[n]) );
		}
	}
	
	//make item links function
	//creates edit/delete links for each stored item when displayed.
	function clearLocal() {
			if(localStorage.length === 0) {
				alert("There is no data to clear.");
			}else{
				localStorage.clear();
				alert("All guests have been deleted.");
				window.location.reload();
				return false;
			}
		}
		
	//execute function
	createGuests();
		
	//Set Link & Submit Click Events using id =display data
	//do something w/ the element so when click something happens  addEventListner doesnt do () for the function
	displayLink.addEventListener("click", getData);
	clearLink.addEventListener("click", clearLocal);
	save.addEventListener("click", validate);
		
		
//ensures nothing will run until DOM content is loaded.
});
