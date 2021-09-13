import NonIdShowApiDataSource from '~/core/data/datasources/api/non-id-show-api-datasource';
import IUser from '~/features/Users/domain/models/IUser';

interface ApiData {
  login: string,
  cliente: {
    codigo: number;
    nome: string;
    email?: string;
    foto?: string;
  }
}

class GetAuthenticatedUser extends NonIdShowApiDataSource<IUser, ApiData> {
  protected setEndpoint() { this.endpoint = 'api/auth/usuario'; }

  protected convert(data: ApiData): IUser {
    return {
      ...data,
      id: data.cliente.codigo,
      name: data.cliente.nome,
      email: data.cliente.email,
      image: data.cliente.foto,
    };
  }

  protected handleQueryParams() {
    super.handleQueryParams();
    this.addQueryParam(true, 'with', 'cliente');
  }
}

export default GetAuthenticatedUser;
