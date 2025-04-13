import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CasinoService } from '../../../../../services/casinos/casinos.service'

@Component({
  selector: 'app-agregar-casinos',
  templateUrl: './agregar-casinos.component.html',
  styleUrls: ['./agregar-casinos.component.scss']
})
export class AgregarCasinosComponent implements OnInit {

  constructor(
    public casinoService: CasinoService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  agregarCasino(form: NgForm){

      this.casinoService.addCasino(form.value).subscribe(
        res => {
          //console.log(res)
        },
        err => console.error(err)
      );
      form.reset();
      this.router.navigate(['/casinos']);
      this.msgAdd();
  }

  msgAdd(){
    this._snackBar.open('Casino agregado correctamente', '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
