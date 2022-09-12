import Routes from '../../../models/routes';
import SettingsSelectors from '../../../models/selectors/settings/settings-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import UserMenuSelectors from '../../../models/selectors/universal/user-menu-selectors';
import SettingErrorMessages from '../../../models/text/settings-text/error-messages';
import SettingsToastMessages from '../../../models/text/settings-text/settings-toast-messages';

describe('As an account owner I can edit my user details', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Allows an account admin to edit their user details', () => {
    // Go to user settings
    cy.get(UserMenuSelectors.UserMenuButton).click();
    cy.get(UserMenuSelectors.UserSettings).should('be.visible').click();

    // Edit users name
    cy.get(SettingsSelectors.FirstNameInput).clear().type('New Name');
    cy.dataTest(SettingsSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.UserDetailsUpdated);

    // Reset users name
    cy.get(SettingsSelectors.FirstNameInput).clear().type('Automation');
    cy.dataTest(SettingsSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.UserDetailsUpdated);
  });

  it('Does not allow an account admin to save their user details without a name', () => {
    // Go to user settings
    cy.get(UserMenuSelectors.UserMenuButton).click();
    cy.get(UserMenuSelectors.UserSettings).should('be.visible').click();

    // Remove users name and company
    cy.get(SettingsSelectors.FirstNameInput).clear();
    cy.get(SettingsSelectors.SecondNameInput).clear();
    cy.dataTest(SettingsSelectors.SaveButton).click();

    // Check the correct error message appears
    cy.get(SettingsSelectors.ValidationErrorMessage)
      .contains(SettingErrorMessages.AllFieldsRequired);
  });

  it('Does not allow an account admin to save their user details without a company', () => {
    // Go to user settings
    cy.get(UserMenuSelectors.UserMenuButton).click();
    cy.get(UserMenuSelectors.UserSettings).should('be.visible').click();

    // Remove users name and company
    cy.get(SettingsSelectors.CompanyName).clear();
    cy.dataTest(SettingsSelectors.SaveButton).click();

    // Check the correct error message appears
    cy.get(SettingsSelectors.ValidationErrorMessage)
      .contains(SettingErrorMessages.AllFieldsRequired);
  });

  it('Allows an account admin to edit their companys country', () => {
    // Go to user settings
    cy.get(UserMenuSelectors.UserMenuButton).click();
    cy.get(UserMenuSelectors.UserSettings).should('be.visible').click();

    // Edit users country
    cy.get(SettingsSelectors.CountryDropdown).click();
    cy.get(UniversalSelectors.SelectItemInDropdown).contains('United States').click();
    cy.dataTest(SettingsSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.UserDetailsUpdated);

    // Reset users country
    cy.get(SettingsSelectors.CountryDropdown).click();
    cy.get(UniversalSelectors.SelectItemInDropdown).contains('United Kingdom').click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.UserDetailsUpdated);
  });

  it('Allows an account admin to remove their companys country', () => {
    // Go to user settings
    cy.get(UserMenuSelectors.UserMenuButton).click();
    cy.get(UserMenuSelectors.UserSettings).should('be.visible').click();

    // Remove users country
    cy.get(SettingsSelectors.CountryDropdown).click();
    cy.get(UniversalSelectors.SelectItemInDropdown).contains('Not Set').click();
    cy.dataTest(SettingsSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.UserDetailsUpdated);

    // Reset users country
    cy.get(SettingsSelectors.CountryDropdown).click();
    cy.get(UniversalSelectors.SelectItemInDropdown).contains('United Kingdom').click();
    cy.get(UniversalSelectors.ToastContainer).contains(SettingsToastMessages.UserDetailsUpdated);
  });
});
