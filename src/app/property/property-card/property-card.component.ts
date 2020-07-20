import { Component, OnInit, Input } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit  {


  @Input() property : IPropertyBase;
  @Input() hideIcons : boolean;


  ngOnInit() {
  }



}
