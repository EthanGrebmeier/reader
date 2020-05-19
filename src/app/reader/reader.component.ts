import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {


  constructor() { }



  playPause: String = "Play";

  playState: boolean = false; 
  firstClick: boolean = false; 

  infoClicked: boolean = false; 

  wpmNum: string = '200'; 
  currWord: string = null; 

  wordsString: String = ''; 
  words: Array<String> = [];
  currInt: number = 0; 


  timeOutArray: Array<any> = [];

  sliderValue: number = 200;



  infoClick(){
      this.infoClicked = true; 
  }
  
  closeClick(){
      this.infoClicked = false; 
  }


  getSliderValue(event: any) {

    this.sliderValue = event.target.value;

    this.wpmNum = (<string> <unknown> this.sliderValue);
  }


startPress(event: any){
  console.log(this.wordsString);
    if (!this.playState){
        if(this.words.length == 0){
            this.words = this.wordsString.trim().split(" ").join(',').split(".").join(',').split("!").join(',').split("?").join(',').split('\n').join(',').split(',');
            console.log(this.words);
            if (this.words.length == 1){
              this.words = [];
            }
        }
        if (this.words.length == 0){
          this.currWord = "Click 'Info'";
        } else {
            for(let index = 0; index < this.words.length; index++){
              this.timeOutArray.push(setTimeout( () => this.increment(this.words, index) , (60000 / this.sliderValue) * index));
            }
            this.toPause();
        }


    } else {
      this.words = this.onPause();
      this.currInt = 0;
      this.timeOutArray = [];
    }
}

stopPress(event: any) {

  try {
      for (let t = 0; t < this.words.length; t++) {
          clearTimeout(this.timeOutArray[t])
      }
  } catch (e) {}
  this.toStart();
  this.timeOutArray = [];
  this.currInt = 0;
  this.currWord = "Placeholder Text";
}

increment(words, index){
  if(this.playState){
    this.currWord = words[index];
    this.currInt = index;

      if(words.length - 1 == index){
        this.toStart();
        this.currInt = 0;
      }
  }
}

playClass(){
  let myClasses = {
    play: (this.playPause == "Play" || this.playPause == "Start"),
    pause: this.playPause == "Pause"
  };
  return myClasses; 
}

toPlay(){
  //this.button.classList.add('play');
  try{
    //this.button.classList.remove('pause');
  } catch (e) {

  }
  this.playPause = "Play";
  this.playState = false;
}

toStart(){
  //this.button.classList.add('start');
  try{
    //this.button.classList.remove('pause');
  } catch (e) {

  }
  this.playPause = "Start";
  this.playState = false;
  this.words = [];
}


toPause(){
  this.playPause = "Pause";
  this.playState = true;
}

onPause(){
  for( let t = 0; t < this.words.length; t++){
      clearTimeout(this.timeOutArray[t])
  }
  this.toPlay();
  return this.words.slice(this.currInt);
}

inputClick(){
  if (!this.firstClick){
    //this.input.innerText = "";
    this.firstClick = true;
  }
}


  ngOnInit(): void {
    console.log(this.currWord); 
    this.currWord = "Placeholder Text";
    this.wpmNum = "200";
  }

}
