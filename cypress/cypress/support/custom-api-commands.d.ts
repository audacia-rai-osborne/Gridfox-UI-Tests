declare namespace Cypress {
  interface Chainable {
    /**
     * Calls the API to add a template project to an account
     */
    // eslint-disable-next-line max-len
    copyTemplateProject(AccountId: string, TemplateProjectId : string, ProjectName : string): Promise<string>;

    /**
     * Calls the API to delete a project in an account
     */
    // eslint-disable-next-line max-len
    deleteProject(AccountId: string, ProjectId : string): Promise<string>;
  }
}
