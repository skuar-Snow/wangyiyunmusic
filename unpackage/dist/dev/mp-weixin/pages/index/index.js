"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_path = common_vendor.resolveComponent("path");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_easycom_uni_icons2 + _easycom_uni_section2 + _component_path + _component_svg)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_section)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const banners = common_vendor.ref([]);
    const playlist = common_vendor.ref([]);
    const ballList = common_vendor.ref([]);
    const goodMusic = common_vendor.ref([]);
    const radarMusic = common_vendor.ref([]);
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const goRankinglist = (item) => {
      if (item.name === "排行榜") {
        common_vendor.index.navigateTo({
          url: "/pages/rankinglist/rankinglist"
        });
      }
    };
    api_index.bannerApi().then((res) => {
      banners.value = res.data.banners;
    });
    api_index.ballApi().then((res) => {
      ballList.value = res.data.data;
    });
    api_index.personalizedApi().then((res) => {
      playlist.value = res.data.result;
    });
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/songlist/songlist?id=${id}`
      });
    };
    api_index.goodMusicApi().then((res) => {
      goodMusic.value = res.data.data.blocks[3];
      radarMusic.value = res.data.data.blocks[4];
      console.log(res.data.data.blocks[3].creatives[2]);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "list",
          size: "30"
        }),
        b: common_vendor.p({
          type: "search",
          size: "20",
          color: "#aaa"
        }),
        c: common_vendor.o(goSearch),
        d: common_vendor.f(banners.value, (item, k0, i0) => {
          return {
            a: item.imageUrl,
            b: item.imageUrl
          };
        }),
        e: common_vendor.f(ballList.value, (item, k0, i0) => {
          return {
            a: item.iconUrl,
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => goRankinglist(item), item.id)
          };
        }),
        f: common_vendor.p({
          title: "推荐歌单",
          type: "line"
        }),
        g: common_vendor.f(playlist.value, (item, k0, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        h: common_vendor.p({
          type: "line"
        }),
        i: common_vendor.t(goodMusic.value.uiElement.subTitle.title),
        j: common_vendor.f(goodMusic.value.creatives, (item, k0, i0) => {
          return {
            a: common_vendor.f(item.resources, (v, k1, i1) => {
              return {
                a: v.uiElement.image.imageUrl,
                b: common_vendor.t(v.resourceExtInfo.song.name),
                c: common_vendor.t(v.resourceExtInfo.artists[0].name),
                d: "b7192004-5-" + i0 + "-" + i1 + "," + ("b7192004-4-" + i0 + "-" + i1),
                e: "b7192004-4-" + i0 + "-" + i1
              };
            })
          };
        }),
        k: common_vendor.p({
          d: "M122.112664 953.98846l816.371172-407.954319c0.723477-0.342808 \r\n						  1.411139-0.689708 2.099824-1.051959l1.107217-0.550539 0-0.077771c11.644201-6.757914 19.488867-19.377326 \r\n						  19.488867-33.827433 0-14.452153-7.844665-27.070542-19.488867-33.828456l0-0.228197L120.241037 \r\n						  65.955154c-1.14508-0.649799-2.310625-1.24127-3.51301-1.77646l-2.481518-1.240247-0.230244 \r\n						  0.170892c-4.047176-1.431605-8.41874-2.196015-12.96222-2.196015-21.589714 0-39.096437 17.506722-39.096437 \r\n						  39.096437 0 0.192382 0 0.382717 0 0.593518l0 821.276902 0.01842 0c0.438998 21.210068 17.754363 38.255279 \r\n						  39.078017 38.255279C108.80559 960.13546 116.040365 957.887256 122.112664 953.98846z",
          fill: "#333",
          ["p-id"]: "4574"
        }),
        l: common_vendor.p({
          t: "1723816880770",
          viewBox: "0 0 1024 1024",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          ["p-id"]: "4573",
          width: "20",
          height: "20"
        }),
        m: common_vendor.p({
          type: "line",
          title: "雷达歌单"
        }),
        n: common_vendor.f(radarMusic.value.creatives, (item, k0, i0) => {
          return {
            a: item.uiElement.image.imageUrl,
            b: common_vendor.t(item.uiElement.mainTitle.title)
          };
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
