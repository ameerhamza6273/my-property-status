import _sfc_main$1 from "./components/DashboardSidebar.vue.mjs";
import __nuxt_component_1 from "./node_modules/nuxt/dist/pages/runtime/page.mjs";
import { computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from "vue/server-renderer";
import "D:/Nuxt/my-property-status/node_modules/hookable/dist/index.mjs";
import { useHead } from "./node_modules/nuxt/dist/head/runtime/composables/v3.mjs";
import { useRoute } from "./node_modules/nuxt/dist/app/composables/router.mjs";
import "D:/Nuxt/my-property-status/node_modules/destr/dist/index.mjs";
import "D:/Nuxt/my-property-status/node_modules/klona/dist/index.mjs";
import "D:/Nuxt/my-property-status/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
const _sfc_main = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Property Management Dashboard",
      meta: [
        { name: "description", content: "Professional property management dashboard" }
      ]
    });
    const route = useRoute();
    const showSidebar = computed(() => route.path !== "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardSidebar = _sfc_main$1;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen" }, _attrs))}>`);
      if (unref(showSidebar)) {
        _push(`<div class="w-[18%] h-screen">`);
        _push(ssrRenderComponent(_component_DashboardSidebar, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(showSidebar) ? "w-[82%] h-screen overflow-y-auto" : "w-full h-screen overflow-y-auto")}">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=app.vue.mjs.map
