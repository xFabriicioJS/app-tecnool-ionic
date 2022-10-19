import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-openscreen',
  templateUrl: './openscreen.page.html',
  styleUrls: ['./openscreen.page.scss'],
})
export class OpenscreenPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateLogin(){
    this.router.navigate(['/login']);
  }
  navigateCadastro(){
    this.router.navigate(['/cadastro']);
  }
  navigateAdmin(){
    this.router.navigate(['/adminlogin']);
  }

}
