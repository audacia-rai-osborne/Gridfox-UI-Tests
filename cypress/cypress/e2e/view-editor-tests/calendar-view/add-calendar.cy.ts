import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import CalendarEditViewSelectors from '../../../../models/selectors/edit-view/calendar-edit-view-selectors';
import UniversalRuntimeEditorSelectors from '../../../../models/selectors/edit-view/universal-edit-view-selectors';
import CalendarRuntimeSelectors from '../../../../models/selectors/runtime/calendar-runtime-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import CalendarText from '../../../../models/text/view-editor-text/calendar-text';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

// These will be rewritten in the next sprint when we change calendars
describe('As a user I can add a calendar if I create one correctly', () => {
  before(() => {
    cy.dismissAllToasts();
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

  after(() => {
    // Deletes the template project from its id
    cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  });

  it('Does not allow a project admin to create a calendar without a title', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();

    // Do not type in a name and attempt to create the calendar
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).should('not.be.enabled');
  });

  it('Does not allow an account admin to add a calendar view without specfiying a grid', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 15000 }).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Grid Calendar');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Do not select a grid to set for the calendar
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Check the correct validation message is returned
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(CalendarText.SelectATable);
  });

  it('Does not allow an account admin to add a calendar view without specfiying a start date', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 15000 }).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Grid Calendar');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a grid to set for the calendar
    cy.get(CalendarEditViewSelectors.SelectListOption('Event')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Do not select a start date to set for the calendar
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Check that the correct validation message is returned
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(CalendarText.SelectAStartDate);
  });

  it('Does not allow an account admin to add a calendar view without specfiying an end date', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 15000 }).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Grid Calendar');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a grid to set for the calendar
    cy.get(CalendarEditViewSelectors.SelectListOption('Event')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select a start date to set for the calendar
    cy.get(CalendarEditViewSelectors.SelectListOption('Start Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Do not select an end date for the calendar
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Check that the correct validation message is returned
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(CalendarText.SelectAnEndDate);
  });

  // I can currently add a calendar when the start and end date are different field types
  it.skip('Does not allow an account admin to add a calendar view where the end date is in a different format to the start date', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 15000 }).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Grid Calendar');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a grid to set for the calendar
    cy.get(CalendarEditViewSelectors.SelectListOption('Event')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select a start date that is a date field
    cy.get(CalendarEditViewSelectors.SelectListOption('Start Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select an end date that is a date time field
    cy.get(CalendarEditViewSelectors.SelectListOption('End Date Time')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Check that the correct validation is returned
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(CalendarText.SelectAnEndDate);
  });

  it('Does not allow an account admin to add a calendar view without a title', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 15000 }).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Grid Calendar');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a grid to set for the calendar
    cy.get(CalendarEditViewSelectors.SelectListOption('Event')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select a start date that is a date field
    cy.get(CalendarEditViewSelectors.SelectListOption('Start Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select an end date that is a date field
    cy.get(CalendarEditViewSelectors.SelectListOption('End Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Do not select a calendar title
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Check that the correct validation is returned
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(CalendarText.SelectATitleField);
  });

  it('Allows an account admin to create a calendar', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 15000 }).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('1 New Grid Calendar');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a grid to set for the calendar
    cy.get(CalendarEditViewSelectors.SelectListOption('Event')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select a start date that is a date field
    cy.get(CalendarEditViewSelectors.SelectListOption('Start Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select an end date that is a date field
    cy.get(CalendarEditViewSelectors.SelectListOption('End Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select a calendar title
    cy.get(CalendarEditViewSelectors.SelectListOption('Name')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Save the calendar
    cy.dataTest(CalendarEditViewSelectors.CalendarSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains('Screen created');

    // Check the correct calendar has been created
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.get(UniversalRuntimeSelectors.Screen('1 New Grid Calendar')).click();

    // Check the calendar is in week view
    cy.get(CalendarRuntimeSelectors.MiniCalendar).should('be.visible');
    cy.get(CalendarRuntimeSelectors.MonthViewWeekHeader).should('be.visible');
  });

  it('Allows an account admin to create a calendar with a description field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 15000 }).should('be.visible');

    // Clicks on the button to add a new calendar
    cy.dataTest(UniversalRuntimeSelectors.NewCalendarButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('1 New Grid Calendar');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a grid to set for the calendar
    cy.get(CalendarEditViewSelectors.SelectListOption('Event')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select a start date that is a date field
    cy.get(CalendarEditViewSelectors.SelectListOption('Start Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select an end date that is a date field
    cy.get(CalendarEditViewSelectors.SelectListOption('End Date')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Select a calendar title
    cy.get(CalendarEditViewSelectors.SelectListOption('Name')).click();
    cy.dataTest(CalendarEditViewSelectors.CalendarNextButton).click();

    // Save the calendar
    cy.dataTest(CalendarEditViewSelectors.CalendarSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains('Screen created');

    // Set the calendars description field
    cy.dataTest(CalendarRuntimeSelectors.DescriptionField).click();
    cy.get(CalendarEditViewSelectors.SelectListOption('Name')).click();

    // Save your changes
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains('Screen saved');

    // Check the correct calendar has been created
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.get(UniversalRuntimeSelectors.Screen('1 New Grid Calendar')).click();

    // Check the calendar is in week view
    cy.get(CalendarRuntimeSelectors.MiniCalendar).should('be.visible');
    cy.get(CalendarRuntimeSelectors.MonthViewWeekHeader).should('be.visible');
  });
});
