import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from 'src/app/model/iproperty';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http: HttpClient) { }

getAllProperties(SellRent: number ): Observable<Array<IProperty>> {
  return this.http.get('http://localhost:8080/properties').pipe(
    map( data => {
      const propertiesArray: Array<IProperty> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp'));
      if (localProperties) {
        for (const id in localProperties) {
          if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
            propertiesArray.push(localProperties[id]);
          }
        }
      }

      for (const id in data) {
        if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
          propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
    }
    )
  );
}

async postProperty(property: Property): Promise<boolean> {
  console.log(JSON.stringify(property));
  const response = await fetch('http://localhost:8080/property', {
    method: 'POST',
    body: JSON.stringify(property),
    headers: {'Content-Type': 'application/json'} });

  return response.ok;
}

}
