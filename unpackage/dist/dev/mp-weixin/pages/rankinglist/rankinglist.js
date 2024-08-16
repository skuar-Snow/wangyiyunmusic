"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "rankinglist",
  setup(__props) {
    const list = common_vendor.ref([]);
    const officialList = common_vendor.ref([]);
    const rankingList = common_vendor.ref([]);
    common_vendor.ref([]);
    api_index.toplistApi().then((res) => {
      console.log(res.data);
      list.value = res.data.list;
      officialList.value = list.value.filter((item) => {
        return item.ToplistType != null;
      });
      rankingList.value = list.value.filter((item) => {
        return item.ToplistType == null;
      });
      officialList.value.forEach((v) => {
        api_index.officialListApi(v.id).then((res2) => {
          v.songs = res2.data.songs;
        });
      });
      console.log(officialList.value);
    });
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/songlist/songlist?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "官方榜",
          type: "line"
        }),
        b: common_vendor.f(officialList.value, (item, k0, i0) => {
          return {
            a: item.coverImgUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.playCount),
            d: common_vendor.t(item.updateFrequency),
            e: common_vendor.f(item.songs, (it, idx, i1) => {
              return {
                a: common_vendor.t(idx + 1),
                b: common_vendor.t(it.name),
                c: common_vendor.t(it.ar.map((v) => v.name).join("/")),
                d: it.name
              };
            }),
            f: item.name,
            g: common_vendor.o(($event) => goDetail(item.id), item.name)
          };
        }),
        c: common_vendor.p({
          title: "其他榜单",
          type: "line"
        }),
        d: common_vendor.f(rankingList.value, (item, k0, i0) => {
          return {
            a: item.coverImgUrl,
            b: item.coverImgUrl,
            c: common_vendor.o(($event) => goDetail(item.id), item.coverImgUrl)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9cfc8e6a"]]);
wx.createPage(MiniProgramPage);
