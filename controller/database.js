
var app = angular.module('myApp', []);
app.controller('DashboardController',['$scope','$http',function($scope,$http){

    //_this = this;
   // this.$scope = $scope;
 
  /* $http({
    method : "GET",
      url : "webbrowser.htm"
  }).then(function mySuccess(response) {
    $scope.myData = response.data;
  }, function myError(response) {
    $scope.myData = response.statusText;
  });
  */
    $scope.language =['Angular JS','HTML','CSS','Java Script','php','sql'];
    
    $scope.city =['DELHI','AGRA','Aligarh','lucknow','kanpur','Moradabad'];
    
    $scope.fruit = ['Mangoes','Banana','Apple','Guava','Grapes'];
    }]
)


/* function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } */

  

  function show(nr) {
    
    var x= document.getElementById("table"+nr);
    var y = document.getElementById("table"+nr);
    switch(nr) {
      case 1:
        if(x.style.display == "none"){
          x.style.display = "block";
        }
        else{
          x.style.display = "none";
        } 
        for(i=2;i<=6;i++){
          y = document.getElementById("table"+i)
          y.style.display = "none";
        }   
          break;
      case 2:
        if(x.style.display == "none"){
          x.style.display = "block";
        }
          else{
            x.style.display = "none"
          }  
          y = document.getElementById("table"+nr-1);
          y.style.display = "none";
          for(i=3;i<=6;i++){
            y = document.getElementById("table"+i)
            y.style.display = "none";
          }   
          break;
        case 3:
          if(x.style.display == "none"){
            x.style.display = "block";
          }
            else{
              x.style.display= "none";
            }
            break;
          case 4:
            if(x.style.display == "none"){
              x.style.display = "block";
            }
              else{
                x.style.display= "none";
              }
          break;
          case 5:
            if(x.style.display == "none"){
              x.style.display = "block";
            }
              else{
                x.style.display= "none";
              }
              break;
          case 6:
            if(x.style.display == "none"){
              x.style.display = "block";
            }
              else{
                x.style.display= "none";
              }
              break;
           
      default:
        // code block
         // document.getElementById("table1").style.display="none";
         // document.getElementById("table2").style.display="none";
          //document.getElementById("table3").style.display="none";
          //document.getElementById("table4").style.display="none";
          //document.getElementById("table5").style.display="none";
          //document.getElementById("table6").style.display="none";
         //document.getElementById("table"+nr).style.display="block";
    } 
  }

  