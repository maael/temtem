import jwt from "jsonwebtoken";
import { JWT_VERSION } from "./constants";
import { JWT } from "../types";

export async function sign(payload: any) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET!, {}, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
}

export async function verify(payload: any): Promise<JWT | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, process.env.JWT_SECRET!, {}, (err, data) => {
      if (err || (data && (data as JWT).version !== JWT_VERSION))
        return resolve(undefined);
      return resolve(data as JWT | undefined);
    });
  });
}
