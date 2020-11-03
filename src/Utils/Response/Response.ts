import { ObjectId } from "mongodb";
import { ServerResponseInput } from "src/types/types";

export const CONST_MESSAGE = {
  CREATE_USER_SUCCESSFULLY: "成功创建用户",
  CREATE_USER_FAILURE: "创建用户失败",
  INCOMPLETE_INFO: "请提供完整信息",
  REDIS_ERROR: "redis 连接失败",
  LOGIN_SUCCESS: "成功登陆",
  NO_FOUND_USER: "没有该用户",
  WRONG_PASSWORD: "用户密码错误",
  CREATE_POST_FAIL: "发布信息失败",
  CREATE_POST_SUCCESS: "发布信息成功",
};

export default class Response {
  static message: string;
  static success: boolean;
  static mongo_id: ObjectId;

  static serverResponse(info: ServerResponseInput) {
    return {
      success: true, 
      ...info,
    };
  }
}
