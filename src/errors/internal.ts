export class InternalError extends Error {
  code: string;

  message: string;

  error: any;

  constructor(code: string, message: string, error: any) {
    super();
    this.code = code;
    this.message = message;
    this.error = error;
  }
}

export class JWTError extends InternalError {
  constructor(message?: string, err?: any) {
    const msg = message || "JWT error";
    super("E001", msg, err);
  }
}
