import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  onScroll(e: any) {
    console.log('hhhhhhhhhhhhhhhhhhhh');
    
    if(this.boxes.length>=100) {
      console.log('No more items');
      return;
    }
    console.log('scrolled!!', e);
    const moreBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.boxes = [...this.boxes, ...moreBoxes];
  }

}
