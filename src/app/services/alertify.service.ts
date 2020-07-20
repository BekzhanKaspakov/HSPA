import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

  success(message: string) {
    alertifyjs.success(message);
  }

  warning(message: string) {
    alertifyjs.warning(message);
  }

  error(message: string) {
    alertifyjs.error(message);
  }

}
