import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import OnboardingPromptsSelectors from '../../../../models/selectors/onboarding/onboarding-prompts-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UserMenuSelectors from '../../../../models/selectors/universal/user-menu-selectors';
import GridViewPromptsText from '../../../../models/text/onboarding-text/grid-view-prompts-text';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can view the grid view prompts', () => {
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

  it('Allows a user to go through the steps of the grid view onboarding tour', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Trigger the tour
    cy.get(UserMenuSelectors.UserMenuButton).click();
    cy.get(UserMenuSelectors.ResetOnboarding).click();

    // Check the first modal has the correct title and text
    cy.get(OnboardingPromptsSelectors.ModalTitle).contains(GridViewPromptsText.FirstModalTitle).should('be.visible');
    cy.get(OnboardingPromptsSelectors.ModalText).contains(GridViewPromptsText.FirstModalText);

    // Click next to get to the next prompt
    cy.dataTest(OnboardingPromptsSelectors.NextPromptButton).click();

    // Check the second modal has the correct title and text
    cy.get(OnboardingPromptsSelectors.ModalTitle).contains(GridViewPromptsText.SecondModalTitle).should('be.visible');
    cy.get(OnboardingPromptsSelectors.ModalText).contains(GridViewPromptsText.SecondModalText);

    // Click next to get to the next prompt
    cy.dataTest(OnboardingPromptsSelectors.NextPromptButton).click();

    // Check the third modal has the correct title and text
    cy.get(OnboardingPromptsSelectors.ModalTitle).contains(GridViewPromptsText.ThirdModalTitle).should('be.visible');
    cy.get(OnboardingPromptsSelectors.ModalText).contains(GridViewPromptsText.ThirdModalText);

    // Click next to get to the next prompt
    cy.dataTest(OnboardingPromptsSelectors.NextPromptButton).click();

    // Check the fourth modal has the correct title and text
    cy.get(OnboardingPromptsSelectors.ModalTitle).contains(GridViewPromptsText.FourthModalTitle).should('be.visible');
    cy.get(OnboardingPromptsSelectors.ModalText).contains(GridViewPromptsText.FourthModalText);

    // Click next to get to the next prompt
    cy.dataTest(OnboardingPromptsSelectors.NextPromptButton).click();

    // Check the fifth modal has the correct title and text
    cy.get(OnboardingPromptsSelectors.ModalTitle).contains(GridViewPromptsText.FifthModalTitle).should('be.visible');
    cy.get(OnboardingPromptsSelectors.ModalText).contains(GridViewPromptsText.FifthModalText);

    // Click next to get to the next prompt
    cy.dataTest(OnboardingPromptsSelectors.NextPromptButton).click();

    // Check the sixth modal has the correct title and text
    cy.get(OnboardingPromptsSelectors.ModalTitle).contains(GridViewPromptsText.SixthModalTitle).should('be.visible');
    cy.get(OnboardingPromptsSelectors.ModalText).contains(GridViewPromptsText.SixthModalText);

    // Click finish to finish the tour
    cy.dataTest(OnboardingPromptsSelectors.FinishButton).click();

    // Check modals have been dismissed
    cy.get(OnboardingPromptsSelectors.ModalText).contains(GridViewPromptsText.SixthModalText).should('not.exist');
  });
});
