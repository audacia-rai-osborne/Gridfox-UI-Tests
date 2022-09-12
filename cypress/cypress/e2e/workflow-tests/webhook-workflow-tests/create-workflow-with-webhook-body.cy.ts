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

  it('Allows a project admin to create a workflow with a webhook body with a string type', () => {
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

    // Adds a webhook body
    cy.get(WorkflowSelectors.AddWebhookBody).click();
    cy.dataTest(WorkflowSelectors.EnterWebhookBodyKey).type('Key');
    cy.dataTest(WorkflowSelectors.EnterWebhookStringInput).click().dataTest(WorkflowSelectors.EnterWebhookStringInput).type('string');

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks the workflow has been saved correctly
    cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
    cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.get(WorkflowSelectors.SelectWebhookKey('Key')).should('be.visible');
    cy.dataTest(WorkflowSelectors.EnterWebhookStringInput).contains('string');

    // Delete Workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
  });

  describe('As a project admin I can create a workflow with a webhook body with a string type and fields from the workflow table', () => {
    it.each([
      '[Text 1]',
      '[Date 1]',
      '[Date Time 1]',
      '[List 1]',
      '[User 1]',
      '[Formula 1]',
      '[Text Area 1]',
      '[Rich Text 1]',
      '[Number 1]',
      '[Money 1]',
      '[Percentage 1]',
      '[Checkbox 1]',
      '[Auto Counter 1]',
      '[URL 1]',
    ])('it can add the field \'%s\' to a workflow body in a string field type', (fieldName) => {
    // Clicks on the created template project using its project Id
      cy.get(DashboardProjectSelectors.Project(projectId)).click();

      // Clicks on Automate
      cy.get(UniversalRuntimeSelectors.AutomateButton).click();

      // Creates a new workflow
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.get(WorkflowSelectors.SelectWorkflowTable('Table with every field')).click();
      cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Test Workflow');

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
      cy.dataTest(WorkflowSelectors.WebhookUrl).should('be.visible');
      cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com');

      // Adds a webhook body
      cy.get(WorkflowSelectors.AddWebhookBody).click();
      cy.dataTest(WorkflowSelectors.EnterWebhookBodyKey).type('Key');
      cy.dataTest(WorkflowSelectors.EnterWebhookStringInput).click()
        .dataTest(WorkflowSelectors.EnterWebhookStringInput).type(fieldName);

      // Saves the workflow
      cy.dataTest(WorkflowSelectors.ApplyButton).click();
      cy.dataTest(WorkflowSelectors.SaveButton).click();

      // Checks the workflow has been saved correctly
      cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
      cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');
      cy.dataTest(WorkflowSelectors.WebhookAction).click();
      cy.get(WorkflowSelectors.SelectWebhookKey('Key')).should('be.visible');
      cy.dataTest(WorkflowSelectors.EnterWebhookStringInput).contains(fieldName);

      // Delete Workflow
      cy.dataTest(WorkflowSelectors.ApplyButton).click();
      cy.dataTest(WorkflowSelectors.DeleteButton).click();
      cy.dataTest(UniversalSelectors.ConfirmButton).click();
      cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
    });
  });

  describe('As a project admin I can create a workflow with a webhook body with a number type and any valid fields from the workflow table', () => {
    it.each([
      '[Formula 1]',
      '[Number 1]',
      '[Money 1]',
      '[Percentage 1]',
      '[Auto Counter 1]',
    ])('it can add the field \'%s\' to a workflow body in a number field type', (fieldName) => {
    // Clicks on the created template project using its project Id
      cy.get(DashboardProjectSelectors.Project(projectId)).click();

      // Clicks on Automate
      cy.get(UniversalRuntimeSelectors.AutomateButton).click();

      // Creates a new workflow
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.get(WorkflowSelectors.SelectWorkflowTable('Table with every field')).click();
      cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Test Workflow');

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
      cy.dataTest(WorkflowSelectors.WebhookUrl).should('be.visible');
      cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com');

      // Adds a webhook body
      cy.get(WorkflowSelectors.AddWebhookBody).click();
      cy.dataTest(WorkflowSelectors.EnterWebhookBodyKey).type('Key');
      cy.dataTest(WorkflowSelectors.SelectWebhookInputType).click();
      cy.get(WorkflowSelectors.NumberInputType).click();
      cy.dataTest(WorkflowSelectors.EnterWebhookNumberInput).click()
        .dataTest(WorkflowSelectors.EnterWebhookNumberInput).clear()
        .type(fieldName);

      // Saves the workflow
      cy.dataTest(WorkflowSelectors.ApplyButton).click();
      cy.dataTest(WorkflowSelectors.SaveButton).click();

      // Checks the workflow has been saved correctly
      cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
      cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');
      cy.dataTest(WorkflowSelectors.WebhookAction).click();
      cy.get(WorkflowSelectors.SelectWebhookKey('Key')).should('be.visible');
      cy.dataTest(WorkflowSelectors.SelectWebhookInputType).contains('Number');
      cy.dataTest(WorkflowSelectors.EnterWebhookNumberInput).contains(fieldName);

      // Delete Workflow
      cy.dataTest(WorkflowSelectors.ApplyButton).click();
      cy.dataTest(WorkflowSelectors.DeleteButton).click();
      cy.dataTest(UniversalSelectors.ConfirmButton).click();
      cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
    });
  });

  describe('As a project admin I can not create a workflow with a webhook body with a number type if I use invalid fields from the workflow table', () => {
    it.each([
      '[Text 1]',
      '[Date 1]',
      '[Date Time 1]',
      '[List 1]',
      '[User 1]',
      '[Text Area 1]',
      '[Rich Text 1]',
      '[Checkbox 1]',
      '[URL 1]',
      '[Image 1]',
      '[Icon 1]',
      '[File 1]',
    ])('it cannot add the field \'%s\' to a workflow body in a number field type', (fieldName) => {
    // Clicks on the created template project using its project Id
      cy.get(DashboardProjectSelectors.Project(projectId)).click();

      // Clicks on Automate
      cy.get(UniversalRuntimeSelectors.AutomateButton).click();

      // Creates a new workflow
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
      cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
      cy.get(WorkflowSelectors.SelectWorkflowTable('Table with every field')).click();
      cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Test Workflow');

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
      cy.dataTest(WorkflowSelectors.WebhookUrl).should('be.visible');
      cy.dataTest(WorkflowSelectors.WebhookUrl).type('https://app.gridfox-dev.com');

      // Adds a webhook body
      cy.get(WorkflowSelectors.AddWebhookBody).click();
      cy.dataTest(WorkflowSelectors.EnterWebhookBodyKey).type('Key');
      cy.dataTest(WorkflowSelectors.SelectWebhookInputType).click();
      cy.get(WorkflowSelectors.NumberInputType).click();
      cy.dataTest(WorkflowSelectors.EnterWebhookNumberInput).click()
        .dataTest(WorkflowSelectors.EnterWebhookNumberInput).clear()
        .type(fieldName);

      // Checks an error message is triggered in the modal
      cy.get(WorkflowSelectors.WebhookModal).click();
      cy.dataTest(WorkflowSelectors.WebhookModalErrorMessage).should('be.visible');

      // Saves the workflow
      cy.dataTest(WorkflowSelectors.ApplyButton).click();
      cy.dataTest(WorkflowSelectors.SaveButton).click();

      // Checks the correct error message is triggered
      cy.get(WorkflowSelectors.WorkflowErrorMessage)
        .contains(WorkflowErrorMessages.InvalidWebhookBodyMapping);
    });
  });

  it('Allows a project admin to create a workflow with a null string type', () => {
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

    // Adds a webhook body
    cy.get(WorkflowSelectors.AddWebhookBody).click();
    cy.dataTest(WorkflowSelectors.EnterWebhookBodyKey).type('Key');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).click();
    cy.get(WorkflowSelectors.NullInputType).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks the workflow has been saved correctly
    cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
    cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.get(WorkflowSelectors.SelectWebhookKey('Key')).should('be.visible');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).contains('Null');

    // Delete Workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
  });

  it('Allows a project admin to create a workflow with an object', () => {
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

    // Adds a webhook body
    cy.get(WorkflowSelectors.AddWebhookBody).click();
    cy.dataTest(WorkflowSelectors.EnterWebhookBodyKey).type('Key');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).click();
    cy.get(WorkflowSelectors.ObjectType).click();
    cy.dataTest(WorkflowSelectors.AddWebhookItem).click();
    cy.get(WorkflowSelectors.EnterSecondWebhookKey).type('Key 2');
    cy.dataTest(WorkflowSelectors.EnterWebhookStringInput).click().dataTest(WorkflowSelectors.EnterWebhookStringInput).type('string');

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks the workflow has been saved correctly
    cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
    cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.get(WorkflowSelectors.SelectWebhookKey('Key')).should('be.visible');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).contains('Object');
    cy.get(WorkflowSelectors.SelectWebhookKey('Key 2')).should('be.visible');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).contains('String');

    // Delete Workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
  });

  it('Allows a project admin to create a workflow with an array', () => {
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

    // Adds a webhook body
    cy.get(WorkflowSelectors.AddWebhookBody).click();
    cy.dataTest(WorkflowSelectors.EnterWebhookBodyKey).type('Key');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).click();
    cy.get(WorkflowSelectors.ArrayType).click();
    cy.dataTest(WorkflowSelectors.AddArrayItem).click();
    cy.dataTest(WorkflowSelectors.EnterWebhookStringInput).click().dataTest(WorkflowSelectors.EnterWebhookStringInput).type('string');

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks the workflow has been saved correctly
    cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
    cy.get(WorkflowSelectors.WebhookActionSubtitle).contains('app.gridfox-dev.com');
    cy.dataTest(WorkflowSelectors.WebhookAction).click();
    cy.get(WorkflowSelectors.SelectWebhookKey('Key')).should('be.visible');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).contains('Array');
    cy.dataTest(WorkflowSelectors.SelectWebhookInputType).contains('String');

    // Delete Workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();
    cy.dataTest(WorkflowSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
  });
});
