import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: Usuarios[] = [];

  constructor(
    ) { }



  ngOnInit() {

  }





}
