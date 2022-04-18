
const lexer = require('./lexer')

test('generate the right output', () => {
    expect(lexer('Paper 100')).toEqual([{ type: "word", value: "Paper" }, { type: "number", value: 100 }])
}) 