import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

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



  constructor(
    private actRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {



    this.actRoute.params.subscribe((data: any)=>{
      this.nomeHardware = data.nomeHardware;
      this.descriHardware = data.descriHardware;
      this.dataAbertura = data.dataAbertura;
      this.protocoloDescarte = data.protocolo;
      this.prazo = data.prazo;
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
