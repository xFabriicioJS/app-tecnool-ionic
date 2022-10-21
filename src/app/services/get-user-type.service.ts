import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserTypeService {

  constructor() { }


  //Método responsável por retornar as informações do usuário logado pelo local storage
  getUserInfo(){
    return JSON.parse(localStorage.getItem('usuario'));

    
  }


  //retorna o tipo do usuário logado
  getUserType(){
    let user = JSON.parse(localStorage.getItem('usuario'));

    return user.tipo_usuario_sistema;
  }

}
