import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import GridEditViewSelectors from '../../../../models/selectors/edit-view/grid-edit-view-selectors';
import UniversalRuntimeEditorSelectors from '../../../../models/selectors/edit-view/universal-edit-view-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add a grid view if I create one correctly', () => {
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

  it('Adds a new grid view to a project', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the button to add a new grid
    cy.dataTest(UniversalRuntimeSelectors.NewGridButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('New Grid');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Adds a field and makes it a reference field
    cy.get(GridEditViewSelectors.NoVisibleFields).click();
    cy.get(GridEditViewSelectors.RefFieldCheckbox).click();

    // Saves the grid
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Checks the grid was created
    cy.get(UniversalRuntimeSelectors.Screen('New Grids')).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen('New Grids')).click();

    // Deletes the grid
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Checks the grid has been deleted
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.DataSaved);
  });

  it('Adds a new grid view to a project using the reference field modal', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the button to add a new grid
    cy.dataTest(UniversalRuntimeSelectors.NewGridButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('New Grid');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Adds a field and makes it a reference field
    cy.get(GridEditViewSelectors.NoVisibleFields).click();

    // Saves the grid
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Use the add a new reference field modal to add a new reference field
    cy.get(GridEditViewSelectors.RefFieldSetupModal).should('be.visible');
    cy.get(GridEditViewSelectors.RefFieldModalDropdown).click();
    cy.get(GridEditViewSelectors.GenerateNewRefField).click();
    cy.get(GridEditViewSelectors.SaveRefFieldButton).click();

    // Checks the grid was created
    cy.get(UniversalRuntimeSelectors.Screen('New Grids')).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen('New Grids')).click();

    // Deletes the grid
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Checks the grid has been deleted
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.DataSaved);
  });

  it('Does not add a new grid view to a project if a name is not specified', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the button to add a new grid
    cy.dataTest(UniversalRuntimeSelectors.NewGridButton).click();
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Checks a table has not been created
    cy.get(GridEditViewSelectors.NoVisibleFields).should('not.exist');
    cy.get(UniversalSelectors.ContentInputField).should('be.visible');
  });

  it('Does not allow me to save a table without a reference field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the button to add a new grid
    cy.dataTest(UniversalRuntimeSelectors.NewGridButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('New Grid');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Adds a field and makes it a reference field
    cy.get(GridEditViewSelectors.NoVisibleFields).click();

    // Saves the grid
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Checks the add a reference field modal appears
    cy.get(GridEditViewSelectors.RefFieldSetupModal).should('be.visible');
  });
});
