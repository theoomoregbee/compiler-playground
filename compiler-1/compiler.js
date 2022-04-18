const fs = require("fs");
const flow = require("lodash.flow");

const lexer = require("./lexer");
const parser = require("./parser");
const transformer = require("./transformer");
const generator = require("./generator");

const SBN = {
  VERSION: "0.0.1",
  lexer,
  parser,
  transformer,
  generator,
  compile: function (code) {
    return flow([this.lexer, this.parser, this.transformer, this.generator])(
      code
    );
  },
};

const code = `
Paper 0
Pen 100
Line 0 50 100 50
`;

fs.writeFile("SBN_drawing.svg", SBN.compile(code), (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("SVG generated");
});
