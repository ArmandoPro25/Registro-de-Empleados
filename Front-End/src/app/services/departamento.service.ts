import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = 'http://localhost:5000/api/departamentos';
    
      constructor(private http: HttpClient) { }
    
      crearDepartamento(departamento: FormData): Observable<any> {
        return this.http.post(this.apiUrl, departamento);
      }
    
      obtenerDepartamentos(): Observable<any> {
        return this.http.get(this.apiUrl);
      }
    
      obtenerDepartamentoPorId(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
      }
    
      actualizarDepartamento(id: string, departamento: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, departamento);
      }
    
      eliminarDepartamento(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
      }
  
}
