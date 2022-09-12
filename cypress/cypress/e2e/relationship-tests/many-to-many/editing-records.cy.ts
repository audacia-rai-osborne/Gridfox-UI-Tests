import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import AddRecordToGridSelectors from '../../../../models/selectors/runtime/add-record-to-grid-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

describe('As a user I can edit records in tables in a many to many relationship ', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Edits a many to many record and adds a new linked record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Clicks on a many to many table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ManyToManyBooksTableName))
      .click();

    // Click on a record
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstBooksDocumentId))
      .should('be.visible');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstBooksDocumentId))
      .click();

    // Add a new linked record
    cy.get(AddRecordToGridSelectors.AddChildRecord).click();
    cy.dataTest(AddRecordToGridSelectors.AddNewChildRecord).click();
    // eslint-disable-next-line max-len
    cy.get(AddRecordToGridSelectors.EditableFieldInModal(AutomationProjectConstants.BooksNameFieldName))
      .type('Author');
    cy.dataTest(AddRecordToGridSelectors.CreateLinkedRecordForExistingRecordButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Author added');

    // Check the new record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('1')).contains('Author');
    cy.get(RecordHistorySelectors.CloseHistoryLog).should('be.visible').click();

    // Delete the record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Author deleted');
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
  });

  it('Edits a many to many record and links an existing record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Clicks on a many to many table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ManyToManyBooksTableName))
      .click();

    // Click on a record
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstBooksDocumentId))
      .should('be.visible');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstBooksDocumentId))
      .click();

    // Link an existing record
    cy.get(AddRecordToGridSelectors.AddChildRecord).click();
    cy.dataTest(AddRecordToGridSelectors.AddExistingChildRecord).click();
    cy.get(UniversalSelectors.Spinner).should('not.exist');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstAuthorDocumentId)).should('be.visible').click();
    cy.dataTest(AddRecordToGridSelectors.SaveChildButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Author added');
    cy.get(AddRecordToGridSelectors.SaveButton).click();
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
    cy.get(UniversalSelectors.Spinner).should('not.exist');
    cy.get(UniversalSelectors.ToastContainer, { timeout: 20000 }).should('be.visible');

    // Check the new record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('1')).contains('Walking in the Yorkshire Dales');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstAuthorDocumentId)).contains('Bob');

    // Unlinks records
    cy.get(EditGridInRuntimeSelectors.FirstFieldsCheckbox).should('be.visible').click();
    cy.dataTest(EditGridInRuntimeSelectors.UnlinkSelectedButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
    cy.get(UniversalRuntimeSelectors.NoResults).should('be.visible');
  });
});
