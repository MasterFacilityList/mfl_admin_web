/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it"s
     * completely built.
     */
    build_dir: "build",
    compile_dir: "bin",

    /**
     * 'env' settings file
     */
    settings_file: "settings.js",

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components" (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app"s code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app"s unit tests.
     */
    app_files: {
        js: [
            "src/**/*.js",
            "!src/**/*.spec.js",
            "!src/assets/**/*.js",
            "!src/<%= settings_file %>"
        ],
        jsunit: ["src/**/*.spec.js"],

        coffee: ["src/**/*.coffee", "!src/**/*.spec.coffee"],
        coffeeunit: ["src/**/*.spec.coffee"],

        atpl: ["src/app/**/*.tpl.html"],
        ctpl: ["src/common/**/*.tpl.html"],

        html: ["src/index.html"],
        less: "src/less/main.less"
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            "vendor/angular-mocks/angular-mocks.js",
            "build/templates-common.js",
            "node_modules/bardjs/dist/bard.js",
            "node_modules/sinon/lib/sinon.js"
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user"s job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app"s assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
            "vendor/jquery/dist/jquery.js",
            "vendor/underscore/underscore.js",
            "vendor/bootstrap/dist/js/bootstrap.js",
            "vendor/api-check/dist/api-check.js",
            "vendor/angular/angular.js",
            "vendor/spin.js/spin.js",
            "vendor/angular-animate/angular-animate.js",
            "vendor/angular-formly/dist/formly.js",
            "vendor/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js",
            "vendor/angular-cookies/angular-cookies.js",
            "vendor/angular-resource/angular-resource.js",
            "vendor/angular-bootstrap/ui-bootstrap.js",
            "vendor/angular-bootstrap/ui-bootstrap-tpls.js",
            "vendor/angular-ui-router/release/angular-ui-router.js",
            "vendor/angular-ui-select/dist/select.js",
            "vendor/angular-sanitize/angular-sanitize.js",
            "vendor/modernizr/modernizr.js",
            "vendor/stacktrace-js/dist/stacktrace.js",
            "vendor/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js",
            "vendor/ng-tags-input/ng-tags-input.js",
            "vendor/moment/moment.js",
            "vendor/modernizr/modernizr.js",
            "vendor/d3/d3.js",
            "vendor/c3/c3.js",
            "vendor/angular-loading-bar/build/loading-bar.js",
            "libs/api_wrapper.js",
            "libs/sil_grid/sil_grid_tpls.js",
            "libs/sil_grid/sil_grid.js",
            "libs/error_handler.js",
            "libs/datepicker.js"
        ],
        css: [

        ],
        assets: [
            "vendor/fontawesome/fonts/fontawesome-webfont.woff2"
        ],
        imgs: {
            sil: [
                "libs/sil_grid/img/*"
            ]
        },
        tpls:[
        ]
    },

    connect: {
        options: {
            port: 8062,
            hostname: "*",
            keepalive: true
        },
        dev: {
            options: {
                base: "build"
            }
        },
        prod: {
            options: {
                base: "bin"
            }
        }
    }
};
