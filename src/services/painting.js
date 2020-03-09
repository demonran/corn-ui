import qs from "qs";
import common from "./common";

export default {
  list(param) {
    return common.get("/painting?" + qs.stringify(param));
  },

  add(param) {
    return common.post("/painting", param);
  },
  getItem(id) {
    return common.get("/painting/" + id);
  },
  edtItem(param) {
    return common.put("/painting/" + param.id, param);
  },
  // 删除单项
  del(id) {
    return common.delete("/painting/" + id);
  }
};
