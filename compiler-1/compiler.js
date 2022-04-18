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
Paper 100
Pen 0
Line 50 77 22 27
Line 22 27 78 27
Line 78 27 50 77
`;

fs.writeFile("compiler-1/SBN_drawing.svg", SBN.compile(code), (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("SVG generated");
});
