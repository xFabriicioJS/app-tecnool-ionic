import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirma-chamado',
  templateUrl: './confirma-chamado.page.html',
  styleUrls: ['./confirma-chamado.page.scss'],
})
export class ConfirmaChamadoPage implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  navigateInicio(){
    this.router.navigate(['/tabs/tab1']);
  }

}
