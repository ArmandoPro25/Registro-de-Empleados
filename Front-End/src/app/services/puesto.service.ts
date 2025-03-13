import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private apiUrl = 'http://localhost:5000/api/puestos';

      constructor(private http: HttpClient) { }

      crearPuesto(puesto: FormData): Observable<any> {
        return this.http.post(this.apiUrl, puesto);
      }

      obtenerPuestos(): Observable<any> {
        return this.http.get(this.apiUrl);
      }

      obtenerPuestoPorId(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
      }

      actualizarPuesto(id: string, puesto: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, puesto);
      }

      eliminarPuesto(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
      }

}
