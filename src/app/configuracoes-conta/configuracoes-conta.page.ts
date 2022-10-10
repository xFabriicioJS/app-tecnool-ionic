import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-configuracoes-conta',
  templateUrl: './configuracoes-conta.page.html',
  styleUrls: ['./configuracoes-conta.page.scss'],
})
export class ConfiguracoesContaPage implements OnInit {

  isModalOpen = false;
    formGroup: FormGroup;
  constructor(
    public formBuilder : FormBuilder,
    private router: Router,
    private alertController: AlertController
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

  navigateAtualizarEndereco(){
    this.router.navigate(['atualizar-endereco']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Por favor, insira seu novo número de contato.',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Novo número de contato',
        },
        {
          placeholder: 'Telefone (máximo de 11 dígitos)',
          attributes: {
            maxlength: 11,
          },
          type: 'number'
        }
      ],
    });

    await alert.present();
  }



}
