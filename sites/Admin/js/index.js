/*******************************************************************************
Copyright © 2021 Ennio Marke
socket.io
*******************************************************************************/

$(document).ready(function () {

  var socket = io();

  $.ajaxSetup({
    cache: false
  });

  //fade UI elements in
  setTimeout(() => {
    $('#content *').fadeIn()
  }, 250);

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

  function writeToFile(path, input) {
    console.log(input)
    $.ajax({
      url: 'wtf.php',
      data: {
        input: JSON.stringify(input),
        path: path
      },
      type: 'post'
    })
  }

  function loadUIPage(page) {
    switch (page) {
      case "Options":
        $('#content *').fadeOut();
        $('#content').empty()
        $('#content').addClass('options')
        $.getJSON("assets/options.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p>${data[i]}</p>`)
          }
        });
        $('#content').append('<a id="aNO">Add new Ingredient</a>');
        $('#content').append('<a id="rO">Remove Ingredient</a>');
        setTimeout(() => {
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
        $('#content *').fadeOut();
        $('#content').empty()
        $('#content').append('<input type="text" id="oI">') //iI = options Input
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
        $('#content *').fadeOut();
        $('#content').empty()
        $.getJSON("assets/options.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p class="oTR ${i == 0? 'tE':''}">${data[i]}</p>`)
          }
        });
        setTimeout(() => {
          $("#content p").click((e) => {
            console.log(e.target.value)
            removeElement(e.target.value, "assets/options.json")
            e.target.remove()
            setTimeout(() => {
              loadUIPage("Options")
            }, 250);
          })
        }, 100);
        break;

      case "Session":
        $('#content *').fadeOut();
        $('#content').load('UI/session.html');
        setTimeout(() => {
          $('#content *').fadeIn()
          selectSessionIngredients();
        }, 250);
        break;

      case "Ingredients":
        $('#content *').fadeOut();
        $('#content').empty()
        $('#content').addClass('ingredients')
        $.getJSON("assets/ingredients.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p>${data[i]}</p>`)
          }
        });
        $('#content').append('<a id="aNI">Add new Ingredient</a>');
        $('#content').append('<a id="rI">Remove Ingredient</a>');
        setTimeout(() => {
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
        $('#content *').fadeOut();
        $('#content').empty()
        $('#content').append('<input type="text" id="iI">') //iI = ingredients Input
        $('#iI').keypress(e => {
          if (e.which == 13) {
            $.getJSON("assets/ingredients.json", data => {
              data.push($("#iI").val())
              console.log(data)
              writeToFile('assets/ingredients.json', data)
              $("#iI").val("")
              loadUIPage("Ingredients")
            });
          }
        });
        break;

      case "removeIngredient":
        $('#content *').fadeOut();
        $('#content').empty()
        $.getJSON("assets/ingredients.json", data => {
          for (let i = 0; i < data.length; i++) {
            $('#content').append(`<p class="iTR ${i == 0? 'tE':''}">${data[i]}</p>`) //iTR = ingredient to remove; tE = top element
          }
        });
        setTimeout(() => {
          $("#content p").click((e) => {
            console.log(e.target.value)
            removeElement(e.target.value, "assets/ingredients.json")
            e.target.remove()
            setTimeout(() => {
              loadUIPage("Ingredients")
            }, 250);
          })
        }, 100);
        break;

      default:
        break;
    }
  }

  function removeElement(Element, path) {
    $.getJSON(path, data => {
      data.splice(data.indexOf(Element), 1)
      writeToFile(path, data)
    });
  }

  function selectSessionIngredients() {
    $.getJSON("assets/ingredients.json", data => {
      for (let i = 0; i < data.length; i++) {
        $('#nSI').append(`<p class="iTR ${i == 0? 'tE':''}">${data[i]}</p>`)
      }
    });
    setTimeout(() => {
      $("#nSI p").click((e) => {
        $('#sI').append(getDomString(e.target))
        e.target.remove()
      })
    }, 100);
  }

  var getDomString = (function() {
    var DIV = document.createElement("div");
  
    if ('outerHTML' in DIV)
      return function(node) {
        return node.outerHTML;
      };
  
    return function(node) {
      var div = DIV.cloneNode();
      div.appendChild(node.cloneNode(true));
      return div.innerHTML;
    };
  
  })();

});