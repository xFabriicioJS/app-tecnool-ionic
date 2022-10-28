// <!-- Página responsável por renderizar informações de um único cliente, dessa vez não iremos pegar as informações pela actRoute, e sim, por uma requisição a nossa API -->


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-info-clientes',
  templateUrl: './info-clientes.page.html',
  styleUrls: ['./info-clientes.page.scss'],
})
export class InfoClientesPage implements OnInit {

  private fotoCliente: string = '';
  private nomeCliente: string = '';

  // Iremos fazer uma renderização condicional com base no valor desse atributo
  private tipoCliente: string = '';
  private emailCliente: string = '';
  private cpfCliente: string = '';
  private telefoneCliente: string = '';
  private logradouroCliente: string = '';
  private numeroCliente: string = '';
  private complementoCliente: string = '';
  private idCliente: number = 0;




  constructor(
    private apiService: ApiService,
    private router: Router,
    private actRouter: ActivatedRoute

  ) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data: any)=>{
      this.idCliente = data.idCliente;
    });
  
  }



  ionViewWillEnter(){
    //Vamos fazer uma requisição para pegar os dados do cliente

    

  }

  //Método responsável por fazer a requisição para nossa API
  requestInfoCliente(){

    //Objeto que será enviado para a API, o corpo da requisição
    let bodyRequest = {
      requisicao: ''
    }

    return new Promise(res => {
      // this.apiService.apiPHP()
    })
  }

}
