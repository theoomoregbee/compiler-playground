const generator = require("./generator");

const input = {
  tag: "svg",
  attr: {
    width: 100,
    height: 100,
    viewBox: "0 0 100 100",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
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
};

test("generate svg for Drawing ast", () => {
  const svg = generator(input);

  expect(svg).toEqual(
    `<svg width="100" height="100" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<rect x="0" y="0" width="100" height="100" fill="rgb(0%, 0%, 0%)"></rect>\n</svg>`.trim()
  );
});
