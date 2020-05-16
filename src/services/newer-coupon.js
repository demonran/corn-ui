import qs from "qs";
import common from "./common";

const url = 'coupon/newer';
export default {
  list(param) {
    return common.get(url, qs.stringify(param));
  },

  add(data) {
    return common.post(url, data);
  },
  edit(data) {
    return common.put(url, data);
  },
  del(id) {
    return common.delete(url + '/' + id);
  },
}
