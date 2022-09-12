import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import AddRecordToGridSelectors from '../../../../models/selectors/runtime/add-record-to-grid-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

describe('As a user I can add records to tables in a many to many relationship ', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Creates a new many to many record with a new linked record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Clicks on a many to many table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ManyToManyBooksTableName))
      .click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Click to add a new row
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).click();

    // Fill in the text for the new record
    cy.get(AddRecordToGridSelectors.FirstField).type('Book Title');

    // Add a new linked record
    cy.get(AddRecordToGridSelectors.AddChildRecord).click();
    cy.dataTest(AddRecordToGridSelectors.AddNewChildRecord).click();
    // eslint-disable-next-line max-len
    cy.get(AddRecordToGridSelectors.EditableField(AutomationProjectConstants.FirstFieldAuthorTableId))
      .type('Sam');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();

    // Check the record has been added
    cy.get(UniversalSelectors.ToastContainer).contains('Book added');
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Book Title');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();
    cy.get(EditGridInRuntimeSelectors.FirstLinkedRecord).click();
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('1')).contains('Sam');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Delete the record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Author deleted');

    // Delete the linked record
    // eslint-disable-next-line max-len
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ManyToManyBooksTableName)).click();
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible');
    cy.get(GridRuntimeSelectors.SecondRecordInRelatedGridCheckbox).click();
    cy.dataTest(GridRuntimeSelectors.DeleteRecordsButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted 1 Record');
  });

  it('Creates a new many to many record with an already existing linked record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Click on a many to many table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ManyToManyBooksTableName))
      .click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Click to add a new row
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).click();

    // Fill in the text for the new record
    cy.get(AddRecordToGridSelectors.FirstField).type('Book Title');

    // Link an existing record
    cy.get(AddRecordToGridSelectors.AddChildRecord).click();
    cy.dataTest(AddRecordToGridSelectors.AddExistingChildRecord).click();
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstAuthorDocumentId)).trigger('mousedown').click();
    cy.dataTest(AddRecordToGridSelectors.SaveChildButton).click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();

    // Check the record has been created and the new one linked
    cy.get(UniversalSelectors.ToastContainer).contains('Book added');
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Book Title');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstAuthorDocumentId)).contains('Bob');

    // Delete the new record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Book deleted');
  });
});
