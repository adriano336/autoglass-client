import { Entity } from "./entity.model";

export class Fornecedor implements Entity {
  id: number;
  nomeFornecedor : string;
  cnpj : string;
}
