import log4js from "log4js";
import config from "../Configs/logger.json";

export default class Logger {
  constructor() {
    log4js.configure(config);
  }
  
  writeError(message: any) {
    log4js.getLogger("errors").error(message);
  }

  writeTrace(message: any) {
    log4js.getLogger("app").trace(message);
  }
}
