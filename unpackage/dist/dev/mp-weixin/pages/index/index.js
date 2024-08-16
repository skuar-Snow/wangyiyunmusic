"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_icons2 + _easycom_uni_section2)();
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
      console.log(res.data.data.blocks[3].creatives);
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
        h: common_vendor.t(goodMusic.value.uiElement.subTitle.title),
        i: common_vendor.p({
          title: "{{ goodMusic.uiElement.subTitle.title }}",
          type: "line"
        }),
        j: common_vendor.f(goodMusic.value.creatives, (item, k0, i0) => {
          return {
            a: common_vendor.f(item.resources, (v, k1, i1) => {
              return {
                a: v.uiElement.image.imageUrl,
                b: common_vendor.t(v.resourceExtInfo.song.name)
              };
            })
          };
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
