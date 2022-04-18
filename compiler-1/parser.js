const createNumberLiteralArg = (token, invalidTokenMessage) => {
  if (token && token.type === "number") {
    return {
      type: "NumberLiteral",
      value: token.value,
    };
  } else {
    throw invalidTokenMessage;
  }
};

const parser = (tokens) => {
  const AST = {
    type: "Drawing",
    body: [],
  };

  // extract a token at a time as current_token. Loop until we are out of tokens.
  while (tokens.length > 0) {
    const currentToken = tokens.shift();

    // Since number token does not do anything by it self, we only analyze syntax when we find a word.
    if (currentToken.type === "number") {
      continue;
    }

    const expression = {
      type: "CallExpression",
      arguments: [],
    };

    switch (currentToken.value) {
      case "Paper":
        expression.name = "Paper";
        // if current token is CallExpression of type Paper, next token should be color argument
        const argument = tokens.shift();

        const numberLiteral = createNumberLiteralArg(
          argument,
          "Paper command must be followed by a number."
        );
        expression.arguments.push(numberLiteral);
        break;
      case "Pen":
        expression.name = "Pen";
        const colorArg = tokens.shift();
        const colorNumberLiteral = createNumberLiteralArg(
          colorArg,
          "Pen command must be followed by a number."
        );
        expression.arguments.push(colorNumberLiteral);

        break;
      case "Line":
        expression.name = "Line";
        const invalidLineToken = "Line command must be followed by 4 numbers.";
        // Line expression takes 4 arguments
        for (let i = 0; i < 4; i++) {
          const arg = tokens.shift();
          expression.arguments.push(
            createNumberLiteralArg(arg, invalidLineToken)
          );
        }
        break;
    }
    AST.body.push(expression); // push the expression object to body of our AST
  }

  return AST;
};

module.exports = parser;
