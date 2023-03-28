import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProdutoComponent } from './list-produto/list-produto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudProdutoComponent } from './list-produto/crud-produto/crud-produto.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { InputComponnetComponent } from './shared/input-componnet/input-componnet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
} from 'ngx-bootstrap/datepicker';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import localPt from '@angular/common/locales/pt';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { ApplicationErrorHandler } from './application-error-handler';

registerLocaleData(localPt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ListProdutoComponent,
    CrudProdutoComponent,
    InputComponnetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    BsDatepickerConfig,
    { provide: ErrorHandler, useClass: ApplicationErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
