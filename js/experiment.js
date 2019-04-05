var el;

var s = Snap("#exp");

Snap.load("misc/keyboard.svg", onSVGLoaded);

function onSVGLoaded(data) {
  el = data.select("#trial");


  s.mouseover(printOut);
  s.mouseout(remove);

  s.append(data);
}

function printOut() {
  el.animate({
    fill: "yellow"
  }, 100);
  console.log("hi");
}

function remove() {
  el.animate({
    fill: "white"
  }, 100);
}

// var el = s.select("rect");
// el.attr({
//   fill: "yellow"
// });
