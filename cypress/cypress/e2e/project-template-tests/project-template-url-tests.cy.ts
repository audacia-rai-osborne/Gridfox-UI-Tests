import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import Routes from '../../../models/routes';
import DashboardSelectors from '../../../models/selectors/dashboard/dashboard-selectors';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import TemplateRoutes from '../../../models/template-routes';
import TemplatesToastMessages from '../../../models/text/templates-text/templates-toast-messages';

describe('As a user I can add templates to an account by using template links', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Adds a template project by following a link', () => {
    // Check you have been taken to the dashboard
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow a link to create a campaign manager template
    cy.visit(TemplateRoutes.CampaignManagerTemplateLink);

    // Check the template has been created
    cy.get(UniversalSelectors.ToastContainer, { timeout: 10000 })
      .contains(TemplatesToastMessages.SingleTemplateProjectCreated);
    cy.get(DashboardProjectSelectors.ProjectName).contains('Campaign Manager').scrollIntoView().should('be.visible');

    // Delete the project
    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).last().click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');

    // Check that you are not deleting one of the projects that are needed for the tests to run
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();
  });

  it('Can not add a template project by following a link to a project that does not exist', () => {
    // Check you have been taken to the dashboard
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow a link to a template that does not exist
    cy.visit(TemplateRoutes.TemplateThatDoesNotExistLink);

    // Check you get the correct error message saying that the template does not exist
    cy.get(UniversalSelectors.ToastContainer)
      .contains(TemplatesToastMessages.SingleTemplateProjectDoesNotExist);
  });

  it('Adds template projects by following a link with multiple projects', () => {
    // Check that the user has been taken to the dashboard and it has loaded
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow a link to create two templates
    cy.visit(TemplateRoutes.AgentManagerAndCampaignManagerTemplateLink);

    // Check both templates are created
    cy.get(UniversalSelectors.ToastContainer)
      .contains(TemplatesToastMessages.MultipleTemplateProjectsCreated);
    cy.get(DashboardProjectSelectors.ProjectName).contains('Campaign Manager').scrollIntoView().should('be.visible');

    // Delete one of the templates
    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).last().click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();

    // Delete the second
    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).last().click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();
  });

  it('Only adds template projects that exist if a link contains multiple projects', () => {
    // Check that the user has been taken to the dashboard and it has loaded
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow a template link which includes a template that exists and one that does not
    cy.visit(TemplateRoutes.CampaignManagerAndTemplateThatDoesNotExistLink);

    // Check that there is a warning message for the project that was not created
    cy.get(UniversalSelectors.ToastContainer)
      .contains(TemplatesToastMessages.SingleTemplateProjectDoesNotExist);

    // Check that the template that existed was created
    cy.get(UniversalSelectors.ToastContainer)
      .contains(TemplatesToastMessages.MultipleTemplateProjectsCreated);
    cy.get(DashboardProjectSelectors.ProjectName).contains('Campaign Manager').scrollIntoView().should('be.visible');

    // Delete the template that was created
    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).last().click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();
  });

  it('Adds template projects by following a link to a template bundle', () => {
    // Check the user is on the dashboard page
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow the template bundle link
    cy.visit(TemplateRoutes.MarketingStarterTemplateBundleLink);

    // Check all three templates in the bundle are created
    cy.get(UniversalSelectors.ToastContainer)
      .contains(TemplatesToastMessages.MultipleTemplateProjectsCreated);
    cy.get(DashboardProjectSelectors.ProjectName).contains('Campaign Manager').scrollIntoView().should('be.visible');
    cy.get(DashboardProjectSelectors.ProjectName).contains('100 Day Marketing Plan').scrollIntoView().should('be.visible');
    cy.get(DashboardProjectSelectors.ProjectName).contains('Agency Content Calendar').scrollIntoView().should('be.visible');

    // Delete all three templates
    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).last().click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();

    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).last().click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();

    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).eq(1).click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();
  });

  it('Does not add a template bundle if an invalid template id is used', () => {
    // Check the user is on the dashboard page
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow a link to create a template bundle that does not exist
    cy.visit(TemplateRoutes.TemplateBundleThatDoesNotExistLink);

    // Check that the correct error message is returned
    cy.get(UniversalSelectors.ToastContainer)
      .contains(TemplatesToastMessages.TemplateBundleDoesNotExist);
  });

  it('Adds a template project by following the original create template link', () => {
    // Check the user is on the main dashboard page
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow the original link to create a single template
    cy.visit(TemplateRoutes.OldCampaignManagerTemplateLink);

    // Check the project was successfully created
    cy.get(UniversalSelectors.ToastContainer, { timeout: 10000 })
      .contains(TemplatesToastMessages.SingleTemplateProjectCreated);
    cy.get(DashboardProjectSelectors.ProjectName).contains('Campaign Manager').scrollIntoView().should('be.visible');

    // Delete the template
    cy.dataTest(DashboardProjectSelectors.ProjectRowLink).last().click();
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.url().should('not.contain', AutomationProjectConstants.ProjectId)
      .should('not.contain', AutomationProjectConstants.ExplorerProjectId)
      .should('not.contain', AutomationProjectConstants.FormsProjectId)
      .should('not.contain', AutomationProjectConstants.SecurityProjectId);
    cy.deleteCurrentProject();
  });

  it('Displays an error message if I try to find a template that does not exist following the original create template link', () => {
    // Check the user is on the main dashboard page
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Follow a original link to create a template that does not exist
    cy.visit(TemplateRoutes.OldTemplateThatDoesNotExistLink);

    // Check the error message is correct
    cy.get(UniversalSelectors.ToastContainer)
      .contains(TemplatesToastMessages.SingleTemplateProjectDoesNotExist);
  });
});
