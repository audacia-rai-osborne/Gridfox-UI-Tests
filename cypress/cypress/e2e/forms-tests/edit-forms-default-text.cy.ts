import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import FormSelectors from '../../../models/selectors/forms/forms-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import FormsToastMessages from '../../../models/text/forms-text/toast-messages';

describe('As a user I can edit a form in a project if I create one correctly', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Allows an account admin to edit a text fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the text field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsTextFieldId))
      .scrollIntoView()
      .click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsTextFieldId))
      .click({ scrollBehavior: false });

    // Add a default text value
    cy.get(FormSelectors.DefaultValueInput).type('Default Text Value', { scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default text has been set
    cy.get(FormSelectors.SelectFormPreviewField(AutomationProjectConstants.FormsTextFieldId)).should('have.value', 'Default Text Value');

    // Remove the default text field
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsTextFieldId))
      .scrollIntoView()
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsTextFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.DefaultValueInput).clear({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a list fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the list field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsListFieldId))
      .scrollIntoView()
      .click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsListFieldId))
      .click({ scrollBehavior: false });

    // Select a default list value
    cy.get(FormSelectors.SelectedListFieldValue).click({ scrollBehavior: false });
    cy.get(UniversalSelectors.DropdownOptions('1')).click({ scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default list value has been set
    cy.get(FormSelectors.SelectedListFieldValue).contains('List Item 1');

    // Remove the default list value
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsListFieldId))
      .scrollIntoView()
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsListFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.SelectedListFieldValue).click({ scrollBehavior: false });
    cy.get(UniversalSelectors.DropdownOptions('0')).click({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a text area fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the text area field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsTextAreaFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsTextAreaFieldId))
      .click({ scrollBehavior: false });

    // Add a default text area value
    cy.get(FormSelectors.DefaultValueInput).type('Default Text Area Value', { scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default text area has been set
    cy.get(FormSelectors.TextAreaFieldInput).should('have.value', 'Default Text Area Value');

    // Remove the default text area
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsTextAreaFieldId)).click();
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsTextAreaFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.DefaultValueInput).clear({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a rich text fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).should('be.visible').click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the rich text field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsRichTextFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsRichTextFieldId))
      .click({ scrollBehavior: false });

    // Add a default rich text value
    cy.get(FormSelectors.RichTextInput).type('Default Rich Text Value', { scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default rich text value has been set
    cy.get(FormSelectors.PreviewRichTextInput).should('be.visible').contains('Default Rich Text Value');

    // Remove the default rich text value
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsRichTextFieldId)).click();
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsRichTextFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.RichTextInput).clear({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a URL fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the URL field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsURLFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsURLFieldId))
      .click({ scrollBehavior: false });

    // Add a default URL field value
    cy.get(FormSelectors.DefaultValueInput).type('www.app.gridfox-dev.com', { scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default text has been set
    cy.get(FormSelectors.SelectFormPreviewField(AutomationProjectConstants.FormsURLFieldId)).should('have.value', 'www.app.gridfox-dev.com');

    // Remove the default text
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsURLFieldId)).click();
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsURLFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.DefaultValueInput).clear({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a number fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the number field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsNumberFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsNumberFieldId))
      .click({ scrollBehavior: false });

    // Add a default number value
    cy.get(FormSelectors.DefaultValueInput).type('-123.456', { scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default number value has been set
    cy.get(FormSelectors.SelectFormPreviewField(AutomationProjectConstants.FormsNumberFieldId)).should('have.value', '-123.456');

    // Remove the default number
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsNumberFieldId)).click();
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsNumberFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.DefaultValueInput).clear({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a money fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the money field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsMoneyFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsMoneyFieldId))
      .click({ scrollBehavior: false });

    // Add a default money value
    cy.get(FormSelectors.DefaultValueInput).type('-123.45', { scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default money value has been set
    cy.get(FormSelectors.SelectFormPreviewField(AutomationProjectConstants.FormsMoneyFieldId)).should('have.value', '-£123.45');

    // Remove the default money value
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsMoneyFieldId)).click();
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsMoneyFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.DefaultValueInput).clear({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a percentage fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();
    cy.get(FormSelectors.FormFields).should('be.visible');

    // Clicks on the percentage field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsPercentageFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Open advanced settings
    // eslint-disable-next-line max-len
    cy.get(FormSelectors.SelectAFormFieldOriginalName(AutomationProjectConstants.FormsPercentageFieldId)).scrollIntoView();
    // eslint-disable-next-line max-len
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsPercentageFieldId))
      .click({ scrollBehavior: false });

    // Add a default percentage value
    cy.get(FormSelectors.PercentageFieldInput).type('-123.45', { scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default percentage has been set
    cy.get(FormSelectors.SelectFormPreviewField(AutomationProjectConstants.FormsPercentageFieldId)).should('have.value', '-123.45%');

    // Remove the default percentage value
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsPercentageFieldId))
      .click();
    // eslint-disable-next-line max-len
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsPercentageFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.PercentageFieldInput).clear({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a checkbox fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the checkbox field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsCheckboxFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Open advanced settings
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsCheckboxFieldId))
      .click({ scrollBehavior: false });

    // Check the checkbox
    cy.get(FormSelectors.SetDefaultValueCheckbox).click({ scrollBehavior: false });

    // Click save
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Go to preview
    cy.get(FormSelectors.FormsPreviewButton).click();

    // Check the default checkbox value has been set
    cy.get(FormSelectors.CheckedCheckbox).should('be.visible');

    // Remove the default value
    cy.get(FormSelectors.FormsPreviewButton).click();
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsCheckboxFieldId)).click();
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsCheckboxFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.SetDefaultValueCheckbox).click({ scrollBehavior: false });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Does not allow an account admin to edit an image fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the image field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsImageFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Check advanced settings does not exist for this field
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsImageFieldId))
      .should('not.exist');
  });

  it('Does not allow an account admin to edit an icon fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the icon field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsIconFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Check advanced settings does not exist for this field
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsIconFieldId))
      .should('not.exist');
  });

  it('Does not allow an account admin to edit a file fields default value', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.FormsAllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Clicks on the file field
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsFileFieldId))
      .scrollIntoView().click({ scrollBehavior: false });

    // Check advanced settings does not exist for this field
    cy.get(FormSelectors.OpenFieldAdvancedSettings(AutomationProjectConstants.FormsFileFieldId))
      .should('not.exist');
  });
});
