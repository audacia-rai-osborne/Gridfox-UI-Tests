import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import GridEditViewSelectors from '../../../../models/selectors/edit-view/grid-edit-view-selectors';
import UniversalRuntimeEditorSelectors from '../../../../models/selectors/edit-view/universal-edit-view-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import GridModalsText from '../../../../models/text/view-editor-text/grid-text';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can delete a field from a grid', () => {
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

  it('Allows a user to cancel deleting a grid and then go back and delete it', () => {
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

    // Open the delete grid modal and checks it contains the correct text
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.get(UniversalRuntimeSelectors.RemoveModalTitle)
      .contains(GridModalsText.DeleteGridModalTitle);
    cy.get(UniversalRuntimeSelectors.RemoveModalFirstLine)
      .contains(GridModalsText.DeleteGridModalFirstLine);
    cy.get(UniversalRuntimeSelectors.RemoveModalSecondLine)
      .contains(GridModalsText.DeleteGridModalSecondLine);
    cy.get(UniversalRuntimeSelectors.RemoveModalThirdLine)
      .contains(GridModalsText.DeleteGridModalThirdLine);
    cy.get(UniversalRuntimeSelectors.RemoveModalFourthLine)
      .contains(GridModalsText.DeleteGridModalFourthLine);
    cy.get(UniversalRuntimeSelectors.RemoveModalFifthLine)
      .contains(GridModalsText.DeleteGridModalFifthLine);
    cy.get(UniversalRuntimeSelectors.RemoveModalSixthLine)
      .contains(GridModalsText.DeleteGridModalSixthLine);

    // Cancel deleting the grid
    cy.dataTest(UniversalSelectors.CancelButton).click();
    cy.get(UniversalSelectors.ModalTitle).should('not.exist');

    // Open the delete grid modal
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Checks the grid has been deleted
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.DataSaved);
  });
});
