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

describe('As a project admin if I edit a grid and then leave the page without saving the save changes modal works correctly', () => {
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

  it('Does not save my changes if I dismiss a save changes modal after editing a grid', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the edit table tests table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Edit Table Name
    cy.get(GridEditViewSelectors.TableNameInput).clear();
    cy.get(GridEditViewSelectors.TableNameInput).type('New Table Name');

    // Go back to the dashboard
    cy.get(UniversalRuntimeSelectors.BackToProjectsButton).click();
    cy.dataTest(UniversalRuntimeSelectors.DiscardChangesButton).click();

    // Checks the user has been taken to the dashboard
    cy.url().should('eq', `${Cypress.config().baseUrl}#/`);
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).should('be.visible');
  });

  it('Does not save my changes if I cancel a save changes modal after editing a grid but I stay in the editor', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the edit table tests table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName)).should('be.visible', { timeout: 15000 })
      .click();

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Edit Table Name
    cy.get(GridEditViewSelectors.TableNameInput).clear();
    cy.get(GridEditViewSelectors.TableNameInput).type('New Table Name');

    // Go back to the dashboard
    cy.get(UniversalRuntimeSelectors.BackToProjectsButton).click();
    cy.get(UniversalRuntimeSelectors.CancelChangesButton).click();

    // Checks the user has not been taken back to the dashboard
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
  });

  it('Does save my changes if I select to save using a save changes modal after editing a grid', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the edit table tests table
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Edit Table Name
    cy.get(GridEditViewSelectors.TableNameInput).clear();
    cy.get(GridEditViewSelectors.TableNameInput).type('New Table Name');

    // Leave the view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Click to save changes
    cy.get(UniversalRuntimeSelectors.SaveChangesButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(ViewEditorToastMessages.DataSaved);

    // Rename the grid to its original name
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.get(GridEditViewSelectors.TableNameInput).clear();
    cy.get(GridEditViewSelectors.TableNameInput).type('Edit Table Test');
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(ViewEditorToastMessages.DataSaved);
  });
});
