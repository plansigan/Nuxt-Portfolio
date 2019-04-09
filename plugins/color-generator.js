import Vue from 'vue'
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
  
  const setRandomColor = (data) => {
    return getRandomColor()
  }


  Vue.filter('randomColor',setRandomColor)