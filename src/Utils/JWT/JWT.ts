import jwt from "jsonwebtoken";
import Logger from "../Logger/logger";

const logger = new Logger();

export default class JWT {
  static generateJWT(username: string, email: string) {
    return jwt.sign(
      {
        data: { username, email },
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.JWT_KEY as string
    );
  }

  static async verifyJWT(
    token: string,
    info: { username: string; email: string }
  ) {
    try {
      const verifiedResult = await jwt.verify(
        token,
        process.env.JWT_KEY as string
      );

      return (
        (verifiedResult as any).data.username === info.username ||
        (verifiedResult as any).data.email === info.email
      );
    } catch (error) {
      console.error(error);
      logger.writeError(error);
      logger.writeTrace(
        `${info.username} is trying to access with wrong token`
      );
      return false;
    }
  }
}
