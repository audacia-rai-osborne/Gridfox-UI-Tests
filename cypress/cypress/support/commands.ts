// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import DomHelper from '../../helpers/dom-helper';
import RouteHelper from '../../helpers/route-helper';
import Env from '../../models/env';
import Position from '../../models/helpers/position';
import Routes from '../../models/routes';
import DeleteProjectModalSelectors from '../../models/selectors/dashboard/delete-project-modal-selectors';
import DashboardProjectSelectors from '../../models/selectors/dashboard/project-selectors';
import LoginSelectors from '../../models/selectors/login-and-registration/login-selectors';
import UniversalRuntimeSelectors from '../../models/selectors/runtime/universal-runtime-selectors';
import UniversalSelectors from '../../models/selectors/universal/universal-selectors';
import ProjectText from '../../models/text/dashboard-text/project-text';

// Command to get an element by a data-test attribute
Cypress.Commands.add('dataTest', (value: string, detail?: string) => {
  let selector = `[data-test="${value}"]`;

  if (detail) {
    selector = `${selector} [data-test-detail="${detail}"]`;
  }

  cy.get(selector);
});

// -- Onboarding Commands --
Cypress.Commands.add('clickNextPrompt', () => {
  cy.get('.next-prompt').click();
});

// Custom dragging to support the Gridfox dragging directive
Cypress.Commands.add(
  'gfDrag',
  (
    dragSelector: string,
    dropSelector: string,
    xOffset?: number,
    yOffset?: number,
  ): void => {
    const draggable = Cypress.$(dragSelector)[0];
    const droppable = Cypress.$(dropSelector)[0];

    if (!draggable) {
      throw new Error(`Could not find the element to drag: '${dragSelector}'`);
    }

    if (!droppable) {
      throw new Error(`Could not find the element to drop on: '${dropSelector}'`);
    }

    // Get the start and end coords
    const startCoords = DomHelper.getElementCenter(draggable);
    let endCoords: Position;

    if (xOffset !== undefined || yOffset !== undefined) {
      const topLeft = DomHelper.getElementTopLeft(droppable);
      endCoords = new Position(topLeft.x + xOffset, topLeft.y + yOffset);
    } else {
      endCoords = DomHelper.getElementCenter(droppable);
    }

    // Start the drag at the center of the draggable
    draggable.dispatchEvent(new MouseEvent('mousedown', {
      clientX: startCoords.x,
      clientY: startCoords.y,
    }));

    // Dispatch the mouse move events to the window as the GF dragging creates a
    // clone of the element so we can't continue to move on it
    // Must use cy.window() to get the window that the app is running in
    cy.window().then((w) => {
      w.dispatchEvent(new MouseEvent('mousemove', {
        clientX: endCoords.x,
        clientY: endCoords.y,
      }));
    });

    // Mouse up on the window to end the drag
    cy.window().then((w) => {
      w.dispatchEvent(new MouseEvent('mouseup'));
    });
  },
);

// Command to login
Cypress.Commands.add('login', () => {
  // define the login process in a func
  const login = () => {
    cy.visit(Env.LoginUrl);
    cy.get('#Username').type(Env.Username, { log: false });
    cy.get('#Password').type(Env.Password, { log: false });
    cy.get(LoginSelectors.LoginButton).click();

    // assert we are logged in if the URL is the main app URL
    cy.url().should('eq', `${Cypress.config().baseUrl}#/`);

    // dismiss the prompts once we know we are on the main app
    cy.dismissPromptsAndTours();
  };

  // use the login function for our session, basic identification of session with 'user' string
  cy.session('user', login);
});

// Command to delete the project that is currently open
Cypress.Commands.add('deleteCurrentProject', () => {
  const projectId = RouteHelper.getProjectId();

  if (Env.ProjectsToNotDelete.includes(projectId)) {
    throw new Error('This project must not be deleted!');
  }

  cy.visit(Routes.Dashboard);

  cy.get(DashboardProjectSelectors.ProjectMenu(projectId)).click();
  cy.dataTest(DashboardProjectSelectors.DeleteProject).first().should('be.visible').click();
  cy.dataTest(DashboardProjectSelectors.ConfirmProjectDelete).click();
  cy.get(UniversalSelectors.ToastContainer).contains('Successfully deleted the project');
});

// Command to open the delete modal for a project and then cancel deleting it. The command then reopens the delete modal and deletes the project.
Cypress.Commands.add('cancelDeletingCurrentProjectThenDeleteIt', () => {
  const projectId = RouteHelper.getProjectId();

  if (Env.ProjectsToNotDelete.includes(projectId)) {
    throw new Error('This project must not be deleted!');
  }

  cy.visit(Routes.Dashboard);

  cy.get(DashboardProjectSelectors.ProjectMenu(projectId)).click();
  cy.dataTest(DashboardProjectSelectors.DeleteProject).first().should('be.visible').click();

  // Check that the text in the cancel modal is correct
  cy.get(DeleteProjectModalSelectors.ModalHeader).contains(ProjectText.DeleteProjectModalHeader);
  cy.get(DeleteProjectModalSelectors.ModalTitle).contains(ProjectText.DeleteProjectModalTitle);
  cy.get(DeleteProjectModalSelectors.ModalFirstLine)
    .contains(ProjectText.DeleteProjectModalFirstLine);
  cy.get(DeleteProjectModalSelectors.ModalSecondLine)
    .contains(ProjectText.DeleteProjectModalSecondLine);
  cy.get(DeleteProjectModalSelectors.ModalThirdLine)
    .contains(ProjectText.DeleteProjectModalThirdLine);
  cy.get(DeleteProjectModalSelectors.ModalFourthLine)
    .contains(ProjectText.DeleteProjectModalFourthLine);
  cy.get(DeleteProjectModalSelectors.ModalFifthLine)
    .contains(ProjectText.DeleteProjectModalFifthLine);
  cy.get(DeleteProjectModalSelectors.ModalSixthLine)
    .contains(ProjectText.DeleteProjectModalSixthLine);

  // Click cancel to cancel deleting the project
  cy.dataTest(DashboardProjectSelectors.CancelProjectDelete).click();
  cy.get(UniversalSelectors.ModalTitle).should('not.exist');

  // Then select to delete the project
  cy.get(DashboardProjectSelectors.ProjectMenu(projectId)).click();
  cy.dataTest(DashboardProjectSelectors.DeleteProject).first().should('be.visible').click();
  cy.dataTest(DashboardProjectSelectors.ConfirmProjectDelete).click();
  cy.get(UniversalSelectors.ToastContainer).contains('Successfully deleted the project');
});

// Command to dismiss prompts and tours
Cypress.Commands.add('dismissPromptsAndTours', () => {
  const tours = ['View Editor', 'Explorer'];
  window.localStorage.setItem('dismissed-tours', JSON.stringify(tours));

  const prompts = ['Screen Editor', 'User Mode', 'Dashboard'];
  window.localStorage.setItem('dismissed-prompts', JSON.stringify(prompts));
});

// Command to rename the project that is currently open
Cypress.Commands.add('renameCurrentProject', () => {
  const projectId = RouteHelper.getProjectId();
  cy.visit(Routes.Dashboard);
  cy.get(DashboardProjectSelectors.ProjectMenu(projectId)).click();
  cy.dataTest(DashboardProjectSelectors.RenameProject).first().click();
  cy.get(DashboardProjectSelectors.ProjectRenameInput(projectId)).clear();
  cy.get(DashboardProjectSelectors.ProjectRenameInput(projectId)).type('Edited Project Name');
  cy.get(DashboardProjectSelectors.EditNameLoadingIcon).should('not.exist');

  // Go to the renamed project
  cy.get(DashboardProjectSelectors.ProjectLink(projectId)).click();
  cy.get(UniversalRuntimeSelectors.ExplorerButton).should('be.visible');
  cy.visit(Routes.Dashboard);
  cy.get(DashboardProjectSelectors.ProjectLink(projectId)).click();
});

// Command to dismiss Toast Messages
Cypress.Commands.add('dismissAllToasts', () => {
  cy.get('body')
    .then(($body) => {
      const toasts = $body.find(UniversalSelectors.ToastContainer);
      if (toasts.length > 0) {
        toasts.find(UniversalSelectors.ToastMessageActionButton).trigger('click', { multiple: true });
      }
    });
});
