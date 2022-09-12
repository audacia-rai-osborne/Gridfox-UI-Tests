import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import KanbanEditViewSelectors from '../../../../models/selectors/edit-view/kanban-edit-view-selectors';
import BoardRuntimeSelectors from '../../../../models/selectors/runtime/board-runtime-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

// The Kanban board editor has been changed to make it consistent with the Gantt Chart creator so new tests will be added as part of the current sprint
describe.skip('As a user I can edit a kanban board if I create one correctly', () => {
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

  afterEach(() => {
    cy.dismissAllToasts();
  });

  after(() => {
    // Deletes the template project from its id
    cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  });

  it('Allows a project admin to edit a Kanban board', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the tasks kanban board
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EventsBoardName))
      .click();
    cy.dataTest(BoardRuntimeSelectors.AddColumnButton).should('be.visible');

    // Clicks to edit the current view
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Adds some row settings
    cy.get(KanbanEditViewSelectors.SelectRowSettings).click();
    cy.dataTest(KanbanEditViewSelectors.SelectFromList).click();

    // Leave view editor
    cy.dataTest(KanbanEditViewSelectors.ExitViewEditorButton).click();
    cy.get(KanbanEditViewSelectors.SaveModalButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(ViewEditorToastMessages.ScreenSaved);

    // Check rows have been added
    cy.get(BoardRuntimeSelectors.KanbanRows).should('be.visible');

    // Clicks to edit the current view
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Adds some row settings
    cy.get(KanbanEditViewSelectors.SelectRowSettings).click();
    cy.dataTest(KanbanEditViewSelectors.RemoveRowsOption).click();

    // Leave view editor
    cy.dataTest(KanbanEditViewSelectors.ExitViewEditorButton).click();
    cy.get(KanbanEditViewSelectors.SaveModalButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(ViewEditorToastMessages.ScreenSaved);
  });
});
