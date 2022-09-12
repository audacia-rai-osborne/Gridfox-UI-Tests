/**
 * Mappings for environment variables
 */
export default class Env {
  /** The username of the automation user. */
  static readonly Username = Cypress.env('USERNAME');

  /** The password of the automation user. */
  static readonly Password = Cypress.env('PASSWORD');

  /** The URL of the login server. */
  static readonly LoginUrl = Cypress.env('LOGIN_URL');

  /** The base url of the runtime api */
  static readonly BaseUrlRuntimeApi = Cypress.env('BASE_URL_RUNTIME_API');

  /** Project Ids that should not be deleted. */
  static readonly ProjectsToNotDelete = Cypress.env('PROJECTS_TO_NOT_DELETE');

  /** The email of the verification code test user. */
  static readonly VerificationCodeTestEmail = Cypress.env('VERIFICATION_CODE_TEST_EMAIL');

  /** The email of a user that is not invited to the automation test project */
  static readonly UninvitedUser = Cypress.env('UNINVITED_USER');

  /** Gets the access token for the current login session */
  static readonly GetAccessToken = Cypress.env('GET_ACCESS_TOKEN');
}
