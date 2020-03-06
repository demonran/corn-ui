import qs from "qs";
import common from "./common";

export default {
    list(param) {
        return common.get("/online-course?" + qs.stringify(param));
    },

    add(param) {
        return common.post("/online-course?", param);
    },
    getItem(id) {
        return common.get("/online-course/" + id);
    },
    edtItem(param) {
        return common.patch("/online-course/" + param.id, param);
    },
    // 删除单项
    del(id) {
        return common.delete("/online-course/" + id);
    },
    // 设置热门推荐
    changeRecommend(param) {
        return common.patch("/online-course/recommend/" + param.id, param);
    },
    // 修改公开课状态
    changeStatus(param) {
        return common.patch("/online-course/status/" + param.id, param);
    }
};
