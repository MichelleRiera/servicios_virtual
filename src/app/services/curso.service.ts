import { Observable, forkJoin} from 'rxjs';
import { curso } from '../domain/producto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor(private http: HttpClient) { }

  saveCurso(curso: curso): Observable<any> {
    return this.http.post<any>("http://localhost:8083/api/courses", curso);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>("http://localhost:8083/api/users/register", usuario);
  }

  getAllCursos(): Observable<any> {
    return this.http.get<any>("http://localhost:8083/api/courses/all");
  }

  getAsignacionesPorUsuario(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8083/api/assignments/byUser/${userId}`);
  }

  asignarCurso(userId: string, courseId: string): Observable<any> {
    const url = "http://localhost:8083/api/assignments";
    const body = { userId, courseId };
    return this.http.post<any>(url, body);
  }

  actualizarCurso(id: string, curso: curso): Observable<curso> {
    const url = `http://localhost:8083/api/courses/${id}`;
    return this.http.put<curso>(url, curso);
  }

  eliminarCurso(id: string): Observable<any> {
    const url = `http://localhost:8083/api/courses/${id}`;
    return this.http.delete(url);
  }
  getCourseById(id: string): Observable<curso> {
    const url = `http://localhost:8083/api/courses/${id}`;
    return this.http.get<curso>(url);
  }

  getCursosDeUsuario(userId: string): Observable<curso[]> {
    return this.getAsignacionesPorUsuario(userId).pipe(
      switchMap(asignaciones => {
        // Verifica que 'asignaciones' es un array y tiene la propiedad 'courseId'
        if (Array.isArray(asignaciones) && asignaciones.every(asig => 'courseId' in asig)) {
          // Obtener los detalles de los cursos usando los courseId de las asignaciones
          const requests = asignaciones.map(asig => 
            this.getCourseById(asig.courseId)
          );
          // Usamos <curso[]> para asegurarnos de que TypeScript entiende el tipo de la salida de forkJoin
          return forkJoin<curso[]>(requests);
        } else {
          // Si 'asignaciones' no es un array o no tiene la propiedad 'courseId', emite un array vacío
          return [];
        }
      })
    );
  }
}
