import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from '../api/api-service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  chamados: any = [];
  cardNenhumChamado = false;


  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private apiService: ApiService
    ) {}

  ionViewWillEnter(){
    this.buscarTodosOsChamados();
    console.log(this.chamados);
  }


  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer com esse chamado?',
      buttons: [
        {
          text: 'Deletar chamado',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Informações do chamado',
          data: {
            action: 'share',
          },
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

buscarChamadosAbertos(){

}

buscarTodosOsChamados(){

  let bodyRequest = {
    requisicao: 'listar',
    titulo: ''
  }

  return new Promise((res) => {
    this.apiService.apiPHP('controller-chamados.php', bodyRequest).subscribe((data) => {
      if(data['success'] == true){
        data['result'].map((chamado)=> {
          this.chamados.push(chamado[0]);
        })
      }else{
        this.cardNenhumChamado == true;
      }
    })
  })
}

buscarChamadosFinalizados(){
  console.log('buscandoChamadosFinalizados');
  
}

navigateAddChamado(){
  this.router.navigate(['/addchamado']);

}

}
