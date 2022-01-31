/*******************************************************************************
Copyright © 2021 Ennio Marke
socket.io
*******************************************************************************/
$(document).ready(function () {
  var socket = io("https://myst-socket.glitch.me/");

  socket.on("pizzaOptions", (options) => {
    console.log(options);
  });

  $.ajaxSetup({
    cache: false,
  });
});
