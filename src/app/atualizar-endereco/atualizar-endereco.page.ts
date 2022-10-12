import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-atualizar-endereco',
  templateUrl: './atualizar-endereco.page.html',
  styleUrls: ['./atualizar-endereco.page.scss'],
})
export class AtualizarEnderecoPage implements OnInit {
  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      cep: [
        "",
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])
      ],
      logradouro: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
      numero: [
        "",
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(5),
          Validators.pattern("^[0-9]*$"),
          Validators.required
        ])
      ],
      complemento: [
        "",
        Validators.compose([
          Validators.maxLength(55)
        ])
      ],
      bairro: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(55),
          Validators.required        
        ])
      ],
      cidade: [
        "",
        Validators.compose([
         Validators.minLength(4),
         Validators.maxLength(70),
         Validators.required  
        ])
      ]
    });
   }

  ngOnInit() {
  }

}
