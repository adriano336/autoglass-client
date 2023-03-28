import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/produto.model';
import { environment } from 'src/environments/environment.development';
import { GenericService } from '../services/generic.service';
import { Observable } from 'rxjs';
import { Fornecedor } from '../model/fornecedor.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  excluir(id: number) {
    return this.httpClient.delete<{}>(`${environment.apiUrl}/produtos/${id}`);
  }
  obterFornecedores() {
    return this.httpClient.get<Fornecedor[]>(
      `${environment.apiUrl}/produtos/fornecedores`
    );
  }
  obterId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/produtos/${id}`);
  }

  constructor(private httpClient: HttpClient) {}

  obterTodos(filtro: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/produtos`, {
      params: {
        descricao: filtro.descricao,
        fabricado: filtro.fabricado,
        dataVencimento: filtro.dataVencimento,
        nomeFornecedor: filtro.nomeFornecedor,
      },
    });
  }

  inserir(produto: any): Observable<Produto> {
    return this.httpClient.post<Produto>(
      `${environment.apiUrl}/produtos`,
      produto
    );
  }

  alterar(produto: any): Observable<Produto> {
    return this.httpClient.put<Produto>(
      `${environment.apiUrl}/produtos/${produto.id}`,
      produto
    );
  }
}
