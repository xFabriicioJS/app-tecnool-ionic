import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cardNenhumDescarte: boolean = false;
  descartes: any = [];



  constructor(
    private router: Router,
    private apiService: ApiService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter(){
    this.descartes = [];
    this.buscarTodosOsDescartes();
  }

  navigateSaibaMaisDescarte(){
    this.router.navigate(['/sabermais-descarte']);
  }
  navigateAddDescarte(){
    this.router.navigate(['/adddescarte']);
  }


  buscarTodosOsDescartes(){

    let bodyRequest = {
      requisicao: 'listar'
    }
  
    return new Promise((res) => {
      this.apiService.apiPHP('controller-descartes.php', bodyRequest).subscribe((data) => {

        //caso o usuário/admin tenha descartes cadastrados
        if(data['success'] == true){
          data['result'].map((descarte)=> {
            this.descartes.push(descarte[0]);
          })
          //caso o usuário/admin não tenha descartes cadastrados habilitamos o card de nenhum descarte

          console.log(this.descartes);

        }else if(data['result'] == '0'){
          this.cardNenhumDescarte = true;

          console.log(this.descartes);
        }else{
          console.log(this.descartes);
        }
      })
    })
  }


  async presentActionSheet(descarte) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer com esse descarte?',
      buttons: [
        {
          text: 'Cancelar o descarte',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Informações do descarte',
          handler:  () => {


            //Navega para a rota de informações do descarte passando as informações como parâmetro

            //verificando se o descarte possui ou não uma imagem anexada, precisamos fazer isso pois o caminho para a rota irá bugar caso o descarte não possua uma imagem anexada

            let descarteFotoString;

            if(descarte.foto_hardware == ""){
              descarteFotoString = "null";
            }else{
              descarteFotoString = descarte.foto_hardware;
            }

            this.navigateInfoDescarte(descarte.id_descarte, descarte.protocolo, descarte.nome_hardware, descarte.descricao, descarte.data_abertura, descarte.data_retirada, descarte.prazo, descarte.status, descarteFotoString, descarte.id_cliente);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
}

  //função responsável por navegar para a rota de informações do descarte específivo
  navigateInfoDescarte(id : any, protocolo : string, nome : string, descri : string, dataAbertura : string, dataRetirada : string, prazo : string, status : string, foto : string, idCliente : any){
    this.router.navigate(['/info-descarte/' + id + '/' + protocolo + '/' + nome + '/' + descri + '/' + dataAbertura + '/' + dataRetirada + '/' + prazo + '/' + status + '/' + foto + '/' + idCliente]);

  }


}
