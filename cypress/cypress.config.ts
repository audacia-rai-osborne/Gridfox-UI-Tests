// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 4000,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  reporter: 'junit',
  retries: {
    runMode: 3,
    openMode: 0,
  },
  reporterOptions: {
    mochaFile: 'results/test-results-[hash].xml',
    toConsole: false,
  },
  video: false,
  env: {
    USERNAME: 'username',
    PASSWORD: 'password',
    VERIFICATION_CODE_TEST_EMAIL: 'verificationCodeTestEmail',
    UNINVITED_USER: 'jade.corbridge+1@audacia.co.uk',
    LOGIN_URL: 'https://login.gridfox-dev.com/',
    BASE_URL_RUNTIME_API: 'https://runtime-api.gridfox-dev.com/',
    PROJECTS_TO_NOT_DELETE: ['45b5d691-90ad-4a9a-6e86-08d967c6969f'],
    GET_ACCESS_TOKEN: 'oidc.user:https://login.gridfox-dev.com:Jasper',
  },
  fixturesFolder: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, import/extensions
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'https://app.gridfox-dev.com/',
    experimentalModifyObstructiveThirdPartyCode: false,
    experimentalSessionAndOrigin: true,
  },
});
