import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import AddRecordToGridSelectors from '../../../../models/selectors/runtime/add-record-to-grid-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

describe('As a user I can add records to parent child tables ', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Creates a new parent record with a new child record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Click to add a new row
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).click();

    // Add the parent record
    cy.get(AddRecordToGridSelectors.FirstField).type('Project Name');

    // Add a new child record
    cy.get(AddRecordToGridSelectors.AddChildRecord).click();
    cy.dataTest(AddRecordToGridSelectors.AddNewChildRecord).click();
    cy.get(AddRecordToGridSelectors.EditableField(AutomationProjectConstants.FirstFieldChildRecord)).type('Task A');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();

    // Check the record has been added
    cy.get(UniversalSelectors.ToastContainer).contains('Project added');
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Project Name');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();
    cy.get(EditGridInRuntimeSelectors.FirstLinkedRecord).click();
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('3')).contains('Task A');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Delete Child Record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Task deleted');
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');

    // Delete Parent Record
    // eslint-disable-next-line max-len
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ParentTablePluralName)).click();
    cy.get(GridRuntimeSelectors.SecondRecordInRelatedGrid).should('be.visible').click();
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
    cy.get(UniversalSelectors.ToastContainer).contains('Project deleted');
  });

  it('Creates a new parent record with a child record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Click to add a new row
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).click();

    // Add the parent record
    cy.get(AddRecordToGridSelectors.FirstField).type('Project Name');

    // Link an existing child record
    cy.get(AddRecordToGridSelectors.AddChildRecord).click();
    cy.dataTest(AddRecordToGridSelectors.AddExistingChildRecord).should('be.visible').click();
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstChildDocumentId))
      .click();
    cy.dataTest(AddRecordToGridSelectors.SaveChildButton).click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();

    // Check the record has been added
    cy.get(UniversalSelectors.ToastContainer).contains('Project added');
    cy.get(GridRuntimeSelectors.Row(AutomationProjectConstants.FirstChildDocumentId))
      .contains('Website Redesign');

    // Delete new parent record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
    cy.get(UniversalSelectors.ToastContainer).contains('Project deleted');
  });

  it('Creates a new child record with a new parent record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Click on child table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ChildTablePluralName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).click();

    // Add the child record
    cy.get(AddRecordToGridSelectors.SecondField).type('New Task');

    // Add a parent record
    cy.dataTest(AddRecordToGridSelectors.NewParentRecordButton).click();
    cy.get(AddRecordToGridSelectors.FirstFieldInParentRecord).first().type('New Project');
    cy.dataTest(AddRecordToGridSelectors.ApplyButton).click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();

    // Check the record has been added
    cy.get(UniversalSelectors.ToastContainer).contains('Task added');
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('3')).contains('New Task');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();
    cy.get(EditGridInRuntimeSelectors.LinkToParentRecord).click();
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('New Project');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Delete Parent Record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Project deleted');

    // Delete Child Record
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ChildTablePluralName))
      .click();
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible');
    cy.get(GridRuntimeSelectors.ThirdRecordInRelatedGridCheckbox).click();
    cy.dataTest(GridRuntimeSelectors.DeleteRecordsButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted 1 Record');
  });

  it('Creates a child record that is linked to an already existing parent record', () => {
    // Click on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Click on child table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.ChildTablePluralName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).click();

    // Add the child record
    cy.get(AddRecordToGridSelectors.SecondField).type('New Task');

    // Link an existing parent record
    cy.get(AddRecordToGridSelectors.ExistingParentRecord).click();
    // eslint-disable-next-line max-len
    cy.get(AddRecordToGridSelectors.ParentRecordInSetParentDropdown(AutomationProjectConstants.FirstParentRecordRefFieldValue)).scrollIntoView().should('be.visible').click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();

    // Check the record has been added
    cy.get(UniversalSelectors.ToastContainer).contains('Task added');
    cy.get(EditGridInRuntimeSelectors.LinkToParentRecord)
      .contains(AutomationProjectConstants.FirstParentRecordRefFieldValue).should('be.visible');

    // Delete Child Record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Task deleted');
  });
});
