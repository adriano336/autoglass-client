import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProdutoComponent } from './list-produto/crud-produto/crud-produto.component';
import { ListProdutoComponent } from './list-produto/list-produto.component';

const routes: Routes = [
  { path: '', component: ListProdutoComponent },
  { path: 'produto', component: CrudProdutoComponent },
  { path: 'produto/:id', component: CrudProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
