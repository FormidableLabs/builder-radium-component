/**
 * Test setup for client-side tests.
 *
 * Intended for:
 * - Karma tests: `builder run test-frontend`
 * - Browser tests: `http://localhost:3000/test/client/test.html`
 */
/*globals window:false*/
var chai = require("chai");
var sinonChai = require("sinon-chai");

// --------------------------------------------------------------------------
// Chai / Sinon / Mocha configuration.
// --------------------------------------------------------------------------
// Exports
window.expect = chai.expect;

// Plugins
chai.use(sinonChai);

// Mocha (part of static include).
window.mocha.setup({
  ui: "bdd",
  bail: false
});

// --------------------------------------------------------------------------
// Bootstrap
// --------------------------------------------------------------------------
// Use webpack to include all app code _except_ the entry point so we can get
// code coverage in the bundle, whether tested or not.
var srcReq = require.context("src", true, /\.jsx?$/);
srcReq.keys().map(srcReq);

// Use webpack to infer and `require` tests automatically.
var testsReq = require.context(".", true, /\.spec.jsx?$/);
testsReq.keys().map(testsReq);

// Only start mocha in browser.
if (!window.__karma__) {
  window.mocha.run();
}
