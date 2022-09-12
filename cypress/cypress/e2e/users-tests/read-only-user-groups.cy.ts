import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../models/constants/template-project-ids';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import UserGroupSelectors from '../../../models/selectors/users/user-group-selectors';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

// These tests are braking due to a data set up issue as the tests do not have the correct Ids I will resolve as part of the improving Gridfox cypress tests process
describe.skip('As a user I can configure a read only user group', () => {
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
    cy.get(UniversalSelectors.WholePageSpinner).should('not.be.visible');
    cy.dismissAllToasts();
  });

  after(() => {
    // Deletes the template project from its id
    cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  });

  it('As an account admin if I view the View user group it is marked as read only', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Checks the view user group has a read only tag
    cy.get(UserGroupSelectors.ReadOnlyPill('View')).scrollIntoView().should('be.visible');
  });

  it('As an account admin I can create a user group and mark it as read only', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Adds a user group
    cy.get(UserGroupSelectors.AddUserGroupButton).should('be.visible').click();
    cy.get(UserGroupSelectors.UserGroupNameInput).type('New Read Only User Group');

    // Set the user group as readonly
    cy.get(UserGroupSelectors.ToggleUserGroupReadonly).click();
    cy.dataTest(UserGroupSelectors.CreateUserGroupButton).click();

    // Checks a new read only group has been added (Each user group has a permissions button and there are now five user groups)
    cy.get(UserGroupSelectors.PermissionsButton).should('have.length', 5);

    // Delete the user group that was created
    cy.get(UserGroupSelectors.UserGroupMenu).last().click();
    cy.dataTest(UserGroupSelectors.DeleteUserGroup).last().click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Checks that there are now only four user groups
    cy.get(UserGroupSelectors.PermissionsButton).should('have.length', 4);
  });

  it('As an account admin I cannot give view, edit or delete access to a readonly group', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Opens the permissions for the read only group
    cy.get(UserGroupSelectors.AddUserGroupButton).should('be.visible');
    // eslint-disable-next-line max-len
    cy.get(UserGroupSelectors.PermissionsButtonForGroup(AutomationProjectConstants.ReadOnlyUserGroup))
      .click();

    // Check the create, edit and delete fields are disabled
    cy.get(UserGroupSelectors.CreatePermissionsFirstGrid(AutomationProjectConstants.ReadOnlyUserGroup)).should('not.be.enabled');
    cy.get(UserGroupSelectors.EditPermissionsFirstGrid(AutomationProjectConstants.ReadOnlyUserGroup)).should('not.be.enabled');
    cy.get(UserGroupSelectors.DeletePermissionsFirstGrid(AutomationProjectConstants.ReadOnlyUserGroup)).should('not.be.enabled');
  });

  it('As an account admin I can give read access to a grid in a readonly group', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Opens the permissions for the read only group
    cy.get(UserGroupSelectors.AddUserGroupButton).should('be.visible');
    // eslint-disable-next-line max-len
    cy.get(UserGroupSelectors.PermissionsButtonForGroup(AutomationProjectConstants.ReadOnlyUserGroup))
      .click();

    // Checks a checkbox for a grid in a table to give read access
    // eslint-disable-next-line max-len
    cy.get(UserGroupSelectors.ReadPermissionsFirstGrid(AutomationProjectConstants.ReadOnlyUserGroup))
      .click();
    cy.get(UniversalSelectors.CheckedCheckBox).should('be.visible');

    // Checks the checkbox again to remove the read access for the table
    // eslint-disable-next-line max-len
    cy.get(UserGroupSelectors.ReadPermissionsFirstGrid(AutomationProjectConstants.ReadOnlyUserGroup)).click();
    cy.get(UniversalSelectors.CheckedCheckBox).should('not.exist');
  });

  it('As an account admin I can give export access to a grid in a readonly group', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Opens the permissions for the read only group
    cy.get(UserGroupSelectors.AddUserGroupButton).should('be.visible');
    // eslint-disable-next-line max-len
    cy.get(UserGroupSelectors.PermissionsButtonForGroup(AutomationProjectConstants.ReadOnlyUserGroup))
      .click();

    // Checks the export checkbox for a grid in a table to give export access
    cy.get(UserGroupSelectors.ImportExportCheckboxFirstGrid).click();
    cy.get(UniversalSelectors.CheckedCheckBox);

    // Unchecks the checkbox so the user no longer has export access
    cy.get(UserGroupSelectors.ImportExportCheckboxFirstGrid).click();
    cy.get(UniversalSelectors.CheckedCheckBox).should('not.exist');
  });

  it('As an account admin I can set restricted fields in a readonly group', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Opens the permissions for the read only group
    cy.get(UserGroupSelectors.AddUserGroupButton).should('be.visible');
    // eslint-disable-next-line max-len
    cy.get(UserGroupSelectors.PermissionsButtonForGroup(AutomationProjectConstants.ReadOnlyUserGroup))
      .click();

    // Opens restricted fields for the first table
    cy.get(UserGroupSelectors.RestrictedFieldsButton).click();

    // Select the first field to be a restricted field
    cy.get(UniversalSelectors.Option).click();
    cy.get(UserGroupSelectors.FirstFieldOption).click();

    // Save the field
    cy.get(UniversalSelectors.SaveButton);

    // Check the field restriction has been added
    cy.get(UserGroupSelectors.GroupPermissionsModalName).contains('ID');

    // Remove the restricted field
    cy.get(UniversalSelectors.Delete).click({ force: true });
    cy.get(UserGroupSelectors.GroupPermissionsModalName).should('not.exist');
  });

  it('As an account admin I can set record filters for a readonly group', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Opens the permissions for the read only group
    cy.get(UserGroupSelectors.AddUserGroupButton).should('be.visible');
    // eslint-disable-next-line max-len
    cy.get(UserGroupSelectors.PermissionsButtonForGroup(AutomationProjectConstants.ReadOnlyUserGroup))
      .click();

    // Open record filter options
    cy.get(UserGroupSelectors.RecordFiltersButton).click();

    // Select the first option which is created by
    cy.get(UniversalSelectors.Option).click();
    cy.get(UserGroupSelectors.FirstFieldOption).click();

    // Save the record filters
    cy.get(UniversalSelectors.SaveButton);

    // Check the correct record filter has been applied
    cy.get(UserGroupSelectors.GroupPermissionsModalName).contains('Created By');

    // Remove the record filter
    cy.get(UniversalSelectors.Delete).click({ force: true });
    cy.get(UserGroupSelectors.GroupPermissionsModalName).should('not.exist');
  });
});
