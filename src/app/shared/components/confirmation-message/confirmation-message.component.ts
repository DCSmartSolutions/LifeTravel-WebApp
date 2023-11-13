import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogData} from "../alert-message/alert-message.component";

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent {
  title: string = '';
  content: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title;
    this.content = data.content;
  }
}
