import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import InlineEditorSelectors from '../../../../models/selectors/runtime/inline-editor-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can edit the height of records in a table', () => {
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

  it('Allows the user to edit the height of records in a table to small, medium and large', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Check that the first grid is visible
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Set the records so their height is medium
    cy.dataTest(GridRuntimeSelectors.GridDisplayModeMedium).click();

    // Check the records now have a medium height
    cy.get(GridRuntimeSelectors.MediumDisplayMode).should('exist');
    cy.get(GridRuntimeSelectors.SmallDisplayMode).should('not.exist');

    // Set the records so their height is large
    cy.dataTest(GridRuntimeSelectors.GridDisplayModeLarge).click();

    // Check the records now have a large height
    cy.get(GridRuntimeSelectors.LargeDisplayMode).should('exist');
    cy.get(GridRuntimeSelectors.MediumDisplayMode).should('not.exist');

    // Set the records so their height is small
    cy.dataTest(GridRuntimeSelectors.GridDisplayModeSmall).click();

    // Check the records now have a small height
    cy.get(GridRuntimeSelectors.SmallDisplayMode).should('exist');
    cy.get(GridRuntimeSelectors.LargeDisplayMode).should('not.exist');
  });

  it('Allows the user to access inline edit mode when the columns are set to any height', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Check that the first grid is visible
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Set the records so their height is medium
    cy.dataTest(GridRuntimeSelectors.GridDisplayModeMedium).click();

    // Check the records now have a medium height
    cy.get(GridRuntimeSelectors.MediumDisplayMode).should('exist');
    cy.get(GridRuntimeSelectors.SmallDisplayMode).should('not.exist');

    // Check the user can access inline edit mode
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Check the user is in inline edit mode
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('be.visible');

    // Turn off inline edit mode
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Set the records so their height is large
    cy.dataTest(GridRuntimeSelectors.GridDisplayModeLarge).click();

    // Check the records now have a large height
    cy.get(GridRuntimeSelectors.LargeDisplayMode).should('exist');
    cy.get(GridRuntimeSelectors.MediumDisplayMode).should('not.exist');

    // Check the user can access inline edit mode
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Check the user is in inline edit mode
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('be.visible');

    // Turn off inline edit mode
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Set the records so their height is small
    cy.dataTest(GridRuntimeSelectors.GridDisplayModeSmall).click();

    // Check the records now have a small height
    cy.get(GridRuntimeSelectors.SmallDisplayMode).should('exist');
    cy.get(GridRuntimeSelectors.LargeDisplayMode).should('not.exist');

    // Check the user can access inline edit mode
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Check the user is in inline edit mode
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('be.visible');
  });
});
