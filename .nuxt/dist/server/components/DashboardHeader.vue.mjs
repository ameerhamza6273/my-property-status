import "../node_modules/_nuxt/image/dist/runtime/components/NuxtImg.vue.mjs";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import _export_sfc from "../_virtual/_plugin-vue_export-helper.mjs";
import _sfc_main$1 from "../node_modules/_nuxt/image/dist/runtime/components/NuxtImg.vue2.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = _sfc_main$1;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 px-6 py-4" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-lg font-bold text-black"> Good Morning, <span class="text-[#0F4841]">Matt!</span></h1><p class="text-sm text-gray-500"> Ready to manage or list your properties? </p></div><div class="flex items-center space-x-3"><div class="flex items-center space-x-2"><span class="text-sm text-black">Filter By : </span><div class="relative"><select class="appearance-none border border-gray-300 rounded-full pl-3 pr-6 py-1 text-sm text-gray-600 focus:outline-none"><option>Date Period From - To</option></select>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/dropdown-icon.svg",
    class: "absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
  }, null, _parent));
  _push(`</div></div><div class="flex items-center space-x-2"><button class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"> Today </button><button class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"> This Month </button><button class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"> This Year </button><button class="px-3 py-1 text-sm rounded-full bg-[#0F4841] text-white"> All Time </button></div><div class="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 p-1 text-sm rounded-full"><span class="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs"> 9 </span><div class="relative"><button class="flex items-center space-x-1 text-gray-700 text-sm font-medium"><span>Matt</span>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "/dropdown-icon.svg" }, null, _parent));
  _push(`</button></div></div></div></div></header>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __nuxt_component_0 as default
};
//# sourceMappingURL=DashboardHeader.vue.mjs.map
