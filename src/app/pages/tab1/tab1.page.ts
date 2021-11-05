import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BaseDatoStorageService } from 'src/app/services/base-dato-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private baseDatoStorage: BaseDatoStorageService ) {}

  scan(){
    console.log("Click a Scan");

    this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);

        if( !barcodeData.cancelled ){
          this.baseDatoStorage.guardarRegistro( barcodeData.format, barcodeData.text );
        }

      }).catch(err => {
          //console.log('Error', err);
          //this.baseDatoStorage.guardarRegistro( 'QRCode', 'https://claudiorigollet.cl/developer.html' );

          //this.baseDatoStorage.guardarRegistro( 'QRCode', 'user [ { "id": 1, "nombre": "Claudio Rigollet", "email": "claudiorigo@gmail.com", "telefono": "+569 5422 5035", "password": "123456", "horario": "Vespertino", "sede": "Viña del Mar", "seccion": "V002" } ]' );

          //this.baseDatoStorage.guardarRegistro( 'QRCode', 'user {"id":1,"nombre":"Claudio Rigollet","email":"claudiorigo@gmail.com","password":"rigollet123","horario":"Vespertino","sede":"Viña del Mar","telefono":"+569 5422 5035","seccion":"V002"}' );

          //this.baseDatoStorage.guardarRegistro( 'QRCode', 'user{"id": 1,"nombre": "Claudio Rigollet","email": "claudiorigo@gmail.com","password": "rigollet123","horario": "Vespertino","sede": "Viña del Mar","telefono": "+569 5422 5035","seccion": "V002"}');

          //this.baseDatoStorage.guardarRegistro( 'QRCode', 'user{id: 1 , nombre: "Claudio Rigollet",email: "claudiorigo@gmail.com",password: "rigollet123",horario: "Vespertino",sede: "Viña del Mar",telefono: "+569 5422 5035",seccion: "V002"}');
          this.baseDatoStorage.guardarRegistro( 'QRCode', 'user{id: 2 , nombre: "Test1",email: "test1@gmail.com",password: "123456",horario: "Vespertino",sede: "Viña del Mar",telefono: "+569 8511 4496",seccion: "V003"}');

      });

  }

  enviarCorreo(){
    console.log("Enviar Correo....")
  }

}
