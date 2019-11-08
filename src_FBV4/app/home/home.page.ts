import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseDBService, Objeto } from '../services/firebase-db.service';
import { BLE } from '@ionic-native/ble/ngx';

interface pairedList  {
    class: number,
    id: string,
    address: string,
    name: string,

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  
  listaObjetos: any;

  // Bluetooth
  pairedList: pairedList;
  listToogle: boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";



  constructor(public DBFirebase: FirebaseDBService,
              private Bluetooth: BLE,
             ) {}

  // Firebase

  ionViewWillEnter(){
    this.DBFirebase.getObjeto().subscribe(listaObjetos =>{this.listaObjetos = listaObjetos;});
  }
  addCliente(){

    let Objetonuevo: Objeto = {
      name : "Antonio",
    }
    alert(Objetonuevo.name);
    this.DBFirebase.guardarObjeto(Objetonuevo).then ( res =>{
      alert(Objetonuevo.name+ " guardado en FB");
    });
  }
  // Bluetooth

  checkBluetoothEnable(){
    this.Bluetooth.isEnabled().then(success => {
      this.listPairedDevices();
    })
  }

  listPairedDevices(){
    this.Bluetooth.list().then(success => {
      this.pairedList = success;
      this.listToogle = true;
    }, error => {
      this.listToogle = false;
    });
  }
  selectDevice(){
    let connectedDevice = this.pairedList[this.pairedDeviceID];
    if(!connectedDevice.address){
      alert("Select Paired Device to connect");
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;

    this.connect(address);
  }

  connect(address){
    this.Bluetooth.connect(address).subscribe(success => {
      this.deviceConnected();
      alert("Conectado");
    }, error => {
      alert("Fallo al conectar");
    })
  }

  deviceConnected(){
    this.Bluetooth.subscribe("\n").subscribe(success => {
      this.handleData(success);
      alert("Conectado bien");
    }, error => {
      alert("Error");
    })
  }

  deviceDisconnected(){
    this.Bluetooth.disconnect();
    alert("Device disconected");
  }

  handleData(data){
    alert(data);
  }

  sendData() {
    this.dataSend += '\n';
    alert(this.dataSend);

    this.Bluetooth.write(this.dataSend).then(success => {
     alert(success);
    }, error => {
     alert(error);
    });
  }

  
}
