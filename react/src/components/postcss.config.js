/**
 * Created by avv123avv on 23.01.17.
 */
module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }),
        require('precss')({ /* ...options */ }),
        require('autoprefixer')({ /* ...options */ })
    ]
}