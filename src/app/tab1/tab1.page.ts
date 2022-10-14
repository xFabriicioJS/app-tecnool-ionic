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
    //fazer um if para verificar se o usuário está logado e a permissão dele
    this.buscarTodosOsChamados();
    console.log(this.chamados);
  }


  
  async presentActionSheet(chamado) {
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
          handler:  () => {
            this.navigateInformacoesChamado(chamado.id_chamado, chamado.titulo, chamado.descricao, chamado.data_abertura, chamado.data_limite, chamado.data_finalizacao, chamado.status, chamado.foto_erro, chamado.local_atend, chamado.protocolo);
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
 

  //fazendo um filter nos chamados para filtrar somente os chamados finalizados

  let chamadosFinalizados = this.chamados.filter((chamado) => {
    return chamado.status == 'Finalizado';
  })
 
  console.log(chamadosFinalizados);
  this.chamados = chamadosFinalizados;
}

buscarChamadosPorCliente(){
  let bodyRequest = {
    requisicao: 'listarTodosPorCliente',
    //pegar o id do cliente do local storage
    id_cliente: 1
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
  });
}

navigateAddChamado(){
  this.router.navigate(['/addchamado']);

}

navigateInformacoesChamado(id, titulo, descricao, dataAbertura, dataLimite, dataFinalizacao, statusChamado, fotoErroChamado, localAtend, protocoloChamado){
  this.router.navigate(['/visualizar-chamado/'+id+'/'+titulo+'/'+descricao+'/'+dataAbertura+'/'+dataLimite+'/'+dataFinalizacao+'/'+statusChamado+'/'+fotoErroChamado+'/'+localAtend+'/'+protocoloChamado]);
}

refreshChamados(){
  this.chamados = [];
  this.buscarTodosOsChamados();
}


}
