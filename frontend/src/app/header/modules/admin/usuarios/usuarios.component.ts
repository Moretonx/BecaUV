// src/app/header/modules/admin/usuarios/usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'casino', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    public adminService: AdminService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.verUsuarios();
  }
  
  verUsuarios() {
    console.log('Solicitando lista de usuarios...');
    
    this.adminService.getUser().subscribe({
      next: (res: User[]) => {
        console.log('Usuarios recibidos:', res);
        this.dataSource.data = res;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
        this.mostrarError('Error al cargar la lista de usuarios');
      }
    });
  }

  borrarUsuario(id: number | string) {
    console.log('Intentando eliminar usuario con ID:', id);
    
    // Verificar que id no sea undefined o null
    if (!id) {
      console.error('Error: ID de usuario es undefined o null');
      this.mostrarError('Error al eliminar: ID de usuario no válido');
      return;
    }
    
    if (confirm('¿Desea eliminar este usuario?')){
      this.adminService.deleteUser(id.toString()).subscribe({
        next: (res) => {
          console.log('Usuario eliminado:', res);
          this.msgDelete();
          this.verUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          this.mostrarError('Error al eliminar usuario');
        }
      });
    }
  }

  msgDelete(){
    this.snackBar.open('El usuario ha sido eliminado correctamente', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  
  mostrarError(mensaje: string){
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}