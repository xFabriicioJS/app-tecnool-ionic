import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';
import { environment } from 'src/environments/environment';

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
  tipoUsuarioLogado: string = '';



  constructor(
    private actRoute: ActivatedRoute,
    private alertController: AlertController,
    private apiService: ApiService,
    private router: Router,
    private getUser: GetUserTypeService,
    private toastService: ToastController
    ) { }

  ionViewWillEnter(){
    //Bloquando acesso para usuários não autenticados
    if(this.getUser.getUserInfo() == null){
      this.router.navigate(['/login']);
    }
    //Pegando o tipo do usuário logado para fazer uma renderização condicional no botão cancelar descarte
    let user = this.getUser.getUserInfo();
    this.tipoUsuarioLogado = user.tipo_usuario_sistema;
    console.log(this.tipoUsuarioLogado);
  }

  ngOnInit() {
    
    this.actRoute.params.subscribe((data: any)=>{

    //Setando a localização da lib moment para pt-br


      //Convertendo a data de abertura para o formato localizado
      let prazo = moment(data.prazo).locale('pt-BR').format('LL');
      let dataAbertura = moment(data.dataAbertura).format('LLL');

      let caminhoImg;
      //Verificando se veio uma imagem
      if(data.fotoHardware == 'null'){
        caminhoImg = null;
      }else{
        caminhoImg = environment.FILE_IMG_PATH + '/' + data.fotoHardware;
      }


      this.nomeHardware = data.nomeHardware;
      this.descriHardware = data.descriHardware;
      this.dataAbertura = dataAbertura;
      this.protocoloDescarte = data.protocolo;
      this.prazo = prazo;
      this.dataRetirada = data.dataRetirada;
      this.status = data.status;
      this.fotoHardware = caminhoImg;
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
     //corpo da requisição para ser mandado para a API
     let bodyRequest = {
      requisicao: "cancelar",
      id_descarte: this.idDescarte
    }

    console.log(bodyRequest);
    return new Promise((res) => {
      this.apiService.apiPHP('controller-descartes.php', bodyRequest).subscribe((data: any) =>{
        if(data['success'] == true){
          this.presentToast('<b>Descarte cancelado com sucesso!</b>', 'success');
          this.router.navigate(['/tabs/tab1']);
        }else{
          this.presentToast('<b>Erro ao cancelar o descarte!</b>', 'danger');
        }
      });
    })

  }


  async presentToast(msg : string, color: string) {
    const toast = await this.toastService.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}
