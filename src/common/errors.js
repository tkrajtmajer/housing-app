export class GetError extends Error {
  constructor(message) {
    super(message);
    this.name = "GetError";
  }
}

export class PostError extends Error {
  constructor(message) {
    super(message);
    this.name = "PostError";
  }
}

export class QueryUndefinedError extends Error {
  constructor(message) {
    super(message);
    this.name = "QueryUndefinedError";
  }
}