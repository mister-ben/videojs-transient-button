import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';

const commonjs = fromRollup(rollupCommonjs);

export default {
  debug: true,
  //...
  nodeResolve: true, // this is required
  testFramework: {
    path: './node_modules/web-test-runner-qunit/dist/autorun.js',
    config: {
      // QUnit config (see type WTRQunitConfig)
      // noglobals: true
    }
  },
  files: ["test/**/*.test.js"],
  plugins: [
    commonjs({
      // defaultIsModuleExports: true,
      // requireReturnsDefault: 'preferred',
      include: [
        // the commonjs plugin is slow, list the required packages explicitly:
        '**/node_modules/url-toolkit/**/*',
        '**/node_modules/global/**/*',
        '**/node_modules/@xmldom/xmldom/**/*',
        // Despite this,
        // ❌ The requested module './../../mux.js/lib/utils/clock.js' does not provide an export named 'ONE_SECOND_IN_TS' 
        // Even though it clearly does:
        // module.exports = {
        //   ONE_SECOND_IN_TS: ̦,
        //   secondsToVideoTs: secondsToVideoTs,
        // ...
        '**/node_modules/mux.js/**/*',
      ],
      // Doesn't do anyhting
      // [plugin noop] The namedExports option from "@rollup/plugin-commonjs" is deprecated. Named exports are now handled automatically.
      // namedExports: { 'mux.js/lib/utils/clock': ['ONE_SECOND_IN_TS' ] }
    }),
  ],
}