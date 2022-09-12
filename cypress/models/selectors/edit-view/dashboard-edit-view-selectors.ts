export default class DashboardEditViewSelectors {
  static readonly AddChartButton = 'dashboard-add-chart-button';

  static readonly SaveDashboardButton = 'dashboard-save-screen-button';

  static readonly ChartName = 'dashboard-chart-name';

  static readonly NumberTileName = '.number-tile__center > .name';

  static readonly ChartSettings = '.setting-chart';

  static readonly SaveScreenInChartSettingsButton = '.dashboard-chart-config__footer > .gridfox-button--primary';

  static readonly DeleteChartButton = '.dashboard-chart-config__footer > .gridfox-button--secondary';

  static readonly AddPieChartButton = '[type="Pie Chart"]';

  static readonly AddNumberTileButton = '[type="Number Tile"]';

  static readonly AddLineChartButton = '[type="Line Chart"]';

  static readonly AddBarChartButton = '[type="Bar Chart"]';

  static readonly AddFunnelChartButton = '[type="Funnel Chart"]';

  static readonly AddRecordGridButton = '[type="Record Grid"]';

  static readonly ChartConfig = '.config';

  static readonly NameInput = '.name-input > input';

  static readonly SelectTableDropdown = ':nth-child(3) > .inline-dropdown > .inline-dropdown__selected';

  static readonly SelectFilterDropdown = ':nth-child(4) > .inline-dropdown > .inline-dropdown__selected';

  static readonly GroupResultsByField = '[data-v-3e12bcfe=""] > .inline-dropdown > .inline-dropdown__selected';

  // Pie Chart
  static readonly PieChartValuesShowOnHover = ':nth-child(7) > .radio-button-options__tabs > :nth-child(1)';

  static readonly PieChartValuesAreSummedByCount = ':nth-child(9) > .radio-button-options__tabs > :nth-child(1)';

  // Number tile
  static readonly NumberTileValuesAreSummedByCount = '.radio-button-options__tabs > :nth-child(1)';

  // Line Chart
  static readonly XAxisValues = '[data-v-3e12bcfe=""] > .inline-dropdown > .inline-dropdown__selected';

  static readonly LineChartValuesAreSummedByCount = '.radio-button-options__tabs > :nth-child(1)';

  // Funnel Charts
  static readonly FunnelChartSumResultsByCount = ':nth-child(9) > .radio-button-options__tabs > :nth-child(1)';

  // Record Grid
  static readonly SelectFirstFieldToBeDisplayField = '.selected > ul > :nth-child(1)';
}
