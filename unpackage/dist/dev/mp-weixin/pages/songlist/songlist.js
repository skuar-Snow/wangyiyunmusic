"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_popup2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "songlist",
  setup(__props) {
    const popup = common_vendor.ref(null);
    const playlistDetail = common_vendor.ref({});
    const hotComments = common_vendor.ref([]);
    const comments = common_vendor.ref([]);
    const getDetail = async (id) => {
      const res = await api_index.playlistDetailApi(id);
      playlistDetail.value = res.data.playlist;
      console.log(playlistDetail.value);
    };
    const getComment = async (id) => {
      const res = await api_index.commentPlaylistApi(id);
      hotComments.value = res.data.hotComments;
      comments.value = res.data.comments;
      console.log(comments);
    };
    common_vendor.onLoad(async (options) => {
      getDetail(options == null ? void 0 : options.id);
      getComment(options == null ? void 0 : options.id);
    });
    const open = () => {
      popup.value.open("bottom");
    };
    const goPlayer = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/player/player?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: playlistDetail.value.coverImgUrl,
        b: common_vendor.t(playlistDetail.value.name),
        c: (_a = playlistDetail.value.creator) == null ? void 0 : _a.avatarUrl,
        d: common_vendor.t((_b = playlistDetail.value.creator) == null ? void 0 : _b.nickname),
        e: common_vendor.t(playlistDetail.value.description),
        f: playlistDetail.value.coverImgUrl,
        g: common_vendor.t(playlistDetail.value.shareCount),
        h: common_vendor.t(playlistDetail.value.commentCount),
        i: common_vendor.o(open),
        j: common_vendor.t(playlistDetail.value.subscribedCount),
        k: common_vendor.t((_c = playlistDetail.value.tracks) == null ? void 0 : _c.length),
        l: common_vendor.f(playlistDetail.value.tracks, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: item.id,
            c: common_vendor.o(($event) => goPlayer(item.id), item.id),
            d: "c5f28ce6-1-" + i0 + ",c5f28ce6-0",
            e: common_vendor.p({
              title: item.name,
              link: true,
              clickable: true,
              note: item.ar.map((v) => v.name).join("/")
            })
          };
        }),
        m: common_vendor.f(hotComments.value, (item, k0, i0) => {
          return {
            a: item.commentId,
            b: "c5f28ce6-5-" + i0 + ",c5f28ce6-4",
            c: common_vendor.p({
              title: item.user.nickname,
              note: item.content,
              thumb: item.user.avatarUrl
            })
          };
        }),
        n: common_vendor.p({
          title: "热门评论",
          type: "line"
        }),
        o: common_vendor.f(comments.value, (item, k0, i0) => {
          return {
            a: item.commentId,
            b: "c5f28ce6-8-" + i0 + ",c5f28ce6-7",
            c: common_vendor.p({
              title: item.user.nickname,
              note: item.content,
              thumb: item.user.avatarUrl
            })
          };
        }),
        p: common_vendor.p({
          title: "最新评论",
          type: "line"
        }),
        q: common_vendor.sr(popup, "c5f28ce6-2", {
          "k": "popup"
        }),
        r: common_vendor.p({
          ["border-radius"]: "10px 10px 0 0"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c5f28ce6"]]);
wx.createPage(MiniProgramPage);
