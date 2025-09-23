export interface JwtPayload {
  nameid: string; // ClaimTypes.NameIdentifier en tu backend
  role: string;   // ClaimTypes.Role en tu backend
  exp: number;    // fecha de expiración (epoch time)
  iss?: string;   // issuer opcional
  aud?: string;   // audience opcional
}