/*              Author: Richard Myatt
                Date: 24 March 2019

                Revision: 25 March 2019 - Added cross browser support.

                A simple example of the web audio API which shows how and
                oscillator can be connected to an AudioContext to generate
                a tone.
*/


// establish variablef
var playing = false;
var audioContext, osc;
var AudioContext = window.AudioContext || windown.webkitAudioContext;
audioContext = new AudioContext();


// obtain a reference to the svg and internal symbols
var s = Snap("#svgBtn");
var bg    = s.select("#bg");
var play  = s.select("#play");
var pause = s.select("#pause");

// animate the button
s.click(function() {

  if(playing) {
    play.animate({"fill-opacity": 1}, 200);
    pause.animate({"fill-opacity": 0}, 200);
    bg.animate({"fill": "lightyellow"}, 200);
    osc.stop();
    playing = false;
  } else {
    play.animate({"fill-opacity": 0}, 200);
    pause.animate({"fill-opacity": 1}, 200);
    bg.animate({"fill": "#eee"}, 200);
    osc          = audioContext.createOscillator();
    osc.type         = "sine";
    osc.connect(audioContext.destination);
    osc.start(audioContext.currentTime);
    playing = true;
  }

});
