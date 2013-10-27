var items = new Array();
var n = 0;

$(document).ready(function(){								
	$("#add").click(function(){
		var addedItem = new ItemClass(document.getElementById('addItem').value, n);
		items.push(addedItem);
		addedItem.display();
		$('#addItem').val("");    									//empties the input field
		document.getElementById('addItem').focus();					//sets focus back to input field
	});	
	
	$("#remove").click(function(){
		var boxes = $(":checkbox:checked");
		for (x = 0; x < boxes.length; x++) {
			var store = document.getElementById(boxes[x].id);
			var storeID = store.id;
			var checkIDNew = storeID;
			console.log("checkIDNew = " + checkIDNew);
				$.each(items, function(i){
					if(items[i].num == checkIDNew) {
						items[i].remove();
						items.splice(i,1);
						return false;
						}
					});

		}	

	});
	
	$("#container").on('click', ':checkbox', function(){
		console.log("you clicked on a checkbox");
			if ($(this).is(':checked')) {
				var checkID = document.getElementById(this.id);
				console.log("got the id of the checked box and it is: " + checkID.id);
				$("#" + checkID.id +'').css('textDecoration', 'line-through');
			}
			else {
				var checkID = document.getElementById(this.id);
				console.log("got the id of the unchecked box and it is: " + checkID.id);
				$("#" + checkID.id +'').css('textDecoration', 'none');
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
	
	
function ItemClass (name, num) {

	this.name = name;
	
	if (hasWhiteSpace(this.name)) {	
		var newName = this.name.split(" ");
		this.name = newName[0];
	} 
	
	this.num = (this.name + num + '');
	
	console.log("name of object is " + this.name);
	console.log("num is " + this.num);

	this.display=display;
	function display() {
		$('#container').append('<div class="item" id = ' + this.num +'>' + name + '</div>' +
		'<div class="checkbox"><input type="checkbox" name=' + name + ' id=' + this.num +' value="0">' + '</div>');
		n++;
			if (num > 9) {
			n = 0;
			}
	}

	this.remove=remove;
	function remove(){
		$("#" + this.num +'').remove();
		$("input:checkbox[id='" + this.num + "']").remove();
		delete(this);
	}
	
}

function hasWhiteSpace(s) {
	return s.indexOf(' ') >= 0;
	}
