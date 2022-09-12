import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../models/constants/template-project-ids';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';

// The project Id that will be set to the projectId of the created template project
let projectId = null;
describe('', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  before(() => {
    cy.login();
    cy.visit(Routes.Dashboard).then(() => {
      // Copies the table explorer template project by calling the API
      cy.copyTemplateProject(AutomationProjectConstants.AccountId, TemplateProjectConstants.UIAutomationProject, 'UI Automation Template').then((response) => { projectId = response; });
    });
  });
  //   afterEach(() => {
  //     cy.dismissAllToasts();
  //   });
  //   after(() => {
  //     // Deletes the template project from its id
  //     cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  //   });

  it('Allows a user to filter cards on a Kanban board', () => {
    // Clicks on the created template project using its project Id
    cy.get('.close-icon').click();
    cy.get(DashboardProjectSelectors.Project(projectId)).should('be.visible').click();
  });
});
