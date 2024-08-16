"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "songlist",
  setup(__props) {
    const playlistDetail = common_vendor.ref({});
    common_vendor.ref([]);
    common_vendor.ref([]);
    const getDetail = async (id) => {
      const res = await api_index.playlistDetailApi(id);
      playlistDetail.value = res.data.playList;
      console.log(playlistDetail);
    };
    common_vendor.onLoad(async (options) => {
      getDetail(options == null ? void 0 : options.id);
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
wx.createPage(_sfc_main);
