import http from "./http";
import common from "./common";

export default {
  categoryList() {
    return common.get("/categories/all");
  },
  list() {
    return http.get("/categories");
  },

  add(data) {
    return http.post("/categories", data);
  },
  getItem(id) {
    return common.get('categories/' + id)
  },
  edtItem(param) {
    return common.put('categories/' + param.id, param)
  },
  deleteCat(id) {
    return common.delete("/categories/" + id);
  }
};
