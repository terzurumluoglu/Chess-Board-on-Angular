import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chess Board';

  k: number = 0.75; // Ekran Sabiti
  size: number;     // Kısa Kenar Uzunluğu
  borderSize: number;

  chessContainerStyle: any;
  boxStyle: any;
  titleStyle: any;

  spaces: any[][];
  constructor() { }
  ngOnInit() {
    this.spaces = this.createPlayGround();
    this.size = this.getSize() * this.k;
    this.borderSize = this.size * 0.01;
    this.setStyle();
  }

  getSize(): number {
    return window.innerWidth <= window.innerHeight ? window.innerWidth : window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.size = this.getSize() * this.k;
    this.borderSize = this.size * 0.01;
    this.setStyle();
  }

  setStyle() {
    this.chessContainerStyle = {
      'height': this.size + 'px',
      'width': this.size + 'px',
      'padding': this.borderSize + 'px',
      'border': this.borderSize + 'px solid #500000'
    };

    this.boxStyle = {
      'height': (this.size - (this.borderSize * 4)) * 0.125 - this.borderSize + 'px',
      'width': (this.size - (this.borderSize * 4)) * 0.125 - this.borderSize + 'px',
      'margin': (this.borderSize * 0.5) + 'px',
      'cursor': 'pointer'
    };

    const t : number = this.getSize() * (1 - this.k) * 0.2;

    this.titleStyle = {
      'margin-top': t + 'px',
      'margin-bottom' : t * 0.5 + 'px',
      'padding': t * 0.3 + 'px',
      'font-size' : t + 'px'
    }
  }

  createPlayGround(): any[][] {
    let playGround: any[][] = new Array(10);
    for (let i = 0; i < 8; i++) {
      playGround[i] = new Array(8);
    }
    return playGround;
  }
}
