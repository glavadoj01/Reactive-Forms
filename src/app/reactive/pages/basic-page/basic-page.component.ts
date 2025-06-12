import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent { }
