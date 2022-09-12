import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import WorkflowSelectors from '../../../../models/selectors/workflows/workflow-selectors';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add a workflow with an Email action if I create one correctly', () => {
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

  it('Allows a project admin to create a workflow with an email action', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on Automate
    cy.get(UniversalRuntimeSelectors.AutomateButton).click();

    // Creates a new workflow
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
    cy.dataTest(WorkflowSelectors.CreateNewWorkflow).click();
    cy.get(WorkflowSelectors.WorkflowCanvas).should('be.visible');
    cy.get(WorkflowSelectors.SelectWorkflowTable('Project')).click();
    cy.dataTest(WorkflowSelectors.WorkflowNameInput).type('Email Workflow');

    // Drags the created workflow trigger on to the workflow builder canvas
    cy.gfDrag(
      WorkflowSelectors.SelectWorkflowBlock('Create Record'),
      WorkflowSelectors.WorkflowCanvas,
      300,
      100,
    );

    // Drags the webhook workflow action on to the workflow builder canvas
    cy.gfDrag(
      WorkflowSelectors.SelectWorkflowBlock('Send Email'),
      WorkflowSelectors.WorkflowCanvas,
      500,
      300,
    );

    // Opens email set up
    cy.dataTest(WorkflowSelectors.SendEmailAction).click();

    // Adds in a recipient
    cy.dataTest(WorkflowSelectors.RecipientsInput).click();
    cy.dataTest(WorkflowSelectors.SelectRecipients).type('Project Admins');
    cy.dataTest(WorkflowSelectors.DropdownGroup).click();

    // Adds subject
    cy.dataTest(WorkflowSelectors.AddSubject).type('Test Create Workflow via Cypress');

    // Add Message
    cy.get(WorkflowSelectors.AddMessage).type('Testing adding a message on a email workflow via Cypress');

    // Apply workflow
    cy.dataTest(WorkflowSelectors.ApplyButton).click();

    // Saves the workflow
    cy.dataTest(WorkflowSelectors.SaveButton).click();

    // Checks the workflow has been saved correctly
    cy.get(UniversalSelectors.ToastContainer).contains('Saved New Workflow');
    cy.get(WorkflowSelectors.EmailActionSubtitle).contains('Email sent to 1 group');

    // Delete Workflow
    cy.dataTest(WorkflowSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Deleted Workflow');
  });
});
