import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import CalendarRuntimeSelectors from '../../../../models/selectors/runtime/calendar-runtime-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a project admin I can add a record to a calendar', () => {
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

  it('Allows an account admin to add a record to a calendar', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the events calendar
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EventsCalendarName))
      .click();
    cy.get(CalendarRuntimeSelectors.CalendarSidebar).should('be.visible');

    // Add a new event to the calendar
    cy.dataTest(UniversalRuntimeSelectors.AddRecord).click();
    cy.get(UniversalRuntimeSelectors.FirstFormFieldInput).type('New Event');
    cy.dataTest(UniversalRuntimeSelectors.SaveNewRecordInModal).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Event added');

    // Check that the record has been added
    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Name');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('New Event');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Delete the new record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Event deleted');
  });
});
