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
  eidt(data) {
    return common.put("/painting/" + data.id, data);
  },
  // 删除单项
  del(id) {
    return common.delete("/painting/" + id);
  }
};
