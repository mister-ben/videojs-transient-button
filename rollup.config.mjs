import terser from '@rollup/plugin-terser';
import pkgJson from "./package.json" assert { type: "json" };

const banner = `/**
 * @license
 * Transient button v${pkgJson.version}
 */`;

 // TODO minify CSS

export default {
	input: 'src/TransientButton.js',
	output: [{
		file: 'dist/TransientButton.cjs.js',
		format: 'cjs',
    name: 'TransientButton',
    banner: banner,
	},{
		file: 'dist/TransientButton.ejs.js',
		format: 'es',
    name: 'TransientButton',
    banner: banner,
	},{
    file: 'dist/TransientButton.js',
    format: 'umd',
    name: 'TransientButton',
    banner: banner,
    globals: {
      'video.js': 'videojs'
    }
  },{
    file: 'dist/TransientButton.min.js',
    format: 'umd',
    name: 'TransientButton',
    banner: banner,
    globals: {
      'video.js': 'videojs'
    },
    plugins: [
      terser()
    ]
  }],
  external: ['video.js']
};
