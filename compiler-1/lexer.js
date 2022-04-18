const lexer = (code) =>
  code
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map((t) =>
      isNaN(t)
        ? { type: "word", value: t }
        : { type: "number", value: Number(t) }
    );

module.exports = lexer;
