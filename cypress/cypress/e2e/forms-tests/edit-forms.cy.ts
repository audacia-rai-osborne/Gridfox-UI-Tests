/* eslint-disable @typescript-eslint/no-explicit-any */
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

  it('Allows an account admin to edit a forms name', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Renames the form
    cy.get(FormSelectors.FormNameField).should('be.visible').clear().type('New Form Name');

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Leave the form
    cy.get(FormSelectors.BackToAllFormsButton).should('be.visible').click();

    // Check the form name is correct
    cy.get(FormSelectors.CellFormName).contains('New Form Name');

    // Change the forms name back
    cy.get(FormSelectors.CellFormName).click();
    cy.get(FormSelectors.FormNameField).should('be.visible').clear().type('Form Name');
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Does not allow an account admin to edit a form and remove its name', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Removes the forms name
    cy.get(FormSelectors.FormNameField).should('be.visible').clear();

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();

    // Check an error message appears telling the user they can not save because they have not specfied a name
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.NameRequiredMessage).should('not.contain', FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a forms table', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Select a table to use in the form
    cy.dataTest(FormSelectors.FormTableDropdown).click();
    // eslint-disable-next-line max-len
    cy.get(FormSelectors.SelectATableInDropdown(AutomationProjectConstants.FormsTableWithTextFields))
      .click();

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Check the new table has been set
    cy.dataTest(FormSelectors.FormTableDropdown)
      .contains(AutomationProjectConstants.FormsTableWithTextFields);

    // Set the table back to what it was
    cy.dataTest(FormSelectors.FormTableDropdown).click();
    cy.get(FormSelectors.SelectATableInDropdown(AutomationProjectConstants.FormsAllFieldsTableName))
      .click();
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a forms title', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Set a new title for the form
    cy.get(FormSelectors.FormTitle).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('New Form Title');
      }
    });

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Check the new title has been set
    cy.get(FormSelectors.FormTitle).contains('New Form Title');

    // Reset form title
    cy.get(FormSelectors.FormTitle).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Title');
      }
    });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a forms description', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Set a new description for the form
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('New Form Description');
      }
    });

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Check the new description has been set
    cy.get(FormSelectors.FormDescription).contains('New Form Description');

    // Reset form description
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Description');
      }
    });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to edit a forms description', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Set a new description for the form
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('New Form Description');
      }
    });

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Check the new description has been set
    cy.get(FormSelectors.FormDescription).contains('New Form Description');

    // Reset form description
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Description');
      }
    });
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);
  });

  it('Allows an account admin to set a field to be required', () => {
    // Clicks on the automation test project
    cy.get(DashboardProjectSelectors.Project(AutomationProjectConstants.FormsProjectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on existing form
    cy.get(FormSelectors.CellFormName).click();

    // Set a field to be required
    cy.get(FormSelectors.SelectAFormField(AutomationProjectConstants.FormsTextFieldId)).click();
    cy.get(FormSelectors.FormFieldRequiredToggle(AutomationProjectConstants.FormsTextFieldId))
      .click({ scrollBehavior: false });

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Click the field is set to required
    cy.get(FormSelectors.RequiredField).should('exist');

    // Set the field back to not be required
    cy.get(FormSelectors.FormFieldRequiredToggle(AutomationProjectConstants.FormsTextFieldId))
      .click({ scrollBehavior: false });
    cy.get(FormSelectors.RequiredField).should('not.exist');
  });
});
