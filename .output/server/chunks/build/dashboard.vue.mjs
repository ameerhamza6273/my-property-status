import { mergeProps, useSSRContext, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.mjs';
import { a as _sfc_main$6 } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@vuepic/vue-datepicker';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main$5 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = _sfc_main$6;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 px-6 py-4" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-lg font-bold text-black"> Good Morning, <span class="text-[#0F4841]">Matt!</span></h1><p class="text-sm text-gray-500"> Ready to manage or list your properties? </p></div><div class="flex items-center space-x-3"><div class="flex items-center space-x-2"><span class="text-sm text-black">Filter By : </span><div class="relative"><select class="appearance-none border border-gray-300 rounded-full pl-3 pr-6 py-1 text-sm text-gray-600 focus:outline-none"><option>Date Period From - To</option></select>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/dropdown-icon.svg",
    class: "absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
  }, null, _parent));
  _push(`</div></div><div class="flex items-center space-x-2"><button class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"> Today </button><button class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"> This Month </button><button class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"> This Year </button><button class="px-3 py-1 text-sm rounded-full bg-[#0F4841] text-white"> All Time </button></div><div class="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 p-1 text-sm rounded-full"><span class="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs"> 9 </span><div class="relative"><button class="flex items-center space-x-1 text-gray-700 text-sm font-medium"><span>Matt</span>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "/dropdown-icon.svg" }, null, _parent));
  _push(`</button></div></div></div></div></header>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]);

const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = _sfc_main$6;
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatsCards.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);

const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = _sfc_main$6;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" }, _attrs))}><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><div class="flex items-start justify-center"><p class="text-sm font-medium text-[#595959] text-center">Pending Property Status Change Requests (Sent by Agency)</p>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "red-arrow.svg" }, null, _parent));
  _push(`</div><p class="text-2xl font-bold text-black text-center mt-2">38</p></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><div class="flex items-start justify-center"><p class="text-sm font-medium text-[#595959] text-center">Pending Property Addition Requests (Sent by Agency)</p>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "red-arrow.svg" }, null, _parent));
  _push(`</div><p class="text-2xl font-bold text-black text-center mt-2">59</p></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><div class="flex items-start justify-center"><p class="text-sm font-medium text-[#595959] text-center">Pending Connection Requests (Sent by Customer)</p>`);
  _push(ssrRenderComponent(_component_NuxtImg, { src: "red-arrow.svg" }, null, _parent));
  _push(`</div><p class="text-2xl font-bold text-black text-center mt-2">38</p></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatusCards.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" }, _attrs))}><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><p class="text-sm font-medium text-[#595959] text-center mb-2">Rental Properties Overview</p><div class="grid grid-cols-2 gap-4"><div class="text-center"><p class="text-2xl font-bold text-gray-900">45</p><p class="text-sm text-[#595959]">Available</p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">45</p><p class="text-sm text-[#595959]">Rented</p></div></div></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><p class="text-sm font-medium text-[#595959] text-center mb-2">Sale Properties Overview</p><div class="grid grid-cols-2 gap-4"><div class="text-center"><p class="text-2xl font-bold text-gray-900">21</p><p class="text-sm text-[#595959]">Formed of Sale</p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">24</p><p class="text-sm text-[#595959]">Sold</p></div></div></div><div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]"><p class="text-sm font-medium text-[#595959] text-center mb-2">Actions Overview</p><div class="grid grid-cols-2 gap-4"><div class="text-center"><p class="text-2xl font-bold text-gray-900">45</p><p class="text-sm text-[#595959]">Archived</p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">24</p><p class="text-sm text-[#595959]">Deleted</p></div></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OverviewCards.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);

const _sfc_main$1 = {
  __name: "ChartsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const chartData1 = ref([60, 80, 90, 70, 85, 75, 95, 65, 80, 70, 60, 85]);
    const chartData2 = ref([70, 85, 95, 80, 90, 75, 85, 70, 95, 80, 75, 90]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, _attrs))}><div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900">Listings Overview</h3><select class="border border-gray-300 rounded-md px-3 py-1 text-sm"><option>2019</option></select></div><div class="h-64 flex items-end justify-between space-x-2"><!--[-->`);
      ssrRenderList(chartData1.value, (height, index) => {
        _push(`<div class="bg-teal-600 rounded-t" style="${ssrRenderStyle(`height: ${height}%; width: 8%;`)}"></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900">Customers Overview</h3><select class="border border-gray-300 rounded-md px-3 py-1 text-sm"><option>2019</option></select></div><div class="h-64 flex items-end justify-between space-x-2"><!--[-->`);
      ssrRenderList(chartData2.value, (height, index) => {
        _push(`<div class="bg-red-500 rounded-t" style="${ssrRenderStyle(`height: ${height}%; width: 8%;`)}"></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChartsSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardHeader = __nuxt_component_0;
      const _component_StatsCards = __nuxt_component_1;
      const _component_StatusCards = __nuxt_component_2;
      const _component_OverviewCards = __nuxt_component_3;
      const _component_ChartsSection = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-gray-50" }, _attrs))}><div class="flex-1 flex flex-col overflow-hidden">`);
      _push(ssrRenderComponent(_component_DashboardHeader, null, null, _parent));
      _push(`<main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">`);
      _push(ssrRenderComponent(_component_StatsCards, null, null, _parent));
      _push(ssrRenderComponent(_component_StatusCards, null, null, _parent));
      _push(ssrRenderComponent(_component_OverviewCards, null, null, _parent));
      _push(ssrRenderComponent(_component_ChartsSection, null, null, _parent));
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard.vue.mjs.map
