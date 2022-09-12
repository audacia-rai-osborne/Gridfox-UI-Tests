import DateFormatter from '../../../../helpers/date/date-formatter';
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

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add records to a table ', () => {
  before(() => {
    cy.login();
    cy.visit(Routes.Dashboard).then(() => {
      // Copies the UI automation template project by calling the API
      cy.copyTemplateProject(AutomationProjectConstants.AccountId, TemplateProjectConstants.UIAutomationProject, 'UI Automation Project').then((response) => { projectId = response; });
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

  it('Adds a new record with a value in a text field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('Text 1')).type('Some text');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Text 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Some text');
  });

  it('Adds a new record with a value in a list field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Click to enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('List 1')).click({ scrollBehavior: false });
    cy.get(UniversalSelectors.DropdownOptions('1')).click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('List 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('List Item 1');
  });

  it('Adds a new record with a value in a user field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('User 1')).click({ scrollBehavior: false });
    cy.get(UniversalSelectors.DropdownOptions('1')).contains('Automation Tests').click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('User 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Automation Tests');
  });

  it('Adds a new record with a value in a text area field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('Text Area 1')).type('Some text');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Text Area 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Some text');
  });

  it('Adds a new record with a value in a rich text field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('Rich Text 1')).type('Some text');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Rich Text 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('Some text');
  });

  it('Adds a new record with a value in a number field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('Number 1')).type('100.1');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Number 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains(100.1);
  });

  it('Adds a new record with a value in a money field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('Money 1')).type('23.4');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Money 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('£23.40');
  });

  it('Adds a new record with a value in a percentage field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('Percentage 1')).type('50');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Percentage 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains(0.5);
  });

  it('Adds a new record with a value in a date field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.GetDatePickerForField('Date 1')).type('8 Dec 2021');
    cy.get(AddRecordToGridSelectors.PageBackdrop).click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Date 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains(new DateFormatter(2021, 12, 8).toDate());
  });

  it('Adds a new record with a value in a date time field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.GetDatePickerForField('Date Time 1')).type('8 Dec 2021, 21:15');
    cy.get(AddRecordToGridSelectors.PageBackdrop).click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Date Time 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2'))
      .contains(new DateFormatter(2021, 12, 8, 21, 15).toDateTime());
  });

  it('Adds a new record with a ticked checkbox', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.CheckCheckboxField('Checkbox 1')).click();
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Checkbox 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('true');
  });

  it('Adds a new record with a url in a url field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Click to add a new row
    cy.get(GridRuntimeSelectors.RowLink).should('be.visible');
    cy.dataTest(GridRuntimeSelectors.AddRowButton).click();

    // Enter details for the record
    cy.get(AddRecordToGridSelectors.AddDataToField('URL 1')).type('https://app.gridfox-dev.com');
    cy.dataTest(AddRecordToGridSelectors.NewRecordSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Table with every field added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('5')).contains('URL 1');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('5')).contains('https://app.gridfox-dev.com');
  });
});
