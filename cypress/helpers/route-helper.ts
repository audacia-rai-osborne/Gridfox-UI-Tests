import VueHelper from './vue-helper';

/** Class for interacting with the Vue Route Object. */
export default class RouteHelper {
  /**
   * Tries to get the given parameter from the Vue route params.
   * @param param The name of the route parameter to get.
   * @returns A string value of the parameter if found.
   * @throws If the parameter is not in the route.
   */
  static getParam(param: string): string {
    const vue = VueHelper.getRootVueObject();

    const paramValue = vue.$route.params[param];

    if (!paramValue) {
      throw new Error(`Could not find parameter '${param}' in the route`);
    }

    return paramValue;
  }

  /**
   * Tries to get the project Id from the route parameters
   */
  static getProjectId(): string {
    return RouteHelper.getParam('projectId');
  }
}
