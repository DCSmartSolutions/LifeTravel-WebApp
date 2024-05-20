import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DialogData {
  title: string = '';
  content: string = '';
}

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
})
export class AlertMessageComponent {
  title: string = '';
  content: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title;
    this.content = data.content;
  }
}
