import Routes from '../../../../models/routes';
import InlineEditorSelectors from '../../../../models/selectors/runtime/inline-editor-selectors';

describe('Checks that inline editor works with a table that has no records', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  it('Lets a user toggle inline editor on and off for a table with no records', () => {
    cy.visit(Routes.NoRecordsTable);

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle, { timeout: 10000 }).should('be.visible').click();

    // Check you are still in edit mode
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('be.visible');

    // Toggle inline editor
    cy.get(InlineEditorSelectors.InlineEditorToggle).click();

    // Check you are no longer in edit mode
    cy.get(InlineEditorSelectors.ActiveInlineEditorToggle).should('not.exist');
  });
});
