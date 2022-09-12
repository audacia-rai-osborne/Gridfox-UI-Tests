import Routes from '../../../../models/routes';
import DashboardSelectors from '../../../../models/selectors/dashboard/dashboard-selectors';
import GettingStartedTourSelectors from '../../../../models/selectors/onboarding/getting-started-tour-selectors';
import EditGridInRuntimeSelectors from '../../../../models/selectors/runtime/edit-record-in-grid-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import GettingStartedTourText from '../../../../models/text/onboarding-text/getting-started-tour-text';

describe('As an account owner I can complete the spreadsheets getting started tour', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });
  // This test is broken by a bug and will be fixed in the next Gridfox sprint
  it.skip('Lets an account owner complete the spreadsheet getting started tour by only clicking next', () => {
    // Select the spreadsheet tour
    cy.dataTest(DashboardSelectors.GettingStartedButton).click();
    cy.dataTest(GettingStartedTourSelectors.SelectSpreadsheetsTour).click();

    // Go through the splash screens
    cy.dataTest(GettingStartedTourSelectors.SecondSlideIndicator).click();
    cy.dataTest(GettingStartedTourSelectors.LetsGoButton).click();

    // Check the tour welcome modal appears correctly
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon, { timeout: 10000 }).should('not.exist');
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.SpreadsheetsWelcomeText1);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.SpreadsheetsWelcomeText2);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.SpreadsheetsWelcomeText3);
    cy.dataTest(GettingStartedTourSelectors.GetStartedButton).click();

    // Complete the getting started tour just by clicking next
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetFirstModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetSecondModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetThirdModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetFourthModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetFifthModalText);
    cy.get(GettingStartedTourSelectors.SpreadsheetTourRecord).should('be.visible');
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetSixthModalText);
    cy.clickNextPrompt();
    cy.get(GettingStartedTourSelectors.CompletedTourModal);

    // Delete the project
    cy.deleteCurrentProject();
  });

  it('Lets an account owner complete the getting started tour by following the steps in the modals', () => {
    // Select the spreadsheet tour
    cy.dataTest(DashboardSelectors.GettingStartedButton).click();
    cy.dataTest(GettingStartedTourSelectors.SelectSpreadsheetsTour).click();

    // Go through the splash screens
    cy.dataTest(GettingStartedTourSelectors.SecondSlideIndicator).click();
    cy.dataTest(GettingStartedTourSelectors.LetsGoButton).click();

    // Check the tour welcome modal appears correctly
    cy.get(GettingStartedTourSelectors.TemplateLoadingIcon, { timeout: 10000 }).should('not.exist');
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.SpreadsheetsWelcomeText1);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.SpreadsheetsWelcomeText2);
    cy.get(GettingStartedTourSelectors.WelcomeText)
      .contains(GettingStartedTourText.SpreadsheetsWelcomeText3);
    cy.dataTest(GettingStartedTourSelectors.GetStartedButton).click();

    // Complete the getting started tour just by following the steps
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetFirstModalText);
    cy.clickNextPrompt();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetSecondModalText);
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetThirdModalText);
    cy.dataTest(EditGridInRuntimeSelectors.AddFieldPlusButton).click();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetFourthModalText);
    cy.dataTest(EditGridInRuntimeSelectors.SaveButton).click();

    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetFifthModalText);
    cy.get(GettingStartedTourSelectors.SpreadsheetTourRecord).click();

    cy.get(EditGridInRuntimeSelectors.EditPageGrid).should('be.visible');
    cy.get(GettingStartedTourSelectors.TourPrompt)
      .contains(GettingStartedTourText.SpreadsheetSixthModalText);
    cy.clickNextPrompt();
    cy.get(GettingStartedTourSelectors.CompletedTourModal);

    // Delete the project
    cy.deleteCurrentProject();
  });
});
