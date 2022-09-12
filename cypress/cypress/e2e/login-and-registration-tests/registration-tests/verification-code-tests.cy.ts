import Env from '../../../../models/env';
import LoginSelectors from '../../../../models/selectors/login-and-registration/login-selectors';
import RegistrationSelectors from '../../../../models/selectors/login-and-registration/registration-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import RegistrationText from '../../../../models/text/login-and-registration-text/registration-text';

describe('As a Gridfox user if I use the registration process the verification code input works correctly', () => {
  beforeEach(() => {
    cy.visit(Env.LoginUrl);
  });

  describe('As a user I can not enter', () => {
    it.each([
      'characters',
      '&£$%?',
      '   ',
    ])('"\'%s\'" in the verification code box when registering', (verificationCode) => {
    // Click on the create account button
      cy.get(LoginSelectors.CreateAccountButton).click();

      // Enter a valid email into the email field
      cy.get(RegistrationSelectors.EmailField).type(Env.VerificationCodeTestEmail, { log: false });

      // Tick the terms and conditions checkbox
      cy.get(RegistrationSelectors.AgreeToTermsAndConditionsCheckbox).click();

      // Click the create account button
      cy.get(RegistrationSelectors.CreateAccountButton).click();

      // Enter a name
      cy.get(RegistrationSelectors.Name).type('Name');

      // Enter a company
      cy.get(RegistrationSelectors.CompanyName).type('Company Name');

      // Enter a Password
      cy.get(RegistrationSelectors.Password).type('TestingVerificationCodePassword01');

      // Enter a verification code
      cy.get(RegistrationSelectors.VerificationCode).type(verificationCode);

      // Click to submit
      cy.get(RegistrationSelectors.LetsGoExploringButton).click();

      // Get a validation message saying that no verification code was entered
      cy.get(UniversalSelectors.ValidationMessage)
        .contains(RegistrationText.NoVerificationCodeError);
    });
  });

  it('Does not allows a user to register with an invalid verification code', () => {
    // Click on the create account button
    cy.get(LoginSelectors.CreateAccountButton).click();

    // Enter a valid email into the email field
    cy.get(RegistrationSelectors.EmailField).type(Env.VerificationCodeTestEmail, { log: false });

    // Tick the terms and conditions checkbox
    cy.get(RegistrationSelectors.AgreeToTermsAndConditionsCheckbox).click();

    // Click the create account button
    cy.get(RegistrationSelectors.CreateAccountButton).click();

    // Enter a name
    cy.get(RegistrationSelectors.Name).type('Name');

    // Enter a company
    cy.get(RegistrationSelectors.CompanyName).type('Company Name');

    // Enter a Password
    cy.get(RegistrationSelectors.Password).type('TestingVerificationCodePassword01');

    // Enter an incorrect verification code
    cy.get(RegistrationSelectors.VerificationCode).type('123456');

    // Click to submit
    cy.get(RegistrationSelectors.LetsGoExploringButton).click();

    // Get a validation message saying that an incorrect verification code was entered
    cy.get(UniversalSelectors.ToastContainer)
      .contains(RegistrationText.IncorrectVerificationCodeError);
  });

  it('Makes a validation message appear telling a user to check their email if they try to register without a verification code', () => {
    // Click on the create account button
    cy.get(LoginSelectors.CreateAccountButton).click();

    // Enter a valid email into the email field
    cy.get(RegistrationSelectors.EmailField).type(Env.VerificationCodeTestEmail, { log: false });

    // Tick the terms and conditions checkbox
    cy.get(RegistrationSelectors.AgreeToTermsAndConditionsCheckbox).click();

    // Click the create account button
    cy.get(RegistrationSelectors.CreateAccountButton).click();

    // Enter a name
    cy.get(RegistrationSelectors.Name).type('Name');

    // Enter a company
    cy.get(RegistrationSelectors.CompanyName).type('Company Name');

    // Enter a Password
    cy.get(RegistrationSelectors.Password).type('TestingVerificationCodePassword01');

    // Click to submit
    cy.get(RegistrationSelectors.LetsGoExploringButton).click();

    // Get a validation message asking the user to check their email
    cy.get(UniversalSelectors.ValidationMessage)
      .contains(RegistrationText.NoVerificationCodeError);
  });
});
