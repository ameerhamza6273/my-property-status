import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import _export_sfc from "../_virtual/_plugin-vue_export-helper.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-gray-50" }, _attrs))}><h1 class="p-5 text-2xl font-semibold"> Send Push Notification</h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/send-push-notification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sendPushNotification = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  sendPushNotification as default
};
//# sourceMappingURL=send-push-notification.vue.mjs.map
