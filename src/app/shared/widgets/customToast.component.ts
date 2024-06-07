import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[custom-toast-component]',
  styles: [
    `
      :host {
        background-color: #243a52;
        position: relative;
        overflow: hidden;
        padding: 10px 10px 10px 10px;
        width: 300px;
        border-radius: 3px 3px 3px 3px;
        color: #ffffff;
        pointer-events: all;
        cursor: pointer;
      }
      .btn-blue {
        -webkit-backface-visibility: hidden;
        -webkit-transform: translateZ(0);
        background-color: #506d8e;
        color: #ffffff;
      }
      .btn-blue:hover {
        background-color: #6881a1;
      }
      .row {
        width: 500px;
        padding-right: 200px;
      }
    `,
  ],
  template: `
    <div class="row" [style.display]="state.value === 'inactive' ? 'none' : ''">
      <div class="col-7">
        <div
          *ngIf="title"
          [class]="options.titleClass"
          [attr.aria-label]="title"
        >
          {{ title }}
        </div>
        <div
          *ngIf="message && options.enableHtml"
          role="alert"
          [class]="options.messageClass"
          [innerHTML]="trimmedMessage"
        ></div>
        <div
          *ngIf="message && !options.enableHtml"
          role="alert"
          [class]="options.messageClass"
          [attr.aria-label]="message"
        >
          {{ trimmedMessage }}
        </div>
      </div>
      <div class="col-3 text-right">
        <a
          *ngIf="showMoreButton"
          class="btn btn-blue btn-sm"
          (click)="showMore($event)"
        >
          Show More
        </a>
        <a
          *ngIf="!showMoreButton"
          class="btn btn-blue btn-sm"
          (click)="removeToast($event)"
        >
          Close
        </a>
      </div>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 0,
        }),
      ),
      transition(
        'inactive => active',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
              opacity: 0,
            }),
            style({
              transform: 'skewX(20deg)',
              opacity: 1,
            }),
            style({
              transform: 'skewX(-5deg)',
              opacity: 1,
            }),
            style({
              transform: 'none',
              opacity: 1,
            }),
          ]),
        ),
      ),
      transition(
        'active => removed',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 1,
            }),
            style({
              transform: 'translate3d(100%, 0, 0) skewX(30deg)',
              opacity: 0,
            }),
          ]),
        ),
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class PinkToast extends Toast {
  undoString = 'Show More';
  fullMessage: string;
  trimmedMessage: string;
  showMoreButton: boolean = true;

  constructor(toastService: ToastrService, toastPackage: ToastPackage) {
    super(toastService, toastPackage);
    this.fullMessage = this.message ? this.message : '';
    this.trimmedMessage =
      this.fullMessage.length > 100
        ? this.fullMessage.substring(0, 100) + '...'
        : this.fullMessage;
  }

  showMore(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.trimmedMessage = this.fullMessage;
    this.showMoreButton = false;
    this.undoString = 'Close';

    this.toastPackage.toastRef.componentInstance.toastPackage.options.disableTimeOut =
      true;
  }

  removeToast(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.toastPackage.triggerAction();
    this.toastPackage.toastRef.close();
  }
}
