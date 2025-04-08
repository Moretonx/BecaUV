// src/app/models/user.ts
export interface User {
    id: number | string;  // Permitir tanto número como string para compatibilidad
    usuario: string;
    password: string;
    role: string;
    casino?: string;  // Opcional ya que no existe en la DB pero se usa en validación
  }