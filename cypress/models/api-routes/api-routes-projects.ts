import Env from '../env';

export default class ApiRoutesProjects {
  static Project(accountId: string): string {
    return `${Env.BaseUrlRuntimeApi}accounts/${accountId}/projects`;
  }

  static TemplateProject(accountId: string): string {
    return `${Env.BaseUrlRuntimeApi}accounts/${accountId}/projects/templates/copy`;
  }

  static DeleteProject(accountId: string, projectId: string): string {
    return `${Env.BaseUrlRuntimeApi}accounts/${accountId}/projects/${projectId}`;
  }
}
