import Routes from '../../../../models/routes';
import DashboardSelectors from '../../../../models/selectors/dashboard/dashboard-selectors';
import ExplorerSelectors from '../../../../models/selectors/explorer/explorer-selectors';
import GettingStartedTourSelectors from '../../../../models/selectors/onboarding/getting-started-tour-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import GettingStartedTourText from '../../../../models/text/onboarding-text/getting-started-tour-text';

describe('As an account owner I can complete the database getting started tour', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Lets an account owner complete the database tools tour by only clicking next', () => {
    // Select the database tour
    cy.dataTest(DashboardSelectors.GettingStartedButton).click();
    cy.dataTest(GettingStartedTourSelectors.SelectDatabaseTour).click();

    // Go through the splash screens
    cy.dataTest(GettingStartedTourSelectors.SecondSlideIndicator).click();
    cy.dataTest(GettingStartedTourSelectors.LetsGoButton).click();

    // Check the tour welcome modal appears correctly
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon, { timeout: 10000 }).should('not.exist');
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.DatabaseWelcomeText1);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.DatabaseWelcomeText2);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.DatabaseWelcomeText3);
    cy.dataTest(GettingStartedTourSelectors.GetStartedButton).click();

    // Complete the getting started tour just by clicking next
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseFirstModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseSecondModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseThirdModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseFourthModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseFifthModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseSixthModalText);
    cy.clickNextPrompt();
    cy.get(GettingStartedTourSelectors.CompletedTourModal);

    // Delete the project
    cy.deleteCurrentProject();
  });

  it('Lets an account owner complete the database tour by following the modals in the tour', () => {
    // Select the database tour
    cy.dataTest(DashboardSelectors.GettingStartedButton).click();
    cy.dataTest(GettingStartedTourSelectors.SelectDatabaseTour).click();

    // Go through the splash screens
    cy.dataTest(GettingStartedTourSelectors.SecondSlideIndicator).click();
    cy.dataTest(GettingStartedTourSelectors.LetsGoButton).click();

    // Check the tour welcome modal appears correctly
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon, { timeout: 10000 }).should('not.exist');
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.DatabaseWelcomeText1);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.DatabaseWelcomeText2);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.DatabaseWelcomeText3);
    cy.dataTest(GettingStartedTourSelectors.GetStartedButton).click();

    // Complete the getting started tour just by clicking next
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseFirstModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseSecondModalText);
    cy.get(GettingStartedTourSelectors.DatabaseProjectView).click();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseThirdModalText);
    cy.get(UniversalRuntimeSelectors.ExplorerButton).click();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseFourthModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseFifthModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.DatabaseSixthModalText);
    cy.get(ExplorerSelectors.SaveButton).click();
    cy.get(GettingStartedTourSelectors.CompletedTourModal);

    // Delete the project
    cy.deleteCurrentProject();
  });
});
