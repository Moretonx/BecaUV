import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import {AlumnoService} from '../../../../../services/alumnos/alumno.service';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'rut', 'cantidad', 'canje', 'acciones'];
  dataSource = new MatTableDataSource<Alumno>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public alumnoService: AlumnoService,
    private snackBar: MatSnackBar,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.verAlumnos();
  }
  
  verAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
        res => {
          this.dataSource.data = res;
        },
        err => console.log(err)
    )
  }

  editarAlumno(alumno: Alumno) {
    this.alumnoService.selectAlumno = alumno;
  }

  borrarAlumno(id: string) {
    if (confirm('¿Desea eliminar este alumno?')){
      this.alumnoService.deleteAlumno(id).subscribe(
        (res) => {
          //console.log(res);
        },
        (err) => console.error(err) 
        );
      this.msgDelete();
      this.verAlumnos();
    }
  }

  public msgDelete(){
    this.snackBar.open('El alumno se ha eliminado correctamente', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
