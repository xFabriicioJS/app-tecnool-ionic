import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sabermais-descarte',
  template: `
      <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button>
            <ion-menu-button>
            </ion-menu-button>
            <ion-back-button (click)="navigateInicio()">Voltar</ion-back-button>
          </ion-button>
        </ion-buttons>
        <ion-title>Descarte solidário</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding" scroll-y="false">
      <ion-slides pager="true" [options]="slideOpts">
        <ion-slide>
        <div class="slide">   
        <ion-img src="../../assets/images/descarte1.jpg"></ion-img>
        
        <h2>
        <b>
        Descarte solidário
        </b>
        </h2>
      
        <p>
          O <b>descarte solidário</b> é uma ação da <b>Tecnool</b> para promover a reciclagem de equipamentos eletrônicos e eletrônicos de consumo (EEE) e de pilhas e baterias de maneira não-prejudicial ao meio-ambiente.
        </p>
      </div>
        </ion-slide>
        <ion-slide>
        <div class="slide">   
        <ion-img style="width: 300px; height: 300px; border-radius: 10%;" src="../../assets/images/descarte2.jpg"></ion-img>
        
        <h2>Como funciona</h2>
      
        <p>
        O <b>objetivo</b> desta ação é, além de ajudar o meio ambiente, possa gerar recursos financeiros, que em seguida, serão doados a uma entidade social.
        </p>
        <p>
        O ponto de descarte no próprio prédio da Tecnool, na Avenida Itaquera, e deverá ser feito o agendemento, que deverá ser feito pelo telefone (11) 2091-1000, pelo site, ou por esse aplicativo.
        </p>
      </div>
      </ion-slide>
      <ion-slide>
      <div class="slide">   
        <ion-img style="width: 300px; height: 300px; border-radius: 10%;" src="../../assets/images/descarte3.png"></ion-img>
        <h2>Venha fazer parte!</h2>
        <p>
        Caso você tenha interesse, já comece a juntar todo o seu material e ajude o crescimento sustentável na nossa cidade. Esperamos ansiosos por você.
        </p>

        <ion-button expand="block" color="success" (click)="navigateAddDescarte()">Quero abrir uma solicitação</ion-button>

        <ion-button expand="block" color="primary" (click)="navigateInicio()">Voltar</ion-button>
        
        
      </div>
      </ion-slide>
      </ion-slides>
    </ion-content>
  `,
  styleUrls: ['./sabermais-descarte.page.scss'],
})
export class SabermaisDescartePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  navigateAddDescarte(){
    this.router.navigate(['/adddescarte']);
  }

  navigateInicio(){
    this.router.navigate(['/tabs/tab2']);
  }

}
