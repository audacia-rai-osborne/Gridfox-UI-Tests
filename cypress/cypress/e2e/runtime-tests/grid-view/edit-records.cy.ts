import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

describe('As a user I can edit records in a table ', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  afterEach(() => {
    cy.dismissAllToasts();
  });
  // Issue with clearing fields triggering a delete popup
  it.skip('Edits text field value in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Clicks on a table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Click on a row
    // eslint-disable-next-line max-len
    cy.get(GridRuntimeSelectors.FirstColumnInRow(AutomationProjectConstants.AllFieldsFirstRecordDocumentId))
      .click();

    // Enter details for the record
    cy.get(EditGridInRuntimeSelectors.Content).should('be.visible');
    cy.get(EditGridInRuntimeSelectors.EditDataInTextField('Text 1')).clear().type('Edit text field value');
    cy.dataTest(UniversalSelectors.CancelButton).click();

    // Save record
    cy.get(EditGridInRuntimeSelectors.RuntimeSaveRecordButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field saved');

    // Check that the record has been edited
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('1')).contains('Text 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Edit text field value');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Reset text field value
    cy.get(EditGridInRuntimeSelectors.EditDataInTextField('Text 1')).clear().type('Some text');
    cy.dataTest(UniversalSelectors.CancelButton).click();
    cy.get(EditGridInRuntimeSelectors.RuntimeSaveRecordButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field saved');
  });
});
