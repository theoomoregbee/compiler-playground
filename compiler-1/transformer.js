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
        // keep current pen color in `penColor` variable
        penColor = 100 - node.arguments[0].value;
        break;
      case "Line":
        svgAst.body.push({
          tag: "line",
          attr: {
            x1: node.arguments[0].value,
            y1: node.arguments[1].value,
            x2: node.arguments[2].value,
            y2: node.arguments[3].value,
            "stroke-linecap": "round",
            stroke: `rgb(${penColor}%, ${penColor}%, ${penColor}%)`,
          },
        });
        break;
    }
  }

  return svgAst;
};

module.exports = transformer;
