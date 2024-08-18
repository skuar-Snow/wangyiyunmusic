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
    const ballList = common_vendor.ref([]);
    const bannersList = common_vendor.ref([]);
    const recommendPlaylists = common_vendor.ref([]);
    const recommendPlaylistsTitle = common_vendor.ref("");
    const songSheetHost = common_vendor.ref([]);
    const songSheetHostTitle = common_vendor.ref("");
    const radarPlaylist = common_vendor.ref([]);
    const radarPlaylistTitle = common_vendor.ref("");
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
    api_index.homepageApi().then((res) => {
      bannersList.value = res.data.data.blocks[0].extInfo.banners;
      recommendPlaylists.value = res.data.data.blocks[2].creatives;
      recommendPlaylistsTitle.value = res.data.data.blocks[2].uiElement.subTitle.title;
      songSheetHost.value = res.data.data.blocks[3].creatives;
      songSheetHostTitle.value = res.data.data.blocks[3].uiElement.subTitle.title;
      console.log(songSheetHost.value);
      radarPlaylist.value = res.data.data.blocks[4].creatives;
      radarPlaylistTitle.value = res.data.data.blocks[4].uiElement.subTitle.title;
    });
    api_index.ballApi().then((res) => {
      ballList.value = res.data.data;
    });
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/songlist/songlist?id=${id}`
      });
    };
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
        d: common_vendor.f(bannersList.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: item.pic
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
          title: recommendPlaylistsTitle.value,
          type: "line"
        }),
        g: common_vendor.f(recommendPlaylists.value, (item, k0, i0) => {
          return {
            a: item.uiElement.image.imageUrl,
            b: common_vendor.t(item.uiElement.mainTitle.title),
            c: item.creativeId,
            d: common_vendor.o(($event) => goDetail(item.creativeId), item.creativeId)
          };
        }),
        h: common_vendor.p({
          title: songSheetHostTitle.value,
          type: "line"
        }),
        i: common_vendor.f(songSheetHost.value, (item, k0, i0) => {
          return {
            a: common_vendor.f(item.resources, (v, k1, i1) => {
              return {
                a: v.uiElement.image.imageUrl,
                b: common_vendor.t(v.resourceExtInfo.song.name),
                c: common_vendor.t(v.resourceExtInfo.artists[0].name),
                d: v.uiElement.image.imageUrl,
                e: common_vendor.t(v.resourceExtInfo.song.al.name)
              };
            })
          };
        }),
        j: common_vendor.p({
          title: radarPlaylistTitle.value,
          type: "line"
        }),
        k: common_vendor.f(radarPlaylist.value, (item, k0, i0) => {
          return {
            a: item.uiElement.image.imageUrl,
            b: common_vendor.t(item.uiElement.mainTitle.title),
            c: item.creativeId,
            d: common_vendor.o(($event) => goDetail(item.creativeId), item.creativeId)
          };
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
