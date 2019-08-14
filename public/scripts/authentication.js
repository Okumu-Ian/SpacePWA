$(document).ready(function(){
    $("#bt").click(function(){
      if ($('.rotate').length > 0) {
        $("#iwp").removeClass("rotate");
    }  
  if ($('.rotateb').length > 0) {
        $("#iwp").removeClass("rotateb");
   
  }  
      $("#iwp").addClass("rotate");
      $("#login-card").hide("fast");
   
    });
    $("#bt2").click(function(){
     
       if ($('.rotate').length > 0) {
        $("#iwp").removeClass("rotate");
       }
       if ($('.rotateb').length > 0) {
        $("#iwp").removeClass("rotateb");
  }  
       $("#iwp").addClass("rotateb");
       $("#login-card").show("fast");
    });

    $(".go-home").click(function(e){
      e.preventDefault();
      window.location = "/home";
    });

  });

