declare namespace Cypress {
  interface Cypress {
    // This types out our Cypress.env("key") calls better
    env(key: 'LOGIN_URL'): string;
    env(key: 'USERNAME'): string;
    env(key: 'PASSWORD'): string;
    env(key: 'PROJECTS_TO_NOT_DELETE'): string[];
  }
}
