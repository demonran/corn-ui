import SwiperProp from "./editor/swiperProp";
import BaseInfoProp from "./editor/baseinfoProp";
import ExplainProp from "./editor/explainProp";
import SkuGroupProp from "./editor/skugroupProp";
import {UINames} from "./const";

import "./dataSource/editor";

const postStr = "-edit";
Vue.component(UINames.Swiper + postStr, SwiperProp);
Vue.component(UINames.SceneBaseInfo + postStr, BaseInfoProp);
Vue.component(UINames.Explain + postStr, ExplainProp);
Vue.component(UINames.SkuGroup + postStr, SkuGroupProp);