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

  describe("Pen parser", () => {
    it("add CallExpression to AST", () => {
      const penTokens = lexer("Pen 100");
      const expectedBody = constructDrawingAST([
        {
          type: "CallExpression",
          name: "Pen",
          arguments: [{ type: "NumberLiteral", value: 100 }],
        },
      ]);
      expect(parser(penTokens)).toEqual(expectedBody);
    });

    it("throws when a wrong Pen expression is encountered", () => {
      const invalidPenTokens = lexer("Pen word");
      expect(() => parser(invalidPenTokens)).toThrow(
        "Pen command must be followed by a number."
      );
    });
  });

  describe("Line parser", () => {
    it("add CallExpression to AST", () => {
      const lineTokens = lexer("Line 100 0 50 50");
      const expectedBody = constructDrawingAST([
        {
          type: "CallExpression",
          name: "Line",
          arguments: [
            { type: "NumberLiteral", value: 100 },
            { type: "NumberLiteral", value: 0 },
            { type: "NumberLiteral", value: 50 },
            { type: "NumberLiteral", value: 50 },
          ],
        },
      ]);
      expect(parser(lineTokens)).toEqual(expectedBody);
    });

    it("throws when a wrong Line expression is encountered", () => {
      expect(() => parser(lexer("Line word"))).toThrow(
        "Line command must be followed by 4 numbers."
      );
      expect(() => parser(lexer("Line 100 300"))).toThrow(
        "Line command must be followed by 4 numbers."
      );
      expect(() => parser(lexer("Line 100 300 300"))).toThrow(
        "Line command must be followed by 4 numbers."
      );
      expect(() => parser(lexer("Line 100 300 300 word"))).toThrow(
        "Line command must be followed by 4 numbers."
      );
    });
  });
});
