declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test attribute.
     * @param value The value of the data-test attribute.
     * @param detail The value of the data-test-detail attribute.
     * @example cy.dataTest('button')
     */
    dataTest(value: string, detail?: string): Chainable<Element>

    /**
     * Custom command to click the next button in the getting started tour.
     * @example cy.clickNextPrompt()
     */
    clickNextPrompt(): Chainable<Element>

    /**
     * Drags the given selector onto the other selector, using the gridfox dragging directive.
     * @param dragSelector The selector of the element to be dragged.
     * @param dropSelector The selector of the element to drop the dragged element on top of.
     * @param xOffset The amount to offset the element in the x axis from the top left of the drop selector.
     * @param yOffset The amount to offset the element in the y axis from the top left of the drop selector.
     * @example cy.gfDrag('.item', '.other-container')
     */
    gfDrag(
      dragSelector: string,
      dropSelector: string,
      xOffset?: number,
      yOffset?: number,
    ): void

    /**
     * Successfully logs in the configured user.
     */
    login(): void

    /**
     * Deletes the current project the test is in.
     * @throws If no project Id is found in the route.
     * @throws If the current project Id is in the list of projects to not be deleted.
     */
    deleteCurrentProject(): void;

    /**
     * Opens the delete modal for the current project the test is in but then cancels deleting it.
     * It then deletes that project
     * @throws If no project Id is found in the route.
     * @throws If the current project Id is in the list of projects to not be deleted.
     */
    cancelDeletingCurrentProjectThenDeleteIt(): void;

    /**
     * Dismiss all of the tours and prompts
     */
    dismissPromptsAndTours(): void

    /**
     * Renames the current project the test is in and takes you to the project
     * @throws If no project Id is found in the route.
     */
    renameCurrentProject(): void;

    /**
     * Dismiss all of the toast messages
     */
    dismissAllToasts(): void;
  }
}
