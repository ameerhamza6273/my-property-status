import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChartsSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ChartsSection.vue.mjs.map
