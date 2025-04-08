import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../../../services/alumnos/alumno.service'

@Component({
selector: 'app-agregar-alumno',
templateUrl: './agregar-alumno.component.html',
styleUrls: ['./agregar-alumno.component.scss']
})
export class AgregarAlumnoComponent implements OnInit {

constructor(
public alumnoService: AlumnoService,
private router: Router,
private _snackBar: MatSnackBar
) { }

ngOnInit(): void {
}

agregarAlumno(form: NgForm){
if(form.value.id){
this.alumnoService.updateAlumno(form.value).subscribe(
res => console.log(res),
err => console.error(err)
);
form.reset();
this.router.navigate(['/']);
this.msgEdit();
} else {
this.alumnoService.addAlumno(form.value).subscribe(
res => console.log(res),
err => console.error(err)
);
form.reset();
this.msgAdd();
}
}

msgEdit(){
this._snackBar.open('Alumno editado correctamente', '', {
duration: 4000,
horizontalPosition: 'center',
verticalPosition: 'bottom',
});
}

msgAdd(){
this._snackBar.open('Alumno agregado correctamente', '', {
duration: 4000,
horizontalPosition: 'center',
verticalPosition: 'bottom'
});
}

public getCurrentUrl(): number {
if (this.router.url === '/editar-alumno') return 1;
return 0;
};
}