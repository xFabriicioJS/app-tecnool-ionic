import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController  } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { LoadingService } from '../loading.service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  chamados: any = [];
  cardNenhumChamado: boolean = false;
  tipoPesquisa: string = '';
  valorTitulo: string = '';
  valorDescricao: string = '';
  valorProtocolo: string = '';
  termoPesquisado: string = '';
  tipoUsuarioLogado: string = '';
  idCurrentUser: number = 0;
  numChamadosAbertos: number = 0;
  numChamadosFinalizados: number = 0;


  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private apiService: ApiService,
    private alertController: AlertController,
    private getUser: GetUserTypeService,
    private loadingCtrl: LoadingController,
    private loading: LoadingService
  ) {}

  ngOnInit() {
  

  }


  ionViewWillEnter() {
    this.chamados = [];
    console.log('teste');
    //verificamos primeiro se o usuário está logado
    if (this.getUser.getUserInfo() == null) {
      this.router.navigate(['/openscreen']);
    }

    //verificamos agora o tipo de usuário logado
    if (this.getUser.getUserType() == 'Cliente') {
      this.tipoUsuarioLogado = 'Cliente';
      let currentUser = this.getUser.getUserInfo();
      this.idCurrentUser = currentUser.id_cliente;
      this.loading.present();
      this.buscarChamadosPorCliente();
      setTimeout(()=>this.loading.dismiss(), 2500);

    } else {
      this.tipoUsuarioLogado = 'Usuario';
      let currentUser = this.getUser.getUserInfo();
      this.idCurrentUser = currentUser.id_usuario;
      this.loading.present();
      this.carregar();      
      setTimeout(()=>this.loading.dismiss(), 2500);
    }

  }

  

  async presentActionSheet(chamado) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer com esse chamado?',
      buttons: [
        {
          text: 'Cancelar chamado',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Informações do chamado',
          handler: () => {
            //Verificamos primeiro, se o chamado em questão possui uma foto, caso não possua, passaremo o valor null para a variável, evitando assim que o app quebre

            let fotoChamado;
            if (chamado.foto_erro == '') {
              fotoChamado = 'null';
            } else {
              fotoChamado = chamado.foto_erro;
            }

            this.navigateInformacoesChamado(
              chamado.id_chamado,
              chamado.titulo,
              chamado.descricao,
              chamado.data_abertura,
              chamado.data_limite,
              chamado.data_finalizacao,
              chamado.status,
              fotoChamado,
              chamado.local_atend,
              chamado.protocolo
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

  buscarChamadosAbertos() {}

  buscarTodosOsChamados() {
    let bodyRequest = {
      requisicao: 'listar',
      titulo: '',
      descricao: '',
      protocolo: '',
    };

    return new Promise((res) => {
      this.apiService
        .apiPHP('controller-chamados.php', bodyRequest)
        .subscribe((data) => {
          if (data['success'] == true) {
            data['result'].map((chamado) => {
              this.chamados.push(chamado[0]);
            });
          } else if (data['result'] == '0') {
            this.cardNenhumChamado = true;
          }
        });
    });
  }

  buscarChamadosFinalizados() {
    //fazendo um filter nos chamados para filtrar somente os chamados finalizados

    let chamadosFinalizados = this.chamados.filter((chamado) => {
      return chamado.status == 'Finalizado';
    });

    this.chamados = chamadosFinalizados;
  }

  buscarChamadosPorCliente() {
    let bodyRequest = {
      requisicao: 'listarTodosPorCliente',
      protocolo: '',
      descricao: '',
      titulo: '',
      id_cliente: this.idCurrentUser,
    };

    console.log(bodyRequest);

    return new Promise((res) => {
      this.apiService
        .apiPHP('controller-chamados.php', bodyRequest)
        .subscribe((data) => {
          if (data['success'] == true) {
            data['result'].map((chamado) => {
              this.chamados.push(chamado[0]);

              //Calculando o número de chamados abertos
              this.numChamadosAbertos = this.chamados.filter(
                (chamado) => chamado.status !== 'Finalizado'
              ).length;

              //Calculando o número de chamados finalizados
              this.numChamadosFinalizados = this.chamados.filter(
                (chamado) => chamado.status == 'Finalizado'
              ).length;
            });
          } else if (data['success'] == false) {
            this.cardNenhumChamado = true;
          } else {
            console.log('erro');
          }
        });
    });
  }

  navigateAddChamado() {
    this.router.navigate(['/addchamado']);
  }

  navigateInformacoesChamado(
    id,
    titulo,
    descricao,
    dataAbertura,
    dataLimite,
    dataFinalizacao,
    statusChamado,
    fotoErroChamado,
    localAtend,
    protocoloChamado
  ) {
    this.router.navigate([
      '/visualizar-chamado/' +
        id +
        '/' +
        titulo +
        '/' +
        descricao +
        '/' +
        dataAbertura +
        '/' +
        dataLimite +
        '/' +
        dataFinalizacao +
        '/' +
        statusChamado +
        '/' +
        fotoErroChamado +
        '/' +
        localAtend +
        '/' +
        protocoloChamado,
    ]);
  }

  refreshChamados() {
    this.chamados = [];
    if (this.tipoUsuarioLogado == 'Usuario') {
      this.carregar();
    } else {
      this.buscarChamadosPorCliente();
    }
  }

  //método responsável por fazer a pesquisas no caso do usuário ser funcionário
  carregar() {
    return new Promise((res) => {
      this.chamados = [];
      switch (this.tipoPesquisa) {
        case 'titulo':
          this.buscarChamadosPorTitulo();
          break;
        case 'descricao':
          this.buscarChamadosPorDescricao();
          break;
        case 'protocolo':
          this.buscarChamadosPorProtocolo();
          break;
        case '': {
          this.buscarChamadosPorTitulo();
          break;
        }
        default:
          this.buscarTodosOsChamados();
          break;
      }
    });
  }

  buscarChamadosPorTitulo() {
    this.chamados = [];

    let bodyRequest;
    if (this.tipoUsuarioLogado == 'Usuario') {
      bodyRequest = {
        requisicao: 'listar',
        titulo: this.termoPesquisado,
        descricao: '',
        protocolo: '',
      };
    } else {
      bodyRequest = {
        requisicao: 'listarTodosPorCliente',
        titulo: this.termoPesquisado,
        descricao: '',
        protocolo: '',
        id_cliente: this.idCurrentUser,
      };
    }
    return new Promise((res) => {
      this.apiService
        .apiPHP('controller-chamados.php', bodyRequest)
        .subscribe((data) => {
          if (data['success'] == true) {
            data['result'].map((chamado) => {
              this.chamados.push(chamado[0]);
            });
          }
        });
    });
  }

  buscarChamadosPorDescricao() {
    let bodyRequest;

    if (this.tipoUsuarioLogado == 'Usuario') {
      bodyRequest = {
        requisicao: 'listar',
        titulo: '',
        descricao: this.termoPesquisado,
        protocolo: '',
      };
    } else {
      bodyRequest = {
        requisicao: 'listarTodosPorCliente',
        titulo: '',
        descricao: this.termoPesquisado,
        protocolo: '',
        id_cliente: this.idCurrentUser,
      };
    }

    return new Promise((res) => {
      this.apiService
        .apiPHP('controller-chamados.php', bodyRequest)
        .subscribe((data) => {
          if (data['success'] == true) {
            data['result'].map((chamado) => {
              this.chamados.push(chamado[0]);
            });
          }
        });
    });
  }

  buscarChamadosPorProtocolo() {
    let bodyRequest;

    if (this.tipoUsuarioLogado == 'Usuario') {
      bodyRequest = {
        requisicao: 'listar',
        titulo: '',
        descricao: '',
        protocolo: this.termoPesquisado,
      };
    } else {
      bodyRequest = {
        requisicao: 'listarTodosPorCliente',
        titulo: '',
        descricao: '',
        protocolo: this.termoPesquisado,
        id_cliente: this.idCurrentUser,
      };
    }

    return new Promise((res) => {
      this.apiService
        .apiPHP('controller-chamados.php', bodyRequest)
        .subscribe((data) => {
          if (data['success'] == true) {
            data['result'].map((chamado) => {
              this.chamados.push(chamado[0]);
            });
          }
        });
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Insira por favor o seu tipo de pesquisa.',
      buttons: ['OK'],
      inputs: [
        {
          label: 'Pesquisar por título',
          type: 'radio',
          value: 'titulo',
          handler: () => {
            this.tipoPesquisa = 'titulo';
          },
        },
        {
          label: 'Pesquisar por protocolo',
          type: 'radio',
          value: 'protocolo',
          handler: () => {
            this.tipoPesquisa = 'protocolo';
          },
        },
        {
          label: 'Pesquiar por descrição',
          type: 'radio',
          value: 'descricao',
          handler: () => {
            this.tipoPesquisa = 'descricao';
          },
        },
      ],
    });

    await alert.present();
  }
}
