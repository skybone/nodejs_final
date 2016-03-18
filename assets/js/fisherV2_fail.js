// Second try hindering progress.
/*(function(){
// Angular START 
  var app = angular.module("fishDb", []);
      app.controller("StoreController as storeCtrl", [ "$scope", "$http", function($scope, $http) { 
        console.log('fishDb');

  var r = this;
        this.fishTypes = [];
        $scope.currentFish = {};

        // Call JSON store data    
          $http.get("final/data/fishy.json").success(function(data) {
            r.fishTypes = data;
            $scope.currentFish = r.fishTypes[0];

    // Fire fish bucket
            $scope.fireEvent = function() {
            $('#fishpage a[href="#fishIdpage"]').each(function() {
                
                $(this).click(function() {
                    $scope.currentFish = r.fishTypes[$(this).attr("data-value")]; 
                    $scope.$apply();
                });
            });
        };
// START validation
  var fishForm;

fishForm = document.querySelector("#fishForm");
  document.querySelector("#fishbtn").onclick = checkForms; 
    fishForm.name.onblur = nameChecker;

function nameChecker(){
  var valid = /^[a-zA-Z ]+$/; 
  var test = valid.test(fishForm.name.value);
  var nameVal = trim(fishForm.name.value);
    if(nameVal !== "" || !test){
      fishForm.name.style.boxShadow = "0px 0px 6px 1px orange";
      setMessage(fishForm.name, "error", "<i class='fa fa-times'></i>"  + "Please enter a fish name.");
      fishForm.fishbtn.style.visibility ='hidden';
    }else{
      fishForm.name.style.boxShadow = "0px 0px 6px 1px limegreen";
      setMessage(fishForm.name, "correct", "<i class='fa fa-check'></i>"  + "Lets go!.");
      fishForm.fishbtn.style.visibility ='visible'; // Show button on correct information input.
  }
}

function checkForms(){
  nameChecker();
    if(document.getElementsByClassName("error").length >0){
    return false;
  }
}
function setMessage(formField, messageType, message){
  formField.parentNode.querySelector("div").innerHTML = message;
  formField.parentNode.querySelector("div").className = messageType;
}

      });
}]);}());*/

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
.fail(function() { console.log('err, something went wrong :('); });*/


//////////////////////////////////
// Version 1 Fish AJAX/JSON method.
  /*var fish_types = name;
  var jSurl = "final/data/fishy.json";

  $("#fishbtn").on("click", function(){
      var name = $.trim($("#name").val());

    if(name === ""){            
            $.ajax({
                type: "get",
                url: "final/data/fishy.json",
                dataType: "json",
                
          }).done(get_name).fail(get_error);
                  
          $(".fishInfo p").text("");
        }else{
            $(".fishInfo p").text("Which fish are you looking for?");     
      }
    });
  function get_name(jSurl){ // grabs data from json

        //$(".fishInfo p").text("Fish Type: " + jSurl[0].fish_types);
            

        document.getElementById("displayFish").innerHTML="<p class='dispFish'>" + jSurl.fish_types[0].id + "<br>" + "Name:" + " " + jSurl.fish_types[0].long_name + "<br>" + "Also known as:" + " " + jSurl.fish_types[0].short_name + "</p>" + "<br>" + "<img class='responsive' src=" + jSurl.fish_types[0].imageURL + ">";
          initialize(name); 
 //console.log(displayFish);
        $("#name").val("");      
    //}

    // Error alert
  function get_error(jqXHR, textStatus, errorThrown){    
        alert("textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
    }

  // Keep from refresh
  $("#fishForm").submit(function(e) {
    e.preventDefault();
});*/

////////////////////////////////////////////////
// V2 fish js
    
    // this.products = []; fishTypes
    // $scope.currentItem = {}; currentFish