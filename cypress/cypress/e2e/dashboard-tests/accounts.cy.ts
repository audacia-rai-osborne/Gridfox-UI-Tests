import Routes from '../../../models/routes';
import DashboardAccountSelectors from '../../../models/selectors/dashboard/account-selectors';
import DashboardSelectors from '../../../models/selectors/dashboard/dashboard-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';

describe('As an account owner I can manage projects on the dashboard', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Renames an account', () => {
    // Opens the edit account dashboard menu
    cy.get(DashboardAccountSelectors.AccountMenuArrow).should('be.visible');
    cy.get(DashboardAccountSelectors.AccountMenuArrow).click();

    // Selects to rename an account
    cy.get(DashboardAccountSelectors.RenameAccountDropdownOption).click();

    // Renames an account
    cy.get(DashboardAccountSelectors.RenameAccountField).clear().type('New Account Name');
    cy.get(DashboardSelectors.DashboardContainer).click();

    // Checks that the account has been updated
    cy.get(UniversalSelectors.ToastContainer).contains('Account updated');
  });

  it('Can not remove an accounts name and save', () => {
    // Opens the edit account dashboard menu
    cy.get(DashboardAccountSelectors.AccountMenuArrow).should('be.visible');
    cy.get(DashboardAccountSelectors.AccountMenuArrow).click();

    // Selects to rename an account
    cy.get(DashboardAccountSelectors.RenameAccountDropdownOption).click();

    // Clears the accounts name
    cy.get(DashboardAccountSelectors.RenameAccountField).clear();
    cy.get(DashboardSelectors.DashboardContainer).click();

    // Checks that an error message is returned
    cy.get(UniversalSelectors.ToastContainer).contains('Account must have a name');
  });
});
