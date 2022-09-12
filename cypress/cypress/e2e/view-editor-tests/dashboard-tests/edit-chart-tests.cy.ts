import Routes from '../../../../models/routes';
import DashboardSelectors from '../../../../models/selectors/dashboard/dashboard-selectors';
import DashboardEditViewSelectors from '../../../../models/selectors/edit-view/dashboard-edit-view-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

describe('As a project admin I can edit a chart on a dashboard', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.Dashboard);
  });
  // After each should only be used for dismissing toast messages
  afterEach(() => {
    cy.dismissAllToasts();
  });

  it('Allows a project admin to edit a chart on a dashboard', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to edit the number tile
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.get(DashboardEditViewSelectors.ChartSettings).scrollIntoView().first().click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Edit the table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('2')).should('be.visible').click();

    // Select to sum results by count
    cy.get(DashboardEditViewSelectors.NumberTileValuesAreSummedByCount).click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);

    // Check the chart has been edited
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.get(DashboardEditViewSelectors.ChartSettings).scrollIntoView().first().click();
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).contains('Tasks');

    // Reset Chart
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('1')).click();
    cy.get(DashboardEditViewSelectors.NumberTileValuesAreSummedByCount).click();

    // Save Chart
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();
    cy.get(UniversalSelectors.ToastContainer).contains(ViewEditorToastMessages.ScreenSaved);
  });

  it('Does not allows a project admin to edit a chart on a dashboard if the chart will be invalid', () => {
    // Check you are on the dashboard
    cy.get(DashboardSelectors.DashboardMain, { timeout: 10000 }).should('be.visible');

    // Go to the dashboard in the automation test project
    cy.visit(Routes.AutomationProjectDashboard);

    // Click to edit the number tile
    cy.get(UniversalRuntimeSelectors.ProjectTitle).should('be.visible');
    cy.get(DashboardEditViewSelectors.ChartSettings).scrollIntoView().first().click();

    // Check the chart settings has opened
    cy.get(DashboardEditViewSelectors.ChartConfig).should('be.visible');

    // Unset the table
    cy.get(DashboardEditViewSelectors.SelectTableDropdown).click();
    cy.get(UniversalSelectors.DropdownOptions('0')).should('be.visible').click();

    // Click save
    cy.get(DashboardEditViewSelectors.SaveScreenInChartSettingsButton).click();

    // Check an error message has been triggered saying that the chart is missing a table
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ChartIsMissingATable);
  });
});
