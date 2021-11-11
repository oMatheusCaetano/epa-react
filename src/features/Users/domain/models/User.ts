import { Cliente } from '~/features/Users/domain/models';

interface User {
  codigo_cliente: number;
  login: string;
  cliente?: Cliente;
}

export default User;
