import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-chamado',
  templateUrl: './visualizar-chamado.page.html',
  styleUrls: ['./visualizar-chamado.page.scss'],
})
export class VisualizarChamadoPage implements OnInit {
    tituloChamado : string = '';
    descriChamado : string = '';
    statusChamado : string = '';
    dataLimite : string = '';
    dataAbertura: string = '';
    dataFinalizacao: string = '';
    protocoloChamado: string = '';
    localAtend: string = '';
    id_chamado : number;
    foto_erro_chamado: string = '';

  constructor(
    private actRoute:ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data:any) => {

      //convertendo a data para o formato brasileiro
      const dataAserConvertida = moment(data.dataAbertura).format('DD/MM/YYYY HH:mm:ss');

      const dataLimiteAserConvertida = moment(data.dataLimite).format('DD/MM/YYYY HH:mm:ss');

      if(data.dataFinalizacao != 'null'){
      this.dataFinalizacao = moment(data.dataFinalizacao).format('DD/MM/YYYY HH:mm:ss');
      }




      this.id_chamado = data.id_chamado;
      this.tituloChamado = data.tituloChamado;
      this.descriChamado = data.descriChamado;
      this.dataAbertura = dataAserConvertida;
      this.dataLimite = dataLimiteAserConvertida;
      this.dataFinalizacao = data.dataFinalizacao;
      this.statusChamado = data.statusChamado;
      this.foto_erro_chamado = environment.FILE_IMG_PATH + '/' + data.foto_erro_chamado;
      this.localAtend = data.localAtend;
      this.protocoloChamado = data.protocoloChamado;
    });

    let chamadoObj = {
      id_chamado: this.id_chamado,
      tituloChamado: this.tituloChamado,
      descriChamado: this.descriChamado,
      dataAbertura: this.dataAbertura,
      dataLimite: this.dataLimite,
      dataFinalizacao: this.dataFinalizacao,
      statusChamado: this.statusChamado,
      foto_erro_chamado: this.foto_erro_chamado,
      localAtend: this.localAtend,
      protocoloChamado: this.protocoloChamado
    }
    console.log(chamadoObj);

    console.log(this.foto_erro_chamado);
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Cancelar chamado',
      message: 'Deseja realmente cancelar o chamado? <br> <strong>Obs: </strong> Essa ação não poderá ser desfeita.',
      buttons: [
        {
          text: 'Não, voltar.',
          role: 'cancel',
        },
        {
          text: 'Sim, desejo cancelar.',
          role: 'confirm',
          handler: () => {
            
          },
        },
      ],
    });

    await alert.present();
  }

  

}
