import log4js from "log4js";
import config from '../Configs/logger.json'

log4js.configure(config);

export default class Logger {
  static writeError(message: any) {
    log4js.getLogger("errors").error(message);
  }

  static writeTrace(message: any) {
    log4js.getLogger("app").trace(message);
  }
}
