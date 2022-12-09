/*
$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });
  
  $("#close-sidebar").on("click", function() {
    $("#sidebar").removeClass("toggled");
  });

  $("#show-sidebar").on("click", fn)(function() {
    $(".page-wrapper").addClass("toggled");
  });

  $( "#close-sidebar" ).on( "click", closesidebar );
  $( "#show-sidebar" ).on( "click", showsidebar );

   function closesidebar() {
       alert('Here!!');
    $("#sidebar").removeClass("toggled");
  }

  function showsidebar() {
    $(".page-wrapper").addClass("toggled");
  }*/