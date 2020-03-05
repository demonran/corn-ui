import qs from "qs";
import patch from "./httpPatch";
import common from "./common";

export default {
  list(param) {
    return common.get("/banners?" + qs.stringify(param));
  },

  add(param) {
    // return http.post('/banners', data)
    return common.post("/banners?", param);
  },
  // 获取单项banner
  bannerItem(id) {
    return common.get("/banners/" + id);
  },
  // 编辑单项banner
  bannerEdtItem(param) {
    return common.put("/banners/" + param.id, param);
  },
  // 删除单项
  del(id) {
    return common.delete("/banners/" + id);
  }
};
