import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentescoService {
  private apiUrl = 'http://localhost:5000/api/parentescos';

  constructor(private http: HttpClient) { }

  crearParentesco(parentesco: any): Observable<any> {
    return this.http.post(this.apiUrl, parentesco);
  }

  obtenerParentescos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerParentescoPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarParentesco(id: string, parentesco: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, parentesco);
  }

  eliminarParentesco(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}