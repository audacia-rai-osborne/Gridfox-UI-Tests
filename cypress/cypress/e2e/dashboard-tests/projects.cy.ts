import ApiRoutesProjects from '../../../models/api-routes/api-routes-projects';
import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import Env from '../../../models/env';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';

describe('As an account owner I can manage projects on the dashboard', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Creates a new project', () => {
    // Click to add a new project
    cy.get(DashboardProjectSelectors.AddNewProjectButton(AutomationProjectConstants.AccountId))
      .should('be.visible');
    cy.get(DashboardProjectSelectors.AddNewProjectButton(AutomationProjectConstants.AccountId))
      .click();

    // Name the project
    cy.get(UniversalSelectors.ContentInputField).type('New Project');
    cy.get(DashboardProjectSelectors.CreateNewProject).click();

    // Check the project has been created
    cy.get(UniversalRuntimeSelectors.ProjectTitle).contains('New Project');

    // Delete the project
    cy.deleteCurrentProject();
  });

  it('Renames a project', () => {
    // Call the API to add a project
    cy.request({
      // This is where you state the type of API that is being called
      method: 'POST',

      // This is where you state the url of the API request
      url: ApiRoutesProjects.Project(AutomationProjectConstants.AccountId),

      // The API request body goes here
      body: { accountId: AutomationProjectConstants.AccountId, name: 'Rename Project Test' },

      // This gets the access token of the current login session
      auth: {
        bearer: JSON.parse(localStorage.getItem(Env.GetAccessToken)).access_token,
      },
    });

    // Refreshes the page so you can see the project
    cy.visit(Routes.Dashboard);

    // Clicks on the new project to rename it
    cy.get(DashboardProjectSelectors.ProjectLinkByName('Rename Project Test')).click();

    // Checks you have been taken to the projects page
    cy.get(UniversalRuntimeSelectors.ProjectTitle).contains('Rename Project Test');

    // Rename the project and go to the project
    cy.renameCurrentProject();

    // Check the project title is correct
    cy.get(UniversalRuntimeSelectors.ProjectTitle).contains('Edited Project Name');

    // Delete the project
    cy.deleteCurrentProject();
  });

  it('Allows an account admin to cancel deleting a project and then later delete it', () => {
    // Click to add a new project
    cy.get(DashboardProjectSelectors.AddNewProjectButton(AutomationProjectConstants.AccountId))
      .should('be.visible');
    cy.get(DashboardProjectSelectors.AddNewProjectButton(AutomationProjectConstants.AccountId))
      .click();

    // Name the project
    cy.get(UniversalSelectors.ContentInputField).type('New Project');
    cy.get(DashboardProjectSelectors.CreateNewProject).click();
    cy.get(UniversalRuntimeSelectors.BackToProjectsButton).click();

    // Select to delete the project but then cancel deleting it
    cy.cancelDeletingCurrentProjectThenDeleteIt();
  });
});
