export default class SettingsSelectors {
  static readonly FirstNameInput = ':nth-child(4) > input';

  static readonly SecondNameInput = ':nth-child(6) > input';

  static readonly CompanyName = '.validation-input > input';

  static readonly SaveButton = 'save-account-changes-button';

  static readonly ValidationErrorMessage = '.validation-error-message';

  static readonly CountryDropdown = ':nth-child(4) > .select-field';
}
