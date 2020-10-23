import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') staticTabs: TabsetComponent;

  addPropertyForm: FormGroup;
  property = new Property();
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    FType: null,
    PType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertify: AlertifyService,
              private housingService: HousingService) { }

  ngOnInit(): void {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
    });
  }

  onSubmit(): void {
    if (this.allTabsValid()) {
      this.mapProperty();
      const newProperty: Omit<Property, 'id'> = Object.assign({}, this.property);
      this.housingService.postProperty(newProperty).then((ok) =>
        {
          if (ok) {
            this.alertify.success('Congrats, your property listed successfully on our website');
            console.log(this.addPropertyForm);
            if (this.SellRent.value === '2') {
              this.router.navigate(['/rent-property']);
            } else {
              this.router.navigate(['/']);
            }
          } else {
            this.alertify.error('Something wrong happened to your request, please try again later');
          }
        }
      );

    } else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  selectTab(tabId: number, isCurrentValid: boolean): void {
    if (isCurrentValid) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  mapProperty(): void {
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.staticTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.staticTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.staticTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.staticTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }


//#region <Getter Methods>
// #region <FormGroups>
    get BasicInfo(): FormGroup {
      return this.addPropertyForm.controls.BasicInfo as FormGroup;
    }

    get PriceInfo(): FormGroup {
      return this.addPropertyForm.controls.PriceInfo as FormGroup;
    }

    get AddressInfo(): FormGroup {
      return this.addPropertyForm.controls.AddressInfo as FormGroup;
    }

    get OtherInfo(): FormGroup {
      return this.addPropertyForm.controls.OtherInfo as FormGroup;
    }
// #endregion

//#region <Form Controls>
    get SellRent(): FormControl {
      return this.BasicInfo.controls.SellRent as FormControl;
    }

    get BHK(): FormControl {
      return this.BasicInfo.controls.BHK as FormControl;
    }

    get PType(): FormControl {
      return this.BasicInfo.controls.PType as FormControl;
    }

    get FType(): FormControl {
      return this.BasicInfo.controls.FType as FormControl;
    }

    get Name(): FormControl {
      return this.BasicInfo.controls.Name as FormControl;
    }

    get City(): FormControl {
      return this.BasicInfo.controls.City as FormControl;
    }

    get Price(): FormControl {
      return this.PriceInfo.controls.Price as FormControl;
    }

    get BuiltArea(): FormControl {
      return this.PriceInfo.controls.BuiltArea as FormControl;
    }

    get CarpetArea(): FormControl {
      return this.PriceInfo.controls.CarpetArea as FormControl;
    }

    get Security(): FormControl {
      return this.PriceInfo.controls.Security as FormControl;
    }

    get Maintenance(): FormControl {
      return this.PriceInfo.controls.Maintenance as FormControl;
    }

    get FloorNo(): FormControl {
      return this.AddressInfo.controls.FloorNo as FormControl;
    }

    get TotalFloor(): FormControl {
      return this.AddressInfo.controls.TotalFloor as FormControl;
    }

    get Address(): FormControl {
      return this.AddressInfo.controls.Address as FormControl;
    }

    get LandMark(): FormControl {
      return this.AddressInfo.controls.LandMark as FormControl;
    }

    get RTM(): FormControl {
      return this.OtherInfo.controls.RTM as FormControl;
    }

    get PossessionOn(): FormControl {
      return this.OtherInfo.controls.PossessionOn as FormControl;
    }

    get AOP(): FormControl {
      return this.OtherInfo.controls.AOP as FormControl;
    }

    get Gated(): FormControl {
      return this.OtherInfo.controls.Gated as FormControl;
    }

    get MainEntrance(): FormControl {
      return this.OtherInfo.controls.MainEntrance as FormControl;
    }

    get Description(): FormControl {
      return this.OtherInfo.controls.Description as FormControl;
    }

//#endregion
//#endregion


}
