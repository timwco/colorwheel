var cont = document.querySelector('.questions');
var form = document.querySelector('.forms');
var scoreBtns = document.querySelectorAll('.score');
var resetBtns = document.querySelectorAll('.reset');
var chart = document.querySelector('.chart');
var i;
var red = 0, yellow = 0, green = 0, blue = 0;

// Tally up points
function tally (color) {

  switch (color) {
    case 'red': red++
    break;
    case 'yellow': yellow++
    break;
    case 'green': green++
    break;
    case 'blue': blue++
    break;
  }

}

// Score
function score (e) {
  e.preventDefault();
  var sections = document.querySelectorAll('section');
  for (var i = 0; i < sections.length; i++) {

    var group = document.querySelectorAll('input[name="g' + i + '"]');

    for(var x = 0; x < group.length; x++) {
      if(group[x].checked == true) {
        tally(group[x].value);
      }
    }

  }

  showScore();

}
loop(scoreBtns, score);

// Reset
function reset (e) {
  e.preventDefault();
  form.reset();
}
loop(resetBtns, reset);

// Loop Dom Array
function loop (nodeArr, callback) {
  for (var i = 0; i < nodeArr.length; i++) {
    nodeArr[i].addEventListener('click', callback);
  }
}

// Build Page
traits.forEach( function (group, i) {

  var list = document.createElement('section');

  group.forEach( function (trait, x) {
    var rdio = document.createElement('input');
    var label = document.createElement('label');
    rdio.setAttribute('type', 'radio');
    rdio.setAttribute('name', 'g' + i);
    rdio.setAttribute('id', 'e' + i + x);
    rdio.value = trait.color;

    var text = document.createTextNode(trait.title);
    label.setAttribute('for', 'e' + i + x);

    label.appendChild(rdio);
    label.appendChild(text);

    list.appendChild(label);

  });

  cont.appendChild(list);

});

function showScore () {
  form.classList.add('hideMe');
  setTimeout(displayChart, 1000);
}

function displayChart () {

  chart.classList.add('showMe');

  var data = [
      {
          value: red,
          color:"rgba(209, 17, 73, 1)",
          highlight: "rgba(209, 17, 73, .8)",
          label: "Red"
      },
      {
          value: blue,
          color: "rgba(47, 119, 209, 1)",
          highlight: "rgba(47, 119, 209, .8)",
          label: "Blue"
      },
      {
          value: yellow,
          color: "rgba(244, 211, 30, 1)",
          highlight: "rgba(244, 211, 30, .8)",
          label: "Yellow"
      },
      {
          value: green,
          color: "rgba(10, 135, 84, 1)",
          highlight: "rgba(10, 135, 84, .8)",
          label: "Green"
      }
  ]
  var ctx = document.getElementById("myChart").getContext("2d");
  var myPieChart = new Chart(ctx).Pie(data);


}
