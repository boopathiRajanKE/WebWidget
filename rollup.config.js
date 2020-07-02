import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import filesize from "rollup-plugin-filesize"
import autoprefixer from "autoprefixer"
import replace from "rollup-plugin-replace"

const INPUT_FILE_PATH = "src/index.js"
const OUTPUT_NAME = "Example"

const PLUGINS = [
  postcss({
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
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"],
    namedExports: {
      "node_modules/react/index.js": [
        "Children",
        "Component",
        "PropTypes",
        "createElement",
        "useState",
        "useCallback",
        "useEffect",
      ],
      "node_modules/react-dom/index.js": ["render"],
    },
  }),
  filesize(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
]

const config = {
  input: INPUT_FILE_PATH,
  output: {
    file: "build/callus.js",
    format: "iife",
    name: OUTPUT_NAME,
  },

  plugins: PLUGINS,
}

export default config
