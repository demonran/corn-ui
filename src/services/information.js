import qs from "qs";
import common from "./common";

export default {
  getItem() {
    return common.get('/organization/info');
  },
  // 编辑
  edtItem(param) {
    return common.post("/organization/info", param);
  }
};
