document.addEventListener('DOMContentLoaded', function() {
    var URL = 'https://docs.google.com/spreadsheets/d/1ywvCOrEAcT_LpFQR5DiPtDoM-ISOrCGYIRQmnfUZK6c/pubhtml';
    Tabletop.init( { key: URL, callback: codeLAddress, simpleSheet: true } )
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
        div.style.height='80px';
        div.style.border="3px solid #C1C3D1";
        div.style.color = "black";
        div.style.fontSize="50px";


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
var oldID='post_';
list.addEventListener('click', function(e) {
    
   var target = e.target; // Clicked element
    
    while (target && target.parentNode !== list) {
        target = target.parentNode;
         // If the clicked element isn't a direct child
        if(!target) { alert("NO");return; } // If element doesn't exist
    }

    if (target.tagName === 'DIV'){
        
        document.getElementById(target.id).style.background = "#d3d3d3";
        delayBy(700);
         window.location = "description.html";
         if(oldID!='post_'){
            document.getElementById('pTitle').innerHTML = '';
            document.getElementById('image').innerHTML = '';
            document.getElementById('Name').innerHTML = '';
            document.getElementById('des').innerHTML = '';
            
        }


        
        //display title

        var h = document.createElement('h1');
        var t = document.createTextNode(data[i].Name);
        h.appendChild(t);
        document.getElementById('pTitle').appendChild(h);

        //display other elements
        var id = target.id;
        var idNew =String(id);
        var i = idNew.split('_').pop();
        
        //create a break
        var br = document.createElement('br');
        document.getElementById('pTitle').appendChild(br);

        //create the charity name
        var p= document.createElement('p');
        
        var t = document.createTextNode(data[i].charity);
        p.appendChild(t);
        document.getElementById('Name').appendChild(p);
        //create the type
        var icon = document.createElement('p');
        var iconT = document.createTextNode(data[i].Type);
        icon.appendChild(iconT);
        document.getElementById('type').appendChild(iconT)
        //create a break
        var br = document.createElement('br');
        document.getElementById('Name').appendChild(br);
        //create a break
        var br = document.createElement('br');
        document.getElementById('Name').appendChild(br);
        //create a break
        var br = document.createElement('br');
        document.getElementById('Name').appendChild(br);



         //create a break
        var br = document.createElement('br');
        document.getElementById('image').appendChild(br);
       

        //create the description
        var d= document.createElement('p');
        var t = document.createTextNode(data[i].description);
        var c=d.appendChild(t);
        document.getElementById('des').appendChild(c);
        


        oldID=target.id;

        


    

       


        
            
        
    }
 
});
}    

function GetRoute() {
    
 
    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            
            return distance;
 
        } 
        else {
            alert("Unable to find the distance via road.");
        }
    });
}


    function delayBy(delay) {
        setTimeout(function(){ console.log("pause") }, delay);
}
    
         
    function codeLAddress(data) {
        initMap();
        console.log("fine");
        var delay = 50;
        var geocoder= new google.maps.Geocoder();
       
        for (var i = 0; i < data.length; i++) {
            var address = data[i].Location1;
            console.log(address);
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                    destination = results[0].geometry.location;
                    
                } 
                else {
                    i--;

                    delay++;
                    delayBy(delay);
                    
                }
            });

        }

        
        
    };  

     function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            origin = results[0].geometry.location;
            console.log(origin);

            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    
    
  
/*
    var oldID='post_';
    list.addEventListener('click', function(e) {
    
   
    var target = e.target; // Clicked element
    
    while (target && target.parentNode !== list) {
        target = target.parentNode;
         // If the clicked element isn't a direct child
        if(!target) { alert("NO");return; } // If element doesn't exist
    }

    if (target.tagName === 'DIV'){
        alert("yes");
        alert(target.id);

        

    }

*/
