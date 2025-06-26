import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HumisRowResponse } from '../model/HumisRowResponse';
import { NewHumi } from '../model/NewHumi';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private humisSubject = new BehaviorSubject<HumisRowResponse[]>([]);
  public humis$ = this.humisSubject.asObservable();
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getHumis(): Observable<HumisRowResponse[]> {
    const url = `${this.apiUrl}/api/user/humis`;
    return this.http
      .get<HumisRowResponse[]>(url)
      .pipe(tap((urls) => this.humisSubject.next(urls)));
  }
  addHumi(newHumi: HumisRowResponse) {
    const currentUrls = this.humisSubject.value; // Obtiene valor actual
    this.humisSubject.next([...currentUrls, newHumi]); // Emite nuevo array
  }
  getCurrentHumis(): HumisRowResponse[] {
    return this.humisSubject.value;
  }
}
