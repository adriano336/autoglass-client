import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isArray } from 'ngx-bootstrap/chronos';
import { Fornecedor } from 'src/app/model/fornecedor.model';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-crud-produto',
  templateUrl: './crud-produto.component.html',
  styleUrls: ['./crud-produto.component.scss'],
})
export class CrudProdutoComponent implements OnInit {
  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild('fornecs', { static: false }) fornecs!: ElementRef;

  formProduto: FormGroup;

  id = this.route.snapshot.params['id'];

  fornecedores: Fornecedor[];

  ngOnInit(): void {
    this.formProduto = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      fabricado: new FormControl('', [Validators.required]),
      vencimento: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      nomeFor: new FormControl('', [Validators.required]),
      fornecedorId: new FormControl([''], [Validators.required]),
    });

    if (this.id) {
      this.produtoService.obterId(this.id).subscribe((p) => {
        this.formProduto.patchValue(p.produto);
        this.formProduto
          .get('fabricado')
          ?.setValue(new Date(p.produto.dataFabricacao));
        this.formProduto
          .get('vencimento')
          ?.setValue(new Date(p.produto.dataValidade));
        this.formProduto.get('cnpj')?.setValue(p.produto.fornecedor?.cnpj);
        this.formProduto
          .get('nomeFor')
          ?.setValue(p.produto.fornecedor?.nomeFornecedor);
        this.fornecedores = p.fornecedores;
      });
    } else {
      this.produtoService.obterFornecedores().subscribe((f) => {
        this.fornecedores = f;
      });
    }
  }

  fornecedorSelecionado() {
    let id = this.fornecs.nativeElement.value;

    let fornSel = this.fornecedores.find((f) => f.id == id);

    this.formProduto.get('nomeFor')?.setValue(fornSel?.nomeFornecedor);
    this.formProduto.get('cnpj')?.setValue(fornSel?.cnpj);

    this.desabilita = false;

    if (fornSel) {
      this.desabilita = true;
    }
  }

  desabilita = false;

  gravar() {
    if (this.id == undefined) {
      this.produtoService
        .inserir(this.produtoPost())
        .subscribe((p) => this.router.navigate(['']));
    } else {
      this.produtoService
        .alterar(this.produtoPost())
        .subscribe((p) => this.router.navigate(['']));
    }
  }

  novoFor() {
    this.formProduto.get('fornecedorId')?.setValue('');
    this.fornecedorSelecionado();
  }

  getfornecedorId() {
    let f = this.formProduto.get('fornecedorId')?.value;

    if (isArray(f)) {
      return null;
    }

    return f;
  }

  produtoPost() {
    let prd = {
      id: this.id,
      descricao: this.formProduto.value.descricao,
      inativo: false,
      dataFabricacao: this.formProduto.value.fabricado,
      dataValidade: this.formProduto.value.vencimento,
      fornecedorId: this.getfornecedorId(),
      fornecedor: {
        nomeFornecedor: this.formProduto.get('nomeFor')?.value,
        cnpj: this.formProduto.get('cnpj')?.value,
      },
    };

    return prd;
  }
}
