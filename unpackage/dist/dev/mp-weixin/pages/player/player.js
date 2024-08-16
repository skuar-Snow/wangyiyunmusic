"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "player",
  setup(__props) {
    const song = common_vendor.ref({});
    const lyric = common_vendor.ref("");
    const url = common_vendor.ref("");
    const paused = common_vendor.ref(true);
    const duration = common_vendor.ref(0);
    const currentTime = common_vendor.ref(0);
    const getSongDetail = async (id) => {
      try {
        const res = await api_index.songDetailApi(id);
        console.log(res.data.songs[0]);
        song.value = res.data.songs[0];
      } catch (e) {
        console.log(e);
      }
    };
    const getLyric = async (id) => {
      try {
        const res = await api_index.lyricApi(id);
        lyric.value = res.data.lrc.lyric;
      } catch (e) {
        common_vendor.index.showToast({
          title: "获取歌词失败",
          icon: "error"
        });
      }
    };
    const getSongUrl = async (id) => {
      try {
        const res = await api_index.songUrlApi(id);
        url.value = res.data.data[0].url;
      } catch (e) {
        common_vendor.index.showToast({
          title: "获取播放地址失败",
          icon: "error"
        });
      }
    };
    common_vendor.onLoad(async (options) => {
      getSongDetail(options == null ? void 0 : options.id);
      getLyric(options == null ? void 0 : options.id);
      getSongUrl(options == null ? void 0 : options.id);
    });
    common_vendor.watch(song, () => {
      common_vendor.index.setNavigationBarTitle({
        title: song.value.name + "-" + song.value.ar.map((v) => v.name).join("/")
      });
    });
    const formatTime = (n) => {
      let m = Math.floor(n / 60);
      let s = Math.floor(n % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return `${m}:${s}`;
    };
    const innerAudioContext = common_vendor.index.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    innerAudioContext.onCanplay(() => {
      duration.value = innerAudioContext.duration;
    });
    innerAudioContext.onPlay(() => {
      console.log("开始播放");
      paused.value = false;
    });
    innerAudioContext.onPause(() => {
      console.log("暂停");
      paused.value = true;
    });
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
    innerAudioContext.onTimeUpdate(() => {
      currentTime.value = innerAudioContext.currentTime;
    });
    common_vendor.watch(url, () => {
      innerAudioContext.src = url.value;
      console.log("url赋值");
    });
    const play = () => {
      if (innerAudioContext.paused) {
        innerAudioContext.play();
      } else {
        innerAudioContext.pause();
      }
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: (_a = song.value.al) == null ? void 0 : _a.picUrl,
        b: (_b = song.value.al) == null ? void 0 : _b.picUrl,
        c: common_vendor.p({
          type: "heart",
          size: "30"
        }),
        d: common_vendor.p({
          type: "chat",
          size: "30"
        }),
        e: common_vendor.t(formatTime(currentTime.value)),
        f: currentTime.value / duration.value * 100,
        g: common_vendor.t(formatTime(duration.value)),
        h: common_vendor.p({
          type: "refreshempty",
          size: "30"
        }),
        i: common_vendor.p({
          type: "arrow-left",
          size: "30"
        }),
        j: paused.value
      }, paused.value ? {
        k: common_vendor.p({
          type: "circle-filled",
          size: "30"
        })
      } : {
        l: common_vendor.p({
          type: "arrow-up",
          size: "30"
        })
      }, {
        m: common_vendor.o(play),
        n: common_vendor.p({
          type: "arrow-right",
          size: "30"
        }),
        o: common_vendor.p({
          type: "settings-filled",
          size: "30"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0391012f"]]);
wx.createPage(MiniProgramPage);
