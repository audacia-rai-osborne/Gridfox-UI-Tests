import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../models/constants/template-project-ids';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import ExplorerSelectors from '../../../models/selectors/explorer/explorer-selectors';
import GridRuntimeSelectors from '../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import ExplorerErrorMessageText from '../../../models/text/explorer-text/error-messages-text';
import ExplorerToastMessageText from '../../../models/text/explorer-text/toast-message-text';
import ViewEditorToastMessages from '../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add a grid view in table explorer if I create one correctly', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  before(() => {
    cy.login();
    cy.visit(Routes.Dashboard).then(() => {
      // Copies the table explorer template project by calling the API
      cy.copyTemplateProject(AutomationProjectConstants.AccountId, TemplateProjectConstants.TableExplorerTemplate, 'Table Explorer Template').then((response) => { projectId = response; });
    });
  });

  afterEach(() => {
    cy.dismissAllToasts();
  });

  after(() => {
    // Deletes the template project from its id
    cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  });

  it('Allows a project admin to add a new grid view to a project', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on explorer
    cy.get(UniversalRuntimeSelectors.ExplorerButton).click();
    cy.get(ExplorerSelectors.ExplorerSidebar).should('be.visible');

    // Adds a new grid
    cy.get(ExplorerSelectors.AddGridButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Explorer Grid');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Adds a new field
    cy.get(ExplorerSelectors.AddFieldSecondGrid).click();

    // Save the grid
    cy.get(ExplorerSelectors.SaveButton).click();

    // Create a new reference field
    cy.get(ExplorerSelectors.FieldSelectDropdown).click();
    cy.get(ExplorerSelectors.SelectANewReferenceField).click();
    cy.get(ExplorerSelectors.SaveReferenceModal).click();
    cy.get(ExplorerSelectors.SaveButton).click();

    // Check the grid has been created
    cy.get(ExplorerSelectors.SecondGridTitle).contains('Explorer Grids');
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.DataSaved).should('be.visible');

    // Delete the grid
    cy.get(ExplorerSelectors.DeleteSecondGrid).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(ExplorerSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.DataSaved).should('be.visible');
  });

  it('Does not allow a project admin to save a grid without a name', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on Explorer
    cy.get(UniversalRuntimeSelectors.ExplorerButton).click();
    cy.get(ExplorerSelectors.ExplorerSidebar).should('be.visible');

    // Adds a new grid
    cy.get(ExplorerSelectors.AddGridButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Explorer Grid');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Removes the grids title
    cy.get(ExplorerSelectors.SecondGridTitle).clear();
    cy.get(ExplorerSelectors.SaveButton).click();

    // Checks the correct error message is triggered
    cy.get(UniversalSelectors.ToastContainer).contains(ExplorerToastMessageText.NoGridName);
  });

  it('Does not allow a project admin to save a grid without a field name', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on explorer
    cy.get(UniversalRuntimeSelectors.ExplorerButton).click();
    cy.get(ExplorerSelectors.ExplorerSidebar).should('be.visible');

    // Adds a new grid
    cy.get(ExplorerSelectors.AddGridButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Explorer Grid');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Adds a new field
    cy.get(ExplorerSelectors.AddFieldSecondGrid).click();

    // Removes the fields title
    cy.get(ExplorerSelectors.FirstFieldInSecondGridInput).clear();
    cy.get(ExplorerSelectors.SaveButton).click();

    // Checks the correct error message is triggered
    cy.get(UniversalRuntimeSelectors.ErrorTooltip).should('be.visible').contains(ExplorerErrorMessageText.NoFieldName);
    cy.get(UniversalSelectors.ToastContainer).contains(ExplorerToastMessageText.FieldErrors);
  });
});
