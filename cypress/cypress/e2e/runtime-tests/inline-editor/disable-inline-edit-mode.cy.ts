import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import Routes from '../../../../models/routes';
import DashboardSelectors from '../../../../models/selectors/dashboard/dashboard-selectors';
import InlineEditorSelectors from '../../../../models/selectors/runtime/inline-editor-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import InlineEditorText from '../../../../models/text/runtime-text/inline-editor-text';

describe('Checks that unsaved changes are correctly dealt with when disabling inline edit', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Cancels my changes correctly if I select to do so after disabling inline edit', () => {
    // Check the user is on the dashboard
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Go to the all fields table
    cy.visit(Routes.AllFieldsTable);

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle, { timeout: 10000 }).should('be.visible').click();

    // Click on the text field
    cy.get(InlineEditorSelectors.TextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();

    // Add a text value
    cy.get(InlineEditorSelectors.TextFieldInput).type('Text Field Value');

    // Disable inline edit
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Check the Review Changes modal appears
    cy.get(UniversalSelectors.Modal, { timeout: 10000 }).should('be.visible');
    cy.get(UniversalSelectors.ModalWarning).contains(InlineEditorText.ReviewChangesModalTitle);
    cy.get(UniversalSelectors.ModalText).contains(InlineEditorText.ReviewChangesModalText);

    // Click discard
    cy.get(UniversalSelectors.ModalDiscard).click();

    // Check you are still in edit mode
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('be.visible');

    // Check your changes are still visible
    cy.get(InlineEditorSelectors.TextFieldInput).should('be.visible').should('have.value', 'Text Field Value');
  });

  it('Discards my changes correctly if I choose to do so after disabling inline edit', () => {
    // Check that the user is on the dashboard
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Navigate to the all fields table
    cy.visit(Routes.AllFieldsTable);

    // Toggle inline editor
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.get(InlineEditorSelectors.InlineEditorToggle, { timeout: 10000 }).should('be.visible').click();

    // Click on the text field
    cy.get(InlineEditorSelectors.TextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();

    // Add a text value
    cy.get(InlineEditorSelectors.TextFieldInput).should('be.visible').type('Text Field Value');

    // Disable inline edit
    cy.get(InlineEditorSelectors.InlineEditorToggle).should('be.visible').click();

    // Check Review Changes modal appears
    cy.get(UniversalSelectors.Modal, { timeout: 10000 }).should('be.visible');
    cy.get(UniversalSelectors.ModalWarning).contains(InlineEditorText.ReviewChangesModalTitle);
    cy.get(UniversalSelectors.ModalText).contains(InlineEditorText.ReviewChangesModalText);

    // Discard changes
    cy.dataTest(UniversalSelectors.DiscardButton).click();

    // Check you are no longer in inline edit mode
    cy.get(InlineEditorSelectors.InlineEditorToggle).should('be.visible');
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('not.exist');

    // Check the changes have been discarded
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();
    cy.get(InlineEditorSelectors.TextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();
    cy.get(InlineEditorSelectors.TextFieldInput, { timeout: 10000 }).should('be.visible').should('not.have.value', 'Text Field Value');
  });

  it('Saves my changes correctly if I choose to do so after disabling inline edit', () => {
    // Check the user is on the dashboard
    cy.get(DashboardSelectors.DashboardMain).should('be.visible');

    // Navigate to the table with all fields
    cy.visit(Routes.AllFieldsTable);

    // Toggle inline editor
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.get(InlineEditorSelectors.InlineEditorToggle, { timeout: 10000 }).should('be.visible').click();

    // Click on the text field
    cy.get(InlineEditorSelectors.TextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();

    // Add a text value
    cy.get(InlineEditorSelectors.TextFieldInput).type('Text Field Value');

    // Disable inline edit
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Check Review Changes modal appears
    cy.get(UniversalSelectors.Modal, { timeout: 10000 }).should('be.visible');
    cy.get(UniversalSelectors.ModalWarning).contains(InlineEditorText.ReviewChangesModalTitle);
    cy.get(UniversalSelectors.ModalText).contains(InlineEditorText.ReviewChangesModalText);

    // Save changes
    cy.get(UniversalRuntimeSelectors.SaveChangesButton).click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);

    // Check you are no longer in inline edit mode
    cy.get(InlineEditorSelectors.InlineEditorToggle).should('be.visible');
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('not.exist');

    // Check the text value has been added
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();
    cy.get(InlineEditorSelectors.TextField(AutomationProjectConstants.AllFieldsSecondDocumentId)).should('be.visible').click();
    cy.get(InlineEditorSelectors.TextFieldInput, { timeout: 10000 }).should('be.visible').should('have.value', 'Text Field Value');

    // Remove the text value
    cy.get(InlineEditorSelectors.TextFieldInput).clear();
    cy.get(InlineEditorSelectors.SaveButton).should('be.visible').click();
    cy.get(UniversalSelectors.ToastContainer).should('be.visible').contains(InlineEditorText.InlineEditorSavedMessage);
  });
});
