const createAttrString = (attr) =>
  Object.keys(attr)
    .map((key) => `${key}="${attr[key]}"`)
    .join(" ");

const generator = (svgAst) => {
  const svgAttr = createAttrString(svgAst.attr);

  const elements = svgAst.body
    .map((node) => `<${node.tag} ${createAttrString(node.attr)}></${node.tag}>`)
    .join("\n\t");

  // wrap with open and close svg tag to complete SVG code
  return `<svg ${svgAttr}>\n${elements}\n</svg>`;
};

module.exports = generator;
