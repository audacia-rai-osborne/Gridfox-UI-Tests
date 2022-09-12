import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import GridEditViewSelectors from '../../../../models/selectors/edit-view/grid-edit-view-selectors';
import UniversalRuntimeEditorSelectors from '../../../../models/selectors/edit-view/universal-edit-view-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import ViewEditorErrorMessages from '../../../../models/text/view-editor-text/error-messages';
import ViewEditorInfoMessages from '../../../../models/text/view-editor-text/info-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can edit a grid view if I create one correctly', () => {
  before(() => {
    cy.login();
    cy.visit(Routes.Dashboard).then(() => {
      // Copies the UI automation template project by calling the API
      cy.copyTemplateProject(AutomationProjectConstants.AccountId, TemplateProjectConstants.UIAutomationProject, 'UI Automation Project Template').then((response) => { projectId = response; });
    });
  });

  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  afterEach(() => {
    cy.dismissAllToasts();
  });

  after(() => {
    // Deletes the template project from its id
    cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  });

  it('Edits a tables name', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');

    // Clicks on the edit table tests table
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .scrollIntoView().click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Edit Table Name
    cy.get(GridEditViewSelectors.TableNameInput).clear();
    cy.get(GridEditViewSelectors.TableNameInput).type('New Table Name');
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Checks the table has been renamed
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');
    cy.get(UniversalRuntimeSelectors.Screen('New Table Names')).scrollIntoView().should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen('New Table Names')).click();

    // Swap table name back
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.get(GridEditViewSelectors.TableNameInput).clear();
    cy.get(GridEditViewSelectors.TableNameInput)
      .type(AutomationProjectConstants.EditTableTestsName);
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Checks the changes have been saved
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');
  });

  it('Allows a project admin to add a field to a table and then delete it', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the edit table tests table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Click to add a field
    cy.dataTest(UniversalRuntimeEditorSelectors.AddNewFieldButton).click();
    cy.get(GridEditViewSelectors.MoneyFieldDropdownList).click();

    // Name the field
    cy.get(GridEditViewSelectors.FieldName).clear();
    cy.get(GridEditViewSelectors.FieldName).type('New Field');

    // Save
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');

    // Delete Field
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.get(GridEditViewSelectors.Field('New Field')).click();
    cy.get(GridEditViewSelectors.DeleteFieldButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check field has deleted
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');
  });

  it('Allows a project admin to change the field type of a new field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the edit table tests table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Click to add a field
    cy.dataTest(UniversalRuntimeEditorSelectors.AddNewFieldButton).click();
    cy.get(GridEditViewSelectors.MoneyFieldDropdownList).click();

    // Change field type
    cy.get(GridEditViewSelectors.FieldTypeIcon).click();
    cy.get(GridEditViewSelectors.TextAreaTableSettingsField).click();

    // Check the field type has changed
    cy.get(GridEditViewSelectors.TextAreaFieldImage).should('be.visible');
  });

  it('Does not allow a project admin to change the field type of an exisiting field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the edit table tests table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Select an exisiting field
    cy.get(GridEditViewSelectors.Field('Text 1')).click();

    // Change field type
    cy.get(GridEditViewSelectors.FieldTypeIcon).click();
    cy.get(GridEditViewSelectors.TextAreaTableSettingsField).click();

    cy.get(UniversalRuntimeSelectors.ErrorTooltip)
      .contains(ViewEditorErrorMessages.ChangeFieldTypeErrorTitle);
  });

  // Is not possible to close the formula modal
  it.skip('Allows a project admin to add a formula field to a table', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the edit table tests table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Click to add a field
    cy.dataTest(UniversalRuntimeEditorSelectors.AddNewFieldButton).click();
    cy.get(GridEditViewSelectors.FormulaFieldDropdownList).click();

    // Name the field
    cy.get(GridEditViewSelectors.FieldName).clear();
    cy.get(GridEditViewSelectors.FieldName).type('Formula Field');

    // Set Formula Field
    cy.get(GridEditViewSelectors.ConfigureFormulaButton).click();
    cy.get(GridEditViewSelectors.FormulaInputField).type('[Number 1] + 5');
    cy.get(GridEditViewSelectors.FormulaBuilderButton).click();
    cy.get(GridEditViewSelectors.FormulaFieldValidMessage).contains('Formula is valid');

    // Save
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');

    // Delete Field
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.get(GridEditViewSelectors.Field('Formula Field')).click();
    cy.get(GridEditViewSelectors.DeleteFieldButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check field has deleted
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');
  });

  it('Allows a project admin to change the currency type of a money field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the edit table tests table
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.get(UniversalRuntimeSelectors.Screen(AutomationProjectConstants.EditTableTestsName))
      .click();
    cy.dataTest(GridRuntimeSelectors.AddRowButton).should('be.visible');

    // Open view editor
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();

    // Click to add a field
    cy.dataTest(UniversalRuntimeEditorSelectors.AddNewFieldButton).click();
    cy.get(GridEditViewSelectors.MoneyFieldDropdownList).click();

    // Name the field
    cy.get(GridEditViewSelectors.FieldName).clear();
    cy.get(GridEditViewSelectors.FieldName).type('Currency Test Field');

    // Save
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');

    // Edit Currency Type
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.get(GridEditViewSelectors.Field('Currency Test Field')).click();
    cy.get(GridEditViewSelectors.CurrencyDropdown).contains('GBP').should('be.visible');
    cy.get(GridEditViewSelectors.CurrencyDropdown).click();

    // Check the currency type has been updated
    cy.get(GridEditViewSelectors.SelectTableSettingsValue).contains('EUR').click();
    cy.get(GridEditViewSelectors.CurrencyDropdown).contains('EUR').should('be.visible');
    cy.get(GridEditViewSelectors.TableSettingsInfo)
      .contains(ViewEditorInfoMessages.ChangeCurrencyInfo);

    // Delete Field
    cy.get(GridEditViewSelectors.DeleteFieldButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check field has deleted
    cy.get(UniversalSelectors.ToastContainer).contains('Data saved');
  });
});
