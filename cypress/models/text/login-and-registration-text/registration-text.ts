export default class RegistrationText {
  static readonly InvalidEmailError = 'Invalid email address';

  static readonly NoVerificationCodeError = 'Please check your email for the verification code';

  static readonly IncorrectVerificationCodeError = 'The following error(s) occurred: Incorrect or expired verification code';

  static readonly InvalidNameError = 'Please enter a valid name ...';

  static readonly InvalidCompanyNameError = 'Please enter a valid company name';

  // Password errors

  static readonly NoPasswordEnteredErrorMessage = 'Use a few words, avoid common phrases';

  static readonly PasswordNotComplexEnoughMessage = 'Add another word or two. Uncommon words are better.';

  static readonly PasswordTooShortMessage = 'Your password is too weak, Try making it longer';
}
