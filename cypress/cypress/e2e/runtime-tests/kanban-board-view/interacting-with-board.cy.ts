import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import BoardRuntimeSelectors from '../../../../models/selectors/runtime/board-runtime-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can interact with a kanban board in runtime', () => {
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

  it('Allows a user to filter cards on a Kanban board', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the Kanban screen
    // eslint-disable-next-line max-len
    cy.get(GridRuntimeSelectors.RuntimeSearchScreen).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EventsBoardName))
      .should('exist').click();
    cy.get(BoardRuntimeSelectors.KanbanBoard).should('be.visible');

    // Opens the search filter
    cy.dataTest(UniversalRuntimeSelectors.OpenFilterButton).click();

    // Select to add a new condition
    cy.get(UniversalRuntimeSelectors.AddConditionButton).click();

    // Open the dropdown of fields to filter by
    cy.get(UniversalRuntimeSelectors.FieldDropdown).click();

    // Select to filter by the name field
    cy.get(UniversalSelectors.DropdownOptions('10')).click();

    // Searches for cards with names that contain the word testing
    cy.get(UniversalRuntimeSelectors.FirstFieldInSearchInput).type('Testing');
    cy.get(UniversalRuntimeSelectors.ApplyFilterButton).click();

    // Checks only the correct cards are returned
    cy.get(BoardRuntimeSelectors.KanbanBoard).contains('Testing Conference');
    cy.get(BoardRuntimeSelectors.KanbanBoard).should('not.contain', 'Planning Meeting');
  });
});
