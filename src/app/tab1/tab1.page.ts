import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
  ) {}

  
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

buscarChamadosFinalizados(){
  console.log('buscandoChamadosFinalizados');
  
}

navigateAddChamado(){
  this.router.navigate(['/addchamado']);

}

}
