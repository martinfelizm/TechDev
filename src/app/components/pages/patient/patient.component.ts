import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Clientes, Documentos, Pacientes } from 'src/app/models/globlaIsclass';
import { ClientService } from 'src/app/services/client.service';
import { DocumentService } from 'src/app/services/document.service';

const ELEMENT_DATA: Clientes[] = [];

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  displayedColumns: string[] = ['identificacion', 'nombre', 'tipo', 'seleccione'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  selection = new SelectionModel<Clientes>(true, []);
  public PacienteNew: Pacientes = new Pacientes(0, "", '', '', '', '', "", '', 0, '', '', 0, '', '', '', '', 0, 0, '');
  public PacienteAll: Pacientes[] = [];
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  public documents: Documentos[];
 
  public loading = false;
  constructor(public _bsModalRef: BsModalRef
    , private _modalS: BsModalService
    , private _docS: DocumentService
    , private _cliS: ClientService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>, value) {

    //this.Disablechk(false);
    
    this.loading = true;
    this.getDocuments(); 
    //No cierra el modal dando click fuera
    let ngxModalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true
    };

    //Abriendo modal
    if (value == 1) {
      // this.GetAllCli();
      this.modalRef = new BsModalRef;
      this.modalRef = this._modalS.show(template, ngxModalOptions);
    } else {

      // this.getDocIdentity();
      // $("#nombre").clear(); 
      
      this.PacienteNew.Nombre = "";
      this.PacienteNew.Tipo = "";
      this.PacienteNew.TipoDocI = '';
      this.PacienteNew.DocI = 0;
      this.modalRef2 = new BsModalRef;
      this.modalRef2 = this._modalS.show(template, ngxModalOptions);
    }
    // console.log(value);
    this.loading = false;

  }

  closeModal(value) {
    // console.log(value);

    if (value == 1) {
      this.modalRef.hide();
    } else {
      this.modalRef2.hide();
    }

  }

  findCli(event) {
    //console.log(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  savePaci(event){
  console.log(this.PacienteNew);
  console.log(event);
  }

   
  editCli(template: TemplateRef<any>, cli) {
    this.loading = true;
    console.log('Here!!!');
    //console.log(this.selectRow.nombre);
    console.log(cli);
    this.openModal(template, 1);
  }

  getDocuments(){
    this._docS.getAllDoc().subscribe(
      response =>{
        console.log(response);
        this.documents = response;
      }
    )
  }

}
