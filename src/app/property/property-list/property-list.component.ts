import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { IProperty } from 'src/app/model/iproperty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: IProperty[];

  constructor(private route: ActivatedRoute, private housingService:HousingService ) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      result =>  {
        this.properties = result;
        const newProperty = JSON.parse(localStorage.getItem('newProp'));

        if (newProperty.SellRent == this.SellRent) {
          this.properties = [newProperty, ... this.properties];
          localStorage.removeItem('newProp');

        }
      }
    , error => console.log(error));
  }

}
