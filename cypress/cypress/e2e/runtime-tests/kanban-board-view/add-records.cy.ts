import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import BoardRuntimeSelectors from '../../../../models/selectors/runtime/board-runtime-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import RecordHistorySelectors from '../../../../models/selectors/runtime/record-history-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

describe('As a user I can add records to a kanban board', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Allows a project admin to add a new record to a Kanban board', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();

    // Clicks on the Kanban screen
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EventsBoardName), { timeout: 10000 }).should('exist').click();

    // Click to add a new card to the 'Meeting' column
    cy.get(BoardRuntimeSelectors.AddNewCard(AutomationProjectConstants.EventsBoardFirstColumnId))
      .click();
    cy.get(UniversalRuntimeSelectors.FirstFormFieldInput).type('New Event');
    cy.dataTest(UniversalRuntimeSelectors.SaveNewRecordInModal).click();

    // Check that the record has been added
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains('Event added');

    cy.get(EditGridInRuntimeSelectors.HistoryButton).click();
    cy.get(RecordHistorySelectors.AuditRowName('3')).contains('Event Type');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('3')).contains('Meeting');
    cy.get(RecordHistorySelectors.AuditRowName('2')).contains('Name');
    cy.get(RecordHistorySelectors.FirstAuditRowValue('2')).contains('New Event');
    cy.get(RecordHistorySelectors.CloseHistoryLog).click();

    // Delete the new record
    cy.get(UniversalSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains('Event deleted');
  });
});
