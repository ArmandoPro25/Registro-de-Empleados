import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = 'http://localhost:5000/api/actividades';
  
    constructor(private http: HttpClient) { }
  
    crearActividad(actividad: FormData): Observable<any> {
      return this.http.post(this.apiUrl, actividad);
    }
  
    obtenerActividades(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  
    obtenerActividadPorId(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
  
    actualizarActividad(id: string, actividad: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, actividad);
    }
  
    eliminarActividad(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
