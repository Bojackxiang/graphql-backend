import { ObjectId } from "mongodb";
import { ServerResponseInput } from "src/types/types";



export const CONST_MESSAGE = {
  CREATE_USER_SUCCESSFULLY: "成功创建用户",
  CREATE_USER_FAILURE: "创建用户失败",
};

export default class Response {
  static message: string;
  static success: boolean;
  static mongo_id: ObjectId;

  static serverResponse(info: ServerResponseInput) {
    return {
      ...info,
    };
  }
}
