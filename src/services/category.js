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
  deleteCat(id) {
    return http.delete("/categories/" + id);
  }
};
