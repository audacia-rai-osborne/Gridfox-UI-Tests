import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import AddRecordToGridSelectors from '../../../../models/selectors/runtime/add-record-to-grid-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

describe('As a user I can edit records in parent child tables ', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Adds a new child record to an existing parent record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Click on a record
    cy.get(GridRuntimeSelectors.RuntimeSearchScreen).should('be.visible');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstParentDocumentId)).should('be.visible')
      .click();

    // Add a new child record
    cy.get(AddRecordToGridSelectors.AddChildRecord).click();
    cy.get(EditGridInRuntimeSelectors.NoResultsInGridMessage, { timeout: 10000 }).should('be.visible');
    cy.dataTest(AddRecordToGridSelectors.AddNewChildRecord).click();
    cy.get(EditGridInRuntimeSelectors.CreateChildFields(AutomationProjectConstants.ChildTableSecondFieldName)).type('Task A');
    cy.dataTest(EditGridInRuntimeSelectors.SaveButtonAddChild).click();

    // Check the record has been added
    cy.get(UniversalSelectors.ToastContainer).contains('Task added');
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('1')).contains('Project');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('1'))
      .contains(AutomationProjectConstants.FirstParentRecordRefFieldValue);
    cy.get(RecordHistorySelectors.AuditRowName('3')).contains('Task Name');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Delete Child Record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Task deleted');
  });

  it('Links an existing child record to an existing parent record and then unlinks it', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Click on a parent record
    cy.get(GridRuntimeSelectors.RuntimeSearchScreen).should('be.visible');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstParentDocumentId))
      .click();

    // Link an existing child record
    cy.get(AddRecordToGridSelectors.AddChildRecord).should('be.visible').click();
    cy.dataTest(AddRecordToGridSelectors.AddExistingChildRecord).click();
    cy.get(EditGridInRuntimeSelectors.LoadingSpinner).should('not.exist');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstChildDocumentId))
      .click();
    cy.dataTest(AddRecordToGridSelectors.SaveChildButton).click();
    cy.get(AddRecordToGridSelectors.SaveButton).click();

    // Check the record has been linked
    cy.get(UniversalSelectors.ToastContainer).contains('Task added');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstChildDocumentId))
      .contains('Website Redesign');

    // Unlinks records
    cy.get(EditGridInRuntimeSelectors.FirstFieldsCheckbox).click();
    cy.dataTest(EditGridInRuntimeSelectors.UnlinkSelectedButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Unlinked 1 Record');
  });

  it('Adds a new parent record to an existing child record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Click on child table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ChildTablePluralName))
      .click();

    // Click on a record
    cy.get(GridRuntimeSelectors.RuntimeSearchScreen).should('be.visible');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstChildDocumentId)).should('be.visible', { timeout: 15000 })
      .click();

    // Add a parent record
    cy.dataTest(AddRecordToGridSelectors.NewParentRecordButton).click();
    cy.get(AddRecordToGridSelectors.FirstFieldInModal).first().type('New Project');
    cy.dataTest(AddRecordToGridSelectors.ApplyButton).click();
    cy.get(UniversalSelectors.Modal).should('not.exist');
    cy.get(AddRecordToGridSelectors.SaveButton).click();

    // Check the record has been added
    cy.get(UniversalSelectors.ToastContainer).contains('Task saved');
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
    cy.get(EditGridInRuntimeSelectors.LinkToParentRecord).click();
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('New Project');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Delete Parent Record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Project deleted');
  });

  it('Links an existing parent record to an existing child record and then unlinks it', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Click on child table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ChildTablePluralName))
      .click();

    // Click on a record
    cy.get(GridRuntimeSelectors.RuntimeSearchScreen).should('be.visible');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstChildDocumentId))
      .click();

    // Links an existing parent record
    cy.get(AddRecordToGridSelectors.ExistingParentRecord).click();
    // eslint-disable-next-line max-len
    cy.get(AddRecordToGridSelectors.ParentRecordInSetParentDropdown(AutomationProjectConstants.FirstParentRecordRefFieldValue))
      .click();
    cy.get(AddRecordToGridSelectors.SaveButton).click();

    // Check the record has been linked
    cy.get(UniversalSelectors.ToastContainer).contains('Task saved');
    cy.get(EditGridInRuntimeSelectors.LinkToParentRecord)
      .contains(AutomationProjectConstants.FirstParentRecordRefFieldValue);

    // Remove link to parent record
    cy.get(AddRecordToGridSelectors.ExistingParentRecord).click();
    cy.dataTest(EditGridInRuntimeSelectors.ParentFieldNotSet).click();
    cy.get(AddRecordToGridSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Task saved');
  });
});
