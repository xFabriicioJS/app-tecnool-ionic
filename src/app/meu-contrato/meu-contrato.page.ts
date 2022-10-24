import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-contrato',
  templateUrl: './meu-contrato.page.html',
  styleUrls: ['./meu-contrato.page.scss'],
})
export class MeuContratoPage implements OnInit {
  possuiPlanoAtivo: boolean = false;
  nomePlano: string = '';
  valorPlano: string = '';

  constructor() { }

  ngOnInit() {
  }

}
