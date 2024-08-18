"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _component_test = common_vendor.resolveComponent("test");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_component_test + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const HotList = common_vendor.ref([]);
    const suggestList = common_vendor.ref([]);
    const searchTable = common_vendor.ref([]);
    const hotSearchList = common_vendor.ref([]);
    const searchHistory = common_vendor.ref(common_vendor.index.getStorageSync("searchHistory") || []);
    let show = common_vendor.ref(false);
    let showclose = common_vendor.ref(false);
    let showCon = common_vendor.ref(true);
    let showSuggest = common_vendor.ref(false);
    let showTable = common_vendor.ref(false);
    const componentKey = common_vendor.ref(0);
    const keyWord = common_vendor.ref("");
    api_index.SearchListApi().then((res) => {
      HotList.value = res.data.data;
    });
    const FocusEvent = () => {
      show.value = true;
    };
    common_vendor.watch(keyWord, () => {
      if (keyWord.value.length > 0) {
        showclose.value = true;
      } else {
        showclose.value = false;
      }
    });
    const clear = () => {
      keyWord.value = "";
      show.value = false;
      showCon.value = true;
      showTable.value = false;
    };
    const clear1 = () => {
      keyWord.value = "";
      showTable.value = false;
    };
    const search = () => {
      showCon.value = false;
      showSuggest.value = true;
      showTable.value = false;
      api_index.SearchsuggestApi(keyWord.value, "mobile").then((res) => {
        suggestList.value = res.data.result.allMatch;
      });
    };
    const gotable = (keyword) => {
      show.value = true;
      showCon.value = false;
      showSuggest.value = false;
      showTable.value = true;
      if (!hotSearchList.value.includes(keyword)) {
        keyWord.value = keyword;
        hotSearchList.value.push(keyword);
        searchHistory.value = hotSearchList.value;
        common_vendor.index.setStorageSync("searchHistory", searchHistory.value);
      } else {
        console.log("This keyword already exists in the search history.");
      }
      api_index.SearchtApi(keyWord.value).then((res) => {
        console.log(res.data.result.songs);
        searchTable.value = res.data.result.songs;
      });
    };
    common_vendor.watch(searchHistory, (newVal) => {
      if (newVal.length > 0) {
        searchHistory.value = newVal;
        common_vendor.index.setStorageSync("searchHistory", newVal);
      }
    });
    common_vendor.watch(searchHistory, (newVal) => {
      if (newVal.length === 0) {
        componentKey.value += 1;
      }
    });
    const remove = () => {
      common_vendor.index.removeStorageSync("searchHistory");
      componentKey.value += 1;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(FocusEvent),
        b: common_vendor.o([($event) => keyWord.value = $event.detail.value, search]),
        c: keyWord.value,
        d: common_vendor.unref(showclose)
      }, common_vendor.unref(showclose) ? {
        e: common_vendor.o(clear1)
      } : {}, {
        f: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        g: common_vendor.o(clear)
      } : {}, {
        h: common_vendor.unref(showCon)
      }, common_vendor.unref(showCon) ? {
        i: common_vendor.p({
          title: "搜索历史",
          type: "line"
        }),
        j: common_vendor.o(remove),
        k: common_vendor.p({
          type: "trash",
          size: "30"
        }),
        l: common_vendor.f(hotSearchList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        m: common_vendor.p({
          title: "热门搜索",
          type: "line"
        }),
        n: common_vendor.f(HotList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.o(($event) => gotable(item.searchWord)),
            c: "c10c040c-5-" + i0 + ",c10c040c-4",
            d: common_vendor.p({
              title: item.searchWord,
              clickable: true
            })
          };
        }),
        o: common_vendor.p({
          border: false
        })
      } : {}, {
        p: common_vendor.unref(showSuggest)
      }, common_vendor.unref(showSuggest) ? {
        q: common_vendor.f(suggestList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => gotable(item.keyword)),
            b: "c10c040c-7-" + i0 + ",c10c040c-6",
            c: common_vendor.p({
              title: item.keyword,
              clickable: true
            })
          };
        }),
        r: common_vendor.p({
          border: false
        })
      } : {}, {
        s: common_vendor.unref(showTable)
      }, common_vendor.unref(showTable) ? {
        t: common_vendor.f(searchTable.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.album.name),
            c: common_vendor.t(item.artists.map((v) => {
              return v.name;
            }).join("| "))
          };
        })
      } : {}, {
        v: componentKey.value
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
