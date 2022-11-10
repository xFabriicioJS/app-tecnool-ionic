import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { GetUserTypeService } from '../services/get-user-type.service';
import { ApiService } from '../api/api-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visualizar-chamado',
  templateUrl: './visualizar-chamado.page.html',
  styleUrls: ['./visualizar-chamado.page.scss'],
})
export class VisualizarChamadoPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

    formGroup: FormGroup;
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
    nome_cliente: string = '';
    foto_cliente: string = '';
    tipoUsuarioLogado: string = '';
    histAtendimento: any = [];
    id_usuario: number;

  constructor(
    private actRoute:ActivatedRoute,
    private alertController: AlertController,
    private getUser: GetUserTypeService,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    public toastService: ToastController,
    private router: Router
  ) { 
    this.formGroup = formBuilder.group({
      statusChamado:[
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      histAtendimento:[
        '',
        Validators.compose([
          Validators.required
        ])
      ],           
    });
  }

  ngOnInit() {
    this.actRoute.params.subscribe((data:any) => {

      //convertendo a data para o formato brasileiro
      const dataAserConvertida = moment(data.dataAbertura).format('DD/MM/YYYY HH:mm:ss');

      const dataLimiteAserConvertida = moment(data.dataLimite).locale('pt-BR').format('LL');

      if(data.dataFinalizacao != 'null'){
      this.dataFinalizacao = moment(data.dataFinalizacao).format('DD/MM/YYYY HH:mm:ss');
      }


      let caminhoImg;
      //Verificando se veio uma imagem
      if(data.foto_erro_chamado == 'null'){
        caminhoImg = null;
      }else{
        caminhoImg = environment.FILE_IMG_PATH + '/' + data.foto_erro_chamado;
      }

      //Pegando a imagem do perfil do cliente
      if(data.foto_cliente == 'null'){
        this.foto_cliente = 'https://www.w3schools.com/howto/img_avatar.png'
      }else{
        this.foto_cliente = environment.FILE_IMG_PATH + '/' + data.foto_cliente;
      }

      this.id_chamado = data.id_chamado;
      this.tituloChamado = data.tituloChamado;
      this.descriChamado = data.descriChamado;
      this.dataAbertura = dataAserConvertida;
      this.dataLimite = dataLimiteAserConvertida;
      this.dataFinalizacao = moment(data.dataFinalizacao).locale('PT-BR').format('DD/MM/YYYY HH:mm:ss');
      this.statusChamado = data.statusChamado;
      this.foto_erro_chamado = caminhoImg;
      this.localAtend = data.localAtend;
      this.protocoloChamado = data.protocoloChamado;
      this.nome_cliente = data.nome_cliente;
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
            this.cancelarChamado();
          },
        },
      ],
    });

    await alert.present();
  }

  //Método responsável por preencher a lista de histórico de atendimentos
  requestHistorico(){
   
    
    //Objeto que será enviado para a API
    let bodyRequest = {
      "requisicao": "requestAllHistoricos",
      "id_chamado": this.id_chamado
    }
  
    console.log(this.id_chamado);

    //Fazendo a requisição para a API
    return new Promise((res) => {
      this.apiService.apiPHP('controller-chamados.php', bodyRequest).subscribe((data: any) =>{
        if(data['success'] == true){
          data['result'].map((hist) => {
            this.histAtendimento.push(hist[0]);
          })

          console.log(this.histAtendimento);
        }
      })
    })
  }

  //Manipulando o modal	
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onSubmit() {

    
    //Criando o objeto que será enviado para a API, o objeto será diferente de acordo com o status do chamado
    let bodyRequest: any;
    if(this.formGroup.value.statusChamado === 'Finalizado'){
      console.log('teste');
      bodyRequest = {
        requisicao: "updateStatus",
        id_chamado: this.id_chamado,
        id_usuario: this.id_usuario,
        status: this.formGroup.value.statusChamado,
        comentario_hist: this.formGroup.value.histAtendimento,
        data_hist: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        data_finalizacao: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
    }else{
      console.log('teste');
      bodyRequest = {
        requisicao: "updateStatus",
        id_chamado: this.id_chamado,
        id_usuario: this.id_usuario,
        status: this.formGroup.value.statusChamado,
        comentario_hist: this.formGroup.value.histAtendimento,
        data_hist: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        data_finalizacao: ""
    }
  }

  console.log(bodyRequest);
    //Passando o objeto para a API e chamando-a
    return new Promise((res) => {
      this.apiService.apiPHP('controller-chamados.php', bodyRequest).subscribe((data: any) =>{
        if(data['success'] == true){
          this.requestHistorico();
          this.modal.dismiss(null, 'confirm');
        }else{
          this.modal.dismiss(null, 'cancel');
        }
      });
    });

  }

  //Pegando informações do usuário logado para fazer uma renderização condicional
  ionViewWillEnter(){
    this.tipoUsuarioLogado = this.getUser.getUserType();
    this.requestHistorico();

    if(this.tipoUsuarioLogado == 'Usuario'){
      let user = this.getUser.getUserInfo();
      this.id_usuario = user.id_usuario;
      
    }

  }

  cancelarChamado(){

    //corpo da requisição para ser mandado para a API
    let bodyRequest = {
      requisicao: "cancelar",
      id_chamado: this.id_chamado
    }

    return new Promise((res) => {
      this.apiService.apiPHP('controller-chamados.php', bodyRequest).subscribe((data: any) =>{
        if(data['success'] == true){
          this.presentToast('Chamado cancelado com sucesso!', 'success');
          this.router.navigate(['/tabs/tab1']);
        }else{
          this.presentToast('Erro ao cancelar o chamado!', 'danger');
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
