export default class WorkflowSelectors {
  // Universal Workflow Selectors
  static readonly CreateNewWorkflow = 'workflow-sidebar__create';

  static readonly ApplyButton = 'workflow-block-panel__apply';

  static readonly SaveButton = 'workflow-settings-save';

  static readonly DeleteButton = 'workflow-settings-delete';

  static readonly SelectTableDropdown = 'workflow-settings-entity__option';

  static readonly WorkflowBlocks = 'workflow-blocks-block';

  static readonly WorkflowCanvas = '[data-test="workflow-canvas"]';

  static SelectWorkflowTable(tableName: string): string {
    return `[data-test="${this.SelectTableDropdown}"][data-test-detail="${tableName}"]`;
  }

  static readonly WorkflowNameInput = 'workflow-settings-name__input';

  static SelectWorkflowBlock(workflowTrigger: string): string {
    return `[data-test="${this.WorkflowBlocks}"][data-test-detail="${workflowTrigger}"]`;
  }

  static readonly WorkflowErrorMessage = '.workflow-errors';

  static readonly WorkflowStatusToggle = 'workflow-settings-status__toggle';

  // Webhook action
  static readonly WebhookAction = 'workflow-block__webhook';

  static readonly WebhookUrl = 'workflow-webhook-settings-url__input';

  static readonly WebhookActionSubtitle = '[data-test=workflow-block__webhook] > .workflow-puck__content > [data-test=workflow-puck__subtitle]';

  static readonly AddNewItemWebhookBody = '.add-new-item';

  // Webhook body
  static readonly WebhookModal = '.webhook';

  static readonly AddWebhookBody = '.add-new-item';

  static readonly EnterWebhookBodyKey = 'workflow-webhook-settings-body__key-input';

  static readonly EnterSecondWebhookKey = '.object-container > :nth-child(2) > [data-test=workflow-webhook-settings-body__item] > .text-input > [data-test=workflow-webhook-settings-body__key-input]';

  static readonly EnterWebhookStringInput = 'workflow-webhook-settings-body__string-input';

  static readonly EnterWebhookNumberInput = 'workflow-webhook-settings-body__number-input';

  static readonly WebhookItem = 'workflow-webhook-settings-body__item';

  static readonly AddWebhookItem = 'workflow-webhook-settings-body__add-item';

  static readonly AddArrayItem = 'workflow-webhook-settings-body__add-array-item';

  static readonly SelectWebhookInputType = 'workflow-webhook-settings-body__type-selector';

  static readonly NumberInputType = '[data-test-detail="Number"]';

  static readonly NullInputType = '[data-test-detail="Null"]';

  static readonly ObjectType = '[data-test-detail="Object"]';

  static readonly ArrayType = '[data-test-detail="Array"]';

  static SelectWebhookKey(webhookKey: string): string {
    return `[data-test="${this.WebhookItem}"][data-test-detail="${webhookKey}"]`;
  }

  static readonly WebhookModalErrorMessage = 'workflow-webhook-settings-body__error';

  // Webhook Authentication Type
  static readonly SelectApiKeyAuth = '[data-test="select-from-list__option"][data-test-detail="API Key"]';

  static readonly ApiKeyHeaderName = '[placeholder="Enter the name of the HTTP header..."]';

  static readonly ApiKeyValue = '[placeholder="Enter your API key ..."]';

  // Workflow Email Action
  static readonly SendEmailAction = 'workflow-block__email';

  static readonly EmailActionSubtitle = '[data-test=workflow-block__email] > .workflow-puck__content > [data-test=workflow-puck__subtitle]';

  // Workflow Email Body
  static readonly EmailModal = '.workflow-block-panel__container';

  static readonly RecipientsInput = 'workflow-email-settings__recipients-input';

  static readonly SelectRecipients = 'workflow-email-settings__recipients-input';

  static readonly DropdownGroup = 'workflow-email-settings__recipients-dropdown-group';

  static readonly AddSubject = 'workflow-email-settings__subject';

  static readonly AddMessage = '.ProseMirror';
}
