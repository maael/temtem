import jwt from "jsonwebtoken";

export default async function sign(payload: any) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET!, {}, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
}
