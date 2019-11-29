/**
* ------------------ SCRIPT TRANSLATOR ------------------
* Date: 29-11-2019
* Version: 1.0
* Script is a script designed and created by Wikke Andeweg
* info@wikkeandeweg.nl
* https://www.wikkeandeweg.nl
*
* License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 (CC BY-NC-SA 3.0)
* https://creativecommons.org/licenses/by-nc-sa/3.0/
* --------------------------------------------------------
*/

var input = "";
var iInput;
var iSize;
var iBGColor;
var iColor;
var iStyle;
let color;
let bgcolor;
var numSplit = [];
var numConvert = [];
var wordlist = [];
var charlist = [];
var charlists = [];
var output = [];
let size;
let u;
let hu;
let hsize;
let strokeWidth;
let margin = 70;
let hmargin = 70;
let wmargin = 70;
let first;
let last;
let count = 0;
let poscount = 0;
let skips = 0;

function setup() {
  var cnv = createCanvas(window.innerWidth-280, window.innerHeight);
  cnv.position(280, 0);
  iSize = document.getElementById("iSize"); //get input from html
  iInput = document.getElementById("iInput"); //get input from html
  iStyle = document.getElementById("iStyle"); //get input from html
  iBGColor = document.getElementById("iBGColor"); //get input from html
  iBGColor.value = '#3D3D3D'; //set default value
  iColor = document.getElementById("iColor"); //get input from html
  iColor.value = '#000000'; //set default value

}

function draw() {
  size = int(iSize.value); //get size input from html
  style = iStyle.value; //get style type from html
  bgcolor= iBGColor.value; //get Background Color from html
  color= iColor.value //get color from html
  u = size;
  hu = 0.5*u;
  hsize = size/2;
  strokeWidth = size/7;
  margin = 40+size;

  numSplit = iInput.value.split(/(~|\d+|\W)/); //split in groups of digits, symbols, "~" and anything else

  numSplit = numSplit.filter(function (el) {
    return el != "";
  }); //filter out blank enties from the array

  for (var i = 0; i < numSplit.length; i++){
    if (numSplit[i].match(/\d+/g) !== null){ //match only the digit groups
      if (numSplit[i-1] != '~'){ //make sure there not escaped
        var base15val = parseInt(numSplit[i]).toString(15); //convert ditits to base 15 and assign new symbols
        base15val = base15val.replace(/0/g, "⓪")
        base15val = base15val.replace(/1/g, "①")
        base15val = base15val.replace(/2/g, "②")
        base15val = base15val.replace(/3/g, "③")
        base15val = base15val.replace(/4/g, "④")
        base15val = base15val.replace(/5/g, "❺") //alternative 5 if it is the last
        base15val = base15val.charAt(base15val.length - 1) == "❺" ? base15val.replace(/.$/,"⑤") : base15val;
        base15val = base15val.replace(/6/g, "⑥")
        base15val = base15val.replace(/7/g, "⑦")
        base15val = base15val.replace(/8/g, "⑧")
        base15val = base15val.replace(/9/g, "❾") //alternative 9
        base15val = base15val.charAt(base15val.length - 1) == "❾" ? base15val.replace(/.$/,"⑨") : base15val;
        base15val = base15val.replace(/a/g, "⑩")
        base15val = base15val.replace(/b/g, "⑪")
        base15val = base15val.replace(/c/g, "⑫")
        base15val = base15val.replace(/d/g, "⑬")
        base15val = base15val.replace(/e/g, "⑭")
        numConvert[i] = base15val;
      } else {
        var base10escape = numSplit[i]; //if escaped, keep base 10 and replace symbols
        base10escape = base10escape.replace(/0/g, "⓪")
        base10escape = base10escape.replace(/1/g, "①")
        base10escape = base10escape.replace(/2/g, "②")
        base10escape = base10escape.replace(/3/g, "③")
        base10escape = base10escape.replace(/4/g, "④")
        base10escape = base10escape.replace(/5/g, "⑤")
        base10escape = base10escape.replace(/6/g, "⑥")
        base10escape = base10escape.replace(/7/g, "⑦")
        base10escape = base10escape.replace(/8/g, "⑧")
        base10escape = base10escape.replace(/9/g, "⑨")
        numConvert[i] = base10escape;
      }
    }
    else { //if numbers are escaped, replace "~" with space, if not than forward the ~
      if (numSplit[i] == '~' && numSplit[i-1] == null || numSplit[i] == '~' && numSplit[i-1] == '~' || numSplit[i] == '~' && numSplit[i-1].charAt(numSplit[i-1].length -1) == ' '){

        numConvert[i] = "";
      }
      else if (numSplit[i].length == 1 && !vallidChar.includes(numSplit[i]) && numSplit[i] != " "){ //filter unsuported characters
        numConvert[i] = " ";
      }
      else {
        numConvert[i] = numSplit[i];
      }
    }
  }

  input = numConvert.join(''); //Join all the arrays back together
  numConvert = []; // reset the array

  wordlist =  splitTokens(input, ' '); //split the input in words (seperated by spaces)


  background(bgcolor); //set background
  var charlist = [];

  for( var j = 0; j < wordlist.length; j++){ //go through evey word
    for( var i = 0; i < wordlist[j].length; i++){ //and every character within the words
      first = i == 0 ? true : false; //check if it is the first character of a word
      last = i == wordlist[j].length-1 ? true : false; //check if it is the last character of a word
      charlist[i] = new su(wordlist[j].substring(i,i+1), charlist[i-1], first, last); //Create a new SU for the character
    }
    charlists[j]=charlist;
    charlist = [];
  }

  hmargin = margin;
  wmargin = 40+hsize;
  for( var j = 0; j < charlists.length; j++){
    for( var i = 0; i < charlists[j].length; i++){
      poscount = i - skips; // calculate the position
      charlists[j][i].show(wmargin+size*poscount*2,hmargin,size); //show the character
    }

    wmargin = wmargin+size*2*(charlists[j].length-skips); //next word next to this word
    if (wmargin>width-size*2*4){ //check if it fits on the page
      hmargin = hmargin+size*2.5; //if not move to the next line
      wmargin = 40+hsize;
    }
    skips = 0; //reset skips
  }
  charlists = [];
}

function windowResized() {
  resizeCanvas(windowWidth-280, windowHeight);
}
