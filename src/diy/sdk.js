import {UINames} from "./const";

import swiper from "./ui/swiper/Swiper";
import BaseInfo from "./ui/sceneBaseInfo/BaseInfo";
import Explain from "./ui/Explain";
import SkuGroup from "./ui/sceneSkuGroup/SkuGroup";

import Page from "./pages/page";
import ScenePage from "./pages/pageDesignScheme";

let sdk = {}
sdk.install = function (Vue, options) {
    Vue.component(UINames.Swiper, swiper);
    Vue.component(UINames.SceneBaseInfo, BaseInfo);
    Vue.component(UINames.Explain, Explain);
    Vue.component(UINames.SkuGroup, SkuGroup);

    Vue.component("DiyPage", Page);
    Vue.component("ScenePage", ScenePage);
}

if( !window.diySDK ){
    window.diySDK = sdk;
}

export default sdk;