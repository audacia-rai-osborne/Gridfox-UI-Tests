import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../models/constants/template-project-ids';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import ExplorerSelectors from '../../../models/selectors/explorer/explorer-selectors';
import GridRuntimeSelectors from '../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import ExplorerErrorMessageText from '../../../models/text/explorer-text/error-messages-text';
import ViewEditorToastMessages from '../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can edit a grid view in table explorer if I create one correctly', () => {
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

  it('Allows a project admin to add a new field to a table and deletes it', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on explorer
    cy.get(UniversalRuntimeSelectors.ExplorerButton).click();
    cy.get(ExplorerSelectors.ExplorerSidebar).should('be.visible');

    // Adds a new field
    cy.get(ExplorerSelectors.AddFieldButton).click();
    cy.get(ExplorerSelectors.SaveButton).click();

    // Checks a new field has been added
    cy.get(ExplorerSelectors.SecondFieldName).should('be.visible');
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.DataSaved);

    // Delete the new field
    cy.get(ExplorerSelectors.SecondFieldName).should('be.visible').click();
    cy.get(ExplorerSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(ExplorerSelectors.SaveButton).click();

    // Checks the field has been deleted
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.DataSaved).should('be.visible');
    cy.get(ExplorerSelectors.SecondFieldName).should('not.exist');
  });

  it('Does not allow a project admin to change a fields type in an existing grid', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on explorer
    cy.get(UniversalRuntimeSelectors.ExplorerButton).click();
    cy.get(ExplorerSelectors.ExplorerSidebar).should('be.visible');

    // Changes the field type of an existing field
    cy.get(ExplorerSelectors.ChangeFieldType).click();
    cy.get(ExplorerSelectors.TextField).click();

    // Check the correct error message is triggered
    cy.get(UniversalRuntimeSelectors.ErrorTooltip)
      .contains(ExplorerErrorMessageText.CannotChangeFieldType);
  });

  it('Does not allow a project admin to change a unique field to a field type that can not be unique', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on explorer
    cy.get(UniversalRuntimeSelectors.ExplorerButton).click();
    cy.get(ExplorerSelectors.ExplorerSidebar).should('be.visible');

    // Changes the field type of an existing field
    cy.get(ExplorerSelectors.ChangeFieldType).click();
    cy.get(ExplorerSelectors.ListField).click();

    // Check the correct error message is triggered
    cy.get(UniversalRuntimeSelectors.ErrorTooltip)
      .contains(ExplorerErrorMessageText.FieldCannotBeUnique);
  });
});
