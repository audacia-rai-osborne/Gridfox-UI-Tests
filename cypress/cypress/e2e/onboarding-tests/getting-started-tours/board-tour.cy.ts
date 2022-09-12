import Routes from '../../../../models/routes';
import DashboardSelectors from '../../../../models/selectors/dashboard/dashboard-selectors';
import GettingStartedTourSelectors from '../../../../models/selectors/onboarding/getting-started-tour-selectors';
import BoardRuntimeSelectors from '../../../../models/selectors/runtime/board-runtime-selectors';
import GettingStartedTourText from '../../../../models/text/onboarding-text/getting-started-tour-text';

describe('As an account owner I can complete the boards getting started tour', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Lets an account owner complete the boards getting started tour by only clicking next', () => {
    // Select the boards tour
    cy.dataTest(DashboardSelectors.GettingStartedButton).click();
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon).should('not.exist');
    cy.dataTest(GettingStartedTourSelectors.SelectBoardsTour).click();

    // Go through the splash screens
    cy.dataTest(GettingStartedTourSelectors.SecondSlideIndicator).click();
    cy.dataTest(GettingStartedTourSelectors.LetsGoButton).click();

    // Check the tour welcome modal appears correctly
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon, { timeout: 20000 }).should('not.exist');
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText1);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText2);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText3);
    cy.dataTest(GettingStartedTourSelectors.GetStartedButton).click();

    // Complete the getting started tour just by clicking next
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardFirstModalText);
    cy.clickNextPrompt();
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardSecondModalText);
    cy.clickNextPrompt();
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardThirdModalText);
    cy.clickNextPrompt();
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardFourthModalText);
    cy.clickNextPrompt();
    cy.get(GettingStartedTourSelectors.CompletedTourModal);

    // Delete the project
    cy.deleteCurrentProject();
  });

  it('Lets an account owner complete the boards getting started tour by following the instructions in the modals', () => {
    // Select the boards tour
    cy.dataTest(DashboardSelectors.GettingStartedButton).click();
    cy.dataTest(GettingStartedTourSelectors.SelectBoardsTour).click();

    // Go through the splash screens
    cy.dataTest(GettingStartedTourSelectors.SecondSlideIndicator).click();
    cy.dataTest(GettingStartedTourSelectors.LetsGoButton).click();

    // Check the tour welcome modal appears correctly
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon, { timeout: 20000 }).should('not.exist');
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText1);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText2);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.BoardsWelcomeText3);
    cy.dataTest(GettingStartedTourSelectors.GetStartedButton).click();

    // Complete the getting started tour just by following the steps
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardFirstModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardSecondModalText);
    cy.get(BoardRuntimeSelectors.KanbanBoard).should('be.visible');
    cy.gfDrag(
      BoardRuntimeSelectors.getKanbanCard(2, 1),
      BoardRuntimeSelectors.getKanbanCard(3, 1),
    );

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardThirdModalText);
    cy.dataTest(BoardRuntimeSelectors.AddColumnButton).click();
    cy.dataTest(BoardRuntimeSelectors.AddColumnInput).type('Blocked');

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.BoardFourthModalText);
    cy.dataTest(BoardRuntimeSelectors.SaveColumnButton).click();
    cy.get(GettingStartedTourSelectors.CompletedTourModal);

    // Delete the project
    cy.deleteCurrentProject();
  });
});
