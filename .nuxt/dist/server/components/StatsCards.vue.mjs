import "../node_modules/_nuxt/image/dist/runtime/components/NuxtImg.vue.mjs";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import _export_sfc from "../_virtual/_plugin-vue_export-helper.mjs";
import _sfc_main$1 from "../node_modules/_nuxt/image/dist/runtime/components/NuxtImg.vue2.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4" }, _attrs))}><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><div class="flex items-center justify-center"><p class="text-sm font-medium text-[#595959]">Total Customers</p>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "red-arrow.svg" }, null, _parent));
  _push(`</div><p class="text-2xl font-bold text-black text-center mt-2">6004</p></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><div class="flex items-center justify-center"><p class="text-sm font-medium text-[#595959]">Total Properties</p>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "red-arrow.svg" }, null, _parent));
  _push(`</div><p class="text-2xl font-bold text-black text-center mt-2">25342</p></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><div class="flex items-center justify-center"><p class="text-sm font-medium text-[#595959]">Rental Properties</p>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "red-arrow.svg" }, null, _parent));
  _push(`</div><p class="text-2xl font-bold text-black text-center mt-2">4235</p></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><div class="flex items-center justify-center"><p class="text-sm font-medium text-[#595959]">Sale Properties</p>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "red-arrow.svg" }, null, _parent));
  _push(`</div><p class="text-2xl font-bold text-black text-center mt-2">432</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatsCards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __nuxt_component_1 as default
};
//# sourceMappingURL=StatsCards.vue.mjs.map
