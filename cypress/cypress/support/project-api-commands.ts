import ApiRoutesProjects from '../../models/api-routes/api-routes-projects';
import Env from '../../models/env';

// Copy Template Project
Cypress.Commands.add('copyTemplateProject', (AccountId: string, TemplateProjectId : string, ProjectName : string) => {
  cy.request({
    // State that the API is a POST Request
    method: 'POST',

    // State that the URL for this request is the template project endpoint
    url: ApiRoutesProjects.TemplateProject(AccountId),

    // The API request body goes here
    body: {
      templateProjectId: TemplateProjectId, projectName: ProjectName, accountId: AccountId,
    },

    // This gets the access token of the current login session
    auth: {
      bearer: JSON.parse(localStorage.getItem(Env.GetAccessToken)).access_token,
    },
  }).then((response) => response.body.projectId);
});

// Delete a project
Cypress.Commands.add('deleteProject', (AccountId: string, ProjectId : string) => {
  cy.request({
  // State that the API is a DELETE request
    method: 'DELETE',

    // This is where you state that the URL for this request is the delete project endpoint
    url: ApiRoutesProjects.DeleteProject(AccountId, ProjectId),

    // This gets the access token of the current login session
    auth: {
      bearer: JSON.parse(localStorage.getItem(Env.GetAccessToken)).access_token,
    },
  });
});
