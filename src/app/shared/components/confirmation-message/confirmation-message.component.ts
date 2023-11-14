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
  confirmationButtonText: string = 'Create';
  confirmationIcon: string = 'add';
  className: string = 'bg-success';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.content = data.content;
    if (data.confirmationButtonText) this.confirmationButtonText = data.confirmationButtonText;
    if (data.confirmationIcon) this.confirmationIcon = data.confirmationIcon;
    if (data.className) this.className = data.className;
  }
}
