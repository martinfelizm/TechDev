import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Clientes, Usuarios, Documentos } from '../../../../models/globlaIsclass';
import { FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../../../../services/document.service';
import { ClientService } from '../../../../services/client.service';
import { DataSource } from '@angular/cdk/table';

declare var jQuery: any;
declare var $: any;
import swal from 'sweetalert';

const ELEMENT_DATA: Usuarios[] = [];

@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})

export class BasicRegComponent implements OnInit {
  displayedColumns: string[] = [ 'identificacion', 'nombre', 'tipo','seleccione'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  checked = false;
  selection = new SelectionModel<Usuarios>(true, []);
  public UsuarioNew: Usuarios = new Usuarios(0, "", "", 0, "", "", "","");
  public UsuariosAll: Usuarios[] = [];
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  public documents: Documentos[];
  public loading = false;
  constructor(public _bsModalRef: BsModalRef
    , private _modalS: BsModalService
    , private _docS: DocumentService
    , private _cliS: ClientService) { }

  ngOnInit() {
   // document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  closeModal(value) {
    // console.log(value);
    if (value == 1) {
      this.modalRef.hide();
    } else {
      this.modalRef2.hide();
    }

  }

  saveUser(event) {
    this.loading = true;
    // console.log(this.ClienteNew);
    // console.log(event);
    this._cliS.saveCli(this.UsuarioNew).subscribe(
      response => {
        // console.log(response);
        this.closeModal(2);
        this.GetAllCli()
        this.loading = false;
        swal("Guardado exitosamente!", "Puede verificarlo el la vista de los clientes!", "success");
      },
      error => {
        console.log(error);
      }
    )
  }

  openModal(template: TemplateRef<any>, value) {

    //this.Disablechk(false);

    this.loading = true;
    //No cierra el modal dando click fuera
    let ngxModalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true
    };

    //Abriendo modal
    if (value == 1) {
      this.GetAllCli();
      this.modalRef = new BsModalRef;
      this.modalRef = this._modalS.show(template, ngxModalOptions);
    } else {

      this.getDocIdentity();
      // $("#nombre").clear();  
      this.UsuarioNew.full_name = "";
      this.UsuarioNew.type_ident = "";
      this.UsuarioNew.no_ident = 0;

      this.modalRef2 = new BsModalRef;
      this.modalRef2 = this._modalS.show(template, ngxModalOptions);
    }
    // console.log(value);
    this.loading = false;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    // console.log(numSelected === numRows);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  GetAllCli() {
    this.loading = true;
    this._cliS.getCli().subscribe(
      response => {
        //console.log(response);
        this.UsuariosAll = response;
        // console.log(this.ClientesAll);
        this.dataSource = new MatTableDataSource(this.UsuariosAll);
      },
      error => {
        console.log(error);
      }
    );
    this.loading = false;
  }

  getDocIdentity() {
    this.loading = true;
    this._docS.getDocById(1).subscribe(
      response => {
        this.documents = response;
        //   console.log('response');
        //   console.log(this.documents);
      },
      error => {
        console.log(error);
      }
    )
    this.loading = false;
  }
}
