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

describe('As a user I can add a workflow with a HTTP (webhooks) action if I create one correctly', () => {
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

  it('Allows a project admin to create a workflow with a webhook action', () => {
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
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks the workflow has been saved correctly
    cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
    cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');

    // Delete Workflow
    cy.dataTest(WorkflowSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
  });

  it('Does not allow a project admin to create a webhook workflow without specifiying a webhook URL', () => {
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

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Check an error message appears asking the user to enter a workflow URL
    cy.get(WorkflowSelectors.WorkflowErrorMessage).contains(WorkflowErrorMessages.NoWebhookURL);
  });

  it('Does not allow a project admin to create a webhook workflow with spaces in the webhook URL', () => {
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

    // Adds in a webhook url with spaces in it
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app .gridfox-dev.com');
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Check an error message appears asking the user to enter a workflow URL
    cy.get(WorkflowSelectors.WorkflowErrorMessage)
      .contains(WorkflowErrorMessages.InvalidWebhookURL);
  });

  it('Does not allow a project admin to create a webhook workflow with a webhook URL that is incorrectly escaped', () => {
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

    // Adds in a webhook url that is incorrectly escaped
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com/path%ZZ');
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Check an error message appears asking the user to enter a workflow URL
    cy.get(WorkflowSelectors.WorkflowErrorMessage)
      .contains(WorkflowErrorMessages.InvalidWebhookURL);
  });

  it('Does not allow a project admin to create a webhook workflow with a webhook url that is a file path', () => {
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

    // Adds in a webhook url with spaces in it
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.dataTest(WorkflowSelectors.WebhookUrl).type('C:\\Testing\\TestData');
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Check an error message appears asking the user to enter a workflow URL
    cy.get(WorkflowSelectors.WorkflowErrorMessage)
      .contains(WorkflowErrorMessages.NoProtocolInWebhookURL);
  });

  it('Does not allow a project admin to create a webhook workflow with a webhook url that does not have a protocol', () => {
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

    // Adds in a webhook url with spaces in it
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.dataTest(WorkflowSelectors.WebhookUrl).type('www.app.gridfox-dev.com');
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Check an error message appears asking the user to enter a workflow URL
    cy.get(WorkflowSelectors.WorkflowErrorMessage)
      .contains(WorkflowErrorMessages.NoProtocolInWebhookURL);
  });

  it('Does not allow a project admin to create a webhook workflow with a webhook url that has a non web scheme', () => {
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

    // Adds in a webhook url with spaces in it
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.dataTest(WorkflowSelectors.WebhookUrl).type('mailto://app.gridfox-dev.com');
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Check an error message appears asking the user to enter a workflow URL
    cy.get(WorkflowSelectors.WorkflowErrorMessage)
      .contains(WorkflowErrorMessages.NoProtocolInWebhookURL);
  });

  it('Allows a project admin to disable a workflow with a webhook action', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on Automate
    cy.get(UniversalRuntimeSelectors.AutomateButton).click();
    cy.get(UniversalSelectors.LoadingBackground).should('not.be.visible');

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
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks the workflow has been saved correctly
    cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
    cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');

    // Disables workflow
    cy.dataTest(WorkflowSelectors.WorkflowStatusToggle).click();
    cy.dataTest(WorkflowSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Updated Workflow');

    // Delete Workflow
    cy.dataTest(WorkflowSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
  });
});
