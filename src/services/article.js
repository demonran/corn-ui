import qs from "qs";
import patch from "./httpPatch";
import common from "./common";

export default {
  list(param) {
    return common.get("/article?" + qs.stringify(param));
  },

  add(param) {
    return common.post("/article?", param);
  },
  // 获取单项banner
  getItem(id) {
    return common.get("/article/" + id);
  },
  // 编辑单项banner
  edtItem(param) {
    return common.put("/article/" + param.id, param);
  },
  // 删除单项
  del(id) {
    return common.delete("/article/" + id);
  }
};
