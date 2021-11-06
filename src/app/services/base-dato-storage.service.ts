import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Storage } from '@ionic/storage';
import { Asitencias, Usuarios } from '../interfaces/interfaces';
import { Registro } from '../models/registro.model';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class BaseDatoStorageService {

  usuario: Usuarios[] = [];
  asistencias: Asitencias[] = [];
  nombre: string = '';
  email: string = '';

  guardados: Registro[] = [];
  private _storage: Storage | null = null;
  private valido = false;


  constructor(
    private usuarioService: UsuarioService,
    private storage: Storage,
    private navController: NavController,
    private iab: InAppBrowser,
    private alertService: AlertService) {

    this.cargarUsuarioStorage();
    this.cargarStorage();

  }

  async cargarUsuarioStorage(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.guardarUsuariosStorage();
    this.usuario = (await this.storage.get("users")) || [];

  }

  mostrarUsuariosGet(){
    this.usuarioService.getUsers().subscribe( respuesta => {

      console.log(respuesta)

    });
  }

  guardarUsuariosStorage(){
    this.usuarioService.getUsers().subscribe( async respuesta => {
      this.usuario = respuesta;
      await this._storage.set('users', this.usuario)


    });
  }



  async cargarStorage(){

    const storage =  await this.storage.create();
    this._storage = storage;

    this.guardados = (await this.storage.get('registros')) || [];
    this.nombre = (await this.storage.get("nomnre") || '');
    this.email = (await this.storage.get("email") || '');
  }

  async guardarRegistro( format: string, text: string ){

    await this.cargarStorage();
    const nuevoRegistro = new Registro( format, text );
    

    this.guardados.unshift( nuevoRegistro );
    this._storage.set('registros', this.guardados);

    this.abrirRegistro( nuevoRegistro );
    this.registroAsistencia();
  }


  abrirRegistro(registro : Registro){
    this.navController.navigateForward('/menu/tabs/tab2');
    switch ( registro.type ){

      case 'http':
        this.iab.create( registro.text, '_system');
      break;

      case 'user':
        this.navController.navigateForward( `/menu/tabs/${registro.created.getMilliseconds()}`);
      break;

    }
  }


  async registroAsistencia(){

    const arrTemp = [];
    this.guardados.forEach(element => {
      if (element.type == 'user') {
        arrTemp.unshift(  element.text.substr( 4 ) );
      }

      this._storage.set('asistencia',arrTemp[0])

    });

    this.asistencias = (await this.storage.get("asistencia")) || arrTemp[0];


    let idAsistencia =  Number(this.asistencias.slice(5,7));
    for(let i of this.usuario){

      if (idAsistencia === i.id) {
        console.log(idAsistencia,i.id);
        this.valido = true;
        this.alertService.presentToast("Asistencia Registrada");
      }


    }


  }



}





