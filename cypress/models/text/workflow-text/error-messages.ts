export default class WorkflowErrorMessages {
  static readonly NoWebhookURL = 'Webhook URL is required.';

  static readonly InvalidWebhookURL = 'Webhook URL must be a valid URL.';

  static readonly NoProtocolInWebhookURL = 'Webhook URL must specify a protocol.';

  static readonly InvalidWebhookBodyMapping = 'Webhook body mapping is invalid';

  static readonly HeaderNameIsRequired = 'Header Name is required';

  static readonly InvalidHeaderName = 'Header Name is invalid';

  static readonly ApiKeyIsRequired = 'API Key is required';
}
