const transformer = require("./transformer");

test("transform paper ast", () => {
  const input = {
    type: "Drawing",
    body: [
      {
        type: "CallExpression",
        name: "Paper",
        arguments: [{ type: "NumberLiteral", value: "100" }],
      },
    ],
  };
  const actualTransformed = transformer(input);

  expect(actualTransformed).toEqual({
    tag: "svg",
    attr: {
      width: 100,
      height: 100,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
    },
    body: [
      {
        tag: "rect",
        attr: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          fill: "rgb(0%, 0%, 0%)",
        },
      },
    ],
  });
});

test("transform line ast with default pen color", () => {
  const input = {
    type: "Drawing",
    body: [
      {
        type: "CallExpression",
        name: "Line",
        arguments: [
          { type: "NumberLiteral", value: 100 },
          { type: "NumberLiteral", value: 101 },
          { type: "NumberLiteral", value: 102 },
          { type: "NumberLiteral", value: 103 },
        ],
      },
    ],
  };
  const actualTransformed = transformer(input);

  expect(actualTransformed).toEqual({
    tag: "svg",
    attr: {
      width: 100,
      height: 100,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
    },
    body: [
      {
        tag: "line",
        attr: {
          x1: 100,
          y1: 101,
          x2: 102,
          y2: 103,
          "stroke-linecap": "round",
          stroke: "rgb(100%, 100%, 100%)",
        },
      },
    ],
  });
});

test("transform line ast with pen color", () => {
  const input = {
    type: "Drawing",
    body: [
      {
        type: "CallExpression",
        name: "Pen",
        arguments: [{ type: "NumberLiteral", value: 50 }],
      },
      {
        type: "CallExpression",
        name: "Line",
        arguments: [
          { type: "NumberLiteral", value: 100 },
          { type: "NumberLiteral", value: 101 },
          { type: "NumberLiteral", value: 102 },
          { type: "NumberLiteral", value: 103 },
        ],
      },
    ],
  };
  const actualTransformed = transformer(input);

  expect(actualTransformed).toEqual({
    tag: "svg",
    attr: {
      width: 100,
      height: 100,
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
    },
    body: [
      {
        tag: "line",
        attr: {
          x1: 100,
          y1: 101,
          x2: 102,
          y2: 103,
          "stroke-linecap": "round",
          stroke: "rgb(50%, 50%, 50%)",
        },
      },
    ],
  });
});
