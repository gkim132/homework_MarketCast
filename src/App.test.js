/**
 * Main test runner
 */

const { Parser } = require("../api/Parser");

var fs = require("fs");
var text = fs.readFileSync("./api/sampleData.txt", "utf-8");
var arrayOfLines = text.match(/[^\r\n]+/g);

const parser = new Parser();

test("Test empty input", () => {
  const input = "";

  const output = parser.parse(input);

  const expectedOutput = {};
  expect(output).toEqual(expectedOutput);
});

test("testParse_hasCorrectFirstItem", () => {
  const input = arrayOfLines[0];

  const output = parser.parse(input);

  const expectedOutput = {
    NAM: {
      FNA: ["Fred", "AJ"],
      LNA: ["Blogs", "Shealy"],
    },
    BIO: {
      DOB: ["02/03/1974", "12/12/2000"],
    },
  };
  expect(output).toEqual(expectedOutput);
});

test("testParse_hasCorrectSecondItem", () => {
  const input = arrayOfLines[1];

  const output = parser.parse(input);

  const expectedOutput = {
    NAM: {
      FNA: ["Fred"],
      LNA: ["Blogs"],
    },
    BIO: {
      DOB: ["02/03/1974"],
    },
  };
  expect(output).toEqual(expectedOutput);
});

test("testParse_hasCorrectThirdItem", () => {
  const input = arrayOfLines[2];

  const output = parser.parse(input);

  const expectedOutput = {
    NAM: {
      FNA: ["Fred"],
      LNA: ["Blogs"],
    },
    BIO: {
      DOB: ["04/11/2000"],
    },
  };
  expect(output).toEqual(expectedOutput);
});

test("testParse_hasCorrectFourthItem", () => {
  const input = arrayOfLines[3];

  const output = parser.parse(input);

  const expectedOutput = {
    NAM: {
      FNA: ["Fred"],
      LNA: ["Blogs"],
    },
    BIO: {
      DOB: ["12/13/1974"],
    },
    COR: {
      LON: ["12.234"],
      LAT: ["-123.23"],
    },
    EDU: {
      UNI: ["University of Wisconsin"],
    },
    HOB: {
      SPO: ["Soccer"],
      TRA: ["Europe"],
      BOO: ["HarryPotter"],
    },
  };
  expect(output).toEqual(expectedOutput);
});
