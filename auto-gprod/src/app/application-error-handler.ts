import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Todo providers que recebe injeção precisa ser declarado a notação abaixo.
@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {
    super();
  }

  override handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error;

      let toastr = this.injector.get(ToastrService);

      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            break;
          case 403:
            toastr.error(message || 'Não autorizado');
            break;
          case 404:
            toastr.error(
              message ||
                'Recurso não encontrado. Verifique o console para mais detalhes.'
            );
            break;
          case 400:
            toastr.error(
              message || 'Verifique o console para mais detalhes.'
            );
            break;
        }
      });
    }

    super.handleError(errorResponse);

    //Primeiro exemplo
    // let errorMessage: string

    // if (error instanceof HttpErrorResponse) {
    //     const body = error.error;
    //     errorMessage = `Erro ${error.status} - ${error.statusText || ''} ao obter a URL ${error.url} ${body}`;
    // }
    // else {
    //     errorMessage = error.message ? error.message : error.toString();
    // }
  }
}
