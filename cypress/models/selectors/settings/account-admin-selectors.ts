export default class AccountAdminSelectors {
  static readonly InviteAccountAdminButton = 'invite-account-admin';

  static readonly AddAccountAdminButton = 'add-account-admin';

  static readonly BackToDashboardButton = '.home-link';

  static AccountAdminMenu(userId: string): string {
    return `[right-clicky-id="${userId}"] > .options-col`;
  }

  static RemoveAccountAdmin = 'right-click-menu__remove-account-admin';
}
