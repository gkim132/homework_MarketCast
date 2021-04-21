/**
 * Tokenizer class.
 *
 *  Lazily pulls a token from a stream
 */
class Tokenizer {
  init(string) {
    this._string = string;
    this._cursor = 0;
    this._fields = {};
  }

  /**
   * Checks whether tokenizer reached the end of string
   * @returns {boolean} Whether it reached the end of string
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
   * Checks whether tokenizer reached the final double pipe at the end of string
   * @returns {boolean} Whether it reached the final double pipe
   */
  isFinalDeoublePipe() {
    return (
      this._string[this._cursor] === "|" &&
      this._cursor + 2 === this._string.length
    );
  }

  /**
   * Checks whether tokenizer reached a double pipe
   * @returns {boolean} Whether it reached a double pipe
   */
  isDoublePipe() {
    return (
      this._string[this._cursor] === "|" &&
      this._string[this._cursor + 1] === "|"
    );
  }

  /**
   * Checks whether tokenizer reached a single pipe
   * @returns {boolean} whether it reached a single pipe
   */
  isSinglePipe() {
    return (
      this._string[this._cursor] === "|" &&
      this._string[this._cursor + 1] !== "|"
    );
  }

  /**
   * Checks the cusor position
   * If _cursor points 0, the following token is Segment
   * @returns {boolean} whether _cursor is 0
   */
  isInitialPosition() {
    return this._cursor === 0;
  }

  /**
   * Gets 3-character segment name
   * @returns {Array} [Segment, null , null]
   */
  getSegment() {
    let seg = "";

    // Stores 3-character segment name
    while (this._string[this._cursor] !== "|" && this.hasMoreTokens()) {
      seg += this._string[this._cursor++];
    }
    if (seg.length === 3) {
      this._seg = seg;
      return [seg, null, null];
    }

    throw new SyntaxError(`Invalid segment: "${seg}"`);
  }

  /**
   * Gets 3-character field name and field value following by the field name
   * @returns {Array} [segment which links to the field, field name, field value]
   */
  getField() {
    let field = "";
    while (this._string[this._cursor] !== "|" && this.hasMoreTokens()) {
      field += this._string[this._cursor++];
    }
    if (field.length >= 3) {
      const fieldName = field.slice(0, 3);
      const fieldValue = field.slice(3);
      return [this._seg, fieldName, fieldValue];
    }

    throw new SyntaxError(`Invalid field: "${field}"`);
  }

  /**
   * Obtains next token
   * @returns {null | Array } null when there are no more tokens; [segment, null, null] or [segment, field name. field value]
   */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    if (this.isFinalDeoublePipe()) {
      return null;
    }

    if (this.isInitialPosition()) {
      return this.getSegment();
    }

    if (this.isSinglePipe()) {
      this._cursor++;
      return this.getField();
    }

    if (this.isDoublePipe()) {
      this._cursor += 2;
      return this.getSegment();
    }

    return null;
  }
}

module.exports = {
  Tokenizer,
};
