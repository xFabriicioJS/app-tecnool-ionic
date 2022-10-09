import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracoes-conta',
  templateUrl: './configuracoes-conta.page.html',
  styleUrls: ['./configuracoes-conta.page.scss'],
})
export class ConfiguracoesContaPage implements OnInit {

  isModalOpen = false;
    formGroup: FormGroup;
  constructor(
    public formBuilder : FormBuilder
  ) { 
    this.formGroup = formBuilder.group({
      senhaAtual: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])
      ],
      novaSenhaUm: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
      novaSenhaDois: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
    });
  }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
