import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import _export_sfc from "../_virtual/_plugin-vue_export-helper.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" }, _attrs))}><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><p class="text-sm font-medium text-[#595959] text-center mb-2">Rental Properties Overview</p><div class="grid grid-cols-2 gap-4"><div class="text-center"><p class="text-2xl font-bold text-gray-900">45</p><p class="text-sm text-[#595959]">Available</p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">45</p><p class="text-sm text-[#595959]">Rented</p></div></div></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><p class="text-sm font-medium text-[#595959] text-center mb-2">Sale Properties Overview</p><div class="grid grid-cols-2 gap-4"><div class="text-center"><p class="text-2xl font-bold text-gray-900">21</p><p class="text-sm text-[#595959]">Formed of Sale</p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">24</p><p class="text-sm text-[#595959]">Sold</p></div></div></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><p class="text-sm font-medium text-[#595959] text-center mb-2">Actions Overview</p><div class="grid grid-cols-2 gap-4"><div class="text-center"><p class="text-2xl font-bold text-gray-900">45</p><p class="text-sm text-[#595959]">Archived</p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">24</p><p class="text-sm text-[#595959]">Deleted</p></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OverviewCards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __nuxt_component_3 as default
};
//# sourceMappingURL=OverviewCards.vue.mjs.map
