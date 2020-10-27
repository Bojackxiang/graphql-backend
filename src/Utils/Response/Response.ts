import { ObjectId } from "mongodb";
import { ServerResponseInput } from "src/types/types";

export default class Response {
  static message: string;
  static success: boolean;
  static mongo_id: ObjectId;

  static serverResponse(info: ServerResponseInput) {
      return {
          ...info
      }
  }
}
