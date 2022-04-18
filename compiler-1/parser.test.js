const parser = require("./parser");
const lexer = require("./lexer");

const constructDrawingAST = (body) => ({
  type: "Drawing",
  body,
});

describe("Parser", () => {
  describe("Paper parser", () => {
    it("add CallExpression to AST", () => {
      const paperTokens = lexer("Paper 100");
      const expectedBody = constructDrawingAST([
        {
          type: "CallExpression",
          name: "Paper",
          arguments: [{ type: "NumberLiteral", value: 100 }],
        },
      ]);
      expect(parser(paperTokens)).toEqual(expectedBody);
    });

    it("throws when a wrong Paper expression is encountered", () => {
      const invalidPaperTokens = lexer("Paper word");
      expect(() => parser(invalidPaperTokens)).toThrow(
        "Paper command must be followed by a number."
      );
    });
  });
});
