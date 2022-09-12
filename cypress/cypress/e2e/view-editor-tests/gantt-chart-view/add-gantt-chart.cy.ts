import AutomationProjectConstants from '../../../../models/constants/automation-project-constants';
import TemplateProjectConstants from '../../../../models/constants/template-project-ids';
import Routes from '../../../../models/routes';
import DashboardProjectSelectors from '../../../../models/selectors/dashboard/project-selectors';
import GanttEditViewSelectors from '../../../../models/selectors/edit-view/gantt-edit-view-selectors';
import UniversalRuntimeEditorSelectors from '../../../../models/selectors/edit-view/universal-edit-view-selectors';
import GridRuntimeSelectors from '../../../../models/selectors/runtime/grid-runtime-selectors';
import UniversalRuntimeSelectors from '../../../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../../../models/selectors/universal/universal-selectors';
import GanttChartText from '../../../../models/text/view-editor-text/gantt-chart-text';
import ViewEditorToastMessages from '../../../../models/text/view-editor-text/toast-messages';

// The project Id that will be set to the projectId of the created template project
let projectId = null;

describe('As a user I can add a gantt chart if I create one correctly', () => {
  beforeEach(() => {
    cy.dismissAllToasts();
    cy.login();
    cy.visit(Routes.Dashboard);
  });

  before(() => {
    cy.login();
    cy.visit(Routes.Dashboard).then(() => {
      // Copies the UI automation template project by calling the API
      cy.copyTemplateProject(AutomationProjectConstants.AccountId, TemplateProjectConstants.UIAutomationProject, 'UI Automation Project Template').then((response) => { projectId = response; });
    });
  });

  after(() => {
    // Deletes the template project from its id
    cy.deleteProject(AutomationProjectConstants.AccountId, projectId);
  });

  it('Allows an account admin to add a new gantt chart to a project with a text field title and date fields for the start and end dates', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectName('Name')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Save the gantt chart
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);

    // Check the gantt has been created
    cy.dataTest(UniversalRuntimeEditorSelectors.LeaveViewEditor).click();
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('exist');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.get(UniversalSelectors.ModalTitle).contains('Are you sure you want to delete "Gantt Chart"?');
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Does not allow an account admin to continue with the create gantt chart process without specfiying a table', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();

    // Names the new Gantt Chart
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Do not select a table in the Gantt creator and just click next
    cy.get(GanttEditViewSelectors.Button).click();

    // Check the correct validation message appears
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards).contains(GanttChartText.SelectATable);
  });

  it('Does not allow an account admin to continue with the create gantt chart process without specfiying a start date', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();

    // Names the new Gantt Chart
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Select a table
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();

    // Click next without selecting a start date
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Check the correct validation message appears
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(GanttChartText.SelectAStartDate);
  });

  it('Does not allow an account admin to continue with the create gantt chart process without specfiying an end date', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();

    // Names the new Gantt Chart
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Selects a table for the Gantt Chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();

    // Selects a start date for the Gantt Chart
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Click next without selecting an end date
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Check the correct validation message appears
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(GanttChartText.SelectAnEndDate);
  });

  it('Does not allow an account admin to continue with the create gantt chart process without specfiying display fields', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();

    // Names the new Gantt chart
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Selects a table for the Gantt Chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();

    // Selects a start date for the Gantt Chart
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Click next without selecting an end date
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Click next without specifying any display fields
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Check the correct validation message appears
    cy.get(UniversalRuntimeSelectors.ValidationMessageBoards)
      .contains(GanttChartText.SelectATitleField);
  });

  it('Allows an account admin to add a new gantt chart to a project with a date time field for the start and end dates', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date Time')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date Time')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectName('Name')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Save the gantt chart
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);

    // Check the gantt has been created
    cy.dataTest(UniversalRuntimeEditorSelectors.LeaveViewEditor).click();
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('exist');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeSelectors.OpenViewEditor).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a list field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a list field
    cy.get(GanttEditViewSelectors.SelectName('Event Type')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a list field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Event Type')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a user field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a user field
    cy.get(GanttEditViewSelectors.SelectName('Meeting Creator')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a user field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Meeting Creator')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a formula field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a formula field
    cy.get(GanttEditViewSelectors.SelectName('Number of invited staff not attending')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a formula field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Number of invited staff not attending')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a text area field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a text area field
    cy.get(GanttEditViewSelectors.SelectName('Meeting Room')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a text area field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Meeting Room')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a rich text field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a rich text field
    cy.get(GanttEditViewSelectors.SelectName('Notes')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a rich text field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Notes')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a percentage field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a percentage field
    cy.get(GanttEditViewSelectors.SelectName('Percentage of Team Invited')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a percentage field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Percentage of Team Invited')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a number field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a number field
    cy.get(GanttEditViewSelectors.SelectName('Number of staff invited')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a number field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Number of staff invited')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a money field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a money field
    cy.get(GanttEditViewSelectors.SelectName('Money 1')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a money field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Money 1')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a date field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a date field
    cy.get(GanttEditViewSelectors.SelectName('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a date field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Start Date')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a date time field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid, { timeout: 10000 }).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a date time field
    cy.get(GanttEditViewSelectors.SelectName('Start Date Time')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a date time field
    cy.get(UniversalSelectors.ToastContainer, { timeout: 10000 })
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Start Date Time')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to a URL field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be a URL field
    cy.get(GanttEditViewSelectors.SelectName('Start Date Time')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be a URL field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Start Date Time')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Allows an account admin to set a Gantt Chart title to an autocounter field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the title field to be an autocounter field
    cy.get(GanttEditViewSelectors.SelectName('Auto Counter 1')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.dataTest(UniversalRuntimeEditorSelectors.SaveButton).click();

    // Check the new title field has been set to be an autocounter field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Auto Counter 1')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });

  it('Does not allows an account admin to set a Gantt Chart title to a unsupported field type', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Check the image field is not an option to select as the Gantt Chart name
    cy.get(GanttEditViewSelectors.SelectName('Image 1')).should('not.exist');

    // Check the icon field is not an option to select as the Gantt Chart name
    cy.get(GanttEditViewSelectors.SelectName('Icon 1')).should('not.exist');

    // Check the file field is not an option to select as the Gantt Chart name
    cy.get(GanttEditViewSelectors.SelectName('File 1')).should('not.exist');

    // Check the checkbox field is not an option to select as the Gantt Chart name
    cy.get(GanttEditViewSelectors.SelectName('Checkbox 1')).should('not.exist');
  });

  it('Does allow an account admin to set a Gantt Chart title to a parent field', () => {
    // Clicks on the created template project using its project Id
    cy.get(DashboardProjectSelectors.Project(projectId)).click();

    // Clicks on the button to add a new Gantt chart
    cy.get(GridRuntimeSelectors.AddNewRowInGrid).should('be.visible');
    cy.dataTest(UniversalRuntimeSelectors.NewGanttChartButton).click();
    cy.get(UniversalSelectors.ContentInputField).type('Gantt Chart');
    cy.get(UniversalRuntimeSelectors.SubmitScreenNameButton).click();

    // Set up a Gantt chart
    cy.get(GanttEditViewSelectors.SelectTable('Event')).click();
    cy.get(GanttEditViewSelectors.Button).click();
    cy.get(GanttEditViewSelectors.SelectField('Start Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();
    cy.get(GanttEditViewSelectors.SelectField('End Date')).click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Set the Gantt title to be a parent text field
    cy.get(GanttEditViewSelectors.SelectName('Parent.Text')).scrollIntoView().click();
    cy.get(GanttEditViewSelectors.NextButton).click();

    // Save the Gantt chart
    cy.get(GanttEditViewSelectors.Button).click();

    // Check the new title field has been set to be a text field
    cy.get(UniversalSelectors.ToastContainer)
      .contains(ViewEditorToastMessages.ScreenCreated);
    cy.dataTest(GanttEditViewSelectors.GanttTitleField).click({ force: true });
    cy.get(GanttEditViewSelectors.SelectedListOption('Parent.Text')).scrollIntoView().should('be.visible');

    // Delete the gantt
    cy.dataTest(UniversalRuntimeEditorSelectors.DeleteButton).click();
    cy.dataTest(UniversalSelectors.ConfirmButton).click();

    // Confirm the gantt has been deleted
    cy.get(UniversalSelectors.ToastContainer)
      .should('be.visible')
      .contains(ViewEditorToastMessages.ScreenDeleted);
    cy.get(UniversalRuntimeSelectors.Screen('Gantt Chart')).should('not.exist');
  });
});
