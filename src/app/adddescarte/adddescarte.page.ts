import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adddescarte',
  templateUrl: './adddescarte.page.html',
  styleUrls: ['./adddescarte.page.scss'],
})
export class AdddescartePage implements OnInit {
  formGroup: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      tituloChamado: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])
      ],
      descriChamado: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
    });
   }

   onSubmit(formData: any) {
    console.log(formData);
    // todo do something with our data like:
    // this.service.set(formData);
  }


  ngOnInit() {
  }

}
