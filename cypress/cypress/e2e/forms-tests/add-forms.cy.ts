/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiRoutesForms from '../../../models/api-routes/api-routes-forms';
import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../models/constants/template-project-ids';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import FormSelectors from '../../../models/selectors/forms/forms-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import FormsModalText from '../../../models/text/forms-text/modal-text';
import FormsToastMessages from '../../../models/text/forms-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add a form to a project if I create one correctly', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  before(() => {
    cy.login();
    cy.visit(Routes.Dashboard).then(() => {
      // Copies the UI automation template project by calling the API
      cy.copyTemplateProject(AutomationProjectConstants.AccountId, TemplateProjectConstants.UIAutomationProject, 'UI Automation Project').then((response) => { projectId = response; });
    });
  });

  afterEach(() => {
    cy.dismissAllToasts();
  });

  after(() => {
    // Deletes the template project from its id
    cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  });

  it('Allows an account admin to create a form in a project they created', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on the button to create a new form
    cy.get(FormSelectors.NewFormsButton).click();

    // Names the form
    cy.get(FormSelectors.FormNameField).type('Form Name');

    // Select a table to use in the form
    cy.dataTest(FormSelectors.FormTableDropdown).click();
    cy.get(FormSelectors.SelectATableInDropdown(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Set a title for the form
    cy.get(FormSelectors.FormTitle).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Title', true);
      }
    });

    // Set a description for the form
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Description', true);
      }
    });

    // Set a submission message for the form
    cy.get(FormSelectors.FormSubmissionMessage).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Thank you for completing this form', true);
      }
    });

    // Intercept the API call
    cy.intercept(ApiRoutesForms.Forms(projectId)).as('jobsQuery');

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();

    // Check that the API call is successful
    cy.wait('@jobsQuery').then((intercept) => {
      const { statusCode } = intercept.response;
      expect(statusCode).to.equal(200);
    });

    // Check the toast message is returned
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Leave the form
    cy.get(FormSelectors.BackToAllFormsButton).should('be.visible').click();

    // Check the form is showing in the UI
    cy.get(FormSelectors.CellFormName).contains('Form Name');

    // Delete the form
    cy.get(FormSelectors.FormOptionMenu).click();
    cy.dataTest(FormSelectors.DeleteForm).click();
    cy.get(UniversalSelectors.ModalTitle).should('be.visible').contains(FormsModalText.DeleteFormModal);
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
  });

  it('Allows an account admin to create a form without a submission message', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on the button to create a new form
    cy.get(FormSelectors.NewFormsButton).click();

    // Names the form
    cy.get(FormSelectors.FormNameField).type('Form Name');

    // Select a table to use in the form
    cy.dataTest(FormSelectors.FormTableDropdown).click();
    cy.get(FormSelectors.SelectATableInDropdown(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Set a title for the form
    cy.get(FormSelectors.FormTitle).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Title', true);
      }
    });

    // Set a description for the form
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Description', true);
      }
    });

    // Intercept the API call
    cy.intercept(ApiRoutesForms.Forms(projectId)).as('jobsQuery');

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();

    // Check that the API call is successful
    cy.wait('@jobsQuery').then((intercept) => {
      const { statusCode } = intercept.response;
      expect(statusCode).to.equal(200);
    });

    // Check that a toast message is triggered
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.SaveFormToastMessage);

    // Leave the form
    cy.get(FormSelectors.BackToAllFormsButton).should('be.visible').click();

    // Check the form name is correct
    cy.get(FormSelectors.CellFormName).contains('Form Name');

    // Delete the form
    cy.get(FormSelectors.FormOptionMenu).click();
    cy.dataTest(FormSelectors.DeleteForm).click();
    cy.get(UniversalSelectors.ModalTitle).should('be.visible').contains(FormsModalText.DeleteFormModal);
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
  });

  it('Does not allows an account admin to create a form without a name', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on the button to create a new form
    cy.get(FormSelectors.NewFormsButton).click();

    // Select a table to use in the form
    cy.dataTest(FormSelectors.FormTableDropdown).click();
    cy.get(FormSelectors.SelectATableInDropdown(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Set a title for the form
    cy.get(FormSelectors.FormTitle).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Title', true);
      }
    });

    // Set a description for the form
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Description', true);
      }
    });

    // Intercept the API call
    cy.intercept(ApiRoutesForms.Forms(projectId)).as('jobsQuery');

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();

    // Check that the API call returns a 400 response
    cy.wait('@jobsQuery').then((intercept) => {
      const { statusCode } = intercept.response;
      expect(statusCode).to.equal(400);
    });

    // Check the correct error message shows
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.NameRequiredMessage).should('not.contain', FormsToastMessages.SaveFormToastMessage);
  });

  it('Does not allow an account admin to create a form without a table', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on the button to create a new form
    cy.get(FormSelectors.NewFormsButton).click();

    // Names the form
    cy.get(FormSelectors.FormNameField).type('Form Name');

    // Set a title for the form
    cy.get(FormSelectors.FormTitle).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Title', true);
      }
    });

    // Set a description for the form
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Description', true);
      }
    });

    // Intercept the API call
    cy.intercept(ApiRoutesForms.Forms(projectId)).as('jobsQuery');

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();

    // Check that the API call returns a 400 response
    cy.wait('@jobsQuery').then((intercept) => {
      const { statusCode } = intercept.response;
      expect(statusCode).to.equal(400);
    });

    // Check the correct error message shows
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.TableRequiredMessage).should('not.contain', FormsToastMessages.SaveFormToastMessage);
  });

  it('Does not allow an account admin to create a form without a title', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on the button to create a new form
    cy.get(FormSelectors.NewFormsButton).click();

    // Names the form
    cy.get(FormSelectors.FormNameField).type('Form Name');

    // Select a table to use in the form
    cy.dataTest(FormSelectors.FormTableDropdown).click();
    cy.get(FormSelectors.SelectATableInDropdown(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Set a description for the form
    cy.get(FormSelectors.FormDescription).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Description', true);
      }
    });

    // Intercept the API call
    cy.intercept(ApiRoutesForms.Forms(projectId)).as('jobsQuery');

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();

    // Check that the API call returns a 400 response
    cy.wait('@jobsQuery').then((intercept) => {
      const { statusCode } = intercept.response;
      expect(statusCode).to.equal(400);
    });

    // Check the correct error message shows
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.TitleRequiredMessage).should('not.contain', FormsToastMessages.SaveFormToastMessage);
  });

  it('Does not allow an account admin to create a form without a description', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the form button
    cy.get(UniversalRuntimeSelectors.FormsPageButton).click();

    // Clicks on the button to create a new form
    cy.get(FormSelectors.NewFormsButton).click();

    // Names the form
    cy.get(FormSelectors.FormNameField).type('Form Name');

    // Select a table to use in the form
    cy.dataTest(FormSelectors.FormTableDropdown).click();
    cy.get(FormSelectors.SelectATableInDropdown(AutomationProjectConstants.AllFieldsTableName))
      .click();

    // Set a title for the form
    cy.get(FormSelectors.FormTitle).then((elements: any) => {
      if (elements.length) {
        elements[0].editor.commands.setContent('Form Title', true);
      }
    });

    // Intercept the API call
    cy.intercept(ApiRoutesForms.Forms(projectId)).as('jobsQuery');

    // Save the form
    cy.get(FormSelectors.FormSaveButton).click();

    // Check that the API call returns a 400 response
    cy.wait('@jobsQuery').then((intercept) => {
      const { statusCode } = intercept.response;
      expect(statusCode).to.equal(400);
    });

    // Check the correct error message shows
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(FormsToastMessages.DescriptionRequiredMessage).should('not.contain', FormsToastMessages.SaveFormToastMessage);
  });
});
