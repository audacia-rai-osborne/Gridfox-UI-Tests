import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import Env from '../../../models/env';
import Routes from '../../../models/routes';
import DashboardSelectors from '../../../models/selectors/dashboard/dashboard-selectors';
import AccountAdminSelectors from '../../../models/selectors/settings/account-admin-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import SettingsModalText from '../../../models/text/settings-text/settings-modal-text';
import SettingsToastMessages from '../../../models/text/settings-text/settings-toast-messages';

describe('As an account owner I can configure account admins', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Allows an account admin to cancel deleting an account admin and then later delete them', () => {
    // Go to user settings
    cy.get(DashboardSelectors.DashboardContainer).should('exist');
    cy.visit(Routes.AccountSettingsURL(AutomationProjectConstants.AccountId));

    // Add an account admin
    cy.dataTest(AccountAdminSelectors.InviteAccountAdminButton).click();
    cy.get(UniversalSelectors.InputField, { timeout: 5000 }).type(Env.UninvitedUser);
    cy.dataTest(AccountAdminSelectors.AddAccountAdminButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.AccountAdminAdded);

    // Open the delete modal for the account admin
    cy.get(AccountAdminSelectors.BackToDashboardButton).click();
    cy.get(DashboardSelectors.DashboardContainer).should('be.visible');
    cy.visit(Routes.AccountSettingsURL(AutomationProjectConstants.AccountId));
    cy.dataTest(AccountAdminSelectors.InviteAccountAdminButton).should('be.visible');
    cy.get(AccountAdminSelectors.AccountAdminMenu('106')).scrollIntoView().click();
    cy.dataTest(AccountAdminSelectors.RemoveAccountAdmin).click();

    // Check the modal has the correct text
    cy.get(UniversalSelectors.ModalTitle).contains(SettingsModalText.DeleteAccountAdmin);

    // Cancel deleting
    cy.dataTest(UniversalSelectors.CancelButton).click();
    cy.get(UniversalSelectors.ModalTitle).should('not.exist');

    // Delete the account admin
    cy.get(AccountAdminSelectors.AccountAdminMenu('106')).scrollIntoView().click();
    cy.dataTest(AccountAdminSelectors.RemoveAccountAdmin).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.AccountAdminDeleted);
  });
});
