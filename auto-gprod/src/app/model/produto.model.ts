import { Entity } from './entity.model';
import { Fornecedor } from './fornecedor.model';

export class Produto implements Entity {
  id: number;
  descricao: string;
  inativo: boolean;
  dataFabricacao: Date;
  dataValidade: Date;
  fornecedorId: number;
  fornecedor?: Fornecedor;
}
