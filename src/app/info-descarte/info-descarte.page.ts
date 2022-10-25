import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-info-descarte',
  templateUrl: './info-descarte.page.html',
  styleUrls: ['./info-descarte.page.scss'],
})
export class InfoDescartePage implements OnInit {
  nomeHardware : string = '';
  descriHardware: string = '';
  dataAbertura: string = '';
  protocoloDescarte: string = '';
  prazo: string = '';
  dataRetirada: string = '';
  status: string = '';
  fotoHardware: string = '';
  idDescarte: number = 0;
  nomeSolicitante: string = '';



  constructor(
    private actRoute: ActivatedRoute,
    private alertController: AlertController,
    private apiService: ApiService,
    private router: Router,
    private getUser: GetUserTypeService 
    ) { }

  ionViewWillEnter(){
    //Bloquando acesso para usuários não autenticados
    if(this.getUser.getUserInfo() == null){
      this.router.navigate(['/login']);
    }

    //


  }

  ngOnInit() {
    
    this.actRoute.params.subscribe((data: any)=>{

    //Setando a localização da lib moment para pt-br


      //Convertendo a data de abertura para o formato localizado
      let prazo = moment(data.prazo).locale('pt-BR').format('LL');
      let dataAbertura = moment(data.dataAbertura).format('LLL');


      this.nomeHardware = data.nomeHardware;
      this.descriHardware = data.descriHardware;
      this.dataAbertura = dataAbertura;
      this.protocoloDescarte = data.protocolo;
      this.prazo = prazo;
      this.dataRetirada = data.dataRetirada;
      this.status = data.status;
      this.fotoHardware = data.fotoHardware;
      this.idDescarte = data.id_descarte;
    });

    console.log(this.fotoHardware);
    console.log(this.nomeHardware);
    console.log(this.protocoloDescarte);
    }

  navigateComoProsseguir(){
    console.log("navigate como prosseguir");
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Cancelar descarte',
      message: 'Deseja realmente cancelar o descarte? <br> <strong>Obs: </strong> Essa ação não poderá ser desfeita.',
      buttons: [
        {
          text: 'Não, voltar.',
          role: 'cancel',
        },
        {
          text: 'Sim, desejo cancelar.',
          role: 'confirm',
          handler: () => {
            this.cancelarDescarte();
          },
        },
      ],
    });

    await alert.present();
  }

  cancelarDescarte(){
    console.log("cancelando descarte " + this.idDescarte);
    

  }

}
