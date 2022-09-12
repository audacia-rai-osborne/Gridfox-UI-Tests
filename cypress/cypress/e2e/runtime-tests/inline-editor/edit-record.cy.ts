import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import InlineEditorSelectors from '../../../../models/selectors/runtime/inline-editor-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import InlineEditorText from '../../../../models/text/runtime-text/inline-editor-text';

describe('As a user I can edit records in a table using the inline editor', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Edits a text field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the text field
    cy.get(InlineEditorSelectors.TextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();

    // Add a text value
    cy.get(InlineEditorSelectors.TextFieldInput).type('Text Field Value');

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the text value has been added
    cy.get(InlineEditorSelectors.TextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();
    cy.get(InlineEditorSelectors.TextFieldInput).should('be.visible').should('have.value', 'Text Field Value');

    // Remove the text value
    cy.get(InlineEditorSelectors.TextFieldInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a text area field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the text area field
    cy.get(InlineEditorSelectors.TextAreaField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a text area value
    cy.get(InlineEditorSelectors.ToggleTextArea).type('Text Area Field Value');

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the text area value has been added
    cy.get(InlineEditorSelectors.TextAreaField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click().contains('Text Area Field Value');

    // Remove the text area value
    cy.get(InlineEditorSelectors.ToggleTextArea).click();
    cy.get(InlineEditorSelectors.TextAreaInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a rich text field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the rich text field
    cy.get(InlineEditorSelectors.RichTextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a rich text value
    cy.get(InlineEditorSelectors.ToggleRichTextField).type('Rich Text Field Value');

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the rich text value has been added
    cy.get(InlineEditorSelectors.RichTextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.RichTextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('Rich Text Field Value');

    // Remove the rich text value
    cy.get(InlineEditorSelectors.ToggleRichTextField).click();
    cy.get(InlineEditorSelectors.RichTextInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a list field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the list field
    cy.get(InlineEditorSelectors.ListField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Select a list value
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the list value has been selected
    cy.get(InlineEditorSelectors.ListField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.ListField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('List Item 1');

    // Remove the list value
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('0')).click();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a user field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the user field
    cy.get(InlineEditorSelectors.UserField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a user
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the user has been added
    cy.get(InlineEditorSelectors.UserField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.UserField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('Automation Tests');

    // Remove the user
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('0')).click();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Cannot edit a formula field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the formula field
    cy.get(InlineEditorSelectors.FormulaField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Check field is disabled
    cy.get(InlineEditorSelectors.DisabledFieldTooltip).should('be.visible');
    cy.get(InlineEditorSelectors.TextFieldValue).should('not.be.enabled');
  });

  it('Edits a number field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the number field
    cy.get(InlineEditorSelectors.NumberField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a value in the number field
    cy.get(InlineEditorSelectors.NumberFieldInput).type('-12.34');

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the number value has been added
    cy.get(InlineEditorSelectors.NumberField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.NumberField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('-12.34');

    // Remove the number value
    cy.get(InlineEditorSelectors.NumberFieldInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a percentage field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the percentage field
    cy.get(InlineEditorSelectors.PercentageField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a value in the percentage field
    cy.get(InlineEditorSelectors.NumberFieldInput).type('-12.34');

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the percentage value has been added
    cy.get(InlineEditorSelectors.PercentageField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.PercentageField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('-12.34%');

    // Remove the percentage value
    cy.get(InlineEditorSelectors.NumberFieldInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a money field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the money field
    cy.get(InlineEditorSelectors.MoneyField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a value in the money field
    cy.get(InlineEditorSelectors.NumberFieldInput).type('12.34');

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the money value has been added
    cy.get(InlineEditorSelectors.MoneyField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.MoneyField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('£12.34');

    // Remove the money value
    cy.get(InlineEditorSelectors.NumberFieldInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a date field on a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the date field
    cy.get(InlineEditorSelectors.DateField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a value in the date field
    cy.get(InlineEditorSelectors.DatePickerInput).type('05/06/2022{enter}');
    cy.get(UniversalSelectors.Backdrop).click();

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the date value has been added
    cy.get(InlineEditorSelectors.DateField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.DateField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('05/06/2022');

    // Remove the date value
    cy.get(InlineEditorSelectors.DatePickerInput).clear();
    cy.get(UniversalSelectors.Backdrop).click();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a date time field on a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the date time field
    cy.get(InlineEditorSelectors.DateTimeField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Add a value in the date time field
    cy.get(InlineEditorSelectors.DatePickerInput).type('05/06/2022, 10:15{enter}');
    cy.get(UniversalSelectors.Backdrop).click();

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the date time value has been added
    cy.get(InlineEditorSelectors.DateTimeField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.DateTimeField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('05/06/2022, 10:15');

    // Remove the date time value
    cy.get(InlineEditorSelectors.DatePickerInput).clear();
    cy.get(UniversalSelectors.Backdrop).click();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits a checkbox field on a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the checkbox field
    cy.get(InlineEditorSelectors.CheckboxField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Click on the checkbox
    cy.get(InlineEditorSelectors.CheckboxInput).click();

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the checkbox value has been added
    cy.get(InlineEditorSelectors.CheckboxField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();
    cy.get(UniversalSelectors.CheckedCheckBox).should('be.visible');

    // Remove the checkbox value
    cy.get(InlineEditorSelectors.CheckboxInput).click();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Cannot edit a autocounter field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the autocounter field
    cy.get(InlineEditorSelectors.AutoCounterField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Check field is disabled
    cy.get(InlineEditorSelectors.DisabledFieldTooltip).should('be.visible');
    cy.get(InlineEditorSelectors.TextFieldValue).should('not.be.enabled');
  });

  it('Edits a URL field in a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the URL field
    cy.get(InlineEditorSelectors.URLField(AutomationProjectConstants.AllFieldsSecondDocumentId))
      .click();

    // Add a URL
    cy.get(InlineEditorSelectors.URLFieldInput).type('https://app.gridfox-dev.com/');

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the URL value has been added
    cy.get(InlineEditorSelectors.URLField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();
    cy.get(InlineEditorSelectors.URLFieldInput).should('be.visible').should('have.value', 'https://app.gridfox-dev.com/');

    // Remove the URL value
    cy.get(InlineEditorSelectors.URLFieldInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Edits the linked parent field on a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the parent link field
    cy.get(InlineEditorSelectors.ParentLinkField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Select a parent record to link to
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('2')).click();

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the parent link field has been set
    cy.get(InlineEditorSelectors.ParentLinkField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.ParentLinkField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('2 - Second Parent Record');

    // Reset the parent link field
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });

  it('Cannot edit a parent field on a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on a parent field that is visible on the table
    cy.get(InlineEditorSelectors.ParentTextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').contains('First Parent Record');
    // eslint-disable-next-line max-len
    cy.get(InlineEditorSelectors.ParentTextField(AutomationProjectConstants.AllFieldsSecondDocumentId))
      .click();

    // Check field is disabled
    cy.get(InlineEditorSelectors.DisabledFieldTooltip).should('be.visible');
    cy.get(InlineEditorSelectors.TextFieldValue).should('not.be.enabled');
  });

  it('Cannot edit a grandparent field on a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on a grandparent field that is visible on the table
    cy.get(InlineEditorSelectors.GrandparentTextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').contains('Grandparent Text Value');
    // eslint-disable-next-line max-len
    cy.get(InlineEditorSelectors.GrandparentTextField(AutomationProjectConstants.AllFieldsSecondDocumentId))
      .click();

    // Check field is disabled
    cy.get(InlineEditorSelectors.DisabledFieldTooltip).should('be.visible');
    cy.get(InlineEditorSelectors.TextFieldValue).should('not.be.enabled');
  });

  it('Edits the linked many to many field on a record', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.ProjectId)).click();
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName), { timeout: 10000 }).should('be.visible');

    // Clicks on a table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.AllFieldsTableName)).click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Click on the many to many link field
    cy.get(InlineEditorSelectors.ManyToManyField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible').click();

    // Select a many to many record to link to
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).should('be.visible').click();

    // Save
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check the many to many record has been selected
    cy.get(InlineEditorSelectors.ManyToManyField(AutomationProjectConstants.AllFieldsSecondDocumentId)).scrollIntoView().should('be.visible');
    cy.get(InlineEditorSelectors.ManyToManyField(AutomationProjectConstants.AllFieldsSecondDocumentId)).click().contains('2 - Many to Many Record 2');

    // Remove the many to many record value
    cy.get(InlineEditorSelectors.FieldDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });
});
