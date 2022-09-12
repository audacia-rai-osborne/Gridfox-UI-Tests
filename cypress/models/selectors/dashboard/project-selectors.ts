export default class DashboardProjectSelectors {
  static readonly ProjectName = 'div.project-info > div.cell.cell--project-name > div';

  static readonly ProjectRow = 'dashboard-table__project';

  static readonly ProjectRowLink = 'dashboard-table__project-link';

  static readonly ProjectRowDelete = 'dashboard-table__delete-project';

  static readonly CancelProjectDelete = 'confirm-action-modal__cancel-action-button';

  static readonly ConfirmProjectDelete = 'confirm-action-modal__confirm-action-button';

  static readonly CreateNewProject = '.input-button__submit';

  static readonly EditProjectButton = 'dashboard-table__edit-project';

  static readonly EditProjectNameInput = '.project-name-input';

  static readonly EditNameLoadingIcon = '.editing-name__loader';

  static AddNewProjectButton(accountId: string): string {
    // eslint-disable-next-line max-len
    return `[data-account-id="${accountId}"] > .table-header > .table-header__buttons > .gridfox-button--primary`;
  }

  static Project(projectId: string): string {
    return `[data-test="${this.ProjectRow}"][data-test-detail="${projectId}"]`;
  }

  static ProjectLink(projectId: string): string {
    return `${this.Project(projectId)} > [data-test="${this.ProjectRowLink}"]`;
  }

  static ProjectRenameInput(projectId: string): string {
    // eslint-disable-next-line max-len
    return `${this.Project(projectId)} > div.project-info > div.cell.cell--project-name > [class="project-name-input"]`;
  }

  static ProjectLinkByName(projectName: string): string {
    return `[data-test="${this.ProjectRowLink}"][data-test-detail="${projectName}"]`;
  }

  // Project menu
  static ProjectMenu(projectId: string): string {
    return `[data-test-detail="${projectId}"] > .project-info > .actions > .project-setting-icon`;
  }

  static readonly DeleteProject = 'right-click-menu__delete-project';

  static readonly RenameProject = 'right-click-menu__rename-project';
}
