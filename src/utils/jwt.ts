import { sign, verify } from "jsonwebtoken";
import { JWTError } from "../errors";
import { JWT_EXPIRY, JWT_SECRET } from "../config";
import { jwtPayload } from "../types";

export class JWTUtility {
  secret: string;
  duration: string;

  constructor() {
    this.secret = JWT_SECRET;
    this.duration = JWT_EXPIRY;
  }

  async signToken(payload: jwtPayload): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        payload,
        this.secret,
        { expiresIn: this.duration },
        (err: any, token: any) => {
          if (err) {
            reject(new JWTError("JWT signing error", err));
            return;
          }
          resolve(token);
        }
      );
    });
  }

  async verifyToken(token: string): Promise<jwtPayload> {
    return new Promise<jwtPayload>((resolve, reject) => {
      verify(token, this.secret, (err: any, decodePayload: any) => {
        if (err) {
          reject(new JWTError("JWT verify error", err));
          return;
        }
        resolve(decodePayload);
      });
    });
  }
}
