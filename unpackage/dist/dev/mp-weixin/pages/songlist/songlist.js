"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const playlist = common_vendor.ref([]);
const id = location.hash.slice(location.hash.indexOf("?") + 1).split("=")[1];
if (id) {
  api_index.playlistApi(id).then((res) => {
    console.log(res.data);
    playlist.value = res.data;
  }).catch((error) => {
    console.error("请求错误:", error);
  });
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
