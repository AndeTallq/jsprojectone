

function newEvent()
{   
    //var input collects the value from the input.
    //var item creates the li that will later on be appended to the main UL ("todo").
    //display takes the value collected by input and makes it into a textnode for further use.    
    var input = document.getElementById("todo").value;
    var item = document.createElement("li");
    var display = document.createTextNode(input);
    item.appendChild(display);
    
    
    if (input === "" | input.length < 3 | input.length> 30)
    { 
        //If the input is empty, it won't be added to the list and an alert will be shown.
        var motivation = Math.floor(Math.random() * 4);
        //Some fun encouragement.
        if (motivation === 0){alert("Invalid input, must be between 3-30 characters. I'm afraid you have to add something else");}
        if (motivation === 1){alert("Invalid input, must be between 3-30 characters. The journey of a thousand miles starts with one step. Take it.");}
        if (motivation === 2){alert("Invalid input, must be between 3-30 characters. Yesterday you said tomorrow- just add it to the list!");}
        if (motivation === 3){alert("Invalid input, must be between 3-30 characters. No pain no gain. You have to add something!");}
        //Color the inputfields border red if input fails.
        document.getElementById("todo").style.borderColor="red";
    }
    else
    {
        //If the last input was incorrect the border is set to being red- we need to fix that for an accepted input
        document.getElementById("todo").style.borderColor="#0ef6cc";
        //If the input isn't empty, we first create a span -> append an X to that span and finally append the span to the li.
        var span = document.createElement("span");
        span.className = "eradicate";
        var x = document.createTextNode ("X");
        span.appendChild (x);
        //We also need to create a checkbox and append that to the li.
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = "cbx";
        //Append created elements to the li
        item.appendChild(checkbox);
        item.appendChild(span);
        //append the li to the ul
        document.getElementById("thelist").appendChild(item);
    }
    //After the input has been accepted or rejected, the program will clear the input field.
    document.getElementById("todo").value = "";

    // we need an option to remove listed item.
    var eradicate = document.getElementsByClassName("eradicate");
    for (var i = 0; i < eradicate.length; i++) 
    {
        eradicate[i].onclick = function()
         {
            var div = this.parentElement;
            div.remove();

            //Update counter when item is removed
            document.getElementById("counter").innerText = "Current amount of things to do: ";
            var numbers = document.getElementById('thelist').getElementsByTagName('li').length;
            var amount = document.createTextNode(document.getElementById('thelist').getElementsByTagName('li').length); 
            var counter = document.getElementById("counter");
            if(numbers === 0)
            {
                document.getElementById("counter").innerText = "Seems like there's nothing to do!";
            }
            else
            {
                counter.appendChild(amount);
            }    
        }
    }
     
   
    //Update counter when item is removed
    //Notice that this is the same snippet of code as above. This is due to the above one only counting when the X has been pressed.
    //This one wont count that- since the function (newEvent) isn't called.
    document.getElementById("counter").innerText = "Current amount of things to do: ";
    var numbers = document.getElementById('thelist').getElementsByTagName('li').length;
    var amount = document.createTextNode(document.getElementById('thelist').getElementsByTagName('li').length); 
    var counter = document.getElementById("counter");
    if(numbers === 0)
    {
        document.getElementById("counter").innerText = "Seems like there's nothing to do!";
    }
    else
    {
        counter.appendChild(amount);
    }
    //Let's give affirmation if the user checks an item off their list. 
    // Check that the input was accepted in order to avoid error regarding cbx.addEventListener
    if(checkbox)
    {
        // Create the GJ span.
        var spantwo = document.createElement("span");
        spantwo.className="classicalConditioning";
        var gj = document.createTextNode("Great Job!")
        spantwo.appendChild(gj);
        checkbox.addEventListener("change",(event) => 
        {  
            // If it is checked- append "great job" to item. If the check is removed- remove the child.
            if (event.currentTarget.checked) 
            {
                item.appendChild(spantwo);
            }
            else 
            {
                item.removeChild(item.children[2]);
            }
 
        });
    }
    //storage
        //NOTE: Couldn't get this to work in any reliable way.
                //I'm able to store the data.
                //I'm not able to present the data in the list AND append all the neccesary parts to it. I got close with some tries. Sorry.
    
        // what to save
        var list = input;
        // Get the value for that li
        var storedvalue = JSON.parse(localStorage.getItem("newEvent"))|| [];
        //save it
        if(list != ""){storedvalue.push(list);}
        localStorage.setItem("newEvent", JSON.stringify(storedvalue));
} 
// Function for to delete information in local storage
function clearstorage(){localStorage.clear();}