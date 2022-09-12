import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import KanbanEditViewSelectors from '../../../../models/selectors/edit-view/kanban-edit-view-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import KanbanText from '../../../../models/text/view-editor-text/kanban-text';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

// The Kanban board editor has been changed to make it consistent with the Gantt Chart creator so new tests will be added as part of the current sprint
describe.skip('As a user I can delete a Kanban board', () => {
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

  it('Allows a project admin to cancel deleting a Kanban board and then delete it', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Click to add a new board
    cy.dataTest(UniversalRuntimeSelectors.NewBoardButton).should('be.visible').click();
    cy.get(UniversalSelectors.ContentInputField).should('be.visible').type('New Kanban');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a table for the board
    cy.get(KanbanEditViewSelectors.KanbanSettingsModal).should('be.visible');
    cy.get(KanbanEditViewSelectors.SelectTable(AutomationProjectConstants.AllFieldsTableName))
      .click();
    cy.get(KanbanEditViewSelectors.NextButton).click();

    // Select a field to group by
    cy.get(KanbanEditViewSelectors.SelectField(AutomationProjectConstants.TasksTableListFieldName)).should('be.visible').click();
    cy.get(KanbanEditViewSelectors.NextButtonWhenBackButtonVisible).click();

    // Select a text field to be visible
    cy.gfDrag(
      KanbanEditViewSelectors.SelectFieldToDrag(AutomationProjectConstants.TasksTableTextFieldId),
      KanbanEditViewSelectors.VisibleFieldsColumn,
      50,
      50,
    );
    cy.get(KanbanEditViewSelectors.NextButtonWhenBackButtonVisible).click();

    // Save the Kanban board
    cy.get(KanbanEditViewSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenCreated);

    // Open the delete modal for the board
    cy.dataTest(KanbanEditViewSelectors.DeleteButton).click();
    cy.get(UniversalSelectors.ModalTitle).contains(KanbanText.DeleteKanbanModalTitle);

    // Cancel deleting the board
    cy.dataTest(UniversalSelectors.CancelButton).click();

    // Delete the board
    cy.dataTest(KanbanEditViewSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the board has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('New Kanban')).should('not.exist');
  });
});
