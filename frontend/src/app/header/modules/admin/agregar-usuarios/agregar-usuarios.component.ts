import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CasinoService } from '../../../../services/casinos/casinos.service';


@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.scss']
})
export class AgregarUsuariosComponent implements OnInit {
  loading = false;
  data: any[] = [];

  constructor(
    public adminService: AdminService,
    public casinoService: CasinoService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.verCasinos();
  }

  resetForm() {
    this.adminService.selectUser = {
      id: 0,  // Inicializamos con 0 en lugar de string vacío
      usuario: '',
      password: '',
      role: 'Usuario',
      casino: ''
    };
  }

  verCasinos() {
    this.casinoService.getCasinos().subscribe(
        res => {
          this.data = res;
        },
        err => console.log(err)
    )
  }

  agregarUsuario(form: NgForm) {
    this.loading = true;
    
    console.log("Datos del formulario a enviar:", form.value);

    this.adminService.addUser(form.value).subscribe({
      next: (res) => {
        console.log('Usuario creado:', res);
        form.reset();
        this.resetForm();
        this.router.navigate(['/admin']);
        this.msgAdd();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        
        let errorMsg = 'Error al agregar el usuario.';
        if (err.error && err.error.message) {
          errorMsg += ' ' + err.error.message;
        } else if (err.status === 500) {
          errorMsg += ' Error interno del servidor. Verifica que todos los campos sean correctos.';
        }
        
        this.showError(errorMsg);
        this.loading = false;
      }
    });
  }
  
  msgAdd() {
    this._snackBar.open('Usuario agregado correctamente', '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showError(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}