import Env from '../../../models/env';
import ForgottenPasswordSelectors from '../../../models/selectors/login-and-registration/forgotten-password-selectors';
import LoginSelectors from '../../../models/selectors/login-and-registration/login-selectors';
import LoginText from '../../../models/text/login-and-registration-text/login-text';

describe('As a Gridfox user if I use the login process it works correctly', () => {
  beforeEach(() => {
    cy.visit(Env.LoginUrl);
  });

  it('Logs an account owner into Gridfox if they use a valid username and password', () => {
    // Enter the users username and password into the correct fields
    cy.get(LoginSelectors.UsernameField).type(Env.Username, { log: false });
    cy.get(LoginSelectors.PasswordField).type(Env.Password, { log: false });

    // Click the login button
    cy.get(LoginSelectors.LoginButton).click();

    // Check you have been taken to the correct URL
    cy.url().should('eq', `${Cypress.config().baseUrl}#/`);
  });

  it('Does not log an account owner into gridfox if they use an incorrect username and password', () => {
    // Enters an incorrect username and password into the username and password fields
    cy.get(LoginSelectors.UsernameField).should('be.visible');
    cy.get(LoginSelectors.UsernameField).type('username@email');
    cy.get(LoginSelectors.PasswordField).type('password');

    // Click the login button
    cy.get(LoginSelectors.LoginButton).click();

    // Checks that an error message is triggered
    cy.get(LoginSelectors.ErrorMessage).contains('Error');
    cy.get(LoginSelectors.ErrorMessage).contains(LoginText.InvalidUsernameOrPasswordError);
  });

  it('Allows a user to trigger a send password email if they enter an email address', () => {
    // Check the login page has loaded
    cy.get(LoginSelectors.UsernameField).should('be.visible');

    // Click on the forgotten password button
    cy.get(ForgottenPasswordSelectors.ForgotPasswordButton).click();

    // Enter an email address and send it
    cy.get(ForgottenPasswordSelectors.EmailField).type(Env.Username, { log: false });
    cy.get(ForgottenPasswordSelectors.SendResetEmailButton).click();

    // The user is given a message telling them to expect an email
    cy.get(ForgottenPasswordSelectors.ResetEmailConfirmationText)
      .contains(LoginText.ResetPasswordConfirmationTitle);
    cy.get(ForgottenPasswordSelectors.ResetEmailConfirmationText)
      .contains(LoginText.ResetPasswordConfirmationText);
  });
});
