import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import WorkflowSelectors from '../../../../models/selectors/workflows/workflow-selectors';
import WorkflowErrorMessages from '../../../../models/text/workflow-text/error-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add a workflow with a webhook action and API Key Authentication if I create one correctly', () => {
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

  describe('As a project admin I can create a workflow with a webhook with an API key set', () => {
    it.each([
      'HeaderName',
      'Header-Name_',
    ])('if I use the valid header name "\'%s\'" ', (headerName) => {
    // Clicks on the created template project using its project Id
      cy.get(DashboardProjectSelectors.Project(projectId)).click();

      // Clicks on Automate
      cy.get(UniversalRuntimeSelectors.AutomateButton).click();

      // Creates a new workflow
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.get(WorkflowSelectors.SelectWorkflowTable('Project')).click();
      cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Webhook Workflow');

      // Drags the created workflow trigger on to the workflow builder canvas
      cy.gfDrag(
        WorkflowSelectors.SelectWorkflowBlock('Create Record'),
        WorkflowSelectors.WorkflowCanvas,
        300,
        100,
      );

      // Drags the webhook workflow action on to the workflow builder canvas
      cy.gfDrag(
        WorkflowSelectors.SelectWorkflowBlock('Send Webhook'),
        WorkflowSelectors.WorkflowCanvas,
        500,
        300,
      );

      // Adds in a webhook url
      cy.dataTest(WorkflowSelectors.WebhookAction).click();
      cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com');

      // Selects an Api key authentication type
      cy.get(WorkflowSelectors.SelectApiKeyAuth).click();
      cy.get(WorkflowSelectors.ApiKeyHeaderName).type(headerName);
      cy.get(WorkflowSelectors.ApiKeyValue).type('APIKey');

      // Saves the workflow
      cy.dataTest(WorkflowSelectors.ApplyButton).click();
      cy.dataTest(WorkflowSelectors.SaveButton).click();

      // Checks the workflow has been saved
      cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');

      // Delete Workflow
      cy.dataTest(WorkflowSelectors.DeleteButton).click();
      cy.dataTest(UniversalSelectors.ConfirmButton).click();
      cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
    });
  });

  it('Does not allows a project admin to create a workflow with a webhook with an API key set that does not have a header name', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on Automate
    cy.get(UniversalRuntimeSelectors.AutomateButton).click();

    // Creates a new workflow
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
    cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
    cy.get(WorkflowSelectors.SelectWorkflowTable('Project')).click();
    cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Webhook Workflow');

    // Drags the created workflow trigger on to the workflow builder canvas
    cy.gfDrag(
      WorkflowSelectors.SelectWorkflowBlock('Create Record'),
      WorkflowSelectors.WorkflowCanvas,
      300,
      100,
    );

    // Drags the webhook workflow action on to the workflow builder canvas
    cy.gfDrag(
      WorkflowSelectors.SelectWorkflowBlock('Send Webhook'),
      WorkflowSelectors.WorkflowCanvas,
      500,
      300,
    );

    // Adds in a webhook url
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com');

    // Selects an Api key authentication type
    cy.get(WorkflowSelectors.SelectApiKeyAuth).click();
    cy.get(WorkflowSelectors.ApiKeyValue).type('APIKey');

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks that the correct error message is triggered
    cy.get(WorkflowSelectors.WorkflowErrorMessage)
      .contains(WorkflowErrorMessages.HeaderNameIsRequired);
  });

  it('Does not allows a project admin to create a workflow with an API key set that does not have an API key value', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on Automate
    cy.get(UniversalRuntimeSelectors.AutomateButton).click();

    // Creates a new workflow
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
    cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
    cy.get(WorkflowSelectors.SelectWorkflowTable('Project')).click();
    cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Webhook Workflow');

    // Drags the created workflow trigger on to the workflow builder canvas
    cy.gfDrag(
      WorkflowSelectors.SelectWorkflowBlock('Create Record'),
      WorkflowSelectors.WorkflowCanvas,
      300,
      100,
    );

    // Drags the webhook workflow action on to the workflow builder canvas
    cy.gfDrag(
      WorkflowSelectors.SelectWorkflowBlock('Send Webhook'),
      WorkflowSelectors.WorkflowCanvas,
      500,
      300,
    );

    // Adds in a webhook url
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com');

    // Selects an Api key authentication type
    cy.get(WorkflowSelectors.SelectApiKeyAuth).click();
    cy.get(WorkflowSelectors.ApiKeyHeaderName).type('Header');

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks that the correct error message is triggered
    cy.get(WorkflowSelectors.WorkflowErrorMessage)
      .contains(WorkflowErrorMessages.ApiKeyIsRequired);
  });

  describe('As a project admin I can not create a workflow with a webhook with api authentication', () => {
    it.each([
      'Header name with spaces',
      'HeaderNameWithUnsupportedCharacters&£$%?',
    ])('if I use the invalid header name "\'%s\'" ', (headerName) => {
    // Clicks on the created template project using its project Id
      cy.get(DashboardProjectSelectors.Project(projectId)).click();

      // Clicks on Automate
      cy.get(UniversalRuntimeSelectors.AutomateButton).click();

      // Creates a new workflow
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.get(WorkflowSelectors.SelectWorkflowTable('Project')).click();
      cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Webhook Workflow');

      // Drags the created workflow trigger on to the workflow builder canvas
      cy.gfDrag(
        WorkflowSelectors.SelectWorkflowBlock('Create Record'),
        WorkflowSelectors.WorkflowCanvas,
        300,
        100,
      );

      // Drags the webhook workflow action on to the workflow builder canvas
      cy.gfDrag(
        WorkflowSelectors.SelectWorkflowBlock('Send Webhook'),
        WorkflowSelectors.WorkflowCanvas,
        500,
        300,
      );

      // Adds in a webhook url
      cy.dataTest(WorkflowSelectors.WebhookAction).click();
      cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com');

      // Selects an Api key authentication type
      cy.get(WorkflowSelectors.SelectApiKeyAuth).click();
      cy.get(WorkflowSelectors.ApiKeyHeaderName).type(headerName);
      cy.get(WorkflowSelectors.ApiKeyValue).type('APIKey');

      // Saves the workflow
      cy.dataTest(WorkflowSelectors.ApplyButton).click();
      cy.dataTest(WorkflowSelectors.SaveButton).click();

      // Checks that the correct error message is triggered
      cy.get(WorkflowSelectors.WorkflowErrorMessage)
        .contains(WorkflowErrorMessages.InvalidHeaderName);
    });
  });
});
