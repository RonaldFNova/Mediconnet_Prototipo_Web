export interface RegistroPost {
  Nombre: string;
  Apellido: string;
  Email: string;
  Password: string;
}

export interface RegistroPostResponse {
  token: string;
}