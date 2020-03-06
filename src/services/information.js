import qs from "qs";
import common from "./common";

export default {
  infoItem () {
    return http.get('/organization/info');
  },
  // 编辑
  EdtItem(param) {
    return common.post("/organization/info" + param);
  }
};
