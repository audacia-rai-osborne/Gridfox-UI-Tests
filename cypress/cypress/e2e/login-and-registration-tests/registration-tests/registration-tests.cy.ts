import Env from '../../../../models/env';
import LoginSelectors from '../../../../models/selectors/login-and-registration/login-selectors';
import RegistrationSelectors from '../../../../models/selectors/login-and-registration/registration-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import RegistrationText from '../../../../models/text/login-and-registration-text/registration-text';

describe('As a Gridfox user if I use the registration process it works correctly', () => {
  beforeEach(() => {
    cy.visit(Env.LoginUrl);
  });

  it('Does not let me register without a valid email', () => {
    // Click on the create account button
    cy.get(LoginSelectors.CreateAccountButton).click();

    // Enter an invalid email into the email field
    cy.get(RegistrationSelectors.EmailField).type('Email');

    // Tick the terms and conditions checkbox
    cy.get(RegistrationSelectors.AgreeToTermsAndConditionsCheckbox).click();

    // Click the create account button
    cy.get(RegistrationSelectors.CreateAccountButton).click();

    // Check the correct error message is triggered
    cy.get(RegistrationSelectors.ErrorTextMessage).contains(RegistrationText.InvalidEmailError);
  });

  it('Does not let me register without accepting terms & conditions', () => {
    // Click on the create account button
    cy.get(LoginSelectors.CreateAccountButton).click();

    // Enter a valid email into the email field
    cy.get(RegistrationSelectors.EmailField).type(Env.Username);

    // Click the create account button
    cy.get(RegistrationSelectors.CreateAccountButton).click();

    // Check the text for the terms and conditions box is highlighted red
    cy.get(RegistrationSelectors.InvalidText).should('be.visible');
  });

  it('Does not let me register without entering a name', () => {
    // Click on the create account button
    cy.get(LoginSelectors.CreateAccountButton).click();

    // Enter a valid email into the email field
    cy.get(RegistrationSelectors.EmailField).type(Env.VerificationCodeTestEmail, { log: false });

    // Click the accept terms and conditions checkbox
    cy.get(RegistrationSelectors.AgreeToTermsAndConditionsCheckbox).click();

    // Click the create account button
    cy.get(RegistrationSelectors.CreateAccountButton).click();

    // Enter a company
    cy.get(RegistrationSelectors.CompanyName).type('Company Name');

    // Enter a password
    cy.get(RegistrationSelectors.Password).type('TestingVerificationCodePassword01');

    // Enter a verification code
    cy.get(RegistrationSelectors.VerificationCode).type('123456');

    // Click to submit
    cy.get(RegistrationSelectors.LetsGoExploringButton).click();

    // Check there is an error message telling the user to enter a name and the name box is highlighted in red
    cy.get(RegistrationSelectors.InvalidText).should('be.visible');
    cy.get(UniversalSelectors.ValidationMessage).contains(RegistrationText.InvalidNameError);
  });

  it('Does not let me register without entering a password', () => {
    // Click on the create account button
    cy.get(LoginSelectors.CreateAccountButton).click();

    // Enter a valid email into the email field
    cy.get(RegistrationSelectors.EmailField).type(Env.VerificationCodeTestEmail, { log: false });

    // Click accept terms and conditions checkbox
    cy.get(RegistrationSelectors.AgreeToTermsAndConditionsCheckbox).click();

    // Click on the create account button
    cy.get(RegistrationSelectors.CreateAccountButton).click();

    // Enter a name into the name field
    cy.get(RegistrationSelectors.Name).type('Name');

    // Enter company into company name
    cy.get(RegistrationSelectors.CompanyName).type('Company Name');

    // Enter a verification code
    cy.get(RegistrationSelectors.VerificationCode).type('123456');

    // Click to submit
    cy.get(RegistrationSelectors.LetsGoExploringButton).click();

    // Check there is an error message telling the user to enter a password and the password box is highlighted in red
    cy.get(RegistrationSelectors.InvalidText).should('be.visible');
    cy.get(UniversalSelectors.ValidationMessage)
      .contains(RegistrationText.NoPasswordEnteredErrorMessage);
  });

  describe('As a user I can not register with the following password because it is not complex enough ', () => {
    it.each([
      'Password',
      'Password123Test1',
    ])('"\'%s\'"', (password) => {
      // Click on the create account button
      cy.get(LoginSelectors.CreateAccountButton).click();

      // Enter a valid email into the email field
      cy.get(RegistrationSelectors.EmailField).type(Env.VerificationCodeTestEmail, { log: false });

      // Click accept terms and conditions checkbox
      cy.get(RegistrationSelectors.AgreeToTermsAndConditionsCheckbox).click();

      // Click on the create account button
      cy.get(RegistrationSelectors.CreateAccountButton).click();

      // Enter a name into the name field
      cy.get(RegistrationSelectors.Name).type('Name');

      // Enter company into company name
      cy.get(RegistrationSelectors.CompanyName).type('Company Name');

      // Enter a verification code
      cy.get(RegistrationSelectors.VerificationCode).type('123456');

      // Enter invalid password
      cy.get(RegistrationSelectors.Password).type(password);

      // Click to submit
      cy.get(RegistrationSelectors.LetsGoExploringButton).click();

      // Check there is an error message telling the user to enter a more complex password and the password box is highlighted red
      cy.get(UniversalSelectors.ValidationMessage)
        .contains(RegistrationText.PasswordNotComplexEnoughMessage);
    });
  });
});
