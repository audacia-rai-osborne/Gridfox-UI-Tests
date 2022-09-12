import Routes from '../../../../models/routes';
import DashboardSelectors from '../../../../models/selectors/dashboard/dashboard-selectors';
import GettingStartedTourSelectors from '../../../../models/selectors/onboarding/getting-started-tour-selectors';
import GettingStartedTourText from '../../../../models/text/onboarding-text/getting-started-tour-text';

describe('As an account owner I can complete the project trackers tour', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Lets an account owner select and start the project trackers tour', () => {
    // Select the project trackers tour
    cy.dataTest(DashboardSelectors.GettingStartedButton).click();
    cy.dataTest(GettingStartedTourSelectors.SelectProjectTrackersTour).click();

    // Go through the splash screens
    cy.dataTest(GettingStartedTourSelectors.SecondSlideIndicator).click();
    cy.dataTest(GettingStartedTourSelectors.LetsGoButton).click();

    // Check the tour welcome modal appears correctly
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon).should('not.exist');
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText1);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText2);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText3);
    cy.dataTest(GettingStartedTourSelectors.GetStartedButton).click();

    // Delete the project
    cy.deleteCurrentProject();
  });
});
