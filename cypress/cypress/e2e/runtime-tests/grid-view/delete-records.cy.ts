import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import AddRecordToGridSelectors from '../../../../models/selectors/runtime/add-record-to-grid-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import RecordsText from '../../../../models/text/runtime-text/records-text';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can delete records in a table ', () => {
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

  it('Allows an account admin to cancel deleting a record in the delete modal and then choose to delete it', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible').click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('Text 1')).type('Some text');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Text 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Some text');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Choose to delete the record
    cy.get(UniversalSelectors.DeleteButton).click();

    // Check that the modal contains the correct text
    cy.get(UniversalSelectors.ModalTitle).contains(RecordsText.DeleteModalText);

    // Cancel deleting the record
    cy.dataTest(UniversalSelectors.CancelButton).click();
    cy.get(UniversalSelectors.ModalTitle).should('not.exist');

    // Delete the new record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field deleted');
  });
});
