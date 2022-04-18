const throwUnImplementedError = () => {
  throw "Unimplemented functionality";
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

    switch (currentToken.value) {
      case "Paper":
        const expression = {
          type: "CallExpression",
          name: "Paper",
          arguments: [],
        };
        // if current token is CallExpression of type Paper, next token should be color argument
        const argument = tokens.shift();
        if (argument.type === "number") {
          expression.arguments.push({
            // add argument information to expression object
            type: "NumberLiteral",
            value: argument.value,
          });
          AST.body.push(expression); // push the expression object to body of our AST
        } else {
          throw "Paper command must be followed by a number.";
        }
        break;
      case "Pen":
      case "Line":
        throwUnImplementedError();
        break;
    }
  }

  return AST;
};

module.exports = parser;
