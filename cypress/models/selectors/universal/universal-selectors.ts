export default class UniversalSelectors {
  static readonly ToastMessageActionButton = '.toasted > .action';

  static readonly DropdownMenu = '.dropdown';

  static readonly SelectItemInDropdown = '.select-item';

  static readonly SelectedItem = '.selected';

  static readonly ContentInputField = '.content > input';

  static readonly InputField = '.field > input';

  static readonly Modal = '.modal';

  static readonly ModalTitle = '.modal > .title';

  static readonly ModalSmallGreyText = '.small-gray-text';

  static readonly ModalWarning = '.warning';

  static readonly ModalText = 'p';

  static readonly ModalDiscard = '.modal > .buttons > :nth-child(1)';

  static readonly FormButton = '.form > .button';

  static readonly DeleteButton = '.delete-button';

  static readonly ButtonDelete = '.button--delete';

  static readonly Delete = '.delete';

  static readonly CancelButton = 'cancel';

  static readonly ConfirmButton = 'confirm';

  static readonly DiscardButton = 'discard';

  static readonly SaveButton = '.save';

  static readonly CheckedCheckBox = '.checked';

  static readonly Spinner = '.spinner';

  static readonly WholePageSpinner = '.vld-icon > svg';

  static readonly ToastContainer = '.toasted-container';

  static readonly ValidationMessage = '.validation-message';

  static readonly Backdrop = '.backdrop';

  static readonly LoadingBackground = '.vld-background';

  static readonly Option = '.option';

  static SelectFirstTabForRadioButton(buttonSelector: string): string {
    return `[data-test="${buttonSelector}"] > .radio-button-options__tabs > :nth-child(1)`;
  }

  static SelectSecondTabForRadioButton(buttonSelector: string): string {
    return `[data-test="${buttonSelector}"] > .radio-button-options__tabs > :nth-child(2)`;
  }

  static DropdownOptions(index: string): string {
    return `[data-option-item-index="${index}"]`;
  }
}
