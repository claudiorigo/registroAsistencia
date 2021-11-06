import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { BaseDatoStorageService } from 'src/app/services/base-dato-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  nombre: any;
  email: any;
  private _storage: Storage | null = null;
  constructor(
    public baseDatoStorage: BaseDatoStorageService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage) {

    //this.recibirInfo()
    
    this.baseDatoStorage.cargarUsuarioStorage();

    this.activatedRoute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation().extras.state) {
        this.nombre = this.router.getCurrentNavigation().extras.state.nombre;
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this._storage.set('nombre', this.nombre);
        this._storage.set('email', this.email);
        this.init();     
      }
    });
    

    this.init();
    

  }



  async init(){
    const storage = await this.storage.create();
    this._storage = storage;

    this.nombre = (await this.storage.get("nombre") || '');
    this.email = (await this.storage.get("email") || '');

  }

  


  enviarCorreo(){
    this.baseDatoStorage.cargarUsuarioStorage();
  }

  abrirRegistro( registro ){
    
    this.baseDatoStorage.abrirRegistro( registro );
  }

}
