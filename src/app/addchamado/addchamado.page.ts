import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api/api-service';
import formatISO9075 from 'date-fns/formatISO9075';
import addHours from 'date-fns/addHours';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-addchamado',
  templateUrl: './addchamado.page.html',
  styleUrls: ['./addchamado.page.scss'],
})
export class AddchamadoPage {
  formGroup: FormGroup;
  isSubmitted: boolean = false;
  foto_erro_chamado: string = '';

  id_cliente: number;
  data_limite: string;
  status: string;
  local_atend: string;
  filePath: string;


  constructor(public formBuilder: FormBuilder, private apiService: ApiService, private toastController: ToastController, private router: Router, private getUser: GetUserTypeService) {
    this.formGroup = formBuilder.group({
      avatar: [
        ""
      ],
      tituloChamado: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.required
        ])
      ],
      descriChamado: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
      tipoAtendimento: [
        "",
        Validators.compose([
          Validators.required,
        ])
      ],
      estadoEqui : [
        "",
        Validators.compose([
          Validators.required,
        ])
      ],
      img: [null]
    });
  }

  ionViewWillEnter(){

    //verificamos primeiro se o usuário está logado
    if(this.getUser.getUserInfo() == null){
      this.router.navigate(['/openscreen']);
    }

    //verificamos agora o tipo de usuário logado
    if(this.getUser.getUserType() == 'Cliente'){
      let currentUser = this.getUser.getUserInfo();
      this.id_cliente = currentUser.id_cliente;      
    }else{
      //Se o usuário logado for um administrador, bloqueamos o acesso e redirecionamos à primeira página
      this.router.navigate(['/tabs/tab1']);
    }

  }


  get errorControl() {
    return this.formGroup.controls;
  }

  onFileSelect(event) {
    //setando a imagem no formulário para visualização
    this.imagePreview(event);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('avatar').setValue(file);
    }
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.formGroup.patchValue({
      img: file,
    });

    this.formGroup.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {

    console.log('teste');
    console.log(this.formGroup.value);

    this.isSubmitted = true;

    if(!this.formGroup.valid){
      console.log('Por favor preencha todos os campos');
      return false;
    }
    //verificando se o usuário selecionou uma imagem, caso ele tenha selecionado...
    if (this.formGroup.get('avatar').value != '') {
      const formData = new FormData();
      formData.append('avatar', this.formGroup.get('avatar').value);

      this.apiService.uploadFile(formData).subscribe(
        (res) => {
          this.foto_erro_chamado = res.nomeArquivo;

          //verificando o valor do tipo de atendimento
          if(this.formGroup.get('tipoAtendimento').value == 'Presencial'){
            this.status = 'Aguardando visita';

            //atualizando o tempo limite de atendimento
            //adiciona 2 horas a data atual.
            this.data_limite = formatISO9075(addHours(new Date(), 3));
          }
          else if(this.formGroup.get('tipoAtendimento').value == 'Remoto'){
            this.status = 'Aguardando contato';
            //atualizando o tempo limite de atendimento
            //adiciona 2 horas a data atual.
            this.data_limite = formatISO9075(addHours(new Date(), 2));
          }else {
            this.status = 'Aguardando equipamento';
            //atualizando o tempo limite de atendimento
            //adiciona 3 horas a data atual.
            this.data_limite = formatISO9075(addHours(new Date(), 72));
          }
          

          //montando requisição
          let bodyRequest = {
            requisicao: 'add',
            titulo: this.formGroup.value.tituloChamado,
            descricao: this.formGroup.value.descriChamado,
            id_cliente: this.id_cliente,
            data_abertura: formatISO9075(new Date()),
            data_limite: this.data_limite,
            status: this.status,
            local_atend: this.formGroup.value.tipoAtendimento,
            prioridade: this.formGroup.value.estadoEqui,
            foto_erro_chamado: this.foto_erro_chamado,
          };

          console.log(this.status);

          console.log(bodyRequest);

          this.apiService
            .apiPHP('controller-chamados.php', bodyRequest)
            .subscribe((data) => {
              console.log(bodyRequest);

              if (data['success'] === true) {
                console.log('Chamado cadastrado');

                //navega para a pagina dos chamados caso dê tudo certo
                this.navigateToConfirmacaoChamado(
                  this.formGroup.value.tituloChamado,
                  this.formGroup.value.descriChamado,
                  this.formGroup.value.tipoAtendimento,
                  this.data_limite
                );
                //mostra mensagem de sucesso
                this.presentToast('<b>Chamado cadastrado com sucesso</b>', 'success');

              } else {
                console.log('Erro ao cadastrar chamado');

                this.presentToast('<b>Erro ao cadastrar chamado</b>', 'danger');

              }
            });
        },
        (err) => {
          console.log('Erro ao cadastrar a imagem ' + err);
        }
      );
    } else {
      //Caso ele não tenha enviado uma imagem

      //verificando o valor do tipo de atendimento
      if(this.formGroup.get('tipoAtendimento').value == 'Presencial'){
        this.status = 'Aguardando visita';

        //atualizando o tempo limite de atendimento
        //adiciona 2 horas a data atual.
        this.data_limite = formatISO9075(addHours(new Date(), 3));
      }
      else if(this.formGroup.get('tipoAtendimento').value == 'Remoto'){
        this.status = 'Aguardando contato';
        //atualizando o tempo limite de atendimento
        //adiciona 2 horas a data atual.
        this.data_limite = formatISO9075(addHours(new Date(), 2));
      }else {
        this.status = 'Aguardando equipamento';
        //atualizando o tempo limite de atendimento
        //adiciona 3 horas a data atual.
        this.data_limite = formatISO9075(addHours(new Date(), 72));
      }


      let bodyRequest = {
        requisicao: 'add',
        titulo: this.formGroup.value.tituloChamado,
        descricao: this.formGroup.value.descriChamado,
        id_cliente: this.id_cliente,
        data_abertura: formatISO9075(new Date()),
        data_limite: this.data_limite,
        status: this.status,
        local_atend: this.formGroup.value.tipoAtendimento,
        prioridade: this.formGroup.value.estadoEqui,
        foto_erro_chamado: '',
      };

      console.log(bodyRequest);
       //fazendo a requisição para a API com o campo da imagem em branco
       this.apiService.apiPHP('controller-chamados.php', bodyRequest).subscribe((data)=>{
        if(data['success'] === true){
          console.log('Chamado cadastrado');

          
          //mostra mensagem de sucesso
          this.presentToast('<b>Chamado cadastrado com sucesso</b>', 'success');

          //navega para a pagina da confirmação do chamado caso dê tudo certo
          this.navigateToConfirmacaoChamado(
            this.formGroup.value.tituloChamado,
            this.formGroup.value.descriChamado,
            this.formGroup.value.tipoAtendimento,
            this.data_limite
            
          );


        }else{
          console.log('Erro ao cadastrar chamado');

          this.presentToast('<b>Erro ao cadastrar chamado</b>', 'danger');
        }
       })
    }    
  }



  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
      icon: color === 'success' ? 'checkmark-circle' : 'close-circle',
    });

    await toast.present();
  }

  navigateToConfirmacaoChamado(tituloChamado: string, descriChamado:string, tipoAtendimento: string, dataLimite:string) {
    this.router.navigate(['/confirma-chamado/'+tituloChamado+'/'+dataLimite+'/'+descriChamado+'/'+tipoAtendimento]);
  }

}
