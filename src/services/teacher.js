import qs from "qs";
import common from "./common";

export default {
  list(param) {
    return common.get("/teachers?" + qs.stringify(param));
  },

  add(param) {
    return common.post("/teachers?", param);
  },
  // 获取单项banner
  teacherItem(id) {
    return common.get("/teachers/" + id);
  },
  // 编辑单项banner
  teacherEdtItem(param) {
    return common.put("/teachers/" + param.id, param);
  },
  // 删除单项
  del(id) {
    return common.delete("/teachers/" + id);
  },
  // 修改状态
  patch(param) {
    return common.patch("/teachers/" + param.id, param);
  },
  // 根据分类获取老师
  getAllteacher(param) {
    return common.get("/teachers/all?" + qs.stringify(param));
  }
};
