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

function writeToFile(path, input) {
  $.ajax({
    url: "wtf.php",
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
  $.getJSON("assets/ingredients.json", (data) => {
    for (let i = 0; i < data.length; i++) {
      $("#content").append(
        `<p class="ingredient" style="display: none;">${data[i]}</p>`
      );
    }
  });
  selectSessionEl();
}

function selectSessionEl() {
  setTimeout(() => {
    $("#content *").fadeIn();
    $("#nSI p").click((e) => {
      $("#sI").append(getDomString(e.target));
      e.target.remove();
      $("#content *").off();
      selectSessionEl();
    });
    $("#sI p").click((e) => {
      $("#nSI").append(getDomString(e.target));
      e.target.remove();
      $("#content *").off();
      selectSessionEl();
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
