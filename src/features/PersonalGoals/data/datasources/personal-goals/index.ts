import IPersonalGoal, { IPersonalGoalData } from '~/features/PersonalGoals/domain/models/IPersonalGoal';

export const endpoint = 'api/metas-pessoais';

export interface ApiData {
  codigo: number,
  descricao: string,
  concluido: number,
  usuario: number,
  data_inclusao: string,
  data_conclusao: string,
}

export function toJson(data: IPersonalGoal | IPersonalGoalData) {
  return {
    ...data,
    descricao: data.description,
    usuario: data.user_id,
    concluido: data.done ? 1 : 0,
  };
}

export function fromJson(data: ApiData): IPersonalGoal {
  return {
    ...data,
    id: data.codigo,
    description: data.descricao,
    done: !!data.concluido,
    user_id: data.usuario,
    created_at: data.data_inclusao,
    finished_at: data.data_conclusao,
  };
}
