var items = new Array();			//the array of item objects
var n = 0;							//a counter of the number of objects

$(document).ready(function(){	

	/*when add is clicked, a test is done to see if the user entered only whitespace. If they did, the user is notified 
	and the function stops. If not, a new object is created, displayed, and added to the array of objects*/
							
	$("#add").click(function(){	
		if (testWhiteSpace(document.getElementById('addItem').value)) {
		return;
		}
		
		var addedItem = new ItemClass(document.getElementById('addItem').value, n); //new object created
		items.push(addedItem);										//added to array of objects
		addedItem.display();										//objects display function is called
		$('#addItem').val("");    									//empties the input field
		document.getElementById('addItem').focus();					//sets focus back to input field
	});	
	
	
	/*when remove is clicked, an array of checkboxes is made, and cycled through. If the id of any checkbox matches the
	corresponding object, then the remove function is called on that object and the object is removed from the array*/
	
	$("#remove").click(function(){										
		var boxes = $(":checkbox:checked");
		for (x = 0; x < boxes.length; x++) {					//loop through array of checkboxes
			var store = document.getElementById(boxes[x].id); 	//get the checkbox
			var checkIDNew = store.id;							//store id of checkbox
			console.log("checkIDNew = " + checkIDNew);
				$.each(items, function(i){						
					if(items[i].num == checkIDNew) {			//see if items unique identifier matches checkbox id
						items[i].remove();						//call item's remove function
						items.splice(i,1);						//remove it from array
						return false;
						}
				});
		}	
	});
	
	/*This function styles any item checked off with 'line-through' css  */
	
	$("#container").on('click', ':checkbox', function(){
			if ($(this).is(':checked')) {    
				var checkID = document.getElementById(this.id);
				$("#" + checkID.id +'').css('textDecoration', 'line-through');
			}
			else {
				var checkID = document.getElementById(this.id);
				$("#" + checkID.id +'').css('textDecoration', 'none');	//when unchecked style returns to normal
			}
	});
		
});

	//this handles the pressing of enter as clicking the add button
	
$(document).keypress(function(event){			
    var keycode = (event.which);				//when key is pressed
		if(keycode == '13'){						//if that key was 13 (enter)
        $("#add").click();   				//then button is "clicked"
		}
});
	
	/*Item class is a 'class' (using the term loosely) with the functions display() and remove(). It's properties are 
	name, and num (unique identifier). Each object in the items array is a member of this class*/
	
function ItemClass (name, num) {

	this.name = (name + ''); 								//name is for displaying to the page, it's exactly what the user
															//types in.
	this.num = n;											//num is the unique id of each object which 
															//corresponds to the checkboxes id
	
	console.log("name of object is " + this.name);
	console.log("num is " + this.num);

	this.display=display;						//display method displays the name, but not the shortened name if it had whitespace
	function display() {
		$('#container').append('<div class="item" id = ' + this.num +'>' + this.name + '</div>' +
		'<div class="checkbox"><input type="checkbox" id=' + this.num +' >' + '</div>');
		n++;
	}

	this.remove=remove;				//remove() removes the div and the checkbox with the objects unique identifier
	function remove(){				//and deletes the object
		$("#" + this.num +'').remove();
		$("input:checkbox[id='" + this.num + "']").remove();
		delete(this);
	}
	
}

//function for determining if name had whitespace

function hasWhiteSpace(st) {
	return st.indexOf(' ') >= 0;
	}
	
//function for handling the error of only whitespace being typed in
	
function testWhiteSpace(s) {
	$('.warning').remove();	
		if (s.trim() == '' ) {
		$('#container').append("<div class='warning'>You didn't type in anything!</div>");
		return true;
		}
}