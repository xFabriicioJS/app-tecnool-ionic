import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { LoadingService } from '../loading.service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  cardNenhumDescarte: boolean = false;
  descartes: any = [];
  idUsuarioLogado: number = 0;
  tipoUsuarioLogado: string = '';
  numDescartesAbertos: number = 0;
  numDescartesFinalizados: number = 0;

  //Essa propriedade evita possíveis bugs enquanto fazemos nossas requisições, basicamente,
  //quando a tela é renderizada, ela possui valor true, quando a requisição é feita, o valor é alterado para false. Enquanto o valor for true, exibiremos uma tela preta
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private actionSheetCtrl: ActionSheetController,
    private getUser: GetUserTypeService,
    private loading: LoadingService
  ) {}

  ionViewWillEnter() {
    //verificamos primeiro se o usuário está logado
    if (this.getUser.getUserInfo() == null) {
      this.router.navigate(['/openscreen']);
    }

    //Sempre que esse método for invocado, os descartes resetarão seu valor para um array vazio.
    this.descartes = [];

    //Verificamos agora o tipo de usuário logado, se ele for cliente faremos uma requisição para listar os descartes apenas do cliente logado
    if (this.getUser.getUserType() == 'Cliente') {
      let currentUser = this.getUser.getUserInfo();
      this.idUsuarioLogado = currentUser.id_cliente;
      this.tipoUsuarioLogado = 'Cliente';
    } else {
      //Caso o usuário logado seja um administrador a requisiçã a ser feita é a de buscar todos os descartes, de todos os clientes
      let currentUser = this.getUser.getUserInfo();
      this.idUsuarioLogado = currentUser.id_usuario;
      this.tipoUsuarioLogado = 'Usuario';
    }
    this.descartes = [];
    //Buscamos todos os descartes, o próprio método já faz a verificação do tipo de usuário logado

    //Apresentamos o loading
    this.loading.present();
    this.buscarTodosOsDescartes();

    //Setamos a propriedade isLoading para false, assim a tela preta será removida
    this.isLoading = false;

    //Escondemos a animação do loading
    setTimeout(() => this.loading.dismiss(), 1000);

    console.log(this.descartes);
  }

  navigateSaibaMaisDescarte() {
    this.router.navigate(['/sabermais-descarte']);
  }
  navigateAddDescarte() {
    this.router.navigate(['/adddescarte']);
  }

  //Método responsável por buscar todos os descartes, seja do cliente logado ou de todos os clientes
  buscarTodosOsDescartes() {
    let bodyRequest = {};

    //Caso o usuário logado seja um cliente, esse será o corpo da requisição que será feita
    if (this.getUser.getUserType() == 'Cliente') {
      bodyRequest = {
        requisicao: 'listarTodosPorCliente',
        id_cliente: this.idUsuarioLogado,
      };
    } else {
      //Caso o usuário logado seja um administrador, esse será o corpo da requisição que será feita
      bodyRequest = {
        requisicao: 'listar',
      };
    }

    //A requisição em si
    return new Promise((res) => {
      this.apiService
        .apiPHP('controller-descartes.php', bodyRequest)
        .subscribe((data) => {
          //caso o usuário/admin tenha descartes cadastrados
          if (data['success'] == true) {
            data['result'].map((descarte) => {
              this.descartes.push(descarte[0]);
            });

            //Calculando o número de descartes abertos
            this.numDescartesAbertos = this.descartes.filter(
              (descarte) => descarte.status !== 'Finalizado' && descarte.status !== 'Cancelado'
            ).length;

            //Calculando o número de chamados finalizados
            this.numDescartesFinalizados = this.descartes.filter(
              (descarte) => descarte.status == 'Finalizado'
            ).length;

            //caso o usuário/admin não tenha descartes cadastrados habilitamos o card de nenhum descarte
          } else if (data['result'] == '0') {
            this.cardNenhumDescarte = true;
          } else {
            console.log('Ocorreu um erro.');
          }
        });
    });
  }
  refreshDescartes(){
    this.descartes = [];
    //Não precisamos verificar o tipo do usuário logado, pois o próprio método já faz isso
    this.buscarTodosOsDescartes();
  }
  

  //Action Sheet
  async presentActionSheet(descarte) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer com esse descarte?',
      buttons: [
        {
          text: 'Informações do descarte',
          handler: () => {
            //Navega para a rota de informações do descarte passando as informações como parâmetro

            //verificando se o descarte possui ou não uma imagem anexada, precisamos fazer isso pois o caminho para a rota irá bugar caso o descarte não possua uma imagem anexada

            let descarteFotoString;

            if (descarte.foto_hardware == '') {
              descarteFotoString = 'null';
            } else {
              descarteFotoString = descarte.foto_hardware;
            }

            this.navigateInfoDescarte(
              descarte.id_descarte,
              descarte.protocolo,
              descarte.nome_hardware,
              descarte.descricao,
              descarte.data_abertura,
              descarte.data_retirada,
              descarte.prazo,
              descarte.status,
              descarteFotoString,
              descarte.id_cliente
            );
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

  //Função responsável por navegar para a rota de informações do descarte específivo
  navigateInfoDescarte(
    id: any,
    protocolo: string,
    nome: string,
    descri: string,
    dataAbertura: string,
    dataRetirada: string,
    prazo: string,
    status: string,
    foto: string,
    idCliente: any
  ) {
    this.router.navigate([
      '/info-descarte/' +
        id +
        '/' +
        protocolo +
        '/' +
        nome +
        '/' +
        descri +
        '/' +
        dataAbertura +
        '/' +
        dataRetirada +
        '/' +
        prazo +
        '/' +
        status +
        '/' +
        foto +
        '/' +
        idCliente,
    ]);
  }
}
