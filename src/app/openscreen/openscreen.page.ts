import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-openscreen',
  templateUrl: './openscreen.page.html',
  styleUrls: ['./openscreen.page.scss'],
})
export class OpenscreenPage implements OnInit {

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
  }

  navigateLogin(){
    this.router.navigate(['/login']);
  }
  navigateCadastro(){
    this.router.navigate(['/cadastro-cliente']);
  }
  navigateAdmin(){
    this.router.navigate(['/adminlogin']);
  }

  ngAfterViewInit() {
    this.animateLogo();
  }

  public animateLogo() {
    const animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('.img-logo'))
      .easing("ease-in-out")
      .duration(1000)
      .direction("alternate")
      .iterations(Infinity)
      .keyframes([
      { offset: 0, transform: "scale(1)", opacity: "1" },
      { offset: 1, transform: "scale(1.2  )", opacity: "0.9" }
  ]);

    animation.play()
  }

}
