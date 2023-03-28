import { TestBed } from '@angular/core/testing';

import { ListProdutoService } from './list-produto.service';

describe('ListProdutoService', () => {
  let service: ListProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
