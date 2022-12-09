import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Clientes, Documentos } from '../../../models/globlaIsclass';
import { FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../../../services/document.service';
import { ClientService } from '../../../services/client.service';
declare var jQuery: any;
declare var $: any;
import swal from 'sweetalert';

const ELEMENT_DATA: Clientes[] = [];

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})

export class FacturacionComponent implements OnInit {
  displayedColumns: string[] = [ 'identificacion', 'nombre', 'tipo','seleccione'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  checked = false;
  selection = new SelectionModel<Clientes>(true, []);
  public ClienteNew: Clientes = new Clientes(false, 0, "", '', '', '', '');
  public ClientesAll: Clientes[] = [];
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  public documents: Documentos[];
  selectRow: any;
  NoselectRow: any;
  disabledchk = false;
  public loading = false;

  constructor(public _bsModalRef: BsModalRef
    , private _modalS: BsModalService
    , private _docS: DocumentService
    , private _cliS: ClientService) { }

  ngOnInit(): void {

  }

  openModal(template: TemplateRef<any>, value) {

    this.Disablechk(false);

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
      this.ClienteNew.nombre = "";
      this.ClienteNew.tipo = "";
      this.ClienteNew.identificacion = "";

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

  saveCli(event) {
    this.loading = true;
    // console.log(this.ClienteNew);
    // console.log(event);
    this._cliS.saveCli(this.ClienteNew).subscribe(
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Clientes): string {
    if (!row) {

      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }


    if (this.selection.isSelected(row)) {

      this.selectRow = row;
    }



    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

  GetAllCli() {
    this.loading = true;
    this._cliS.getCli().subscribe(
      response => {
        //console.log(response);
        this.ClientesAll = response;
        // console.log(this.ClientesAll);
        this.dataSource = new MatTableDataSource(this.ClientesAll);
      },
      error => {
        console.log(error);
      }
    );
    this.loading = false;
  }
  
  editCli(template: TemplateRef<any>, cli) {
    this.loading = true;
    console.log('Here!!!');
    //console.log(this.selectRow.nombre);
    console.log(cli);
    this.openModal(template, 2);
    this.ClienteNew.id = cli.id;
    this.ClienteNew.nombre = cli.nombre;
    this.ClienteNew.tipo = cli.tipo;
    this.ClienteNew.identificacion = cli.identificacion;
    //this.Disablechk(true);
    this.loading = false;
  }

  enviarCli(template: TemplateRef<any>, cli) {
    this.loading = true;

    $('#cliSend').val(cli.nombre.trim() + ' (' + cli.identificacion.trim() + ')');
    this.closeModal(1);

    this.loading = false;    
  }

  selectCli() {
    this.loading = true;
    if (this.selectRow == undefined) {
      swal("Error!", "Debe seleccionar un cliente!", "error");
    } else {
      $('#cliSend').val(this.selectRow.nombre.trim() + ' (' + this.selectRow.identificacion.trim() + ')')
      //console.log(this.selectRow); row.nombre.trim() + ' (' + row.identificacion.trim() + ')'
      this.closeModal(1);
    }
    this.loading = false;
  }

  updateCheckedList(event, cli) {

    if (event.checked == true) {

      if (this.checked == true) {
        
        swal("Error!", "Debe seleccionar un cliente!", "error");
        return event.checked = false;
      }
      else{
       
        this.checked = true;
        this.disabledchk = true;
        this.selectRow = cli;
      }
     
    }
    else {
      this.checked = false;
    }

  }

  Disablechk(value) {
    this.disabledchk = value;
  }

}
