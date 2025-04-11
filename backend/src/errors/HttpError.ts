import { CustomError } from "./CustomError";

export class HttpError extends CustomError {
    constructor(
      public statusCode: number,
      message: string,
      public context: Record<string, any> = {},
      public logging = false
    ) {
      super(message);
      Object.setPrototypeOf(this, HttpError.prototype);
    }
  
    get errors() {
      return [{ message: this.message, context: this.context }];
    }
  }