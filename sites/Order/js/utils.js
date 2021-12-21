var currentPage = "Home";
  var pageBefore = new Map();
  pageBefore.set("Home", "Home")

function writeToFile(path, input) {
    $.ajax({
        url: 'wtf.php',
        data: {
            input: JSON.stringify(input),
            path: path
        },
        type: 'post'
    })
}

var pba = {
    show: () => $('.icon-back-div').fadeIn(),
    hide: () => $('.icon-back-div').fadeOut()
} //pba = page back arrow

var getDomString =(function() {
    var DIV = document.createElement("div");

    if ('outerHTML' in DIV)
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
    $.getJSON("assets/ingredients.json", data => {
        for (let i = 0; i < data.length; i++) {
            $('#nSI').append(`<p class="iTR" style="display: none;">${data[i]}</p>`)
        }
    });
    selectSessionEl()
}

function selectSessionEl() {
    setTimeout(() => {
        $('#content *').fadeIn()
        $("#nSI p").click((e) => {
            $('#sI').append(getDomString(e.target))
            e.target.remove()
            $(window).off()
            selectSessionEl()
        })
        $("#sI p").click((e) => {
            $('#nSI').append(getDomString(e.target))
            e.target.remove()
            $(window).off()
            selectSessionEl()
        })
    }, 100);
}

function removeElement(Element, path) {
    $.getJSON(path, data => {
        data.splice(data.indexOf(Element), 1)
        writeToFile(path, data)
    });
}

function addMarginTop() {
    setTimeout(() => {
        let bES = $('#content')[$('#content').length - 1].scrollHeight-window.innerHeight
        $('.tE').css('margin-top', bES * 2)
    }, 100);
}