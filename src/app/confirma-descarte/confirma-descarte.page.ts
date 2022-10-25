import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-confirma-descarte',
  templateUrl: './confirma-descarte.page.html',
  styleUrls: ['./confirma-descarte.page.scss'],
})
export class ConfirmaDescartePage implements OnInit {

  tituloHardware: string = '';
  descriHardware: string = '';
  prazo: string = '';

  constructor(
    private actRoute: ActivatedRoute
  ) { 
  }

  ngOnInit() {


    this.actRoute.params.subscribe((data:any)=> {

      //Formatando o prazo

      let prazo = moment(data.prazoDescarte).locale('pt-BR').format('LL');

      this.tituloHardware = data.tituloHardware;
      this.descriHardware = data.descriHardware;
      this.prazo = prazo;
    })
  }
  
  ionViewWillEnter(){

  }

}
