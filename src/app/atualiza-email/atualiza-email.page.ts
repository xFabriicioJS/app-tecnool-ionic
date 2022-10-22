import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-atualiza-email',
  templateUrl: './atualiza-email.page.html',
  styleUrls: ['./atualiza-email.page.scss'],
})
export class AtualizaEmailPage implements OnInit {

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController
  ) {
    this.formGroup = formBuilder.group({
      senhaAtual: 
      [
        '',
        
        Validators.compose([
          Validators.minLength(2),
          Validators.required
        ])
      ],
      novoEmailUm:
      [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.maxLength(32),
          Validators.email
        ])
      ],
      novoEmailDois:
      [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.maxLength(32),
          Validators.email
        ])
      ]

    })
   }

  ngOnInit() {
  }

}
