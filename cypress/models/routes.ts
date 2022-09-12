export default class Routes {
  static readonly Dashboard = '/';

  static AccountSettingsURL(accountId: string): string {
    return `/#/account/overview/${accountId}`;
  }

  static Project(projectId: string): string {
    return `/#/apps/${projectId}`;
  }

  // 1 UI Automation Project Routes
  static readonly AllFieldsTable = 'https://app.gridfox-dev.com/#/apps/45b5d691-90ad-4a9a-6e86-08d967c6969f/fc6572c8-5c71-1977-70d4-961d821edab3';

  static readonly NoRecordsTable = 'https://app.gridfox-dev.com/#/apps/45b5d691-90ad-4a9a-6e86-08d967c6969f/03d65203-52dc-a474-b84c-56b2586cac35';

  static readonly AutomationProjectDashboard = 'https://app.gridfox-dev.com/#/builder/45b5d691-90ad-4a9a-6e86-08d967c6969f/custom/9df8ef46-fc90-296c-cef8-4c9bca676a2e';
}
