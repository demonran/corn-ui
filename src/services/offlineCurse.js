import qs from "qs";
import common from "./common";


export default {
  list(param) {
    return common.get("/offline-course/search?" + qs.stringify(param));
  },
  delete (id) {
    return common.delete('/offline-course/' + id);
  },
  image (id) {
    return common.patch('/offline-course/image' + id);
  },
  create (data) {
    return common.post('/offline-course/create', data);
  },
  update(id,data){
    return common.put('/offline-course/'+id,data);
  },
  recommend(data,rec){
    //console.log(data);
    var recommend={
       "recommend": rec
    }
    return common.patch('/offline-course/recommend/'+data.courseId,recommend);
  },
  change(id,status){
    return common.patch('/offline-course/status/'+ id,status);
  }
};
