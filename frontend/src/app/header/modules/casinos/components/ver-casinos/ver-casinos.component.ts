import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Casino } from 'src/app/models/casino';
import { CasinoService } from '../../../../../services/casinos/casinos.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-ver-casinos',
  templateUrl: './ver-casinos.component.html',
  styleUrls: ['./ver-casinos.component.scss']
})
export class VerCasinosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cantidad', 'acciones'];
  dataSource = new MatTableDataSource<Casino>;

  constructor(
    public casinoService: CasinoService,
    private snackBar: MatSnackBar,
    public loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.verCasinos();
  }

  verCasinos() {
    this.casinoService.getCasinos().subscribe(
        res => {
          this.dataSource.data = res;
        },
        err => console.log(err)
    )
  }

  borrarCasino(id: string) {
    if (confirm('¿Desea eliminar este casino?')){
      this.casinoService.deleteCasino(id).subscribe(
        (res) => {
          //console.log(res);
        },
        (err) => console.error(err) 
      );
      setTimeout(() => {
        this.verCasinos();
        this.msgDelete();
      }, 500);
    }
  }

  public msgDelete(){
    this.snackBar.open('El Casino se ha eliminado correctamente', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

}
