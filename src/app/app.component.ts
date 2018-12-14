import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'MexicanFoodFrontend';

  @ViewChild('footerGoTo') private myscrollCon: ElementRef;

  scrollToBottom() {
    this.myscrollCon.nativeElement.scrollIntoView(false);
  }
}


