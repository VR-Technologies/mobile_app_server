class CustomErrorResponse extends Error {
  constructor(message, statusCode, responseCode) {
    super(message);
    this.statusCode = statusCode;
    this.error = message;
    this.responseCode = responseCode;
  }
}

module.exports = CustomErrorResponse;
