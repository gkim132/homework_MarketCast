const { Tokenizer } = require("./Tokenizer");

class Parser {
  /**
   * Initializes the parser
   */
  constructor() {
    this._string = "";
    this._tokenizer = new Tokenizer();
  }
  /**
   * Parses a string.
   * @param {string} string - Input Data
   * @returns {Object} parsed messages
   */
  parse(string) {
    this._string = string;
    this._tokenizer.init(string);
    this._parsedMessage = {};

    // Tokenizer to obtain the first token which is our lookahead
    // The lookahead is used for predictive parsing
    this._lookahead = this._tokenizer.getNextToken();

    return this.Program();
  }

  /**
   * Main entry point to parse
   * @returns {Object} parsed message
   */
  Program() {
    // Parses recursively
    // this._lookahead is Null if it reaches the end of input or the final double pipe
    while (this._lookahead) {
      const token = this._lookahead;
      const [segment, fieldName, fieldValue] = token;

      // Checks if the token is a segment
      if (fieldName === null) {
        this._parsedMessage[segment] = {};
      }

      // Stores field name as object key
      // Stores field value into array, which is the value of the object key
      else {
        this._parsedMessage[segment].hasOwnProperty(fieldName)
          ? this._parsedMessage[segment][fieldName].push(fieldValue)
          : (this._parsedMessage[segment][fieldName] = [fieldValue]);
      }

      // The lookahead is used for predictive parsing
      this._lookahead = this._tokenizer.getNextToken();
    }
    return this._parsedMessage;
  }
}

module.exports = {
  Parser,
};
