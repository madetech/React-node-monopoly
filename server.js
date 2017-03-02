/**
 * Created by avv123avv on 04.01.17.
 */

require('babel-core/register');
//ignore css, less, sass, ttf, woff, woff2, png, jpg
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2', '.png', '.jpg'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');
require('server.js');