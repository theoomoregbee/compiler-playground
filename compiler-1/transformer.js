const transformer = (ast) => {
  const svgAst = {
    tag: "svg",
    attr: {
      width: 100,
      height: 100,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
    },
    body: [],
  };

  let penColor = 100;

  // Extract a call expression at a time as `node`. Loop until we are out of expressions in body.
  while (ast.body.length > 0) {
    const node = ast.body.shift();

    switch (node.name) {
      case "Paper":
        const paperColor = 100 - node.arguments[0].value;
        svgAst.body.push({
          // add rect element information to svg_ast's body
          tag: "rect",
          attr: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: `rgb(${paperColor}%, ${paperColor}%, ${paperColor}%)`,
          },
        });
        break;
      case "Pen":
        penColor = 100 - node.arguments[0].value; // keep current pen color in `pen_color` variable

      case "Line":
        break;
    }
  }

  return svgAst;
};

module.exports = transformer;
