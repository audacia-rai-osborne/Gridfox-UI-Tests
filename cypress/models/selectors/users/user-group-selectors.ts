export default class UserGroupSelectors {
  static readonly AddUserGroupButton = '.header-buttons > :nth-child(2)';

  static readonly UserGroupNameInput = 'input';

  static readonly CreateUserGroupButton = 'enter-name__confirm';

  static readonly UserGroupMenu = '.name__text > img';

  static readonly DeleteUserGroup = 'delete-group';

  static readonly ToggleUserGroupReadonly = '.toggle-switch__onoff';

  static readonly PermissionsButton = 'save-changes-group-permissions';

  static readonly ImportExportCheckboxFirstGrid = ':nth-child(9) > .import-export';

  static readonly RestrictedFieldsButton = ':nth-child(10) > .add-fields-btn';

  static readonly RecordFiltersButton = ':nth-child(11) > .add-fields-btn';

  static readonly FirstFieldOption = 'div.fields > ul > li:nth-child(1)';

  static readonly GroupPermissionsModalName = '.restricted-fields__field > .name';

  static PermissionsButtonForGroup(groupId: string): string {
    return `[data-user-group-id="${groupId}"] > .group-section__header > .permissions-btn`;
  }

  static ReadOnlyPill(groupName: string): string {
    return `[data-default-group-name="${groupName}"] > .group-section__header > .read-only-pill`;
  }

  static ReadPermissionsFirstGrid(groupId: string): string {
    // eslint-disable-next-line max-len
    return `[data-user-group-id="${groupId}"] > .group-section__permissions > .security > main > .entity-access-grid-container > .entity-access-grid > :nth-child(8) > :nth-child(1)`;
  }

  static CreatePermissionsFirstGrid(groupId: string): string {
    // eslint-disable-next-line max-len
    return `[data-user-group-id="${groupId}"] > .group-section__permissions > .security > main > .entity-access-grid-container > .entity-access-grid > :nth-child(8) > :nth-child(2)`;
  }

  static EditPermissionsFirstGrid(groupId: string): string {
    // eslint-disable-next-line max-len
    return `[data-user-group-id="${groupId}"] > .group-section__permissions > .security > main > .entity-access-grid-container > .entity-access-grid > :nth-child(8) > :nth-child(3)`;
  }

  static DeletePermissionsFirstGrid(groupId: string): string {
    // eslint-disable-next-line max-len
    return `[data-user-group-id="${groupId}"] > .group-section__permissions > .security > main > .entity-access-grid-container > .entity-access-grid > :nth-child(8) > :nth-child(4)`;
  }
}
