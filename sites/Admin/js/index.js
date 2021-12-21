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
    var cases = ['Home', 'Options', 'addOption', 'removeOption', 'Ingredients', 'addIngredient', 'removeIngredient', 'Session'];
    if (!cases.indexOf(page >= 0)) return;
    pageStandardMethods(page);
    switch (page) {
      case "Home":
        $('#content').empty().load('UI/home.html', () => {
          //check if New Session got clicked
          $('#Session').click(() => {
            //when clicked fade out all UI elements, load new UI elements and fade new UI elements in
            loadUIPage("Session")
          })
          //check if Ingredients got clicked
          $('#Ingredients').click(() => {
            //when clicked fade out all UI elements, load new UI elements and fade new UI elements in
            loadUIPage("Ingredients")
          })
          //check if New Options got clicked
          $('#Options').click(() => {
            //when load Options UI page
            loadUIPage("Options")
          })
          $('#content *').fadeIn();
        })
        break;
      case "Options":
        $('#content').empty().addClass('options')
        $.getJSON("assets/options.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p style="display: none;">${data[i]}</p>`)
          }
        });
        $('#content').append('<a id="aNO" class="tE">Add new Option</a>');
        $('#content').append('<a id="rO">Remove Option</a>');
        setTimeout(() => {
          addMarginTop();
          $('#content *').fadeIn()
          $('#aNO').click(() => {
            $('#content').removeClass('options')
            loadUIPage("addOption")
          })
          $("#rO").click(() => {
            $('#content').removeClass('options')
            loadUIPage("removeOption")
          })
        }, 250);
        break;

      case "addOption":
        $('#content').empty().append('<input type="text" id="oI" style="display: none;">')
        $('#oI').fadeIn();
        $('#oI').keypress(e => {
          if (e.which == 13) {
            $.getJSON("assets/options.json", data => {
              data.push($("#oI").val())
              writeToFile('assets/options.json', data)
              $("#oI").val("")
              loadUIPage("Options")
            });
          }
        });
        break;

      case "removeOption":
        $('#content').empty()
        $.getJSON("assets/options.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p class="oTR ${i == 0? 'tE':''}" style="display: none;">${data[i]}</p>`)
          }
        });
        setTimeout(() => {
          $('#content *').fadeIn();
          $("#content p").click((e) => {
            removeElement(e.target.innerHTML, "assets/options.json")
            e.target.remove()
            setTimeout(() => {
              loadUIPage("Options")
            }, 250);
          })
        }, 100);
        break;

      case "Session":
        $('#content').load('UI/session.html');
        setTimeout(() => {
          selectSessionIngredients();
        }, 100);
        $.post( "https://myst-socket.glitch.me/newSession", { I: ["Salami", "Käse"], O: ["Kalzone"], time: Date.now() })
        .done(function( res ) {
          console.log(res)
        });
        break;

      case "Ingredients":
        $('#content').empty().addClass('ingredients')
        $.getJSON("assets/ingredients.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p style="display: none;">${data[i]}</p>`)
          }
        });
        $('#content').append('<a id="aNI" class="tE" style="display: none;">Add new Ingredient</a>');
        $('#content').append('<a id="rI" style="display: none;">Remove Ingredient</a>');
        setTimeout(() => {
          addMarginTop();
          $('#content *').fadeIn()
          $('#aNI').click(() => {
            $('#content').removeClass('ingredients')
            loadUIPage("addIngredient")
          })
          $("#rI").click(() => {
            $('#content').removeClass('ingredients')
            loadUIPage("removeIngredient")
          })
        }, 250);
        break;

      case "addIngredient":
        $('#content').empty().append('<input type="text" id="iI" style="display: none;">')
        $('#content *').fadeIn();
        $('#iI').keypress(e => {
          if (e.which == 13) {
            $.getJSON("assets/ingredients.json", data => {
              data.push($("#iI").val())
              writeToFile('assets/ingredients.json', data)
              $("#iI").val("")
              loadUIPage("Ingredients")
            });
          }
        });
        break;

      case "removeIngredient":
        $('#content').empty()
        $.getJSON("assets/ingredients.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p class="iTR ${i == 0? 'tE':''}" style="display: none;">${data[i]}</p>`) //iTR = ingredient to remove; tE = top element
          }
        });
        setTimeout(() => {
          $('#content *').fadeIn()
          $("#content p").click((e) => {
            removeElement(e.target.innerHTML, "assets/ingredients.json")
            e.target.remove()
            setTimeout(() => {
              loadUIPage("Ingredients")
            }, 250);
          })
        }, 100);
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
  setTimeout(() => {
    if (page == "Session") {
      $('#content').addClass('flex-row');
      $('#content').removeClass('flex-column')
    } else {
      $('#content').removeClass('flex-row');
      $('#content').addClass('flex-column');
    }
  }, 100);
}