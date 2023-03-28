import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Produto } from '../model/produto.model';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.scss'],
})
export class ListProdutoComponent implements OnInit {
  filterForm: FormGroup;

  /**
   *
   */
  constructor(private produtoService: ProdutoService) {}

  currentPage = 1;
  total = 10;
  pages = 1;

  produtos: Produto[] = [];

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      descricao: new FormControl('', {}),
      fabricado: new FormControl('', {}),
      vencido: new FormControl('', {}),
      nomeFornecedor: new FormControl('', {}),
    });

    this.filtrar();
  }

  filtrar() {
    this.produtoService
    .obterTodos({
      descricao: this.filterForm.get('descricao')?.value,
      fabricado: this.filterForm.get('fabricado')?.value,
      dataVencimento: this.filterForm.get('vencido')?.value,
      nomeFornecedor: this.filterForm.get('nomeFornecedor')?.value,
    })
    .subscribe((p) => {
      this.produtos = p;
    });
  }


  excluir(id: number) {
    this.produtoService.excluir(id).subscribe(() => {
      this.produtos.forEach((item, index) => {
        if (item.id === id) this.produtos.splice(index, 1);
      });
    });
  }
}
