$(document).ready(function(){

"use strict";

// Validate, regex
var fishForm;

fishForm = document.querySelector("#fishForm");
  document.querySelector("#fishbtn").onclick = checkForms; 
    fishForm.fish.onblur = fishChecker;

function fishChecker(){
  var valid = /^[a-zA-Z ]+$/; 
  var test = valid.test(fishForm.fish.value);
  var fishVal = trim(fishForm.fish.value);
  if(fishVal === "" || !test){
    fishForm.fish.style.boxShadow = "0px 0px 6px 1px orange";
    setMessage(fishForm.fish, "error", "<i class='fa fa-times'></i>"  + "Please enter a fish name.");
    fishForm.fishbtn.style.visibility ='hidden';
  }else{
    fishForm.fish.style.boxShadow = "0px 0px 6px 1px limegreen";
    setMessage(fishForm.fish, "correct", "<i class='fa fa-check'></i>"  + "Lets go!.");
    fishForm.fishbtn.style.visibility ='visible'; // Show button on correct information input.
  }
}

function checkForms(){
  fishChecker();
if(document.getElementsByClassName("error").length >0){
    return false;
  }
}
function setMessage(formField, messageType, message){
  formField.parentNode.querySelector("div").innerHTML = message;
  formField.parentNode.querySelector("div").className = messageType;
}

// Bloodhound Search Engine
/*var engine = new Bloodhound({
  initialize: false,
  local: ['Rainbow Trout', 'Brooke Trout', 'Pickerel'],
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.whitespace
});

var promise = engine.initialize();

promise
.done(function() { console.log('ready to go!'); })
.fail(function() { console.log('err, something went wrong :('); });
*/



// Fish AJAX/JSON
  var jSurl = "assets/js/fishy.json";

  $("#fishbtn").on("click", function(){
      var fish = $.trim($("#fish").val());

    if(fish !== ''){            
            $.ajax({
                type: "get",
                url: "assets/js/fishy.json",
                dataType: "json",
                
          }).done(get_fish).fail(get_error);
                  
          $(".fishInfo p").text("");
        }else{
            $(".fishInfo p").text("Which fish are you looking for?");     
      }
    });
  function get_fish(jSurl){ // grabs data from json

        //$(".fishInfo p").text("Fish Type: " + jSurl[0]);
            
        document.getElementById("displayFish").innerHTML="<p class='dispFish'>" + "<br>" + "Name:" + " " + jSurl[0].fishName + "<br>" + "Also known as:" + " " + jSurl[0].shortName + "</p>" + "<br>" + "<img class='responsive' src=" + jSurl[0].imageURL + ">";
          /*initialize(name); */ 
 console.log(jSurl);
       /* $("#name").val(""); */    
    }

    // Error alert
  function get_error(jqXHR, textStatus, errorThrown){    
        alert("textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
    }

  // Keep from refresh
  $("#fishForm").submit(function(e) {
    e.preventDefault();
});
});

























