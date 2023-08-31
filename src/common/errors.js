/**
 * Get request error
 */
export class GetError extends Error {
  constructor(message) {
    super(message);
    this.name = "GetError";
  }
}

/**
 * Post request error
 */
export class PostError extends Error {
  constructor(message) {
    super(message);
    this.name = "PostError";
  }
}

/**
 * Delete request error
 */
export class DeleteError extends Error {
  constructor(message) {
    super(message);
    this.name = "DeleteError";
  }
}

/**
 * Thrown when a query could not be processed. 
 */
export class QueryUndefinedError extends Error {
  constructor(message) {
    super(message);
    this.name = "QueryUndefinedError";
  }
}