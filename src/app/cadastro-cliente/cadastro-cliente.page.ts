import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroClientePage implements OnInit {

  formGroupPf: FormGroup;
  isSubmitrted: boolean = false;
  formGroupPj: FormGroup;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController
  ) { 
    this.formGroupPf = formbuilder.group({
      nome:[
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(60),
          Validators.required
        ])
      ],
      cpf:[
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*'),
          Validators.required
        ])
      ],
      email:[
        "",
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.email,
          Validators.required
        ])
      ],
      telefone:[
        "",
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*'),
          Validators.required
        ])
      ],
      senha:[
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ]
    });
  }

  ngOnInit() {
  }

}
