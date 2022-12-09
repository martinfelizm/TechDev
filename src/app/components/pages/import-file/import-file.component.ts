import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as XLSX from 'xlsx';
declare var jQuery: any;
declare var $: any;
import swal from 'sweetalert';
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})

export class ImportFileComponent implements OnInit {
  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  public loading = false;
  vartarget: DataTransfer;
  dt: any;
  constructor(private spinner: NgxSpinnerService,
    private userS: UsersService) { }

  ngOnInit(): void {
  }

  loadingShow() {
    console.log('Here!!');
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */

    }, 100000);
  }

  onChange(evt) {


    // this.loading = true;
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.vartarget = target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    this.loadingShow();

    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {

      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };
      this.spinner.hide();
      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
        //  console.log(this.keys);
        //  console.log(data);DD29-000839 8295209508
        this.dt = data;
      }

    } else {
      this.inputFile.nativeElement.value = '';
    }

    //  this.loading = false;
    //this.spinner.hide();
  }

  removeData() {
    if (this.vartarget != undefined) {
      swal({
        title: "Estas seguro?",
        text: "Estas seguro de eliminar lo cargado?",
        icon: "warning",
        buttons: [
          'No, cancelar!',
          'Yes, estoy seguro!'
        ],
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            this.loading = true;
            this.inputFile.nativeElement.value = '';
            this.dataSheet.next(null);
            this.keys = null;
            this.loading = false;
            swal("Eliminado!", "La data cargada fue eliminada!", "success");

          }
        });
    }


  }

  subirData() {
    if (this.vartarget != undefined) {
      swal({
        title: "Estas seguro?",
        text: "Estas seguro de subir lo cargado?",
        icon: "warning",
        buttons: [
          'No, cancelar!',
          'Yes, estoy seguro!'
        ],
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
           // console.log(this.dt);
            // console.log(this.dataSheet);
            
            this.loading = true;
            this.userS.saveImport(this.dt, "usuario").subscribe(
              response => {
                console.log(response);
                this.inputFile.nativeElement.value = '';
                this.dataSheet.next(null);
                this.keys = null;
                this.loading = false;
                swal("Guardado!", "La data cargada fue importada!", "success");
              },
              error => {
                console.log(error);
                if(error.status==400){
                  swal("Error!", "La data cargada habia sido importada anteriormente o tiene algun error en la misma, favor consulte con tecnologia!", "error");
                }
                else{
                  swal("Error!", "Error en servidor, consulte con tecnologia!", "error");
                }
                this.loading = false;
              }
            );


          }
        });
    }

  }
}
