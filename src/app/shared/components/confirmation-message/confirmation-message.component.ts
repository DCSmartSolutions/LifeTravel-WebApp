import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

class DialogData {
}

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent {
  title: string = '';
  content: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // @ts-ignore
    this.title = data['title'];
    // @ts-ignore
    this.content = data['content'];
  }
}
