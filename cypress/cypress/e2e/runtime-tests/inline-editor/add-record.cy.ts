import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import InlineEditorSelectors from '../../../../models/selectors/runtime/inline-editor-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import InlineEditorText from '../../../../models/text/runtime-text/inline-editor-text';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add records to a table using the inline editor', () => {
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

  it('Adds and deletes a record in a table using inline editor', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Adds a record
    cy.get(InlineEditorSelectors.AddNewRecordButton).click();

    // Clicks save
    cy.get(InlineEditorSelectors.SaveButton);

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Checks there is now a third record
    cy.get(InlineEditorSelectors.ThirdRecord).should('be.visible');

    // Deletes the new record
    cy.get(UniversalSelectors.ToastContainer, { timeout: 10000 }).should('not.be.visible');
    cy.get(InlineEditorSelectors.ThirdRecordCheckbox).should('be.visible').click();
    cy.dataTest(GridRuntimeSelectors.DeleteRecordsButton).should('be.visible').click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains('Deleted 1 Record');
  });
});
