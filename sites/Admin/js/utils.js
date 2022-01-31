var currentPage = "Home";
var pageBefore = new Map();
pageBefore.set("Home", "Home");
pageBefore.set("Options", "Home");
pageBefore.set("Session", "Home");
pageBefore.set("Ingredients", "Home");
pageBefore.set("addOption", "Options");
pageBefore.set("addIngredient", "Ingredients");
pageBefore.set("removeOption", "Options");
pageBefore.set("removeIngredient", "Ingredients");

var sessionO = [];
var sessionI = [];

function writeToFile(path, input) {
  $.ajax({
    url: "./wtf.php",
    data: {
      input: JSON.stringify(input),
      path: path,
    },
    type: "post",
  });
}

var pba = {
  show: () => $(".icon-back-div").fadeIn(),
  hide: () => $(".icon-back-div").fadeOut(),
}; //pba = page back arrow

var getDomString = (function () {
  var DIV = document.createElement("div");

  if ("outerHTML" in DIV)
    return function (node) {
      return node.outerHTML;
    };

  return function (node) {
    var div = DIV.cloneNode();
    div.appendChild(node.cloneNode(true));
    return div.innerHTML;
  };
})();

function selectSessionIngredients() {
  $.getJSON("./assets/ingredients.json", (data) => {
    for (let i = 0; i < data.length; i++) {
      $("#content").append(
        `<p class="ingredient used" style="display: none;">${data[i]}</p>`
      );
    }
    $("#content").append(`<button id="next">Next</button>`);
  });
  setTimeout(() => {
    $("#content *").fadeIn();
    $(".ingredient").click(function (e) {
      //$("#nSI").append(getDomString(e.target));
      //e.target.remove();
      //$("#content *").off();
      $(this).toggleClass("used");
    });
    $("#next").click(function (e) {
      $("#content > p").each(function () {
        if (!$(this).hasClass("used")) {
          sessionI.push($(this).text());
        }
      });
      console.log(sessionI);
      selectSessionO();
    });
  }, 100);
}

function selectSessionO() {
  $("#content").empty();
  $.getJSON("./assets/options.json", (data) => {
    for (let i = 0; i < data.length; i++) {
      $("#content").append(
        `<p class="option used" style="display: none;">${data[i]}</p>`
      );
    }
    $("#content").append(`<button id="next">Next</button>`);
  });
  setTimeout(() => {
    $("#content *").fadeIn();
    $(".option").click(function (e) {
      $(this).toggleClass("used");
    });
    $("#next").click(function (e) {
      //^ maybe 2 because ingredient same button ^

      $("#content > p").each(function () {
        if (!$(this).hasClass("used")) {
          sessionO.push($(this).text());
        }
      });
      console.log(sessionO);
      showOrders();
    });
  }, 100);
}

function showOrders() {
  $("#content").empty();
  $("#content").load("./UI/orders.html");
  setTimeout(() => {
    $("#content").append('<div id="orderHeading">Orders</div>');
    var options = {
      I: sessionI,
      O: sessionO,
      time: Date.now(),
    };
    var socket = io("https://myst-socket.glitch.me/", {
      query: {
        type: "admin",
        opt: JSON.stringify(options),
      },
    });

    socket.on("newPizza", (pizza) => {
      console.log(pizza);
      $("#orders").append(`
      <tr>
        <td>${pizza.N}</td>
        <td>${pizza.I}</td>
        <td>${pizza.O}</td>
      </tr>
      `);
    });
  }, 100);
}

function removeElement(Element, path) {
  $.getJSON(path, (data) => {
    data.splice(data.indexOf(Element), 1);
    writeToFile(path, data);
  });
}

function addMarginTop() {
  setTimeout(() => {
    let bES =
      $("#content")[$("#content").length - 1].scrollHeight - window.innerHeight;
    $(".tE").css("margin-top", bES * 2);
  }, 100);
}
