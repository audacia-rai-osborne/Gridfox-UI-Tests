import AutomationProjectConstants from '../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../models/constants/template-project-ids';
import Routes from '../../../models/routes';
import DashboardProjectSelectors from '../../../models/selectors/dashboard/project-selectors';
import UniversalRuntimeSelectors from '../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../models/selectors/universal/universal-selectors';
import UserGroupSelectors from '../../../models/selectors/users/user-group-selectors';
import UserGroupText from '../../../models/text/users-text/user-group-text';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can delete a user group', () => {
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

  it('Allows an account admin to delete a user group', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on users
    cy.get(UniversalRuntimeSelectors.UsersButton).click();

    // Adds a user group
    cy.get(UserGroupSelectors.AddUserGroupButton).click();
    cy.get(UserGroupSelectors.UserGroupNameInput).type('New User Group');
    cy.dataTest(UserGroupSelectors.CreateUserGroupButton).click();

    // Checks a user group has been added and that there are now five user groups
    cy.dataTest(UserGroupSelectors.PermissionsButton).should('have.length', 5);

    // Opens the delete modal for a user group
    cy.get(UserGroupSelectors.UserGroupMenu).last().click();
    cy.dataTest(UserGroupSelectors.DeleteUserGroup).click();

    // Cancels deleting the user group
    cy.get(UniversalSelectors.ModalTitle).contains(UserGroupText.DeleteUserGroupModal);
    cy.dataTest(UniversalSelectors.CancelButton).click();
    cy.get(UniversalSelectors.ModalTitle).should('not.exist');

    // Actually deletes the user group
    cy.dataTest(UserGroupSelectors.PermissionsButton).should('have.length', 5);
    cy.get(UserGroupSelectors.UserGroupMenu).last().click();
    cy.dataTest(UserGroupSelectors.DeleteUserGroup).last().click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Checks the user group has been deleted and that there are now four user groups
    cy.dataTest(UserGroupSelectors.PermissionsButton).should('have.length', 4);
  });
});
