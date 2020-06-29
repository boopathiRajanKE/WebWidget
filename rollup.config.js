import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import filesize from "rollup-plugin-filesize"
import autoprefixer from "autoprefixer"

const INPUT_FILE_PATH = "src/index.js"
const OUTPUT_NAME = "Example"

const GLOBALS = {
  react: "React",
  "react-dom": "ReactDOM",
}

const PLUGINS = [
  postcss({
    extract: true,
    plugins: [autoprefixer],
  }),
  babel({
    babelHelpers: "runtime",
    exclude: "node_modules/**",
  }),
  resolve({
    browser: true,
    resolveOnly: [/^(?!react$)/, /^(?!react-dom$)/, /^(?!prop-types)/],
  }),
  commonjs(),
  filesize(),
]

const EXTERNAL = ["react", "react-dom"]

const config = {
  input: INPUT_FILE_PATH,
  output: {
    file: "build/callus.js",
    format: "iife",
    name: OUTPUT_NAME,
    globals: GLOBALS,
  },
  external: EXTERNAL,
  plugins: PLUGINS,
}

export default config
