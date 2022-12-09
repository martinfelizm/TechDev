import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserRegDataSource, UserRegItem } from './user-reg-datasource';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Clientes, Usuarios, Documentos } from '../../../models/globlaIsclass';
import { FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../../../services/document.service';
import { UsersService } from '../../../services/users.service';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;
import swal from 'sweetalert';

const ELEMENT_DATA: Usuarios[] = [];

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UserRegItem>;
  // dataSource: UserRegDataSource;
  displayedColumns: string[] = ['identificacion', 'nombre', 'tipo', 'seleccione'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  checked = false;
  selection = new SelectionModel<Usuarios>(true, []);
  public UsuarioNew: Usuarios = new Usuarios(0, "", "", "", "", "", "", 0, "", "", "");
  public UsuariosAll: Usuarios[] = [];
  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  public documents: Documentos[];
  public loading = false;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(public _bsModalRef: BsModalRef
    , private _modalS: BsModalService
    , private _docS: DocumentService
    , private _cliU: UsersService
    , private router: Router) { }

  ngOnInit() {
    this.GetAllUsu();
    //this.dataSource = new UserRegDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }


  closeModal(value) {
    console.log(value);
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
    this._cliU.saveUsu(this.UsuarioNew).subscribe(
      response => {
        // console.log(response);
        this.closeModal(2);
        this.GetAllUsu()
        this.loading = false;
        swal("Guardado exitosamente!", "Puede verificarlo el la vista de los clientes!", "success");
      },
      error => {
        console.log(error);
      }
    )
  }
  loadUser() {
    this.GetAllUsu();
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

    this.getDocIdentity();
    // $("#nombre").clear();  
    this.UsuarioNew. nombre_apellido= "";
    this.UsuarioNew.type_ident = "";
    this.UsuarioNew.no_ident = 0;

    this.modalRef2 = new BsModalRef;
    this.modalRef2 = this._modalS.show(template, ngxModalOptions);

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

  GetAllUsu() {
    this.loading = true;
    const user = "";
    const pantalla = "";
    this._cliU.getAllUser(user, pantalla).subscribe(
      response => {
        //console.log(response);
        this.UsuariosAll = response;
        console.log(this.UsuariosAll);
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

  goToImport() {
    this.router.navigate(['home/importf']);
  }
}
