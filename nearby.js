document.addEventListener('DOMContentLoaded', function() {
    var URL = 'https://docs.google.com/spreadsheets/d/1ywvCOrEAcT_LpFQR5DiPtDoM-ISOrCGYIRQmnfUZK6c/pubhtml';
    Tabletop.init( { key: URL, callback: makeUL, simpleSheet: true } )
   
  //Tabletop.init( { key: URL, callback: searchByLocation, simpleSheet: true } )
   
    
})
function makeUL(data) {

 var list = document.createElement('ul');
   console.log("makingList"); 
    


    for(var i = 0; i < data.length; i++) {
        // Create the div item:
        var div = document.createElement('div');
        div.style.width = '100%';
        div.style.height='200px';
        div.style.border="3px solid #C1C3D1";
        div.style.color = "black";
        div.style.fontSize="80px";


        div.style.background = "white";
        div.style.textAlign="left";
        div.style.padding="-2px 2px 10px";
        div.style.margin = "5px 5px 5px 5px";
        



        //create list item
        var a = document.createElement('a');
        var item = document.createElement('li');
        
        
        a.setAttribute('href', '#results');
        
        item.appendChild(a);
        div.appendChild(item);
        div.setAttribute('id', 'post_'+i);
        

        // Add it to the list:

        list.appendChild(div);
        
        document.getElementById('results').appendChild(list); 
        document.getElementById('post_'+i).textContent = data[i].Name;
    }
	}

function searchByLocation(data){
	console.log("in Here");
	for(var i = 0; i < data.length; i++) {
		//if(data[i].)
	}

}