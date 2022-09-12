# Gridfox UI Automation Tests (Cypress)

## Getting Started

### Installation

To get started with the Cypress Automation Tests, first install the project dependencies.

From a Command Line in this directory run:

```bash
npm install
```

Then run:

```bash
npm run cypress:verify
```

Once these have been completed they do not need to be run again.

### Setting up the tests

You will need to configure any environment variables in a `cypress.env.json` file in this directory. This file is gitignored so will not be checked into source control, therefore keeping the values secret.

The variables to be overidden can be seen in the `cypress.json` file, under `env`. For example you will need to set both `USERNAME` and `PASSWORD` in the `cypress.env.json` to be able to login.

```json
{
    "USERNAME": "<username_here>",
    "PASSWORD": "<password_here>"
}
```

### Running the tests

There are then two ways to run the tests:

1. Using the Cypress Test Runner

    ```bash
    npm start
    ```

1. In the Command Line (Headless)

    ```bash
    npm test
    ```

## Configuration

As mentioned above, configuration (or Environment Variables) are stored in `cypress.json` and `cypress.env.json` files.

To use a configuration value in a test you call `Cypress.env('<variable_name>');`

Variable names are stored in `env.ts` to make them more easily accessible - e.g. `Cypress.env(Env.Password);`. New variables named should be added to this file also.

To improve the type safety of TypeScript there is a `cypress.d.ts` file which declares what variable names can be used and what values they return. This should also be updated when adding new variables.

### Adding New Variables

To add a new variable first add a new entry to `env` in `cypress.json`. The variable should be named in all capitals and use underscores for spacing - e.g. `PASSWORD` or `MY_AWESOME_VARIABLE`.

If the variable should be kept secret that set it's value to a placeholder. To then configure the variable, specify it in `cypress.env.json` so that it is not added to source control.

Add the variable to `env.ts` so it can be easily referenced and add a new declaration to `cypress.d.ts` to aid TypeScript.

Finally add the variable to the UIAutomationConfig library in Azure DevOps this can be found my following the link 'https://dev.azure.com/audacia/Audacia.Jasper/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=158&path=UIAutomationConfig'. 

Make sure you put 'CYPRESS_' in front of the variable name when you add it.

If you are adding a user secret after you have entered the value click the lock icon next to the value to hide it.

## Cypress Commands

You can add custom commands to Cypress in order to share and re-use common patterns. These are configured in `cypress/support/commands.ts`.

Commands are added with the following syntax:

```typescript
Cypress.commands.add('myNewCommand', () => {
    /** command logic here... */
});

Cypress.commands.add('myNewCommandWithParam', (parameter: string) => {
    /** command logic here... */
});

Cypress.commands.add('myNewCommandWithReturn', (selector: string) => {
    /** command logic here... */

    return cy.get(selector);
});
```

For TypeScript to understand the custom commands they must be added to the declaration file `cypress/support/custom-commands.d.ts`:

```typescript
myNewCommand(): void

myNewCommandWithParam(parameter: string): void

myNewCommandWithReturn(selector: string): Chainable<Element>
```

JSDocs can be added to the declarations file to provided documentation when using the custom commands:

```typescript
/**
 * Command to do a thing with a parameter
 * @param parameter This what we do the thing with
 */
myNewCommandWithParam(parameter: string): void
```

## Development

### NPM Commands

There are various npm commands configured in the project:

- `npm start` - Alias to `npm run cypress:open`, this will be the main way to run the tests
- `npm run cypress:open` - Opens the Cypress Test Runner GUI
- `npm run cypress:run` - Runs the Cypress tests in the Command Line with no GUI
- `npm run cypress:verify` - Used on first installation to setup the Cypress binary
- `npm test` - Deletes all previous test result XML files and runs all of the tests in the Command Line
- `npm run delete-results` - Deletes all previous test result XML files from the `results/` directory
- `npm run lint` - Reports all ESLint errors in the project
- `npm run lint:fix` - Attempts to auto-fix all ESLint errors and reports the rest in the project
- `npm run build` - Attempts to compile the TypeScript files without emit the JavaScript files

### Editor

VSCode is the recommened IDE for writing these tests.

On opening the folder there will be a notification recommend to install a number of extensions.

Settings are also configured so that fixable linting errors will be auto-fixed on save.


