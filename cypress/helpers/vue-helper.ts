import Vue from '../models/helpers/vue/vue';

/** Class for interacting with the Vue Object on an element. */
export default class VueHelper {
  /** The name of the Vue property on a Vue element. */
  private static readonly VueObjectReference = '__vue__';

  /** The selector for the root of the Vue app. */
  private static readonly RootVueSelector = '#app';

  /**
   * Gets the Vue object from the given selector.
   * @param selector The element selector to get the Vue object on.
   * @returns The Vue instance from the element.
   * @throws If the element is not a Vue element.
   */
  static getVueObject(selector: string): Vue {
    const el = Cypress.$(selector)[0];

    const vue = el?.[this.VueObjectReference];

    if (!vue) {
      throw new Error(`'${selector}' is not a Vue component`);
    }

    return vue as Vue;
  }

  /**
   * Gets the Vue instance on the root of the Vue app.
   * @returns The Vue instance on the root of the Vue app.
   */
  static getRootVueObject(): Vue {
    return VueHelper.getVueObject(this.RootVueSelector);
  }
}
