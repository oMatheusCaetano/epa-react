import { ManagementUnit } from '~/features/ManagementUnits/domain/models';
import { User } from '~/features/Users/domain/models';

interface Kick {
  codigo: number,
  mensagem: string,
  gol: 0 | 1 | '0' | '1',
  r_unidades_gerenciais?: ManagementUnit[],
  r_usuarios?: User[],
}

export default Kick;
