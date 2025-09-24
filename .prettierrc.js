/**
 * Prettier configuration for Roomies application
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  // Specify the line length that the printer will wrap on
  printWidth: 100,

  // Specify the number of spaces per indentation-level
  tabWidth: 2,

  // Indent lines with tabs instead of spaces
  useTabs: false,

  // Print semicolons at the ends of statements
  semi: true,

  // Use single quotes instead of double quotes
  singleQuote: true,

  // Change when properties in objects are quoted
  quoteProps: 'as-needed',

  // Use single quotes instead of double quotes in JSX
  jsxSingleQuote: false,

  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures
  trailingComma: 'es5',

  // Print spaces between brackets in object literals
  bracketSpacing: true,

  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter
  arrowParens: 'avoid',

  // Format only a segment of a file
  rangeStart: 0,
  rangeEnd: Infinity,

  // Specify which parser to use
  // parser: 'babel',

  // Specify the file name to use to infer which parser to use
  // filepath: undefined,

  // Require either '@prettier' or '@format' to be present in the file's first docblock comment for it to be formatted
  requirePragma: false,

  // Insert @format pragma into file's first docblock comment
  insertPragma: false,

  // Wrap prose as-is without re-formatting
  proseWrap: 'preserve',

  // Specify the global whitespace sensitivity for HTML, Vue, Angular, and Handlebars
  htmlWhitespaceSensitivity: 'css',

  // Maintain existing line endings
  endOfLine: 'lf',

  // Format embedded code if Prettier can automatically identify it
  embeddedLanguageFormatting: 'auto',

  // Enforce single attribute per line in HTML, Vue and JSX
  singleAttributePerLine: false,
};
