import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlockImage} from '../../../model/block-image';
import {NgForm} from '@angular/forms';
import {BlockData} from '../../../model/block-data';
import {BaseComponent} from '../base-component';
import {ContentComponent} from '../../../model/content-component';

@Component({
  selector: 'app-image-block',
  template: `
    <mat-card class="block">
      <mat-card-header>
        <div mat-card-avatar class="header-image"></div>
        <mat-card-title>Изображение</mat-card-title>
        <mat-card-subtitle>
          <app-order [order]="order"></app-order>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="!toggleEdit">
          <img [src]="data.url" class="img-responsive"/>
        </div>
        <form #imageForm="ngForm" (ngSubmit)="onFormSubmit(imageForm)">
          <mat-form-field *ngIf="toggleEdit">
            <input matInput
                   #url="ngModel"
                   [ngModel]="data.url"
                   name="url"
                   placeholder="Укажите URL изображения"
                   [pattern]="urlPattern">
            <div *ngIf="url.invalid && (url.dirty || url.touched)">
              <mat-error *ngIf="url.errors.pattern">
                Не верный URL
              </mat-error>
            </div>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions (mouseleave)="moves.emit(true)" (mouseenter)="moves.emit(false)">
        <app-block-actions (toggleEdit)="toggleEditing(imageForm)" (destroy)="destroy.emit()"></app-block-actions>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }

    .block {
      background-color: darkcyan;
    }
  `]
})
export class ImageBlockComponent extends BaseComponent implements OnInit, ContentComponent {

  @Output() edited = new EventEmitter<BlockData>();
  @Output() destroy = new EventEmitter<any>();
  @Output() moves = new EventEmitter<boolean>();

  @Input() data: BlockImage;
  @Input() order: number;

  urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.data.url = form.value.url;
    this.edited.emit(this.data);
    form.resetForm();
  }
}
