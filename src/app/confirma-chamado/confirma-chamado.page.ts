import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-confirma-chamado',
  templateUrl: './confirma-chamado.page.html',
  styleUrls: ['./confirma-chamado.page.scss'],
})
export class ConfirmaChamadoPage implements OnInit {

  tituloChamado: string = '';
  descriChamado: string = '';
  dataLimite: string = '';
  tipoAtendimento: string = '';

  constructor(
    private router : Router,
    private actRoute: ActivatedRoute,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data:any)=> {

      //Formatando a data para o formato BR

      let dataFormatada = moment(data.dataLimite).locale('pt-BR').format('LLL');

      this.tituloChamado = data.tituloChamado;
      this.descriChamado = data.descriChamado;
      this.dataLimite = data.dataLimite;
      this.dataLimite = dataFormatada;
      this.tipoAtendimento = data.tipoAtendimento;
    })
  }

  navigateInicio(){
    //Vamos forçar a renderização completa da página tab1
    this.router.navigate(['tabs/tab1']);
  }

}
