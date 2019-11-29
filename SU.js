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

function su(char, prev, first, last){
  this.char = char;
  this.prevchar = prev;
  this.first = first;
  this.last = last;
  this.SU;
  this.SP;
  this.EndP;
  this.EndP1;
  this.EndP2;
  this.EndP3;
  this.EndP4;
  this.EntryP;
  this.EP;
  this.capital = false;
  this.vowel = false;
  this.accvowel = false;
  this.number = false;
  this.punctuation = false;
  this.incapital = false;
  this.containsvowel;
  this.integrated = true;
  this.escape = false;

//assign type of SU
  this.SU = KBS.includes(this.char) ? "KBS" :
  this.SU = LCT.includes(this.char) ? "LCT" :
  this.SU = MDV.includes(this.char) ? "MDV" :
  this.SU = NFW.includes(this.char) ? "NFW" :
  this.SU = PGX.includes(this.char) ? "PGX" :
  this.SU = QHY.includes(this.char) ? "QHY" :
  this.SU = RJZ.includes(this.char) ? "RJZ" :

  this.SU = vowels.includes(this.char) ? "vowel" :
  this.SU = accvowels.includes(this.char) ? "accvowel" :

  this.SU = ZERO.includes(this.char) ? "ZERO" :
  this.SU = ONE.includes(this.char) ? "ONE" :
  this.SU = TWO.includes(this.char) ? "TWO" :
  this.SU = THREE.includes(this.char) ? "THREE" :
  this.SU = FOUR.includes(this.char) ? "FOUR" :
  this.SU = FIVE.includes(this.char) ? "FIVE" :
  this.SU = FIVEalt.includes(this.char) ? "FIVEalt" :
  this.SU = SIX.includes(this.char) ? "SIX" :
  this.SU = SEVEN.includes(this.char) ? "SEVEN" :
  this.SU = SEVENalt.includes(this.char) ? "SEVENalt" :
  this.SU = EIGHT.includes(this.char) ? "EIGHT" :
  this.SU = NINE.includes(this.char) ? "NINE" :
  this.SU = NINEalt.includes(this.char) ? "NINEalt" :
  this.SU = TEN.includes(this.char) ? "TEN" :
  this.SU = ELEVEN.includes(this.char) ? "ELEVEN" :
  this.SU = TWELVE.includes(this.char) ? "TWELVE" :
  this.SU = THITHEEN.includes(this.char) ? "THITHEEN" :
  this.SU = FOURTEEN.includes(this.char) ? "FOURTEEN" :
  this.SU = this.char == '~' ? "escape" : "invalid";

  this.capital = capitals.includes(this.char); //is it a CAPITAL?
  this.vowel = vowels.includes(this.char); // is it a vowel?
  this.accvowel = accvowels.includes(this.char); //is it an accented vowel?
  this.number = numbers.includes(this.char); //is it a number?
  this.punctuation = punctuation.includes(this.char);//is it punctuation?
  this.escape = this.char == '~' ? true : false; //is it an escape character?

  if (this.SU == "invalid"){ //if anything else, STOP and allert
    window.alert( "invalid key, \"" + this.char + "\" is not yet suported.");
    return;
  }
  if (this.vowel && this.first || !this.vowel || this.vowel && this.capital){
    this.integrated = false//don't integrate if
  }
  if (!this.first && this.vowel && this.prevchar.vowel){
    this.prevchar.integrated=false//don't integrate the prevchar if
  }
  if (!this.first && this.prevchar.escape || !this.first && this.prevchar.number || !this.first && this.prevchar.punctuation){
    this.integrated = false//don't integrate if
  }
  if (!this.first && this.integrated){
    if (this.prevchar.capital){
      this.incapital = true; //is this integrated inside a capital?
      if (this.last) {
        this.prevchar.last=true; //if this is the last, and also integrated in a capital, set that capital to last
      }
    }
  }
  if(this.integrated && this.incapital){
    this.prevchar.containsvowel = true; //if this capital has an integrated vowel make "containsvowel" true
  }


  //SHOW FUNCTION
  this.show = function(x,y){
    this.pos = createVector(x+(u/2),y+(u/2)); //shift pos to center

    strokeWeight(strokeWidth);
    strokeJoin(MITER);
    strokeCap(SQUARE);
    stroke(color);
    fill(0, 0);

    this.IL(this.pos); //draw Inner Line
    this.OL(); //draw connecting outline

    if (this.first){ //if this is the first character draw a startmarker
      this.startmarker();
    }
    if (this.last){ //if this if the last character draw an endmarker
      this.endmarker();
    }
  }

  //SET INNER LINE
  this.IL = function(pos){
    this.mid = createVector(pos.x, pos.y); //set midpoint
    this.top = createVector(this.mid.x, this.mid.y-hu); //set toppoint
    this.bot = createVector(this.mid.x, this.mid.y+hu); //set bottom point
    this.left = createVector(this.mid.x-hu, this.mid.y); //set left point
    this.right = createVector(this.mid.x+hu, this.mid.y); //set right point
    this.ne = createVector(this.mid.x + hu * cos(PI/4*7), this.mid.y + hu * sin(PI/4*7)); //set diagonal point North East
    this.se = createVector(this.mid.x + hu * cos(PI/4), this.mid.y + hu * sin(PI/4)); //set diagonal point South East
    this.sw = createVector(this.mid.x + hu * cos(PI/4*3), this.mid.y + hu * sin(PI/4*3)); //set diagonal point South West
    this.nw = createVector(this.mid.x + hu * cos(PI/4*5), this.mid.y + hu * sin(PI/4*5)); //set diagonal point North West



    this.SP = this.SU == 'LCT' || this.SU == 'MDV' ? createVector(this.bot.x, this.bot.y) : //set a startpoint to bottom
    this.SP = this.SU == 'KBS' || this.SU == 'NFW' || this.SU == 'PGX'? createVector(this.left.x, this.left.y) : //set startpoint to leftside
    this.SP = this.SU == 'QHY' || this.SU == 'RJZ' ? createVector(this.top.x, this.top.y) : " "; //set startpoint to the top


    if (this.SU=='PGX' || this.SU == 'QHY'){
      this.EndP = createVector(this.bot.x, this.bot.y);//set End Point to bottom
      this.EP = this.EndP; //Exit point = End Point
    }
    else if (this.SU=='MDV' || this.SU == 'NFW' || this.SU == 'RJZ'  ){
      this.EndP = createVector(this.right.x, this.right.y); //set End Point to right
      this.EP = this.EndP; //Exit point = End Point
    }
    else if (this.SU=='KBS' || this.SU == 'LCT'){
      this.EndP = createVector(this.top.x, this.top.y); //set End Point to top
      this.EP = this.EndP; //Exit point = End Point
    }
    else if (this.vowel && !this.integrated || this.accvowel){  //If this is a standalone vowel or and accented vowel...
      this.SP = createVector(this.mid.x, this.mid.y);// ...set starting point to middle

      this.EndP = agroup.includes(this.char) ? createVector(this.left.x, this.left.y) : //if this is an 'a', the endpoint is left
      this.EndP = egroup.includes(this.char) ? createVector(this.right.x, this.right.y) : //if this is an 'e', the endpoint is right
      this.EndP = igroup.includes(this.char) ? createVector(this.top.x, this.top.y) : //if this is an 'i', the endpoint is top
      this.EndP = ogroup.includes(this.char) ? createVector(this.mid.x, this.mid.y) : //if this is an 'o', the endpoint is middle
      this.EndP = ugroup.includes(this.char) ? createVector(this.bot.x, this.bot.y) : ""; //if this is an 'u', the endpoint is bottom

      this.EP = createVector(this.right.x, this.right.y); //set the exit point to the right.
    }
    if (this.number || this.punctuation || this.accvowel){ //if this is a number, punctuation or the accent of an accented vowel
      if (this.accvowel){ //if this is an accented character match the accent with the correct number symbol
        this.SU = acute.includes(this.char) ? 'FIVE' :
        this.SU = grave.includes(this.char) ? 'FOUR' :
        this.SU = circ.includes(this.char) ? 'FIVEalt' :
        this.SU = uml.includes(this.char) ? 'NINEalt' :
        this.SU = slash.includes(this.char) ? 'SEVEN' : "accvowel"
      }

      this.SP = createVector(this.mid.x, this.mid.y); // set the starting point to the middle

      this.EndP1 = createVector(this.sw.x, this.sw.y); //create 4 diagonal end points
      this.EndP2 = createVector(this.se.x, this.se.y);
      this.EndP3 = createVector(this.nw.x, this.nw.y);
      this.EndP4 = createVector(this.ne.x, this.ne.y);

      strokeCap(PROJECT);

//draw all the diagonal lines where needed
      if (this.SU == 'TWO' || this.SU == 'FIVEalt' || this.SU == 'SIX' || this.SU == 'SEVEN' || this.SU == 'NINE'|| this.SU == 'TEN' || this.SU == 'ELEVEN' || this.SU == 'FOURTEEN'){
        beginShape();
        vertex(this.SP.x, this.SP.y);
        vertex(this.EndP1.x, this.EndP1.y);
        endShape();
      }
      if (this.SU == 'THREE' || this.SU == 'FIVEalt' || this.SU == 'SEVENalt' || this.SU == 'EIGHT' || this.SU == 'NINE' || this.SU == 'TEN' || this.SU == 'TWELVE' || this.SU == 'THITHEEN' || this.SU == 'FOURTEEN'){
        beginShape();
        vertex(this.SP.x, this.SP.y);
        vertex(this.EndP2.x, this.EndP2.y);
        endShape();
      }
      if (this.SU == 'FOUR' || this.SU == 'SIX' || this.SU == 'SEVENalt' || this.SU == 'NINE' || this.SU == 'NINEalt' || this.SU == 'ELEVEN' || this.SU == 'TWELVE' || this.SU == 'THITHEEN' || this.SU == 'FOURTEEN'){
        beginShape();
        vertex(this.SP.x, this.SP.y);
        vertex(this.EndP3.x, this.EndP3.y);
        endShape();
      }
      if (this.SU == 'FIVE' || this.SU == 'SEVEN' || this.SU == 'EIGHT' || this.SU == 'NINEalt' || this.SU == 'TEN' || this.SU == 'ELEVEN' || this.SU == 'TWELVE' || this.SU == 'THITHEEN' || this.SU == 'FOURTEEN'){
        beginShape();
        vertex(this.SP.x, this.SP.y);
        vertex(this.EndP4.x, this.EndP4.y);
        endShape();
      }
      if (this.SU == 'ONE' || this.SU == 'THITHEEN' ){
        ellipse(this.pos.x,this.pos.y,u*0.15,u*0.15); //draw a dot for 1 and 13
      }
      if (!this.accvowel){ //if this is not an accent...
        if (style == "Square"){rect(this.pos.x-hu,this.pos.y-hu,u,u);}//..draw a rectangle...
        else{ellipse(this.pos.x,this.pos.y,u,u);} //...or a circle
        this.EP = this.number ? createVector(this.top.x, this.top.y) : createVector(this.bot.x, this.bot.y) ; //...set the endpoint to the top
      }
      strokeCap(SQUARE);
    }

    if (this.integrated && !first){ //if this is integrated the endpoint stays the same.
      this.EP = this.prevchar.EP;
    }

    if (this.escape){ //if this is an escape character, skip a possition, keep previoce position and exit point
      skips = skips+1;
      this.pos = this.prevchar.pos;
      this.EP = this.prevchar.EP;
    }

    if (this.integrated){ // if this is integrated, skip a position and draw the vowel dot's at previouse position
      skips = skips+1;
      this.pos = this.prevchar.pos;
      if (agroup.includes(this.char) ){ellipse(this.pos.x-(hu-strokeWidth),this.pos.y,u*0.15,u*0.15)}; //draw 'a' dot
      if (egroup.includes(this.char) ){ellipse(this.pos.x+(hu-strokeWidth),this.pos.y,u*0.15,u*0.15)};//draw 'e' dot
      if (igroup.includes(this.char) ){ellipse(this.pos.x,this.pos.y-(hu-strokeWidth),u*0.15,u*0.15)};//draw 'i' dot
      if (ogroup.includes(this.char) ){ellipse(this.pos.x,this.pos.y,u*0.15,u*0.15)};//draw 'o' dot
      if (ugroup.includes(this.char) ){ellipse(this.pos.x,this.pos.y+(hu-strokeWidth),u*0.15,u*0.15)};//draw 'u' dot
    };

    if (!this.integrated && !this.escape && !this.number && !this.punctuation){ //if this is a normal constant, draw it
      if (style == "Square"){rect(this.pos.x-hu,this.pos.y-hu,u,u);}
      else{ellipse(this.pos.x,this.pos.y,u,u);}
      beginShape();
      vertex(this.SP.x, this.SP.y);
      vertex(this.mid.x, this.mid.y);
      vertex(this.EndP.x, this.EndP.y);
      endShape();
    }
  }

//OUTER LINE
  this.OL = function(){
    if(this.capital && this.first && this.last || this.capital && this.last || this.containsvowel && this.last){ //if this is a standalone capital
      beginShape();
      vertex(this.EP.x, this.EP.y);

      //TOP
      if (this.EP.y == this.top.y){
        vertex(this.EP.x, this.EP.y-hsize);
        vertex(this.EP.x-size, this.EP.y-hsize);
        vertex(this.EP.x-size, this.EP.y+1.5*size);
        vertex(this.EP.x+size, this.EP.y+1.5*size);
        vertex(this.EP.x+size, this.EP.y-hsize);
        vertex(this.EP.x, this.EP.y-hsize);
      }
      //RIGHT
      if (this.EP.y == this.mid.y){
        vertex(this.EP.x+hsize, this.EP.y);
        vertex(this.EP.x+hsize, this.EP.y-size);
        vertex(this.EP.x-1.5*size, this.EP.y-size);
        vertex(this.EP.x-1.5*size, this.EP.y+size);
        vertex(this.EP.x+hsize, this.EP.y+size);
        vertex(this.EP.x+hsize, this.EP.y);
      }
      //BOTTOM
      if (this.EP.y == this.bot.y){
        vertex(this.EP.x, this.EP.y+hsize);
        vertex(this.EP.x-size, this.EP.y+hsize);
        vertex(this.EP.x-size, this.EP.y-1.5*size);
        vertex(this.EP.x+size, this.EP.y-1.5*size);
        vertex(this.EP.x+size, this.EP.y+hsize);
        vertex(this.EP.x, this.EP.y+hsize);

      }
      endShape();
    }
    if (!this.integrated){ //if this is not integrated

      if (this.prevchar == undefined){
        return;
      }


      beginShape();
      vertex(this.prevchar.EP.x, this.prevchar.EP.y);

      //captials
      if (this.prevchar.capital || this.prevchar.incapital){

        //TOP
        if (this.prevchar.EP.y == this.prevchar.top.y){
          vertex(this.prevchar.EP.x, this.prevchar.EP.y-hsize);
          vertex(this.prevchar.EP.x-size, this.prevchar.EP.y-hsize);
          vertex(this.prevchar.EP.x-size, this.prevchar.EP.y+1.5*size);
          vertex(this.prevchar.EP.x+size, this.prevchar.EP.y+1.5*size);

          if (topentry.includes(this.char)){
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-hsize);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y-hsize);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y);
          }
          if (leftentry.includes(this.char)){
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y+hsize);
          }
          if (botentry.includes(this.char)){
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y+1.5*size);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y+size);
          }
        }
        //RIGHT
        if (this.prevchar.EP.y == this.prevchar.mid.y){
          vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y);
          if (topentry.includes(this.char)){
            vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x-1.5*size, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x-1.5*size, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y-hsize);
          }
          if (leftentry.includes(this.char)){
            vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x-1.5*size, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x-1.5*size, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y);
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y);
          }
          if (botentry.includes(this.char)){
            vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x-1.5*size, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x-1.5*size, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y+hsize);

          }
        }
        //BOTTOM
        if (this.prevchar.EP.y == this.prevchar.bot.y){
          vertex(this.prevchar.EP.x, this.prevchar.EP.y+hsize);

          if (topentry.includes(this.char)){
            vertex(this.prevchar.EP.x-size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x-size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y-size);
          }
          if (leftentry.includes(this.char)){
            vertex(this.prevchar.EP.x-size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x-size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-hsize);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y-hsize);
          }
          if (botentry.includes(this.char)){
            vertex(this.prevchar.EP.x-size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x-size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y);

          }
        }


      }
      else{

        //TOP
        if (this.prevchar.EP.y == this.prevchar.top.y){
          vertex(this.prevchar.EP.x, this.prevchar.EP.y-hsize);
          vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-hsize);
          if (topentry.includes(this.char)){
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y-hsize);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y);
          }
          if (leftentry.includes(this.char)){
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y+hsize);
          }
          if (botentry.includes(this.char)){
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y+1.5*size);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y+1.5*size);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y+size);
          }
        }
        //RIGHT
        if (this.prevchar.EP.y == this.prevchar.mid.y){
          vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y);
          if (topentry.includes(this.char)){
            vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y-size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y-hsize);
          }
          if (leftentry.includes(this.char)){
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y);
          }
          if (botentry.includes(this.char)){
            vertex(this.prevchar.EP.x+hsize, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y+size);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y+hsize);

          }
        }
        //BOTTOM
        if (this.prevchar.EP.y == this.prevchar.bot.y){
          vertex(this.prevchar.EP.x, this.prevchar.EP.y+hsize);
          vertex(this.prevchar.EP.x+size, this.prevchar.EP.y+hsize);
          if (topentry.includes(this.char)){
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y-1.5*size);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y-size);
          }
          if (leftentry.includes(this.char)){
            vertex(this.prevchar.EP.x+size, this.prevchar.EP.y-hsize);
            vertex(this.prevchar.EP.x+1.5*size, this.prevchar.EP.y-hsize);
          }
          if (botentry.includes(this.char)){
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y+hsize);
            vertex(this.prevchar.EP.x+2*size, this.prevchar.EP.y);

          }
        }
      }

      endShape();
    }
  }


  this.startmarker = function(){ //start marker function
    strokeWeight(size/3.5);
    strokeCap(SQUARE);
    if (topentry.includes(this.char)){ //top entry start marker
      line(this.top.x, this.top.y,this.top.x, this.top.y-size/5.4);
    }
    if (leftentry.includes(this.char)){ //left entry start marker
      line(this.left.x, this.left.y,this.left.x-size/5.4, this.left.y);
    }
    if (botentry.includes(this.char)){ //bottom entry start marker
      line(this.bot.x, this.bot.y, this.bot.x, this.bot.y+size/5.4);
    }
    strokeWeight(strokeWidth);
    strokeCap(PROJECT);
  }

  this.endmarker = function(EP){
    if (this.EP.y == this.top.y){  //top exit end marker
      triangle(this.EP.x-hsize/10, this.EP.y-strokeWidth/2, this.EP.x+hsize/10, this.EP.y-strokeWidth/2, this.EP.x, this.EP.y-size/10-strokeWidth/2);
    }
    if (this.EP.y == this.mid.y){//right exit end marker
      triangle(this.EP.x+strokeWidth/2, this.EP.y-hsize/10, this.EP.x+strokeWidth/2, this.EP.y+hsize/10, this.EP.x+size/10+strokeWidth/2, this.EP.y);
    }
    if (this.EP.y == this.bot.y){//bottom exit end marker
      triangle(this.EP.x+hsize/10, this.EP.y+strokeWidth/2, this.EP.x-hsize/10, this.EP.y+strokeWidth/2, this.EP.x, this.EP.y+size/10+strokeWidth/2);
    }

  }

}
