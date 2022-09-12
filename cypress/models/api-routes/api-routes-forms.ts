import Env from '../env';

export default class ApiRoutesForms {
  static Forms(projectId: string): string {
    return `${Env.BaseUrlRuntimeApi}projects/${projectId}/forms`;
  }
}
