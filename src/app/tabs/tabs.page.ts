import { Component } from '@angular/core';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tipoUsuario: string = '';

  constructor(
    private getUser: GetUserTypeService
  ) {}

  ionViewWillEnter(){
    this.tipoUsuario = this.getUser.getUserType();
  }

}
