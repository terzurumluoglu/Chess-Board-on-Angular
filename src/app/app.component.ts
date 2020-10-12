import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chess Board';

  boardLength : number = 8;  // Board 8x8
  pk: number = 0.75;         // Oyun Alanı Ekranın %75' inde
  tk: number = 0.25          // Title Alanı Ekranın %25' inde 
  
  boardSize: number;         // Kısa Kenar Uzunluğu
  boardBorderSize: number;

  boxSize: number;
  boxMarginSize : number;

  boardStyle: any;
  boxStyle: any;
  titleStyle: any;

  spaces: any[][];
  constructor() { }
  ngOnInit() {
    this.spaces = this.createPlayGround();
    this.calculate();
    this.setStyle();
  }

  calculate() {
    this.boardSize = this.getSmallSideSize() * this.pk;
    this.boardBorderSize = this.boardSize * 0.01;

    this.boxMarginSize =  this.boardBorderSize * 0.5;
    let containerBorderSize : number = this.boardBorderSize * 2;
    let containerPaddingSize : number = this.boardBorderSize * 2;
    this.boxSize = (this.boardSize - containerBorderSize - containerPaddingSize) / this.boardLength  - this.boxMarginSize * 2;
  }

  getSmallSideSize(): number {
    return window.innerWidth <= window.innerHeight ? window.innerWidth : window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calculate();
    this.setStyle();
  }

  setStyle() {
    this.boardStyle = {
      'height': this.boardSize + 'px',
      'width': this.boardSize + 'px',
      'padding': this.boardBorderSize + 'px',
      'border': this.boardBorderSize + 'px solid #500000'
    };

    this.boxStyle = {
      'height':this.boxSize + 'px',
      'width': this.boxSize + 'px',
      'margin': this.boxMarginSize + 'px'
    };

    const t: number = this.getSmallSideSize() * this.tk * 0.2;

    this.titleStyle = {
      'margin-top': t + 'px',
      'margin-bottom': t * 0.5 + 'px',
      'padding': t * 0.3 + 'px',
      'font-size': t + 'px'
    }
  }

  createPlayGround(): any[][] {
    let playGround: any[][] = new Array(this.boardLength);
    for (let i = 0; i < this.boardLength; i++) {
      playGround[i] = new Array(this.boardLength);
    }
    return playGround;
  }
}
