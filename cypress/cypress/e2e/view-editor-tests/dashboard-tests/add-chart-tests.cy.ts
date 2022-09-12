import Routes from '../../../../models/routes';
import DashboardSelectors from '../../../../models/selectors/dashboard/dashboard-selectors';
import DashboardEditViewSelectors from '../../../../models/selectors/edit-view/dashboard-edit-view-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

describe('As a project admin I can add a chart to a dashboard', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Allows a project admin to add a pie chart to a dashboard', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a pie chart
    cy.get(DashboardEditViewSelectors.AddPieChartButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Set a name for the table
    cy.get(DashboardEditViewSelectors.NameInput).type('New Pie Chart');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select field to group results by
    cy.get(DashboardEditViewSelectors.GroupResultsByField).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select for the pie chart values to appear on hover
    cy.get(DashboardEditViewSelectors.PieChartValuesShowOnHover).click();

    // Select for results to be summed by count
    cy.get(DashboardEditViewSelectors.PieChartValuesAreSummedByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check the chart has been added
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);
    cy.dataTest(DashboardEditViewSelectors.ChartName).contains('New Pie Chart');

    // Delete the chart
    cy.get(DashboardEditViewSelectors.ChartSettings).last().click();
    cy.get(DashboardEditViewSelectors.DeleteChartButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);

    // Save the dashboard
    cy.dataTest(DashboardEditViewSelectors.SaveDashboardButton).click();
  });

  it('Does not allows a project admin to add a pie chart to a dashboard without selecting a table', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a pie chart
    cy.get(DashboardEditViewSelectors.AddPieChartButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Set a name for the chart
    cy.get(DashboardEditViewSelectors.NameInput).type('New Pie Chart');

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check an error message has been triggered saying that the chart is missing a table
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ChartIsMissingATable);
  });

  it('Allows a project admin to add a number tile to a dashboard', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a number tile
    cy.get(DashboardEditViewSelectors.AddNumberTileButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Name the number tile
    cy.get(DashboardEditViewSelectors.NameInput).type('New Number Tile');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select for results to be summed by count
    cy.get(DashboardEditViewSelectors.NumberTileValuesAreSummedByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check the chart has been added
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);
    cy.get(DashboardEditViewSelectors.NumberTileName).contains('New Number Tile');

    // Delete the chart
    cy.get(DashboardEditViewSelectors.ChartSettings).last().click();
    cy.get(DashboardEditViewSelectors.DeleteChartButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);

    // Save the dashboard
    cy.dataTest(DashboardEditViewSelectors.SaveDashboardButton).click();
  });

  it('Does not allow a project admin to create a number tile without a field to sum results by', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a number tile
    cy.get(DashboardEditViewSelectors.AddNumberTileButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Name the number tile
    cy.get(DashboardEditViewSelectors.NameInput).type('New Number Tile');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check an error message has been triggered saying that the chart is missing a table
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ChartIsMissingAFieldToSumResultsBy);
  });

  it('Allows a project admin to add a line chart to a dashboard', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a line chart
    cy.get(DashboardEditViewSelectors.AddLineChartButton).should('be.visible').click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible').click();

    // Name the chart
    cy.get(DashboardEditViewSelectors.NameInput).type('New Line Chart');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select field to group results by
    cy.get(DashboardEditViewSelectors.GroupResultsByField).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select for results to be summed by count
    cy.get(DashboardEditViewSelectors.LineChartValuesAreSummedByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check the chart has been added
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);
    cy.dataTest(DashboardEditViewSelectors.ChartName).contains('New Line Chart');

    // Delete the chart
    cy.get(DashboardEditViewSelectors.ChartSettings).last().click();
    cy.get(DashboardEditViewSelectors.DeleteChartButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);

    // Save the dashboard
    cy.dataTest(DashboardEditViewSelectors.SaveDashboardButton).click();
  });

  it('Does not allow a project admin to add a line chart without a field to group the x-axis results by', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a line chart
    cy.get(DashboardEditViewSelectors.AddLineChartButton).should('be.visible').click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible').click();

    // Name the chart
    cy.get(DashboardEditViewSelectors.NameInput).type('New Line Chart');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select for results to be summed by count
    cy.get(DashboardEditViewSelectors.LineChartValuesAreSummedByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check an error message has been triggered saying that the chart is missing a field to group by
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ChartIsMissingAFieldToGroupBy);
  });

  it('Allows a project admin to add a bar chart to a dashboard', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a bar chart
    cy.get(DashboardEditViewSelectors.AddBarChartButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Name the bar chart
    cy.get(DashboardEditViewSelectors.NameInput).type('New Bar Chart');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select field to group results by
    cy.get(DashboardEditViewSelectors.GroupResultsByField).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select for results to be summed by count
    cy.get(DashboardEditViewSelectors.LineChartValuesAreSummedByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check the chart has been added
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);
    cy.dataTest(DashboardEditViewSelectors.ChartName).contains('New Bar Chart');

    // Delete the chart
    cy.get(DashboardEditViewSelectors.ChartSettings).last().click();
    cy.get(DashboardEditViewSelectors.DeleteChartButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);

    // Save the dashboard
    cy.dataTest(DashboardEditViewSelectors.SaveDashboardButton).click();
  });

  it('Does not allow a project admin to add a bar chart to a dashboard if they do not set a field to group by', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a bar chart
    cy.get(DashboardEditViewSelectors.AddBarChartButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Name the bar chart
    cy.get(DashboardEditViewSelectors.NameInput).type('New Bar Chart');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select for results to be summed by count
    cy.get(DashboardEditViewSelectors.LineChartValuesAreSummedByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check an error message has been triggered saying that the chart is missing a field to group by
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ChartIsMissingAFieldToGroupBy);
  });

  it('Allows a project admin to add a funnel chart to a dashboard', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a funnel chart
    cy.get(DashboardEditViewSelectors.AddFunnelChartButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');
    cy.get(DashboardEditViewSelectors.NameInput).type('New Funnel Chart');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select field to group results by
    cy.get(DashboardEditViewSelectors.GroupResultsByField).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select for the y-axis values to be summed by count
    cy.get(DashboardEditViewSelectors.FunnelChartSumResultsByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check the chart has been added
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);
    cy.dataTest(DashboardEditViewSelectors.ChartName).contains('New Funnel Chart');

    // Delete the chart
    cy.get(DashboardEditViewSelectors.ChartSettings).last().click();
    cy.get(DashboardEditViewSelectors.DeleteChartButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);

    // Save the dashboard
    cy.dataTest(DashboardEditViewSelectors.SaveDashboardButton).click();
  });

  it('Does not allows a project admin to add a funnel chart to a dashboard without a table', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a funnel chart
    cy.get(DashboardEditViewSelectors.AddFunnelChartButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Name the chart
    cy.get(DashboardEditViewSelectors.NameInput).type('New Funnel Chart');

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check an error message has been triggered saying that the chart is missing a table
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ChartIsMissingATable);
  });

  it('Allows a project admin to add a record grid to a dashboard', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a record chart
    cy.get(DashboardEditViewSelectors.AddRecordGridButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Names the record Grid
    cy.get(DashboardEditViewSelectors.NameInput).type('New Record Grid');

    // Select a table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Select a filter
    cy.get(DashboardEditViewSelectors.SelectFilterDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();

    // Set the first display field to be the field that is currently at the top of the dropdown list
    cy.get(UniversalSelectors.SelectedItem).click();
    cy.get(DashboardEditViewSelectors.SelectFirstFieldToBeDisplayField).click();

    // Set the second display field to be the field that is currently at the top of the dropdown list
    cy.get(UniversalSelectors.SelectedItem).click();
    cy.get(DashboardEditViewSelectors.SelectFirstFieldToBeDisplayField).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check the chart has been added
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);
    cy.dataTest(DashboardEditViewSelectors.ChartName).contains('New Record Grid');

    // Delete the chart
    cy.get(DashboardEditViewSelectors.ChartSettings).last().click();
    cy.get(DashboardEditViewSelectors.DeleteChartButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);

    // Save the dashboard
    cy.dataTest(DashboardEditViewSelectors.SaveDashboardButton).click();
  });

  it('Does not allow a project admin to add a record grid to a dashboard without a table', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to add a chart
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.dataTest(DashboardEditViewSelectors.AddChartButton).should('be.visible').click();

    // Click to add a record chart
    cy.get(DashboardEditViewSelectors.AddRecordGridButton).click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Names the record Grid
    cy.get(DashboardEditViewSelectors.NameInput).type('New Record Grid');

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check an error message has been triggered saying that the chart is missing a table
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ChartIsMissingATable);
  });
});
