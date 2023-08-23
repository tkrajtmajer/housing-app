export class GetError extends Error {
  constructor(message) {
    super(message);
    this.name = "GetterError";
  }
}

export class QueryUndefinedError extends Error {
  constructor(message) {
    super(message);
    this.name = "QueryUndefinedError";
  }
}