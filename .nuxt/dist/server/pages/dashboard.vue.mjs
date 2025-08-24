import __nuxt_component_0 from "../components/DashboardHeader.vue.mjs";
import __nuxt_component_1 from "../components/StatsCards.vue.mjs";
import __nuxt_component_2 from "../components/StatusCards.vue.mjs";
import __nuxt_component_3 from "../components/OverviewCards.vue.mjs";
import _sfc_main$1 from "../components/ChartsSection.vue.mjs";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "D:/Nuxt/my-property-status/node_modules/hookable/dist/index.mjs";
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
export {
  _sfc_main as default
};
//# sourceMappingURL=dashboard.vue.mjs.map
