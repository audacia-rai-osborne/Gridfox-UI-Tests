import AutomationProjectConstants from '../../../../../models/constants/automation-project-constants';
import Routes from '../../../../../models/routes';
import DashboardProjectSelectors from '../../../../../models/selectors/dashboard/project-selectors';
import EditGridInRuntimeSelectors from '../../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../../models/selectors/universal/universal-selectors';

describe('As a user I can filter by a multi select user field', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Filters by a multi select user field on a grid view by is exactly', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Opens the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();

    // Selects to add a condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Opens the field dropdown
    cy.get(UniversalRuntimeSelectors.OpenFilterDropdownButton).should('be.visible').click();

    // Selects the multi select user field (Am aware this is not the best and will get a selector put in)
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Click on the drop down list to select some users to filter by
    cy.get(UniversalRuntimeSelectors.SelectFieldsToFilterBy).click();

    // Select the users to filter by
    cy.get(UniversalSelectors.DropdownOptions('1')).click();
    cy.get(UniversalSelectors.DropdownOptions('2')).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the apply filter button to apply the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(UniversalSelectors.Modal).contains('Automation Tests, Gridfox Test');
    cy.get(UniversalSelectors.Modal).contains('Planning');
  });

  it('Filters by a multi select user field on a grid view by has any of', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Opens the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();

    // Selects to add a condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Opens the field dropdown
    cy.get(UniversalRuntimeSelectors.OpenFilterDropdownButton).click();

    // Selects the multi select user field (Am aware this is not the best and will get a selector put in)
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Change the filter condition to be any of
    cy.get(UniversalRuntimeSelectors.FilterConditionDropdown).click();
    cy.get(UniversalRuntimeSelectors.HasAnyOfCondition).click();

    // Click on the drop down list to select some users to filter by
    cy.get(UniversalRuntimeSelectors.SelectFieldsToFilterBy).click();

    // Select the users to filter by
    cy.get(UniversalSelectors.DropdownOptions('4')).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the apply filter button to apply the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(UniversalSelectors.Modal).contains('Gridfox Test, Load Test User 6');
    cy.get(UniversalSelectors.Modal).contains('Estimation');
  });

  it('Filters by a multi select user field on a grid view by is unset', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Opens the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();

    // Selects to add a condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Opens the field dropdown
    cy.get(UniversalRuntimeSelectors.OpenFilterDropdownButton).click();

    // Selects the multi select user field (Am aware this is not the best and will get a selector put in)
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Change the filter condition to be unset
    cy.get(UniversalRuntimeSelectors.FilterConditionDropdown).click();
    cy.get(UniversalRuntimeSelectors.IsUnsetCondition).click();

    // Check the input to add users is disabled
    cy.get(UniversalRuntimeSelectors.SelectFieldsToFilterBy).should('not.be.enabled');

    // Click on the apply filter button to apply the filter
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(RecordHistorySelectors.FirstAuditRowValue('3')).contains('Team catch up');
  });

  it('Allows a user to use quick search to filter by a multi select user field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Use quick search to search for the value in the multi select user field
    cy.get(UniversalRuntimeSelectors.QuickSearchButton).type('Load Test User 6{enter}');

    // Click on the returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(UniversalSelectors.Modal).contains('Gridfox Test, Load Test User 6');
    cy.get(UniversalSelectors.Modal).contains('Estimation');
  });

  it('Saves a saved filter containing a multi select user field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Opens the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();

    // Selects to add a condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Opens the field dropdown
    cy.get(UniversalRuntimeSelectors.OpenFilterDropdownButton).click();

    // Selects the multi select user field (Am aware this is not the best and will get a selector put in)
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Click on the drop down list to select some users to filter by
    cy.get(UniversalRuntimeSelectors.SelectFieldsToFilterBy).click();

    // Select the users to filter by
    cy.get(UniversalSelectors.DropdownOptions('1')).click();
    cy.get(UniversalSelectors.DropdownOptions('2')).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the apply filter button to apply the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Click to save the filter
    cy.get(UniversalRuntimeSelectors.OpenSaveFilterModal).click();

    // Name the saved filter
    cy.get(UniversalRuntimeSelectors.SaveFilterNameInput).type('New screen filter');

    // Save the saved filter
    cy.get(UniversalRuntimeSelectors.SaveFilterButton).click();

    // Click on the screen filter
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });
    cy.dataTest(UniversalRuntimeSelectors.ClickOnSaveFilter).contains('New screen filter').click();

    // Click on the returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(RecordHistorySelectors.FirstAuditRowValue('1')).contains('Automation Tests, Gridfox Test');
    cy.get(UniversalSelectors.Modal).contains('Planning');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Go back to filter
    cy.dataTest(UniversalRuntimeSelectors.ClickOnSaveFilter).contains('New screen filter').click();
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();

    // Click to delete the filter
    cy.get(UniversalSelectors.ButtonDelete).click();
    cy.get(UniversalSelectors.ModalTitle).contains('Are you sure you want to delete New screen filter?');
    cy.get(UniversalSelectors.ModalSmallGreyText).contains('All dashboard components that use this screen filter will be hidden.');

    // Confirm that you want to delete the filter
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
  });

  it('Filters by @Me in a multi select user field on a grid view by is exactly', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Opens the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();

    // Selects to add a condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Opens the field dropdown
    cy.get(UniversalRuntimeSelectors.OpenFilterDropdownButton).click();

    // Selects the multi select user field (Am aware this is not the best and will get a selector put in)
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Click on the drop down list to select some users to filter by
    cy.get(UniversalRuntimeSelectors.SelectFieldsToFilterBy).click();

    // Select the users to filter by
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the apply filter button to apply the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(UniversalSelectors.Modal).contains('Automation Tests');
    cy.get(UniversalSelectors.Modal).contains('Stand up');
  });

  it('Filters by a parent multi select user field on a grid view by is exactly', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Click on the meetings rooms table
    cy.get(UniversalRuntimeSelectors.Screen('Meeting Rooms')).click();
    cy.get(UniversalRuntimeSelectors.Screen('Meeting Rooms'), { timeout: 10000 }).should('be.visible');

    // Opens the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.FilterModal).should('be.visible');

    // Selects to add a condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Opens the field dropdown
    cy.get(UniversalRuntimeSelectors.OpenFilterDropdownButton).click();

    // Selects the parent table
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Selects the multi select user field in the parent table
    cy.get(UniversalRuntimeSelectors.ParentFieldFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Click on the drop down list to select some users to filter by
    cy.get(UniversalRuntimeSelectors.SelectFieldsToFilterBy).click();

    // Select the user to filter by
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the apply filter button to apply the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(RecordHistorySelectors.FirstAuditRowValue('3')).contains('Room 1');
  });

  it('Filters by a parent multi select user field on a grid view by @Me and has any of', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.MultiSelectUsersProject))
      .click();
    cy.get(UniversalRuntimeSelectors.Screen('Meetings'), { timeout: 10000 }).should('be.visible');

    // Click on the meetings rooms table
    cy.get(UniversalRuntimeSelectors.Screen('Meeting Rooms')).click();
    cy.get(UniversalRuntimeSelectors.Screen('Meeting Rooms'), { timeout: 10000 }).should('be.visible');

    // Opens the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.FilterModal).should('be.visible');

    // Selects to add a condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Opens the field dropdown
    cy.get(UniversalRuntimeSelectors.OpenFilterDropdownButton).click();

    // Selects the parent table
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Selects the multi select user field in the parent table
    cy.get(UniversalRuntimeSelectors.ParentFieldFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Change the filter condition to be any of
    cy.get(UniversalRuntimeSelectors.FilterConditionDropdown).click();
    cy.get(UniversalRuntimeSelectors.HasAnyOfCondition).click();

    // Click on the drop down list to select some users to filter by
    cy.get(UniversalRuntimeSelectors.SelectFieldsToFilterBy).click();

    // Select the users to filter by
    cy.get(UniversalSelectors.DropdownOptions('0')).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the apply filter button to apply the filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Click on the backdrop to close the dropdown
    cy.get(UniversalSelectors.Backdrop).first().click({ force: true });

    // Click on the first returned record
    cy.get(GridRuntimeSelectors.FirstRecordInGrid).should('be.visible').click();

    // Click on the history of the returned record
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();

    // Check that the correct record was returned
    cy.get(RecordHistorySelectors.FirstAuditRowValue('3')).contains('Room 1');
  });
});
