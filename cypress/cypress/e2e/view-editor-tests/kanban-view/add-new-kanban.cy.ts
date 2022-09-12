import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import KanbanEditViewSelectors from '../../../../models/selectors/edit-view/kanban-edit-view-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

// The Kanban board editor has been changed to make it consistent with the Gantt Chart creator so new tests will be added as part of the current sprint
describe.skip('As a user I can add a kanban board if I create one correctly', () => {
  before(() => {
    cy.login();
    cy.visit(Routes.Dashboard).then(() => {
      // Copies the UI automation template project by calling the API
      cy.copyTemplateProject(AutomationProjectConstants.AccountId, TemplateProjectConstants.UIAutomationProject, 'UI Automation Project Template').then((response) => { projectId = response; });
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  // afterEach(() => {
  //   cy.dismissAllToasts();
  // });

  // after(() => {
  //   // Deletes the template project from its id
  //   cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  // });

  it('Allows a project admin to create a Kanban board', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
  });
});
