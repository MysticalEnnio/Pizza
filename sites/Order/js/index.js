/*******************************************************************************
Copyright © 2021 Ennio Marke
socket.io
*******************************************************************************/
$(document).ready(function () {

  var socket = io();

  $.ajaxSetup({
    cache: false
  });

  function loadUIPage(page) {
    var cases = ['Home'];
    if (!cases.indexOf(page >= 0)) return;
    pageStandardMethods(page);
    switch (page) {
      case "Home":
        $('#content').empty().append('<a id="newPizza">Order new Pizza</a>') 
        setTimeout(() => {
          //check if New Session got clicked
          $('#newPizza').click(() => {
            //when clicked fade out all UI elements, load new UI elements and fade new UI elements in
            loadUIPage("newPizza")
          })
          $('#content *').fadeIn();
        }, 1000);
        break;
    }
  }

  $(".icon-back-div").click(() => {
    $('.icon-back-div').animate({
      left: "-=75"
    }, 100, $.easie(0.5, 0.5, 1, 1.5), () => {
      $('.icon-back-div').hide()
      $('.icon-back-div').animate({
        left: "+=75"
      }, 1)
      loadUIPage(pageBefore.get(currentPage))
    })
    
  })

  /*$(".icon-back-div").click(() => {
    $('.icon-back-div').animate({
      left: "-=25"
    }, 100, $.easie(0.5, 0.5, 1, 1.5))
    $('.icon-back-div').animate({
      left: "+=25"
    }, 100, $.easie(0.5, 0.5, 1, 1.5))
    loadUIPage(pageBefore.get(currentPage))
  })*/

  loadUIPage("Home")

});

function pageStandardMethods(page) {
  $('#content *').fadeOut()
  currentPage = page
  if (page == "Home") pba.hide();
  else pba.show();
}