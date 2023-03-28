import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Entity } from '../model/entity.model';

@Injectable( {
  providedIn: 'root'
})
export class GenericService<T extends Entity> {
  constructor(private httpClient: HttpClient) {}

  obterTodos(): Observable<T[]> {
    return this.httpClient.get<T[]>(
      `${environment.apiUrl}/`
    );
  }
}
