import "../node_modules/_nuxt/image/dist/runtime/components/NuxtImg.vue.mjs";
import __nuxt_component_0 from "../node_modules/nuxt/dist/app/components/nuxt-link.mjs";
import { ref, watch, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import "D:/Nuxt/my-property-status/node_modules/hookable/dist/index.mjs";
import { useRoute } from "../node_modules/nuxt/dist/app/composables/router.mjs";
import "D:/Nuxt/my-property-status/node_modules/destr/dist/index.mjs";
import "D:/Nuxt/my-property-status/node_modules/klona/dist/index.mjs";
import "D:/Nuxt/my-property-status/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
/* empty css                       */
import _sfc_main$1 from "../node_modules/_nuxt/image/dist/runtime/components/NuxtImg.vue2.mjs";
const _sfc_main = {
  __name: "DashboardSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const openDropdown = ref(null);
    const menuItems = [
      { to: "/dashboard", label: "Dashboard", icon: "/dashboard-icon.svg" },
      {
        label: "Admin",
        icon: "admin-icon.svg",
        children: [
          { to: "/admin-users", label: "Admin Users" },
          { to: "/terms-of-services", label: "Terms Of Services" }
        ]
      },
      { to: "/agencies", label: "Agencies", icon: "agencies-icon.svg" },
      {
        label: "Properties",
        icon: "properties-icon.svg",
        children: [
          { to: "/new-connection-requests", label: "New Connection Requests" },
          { to: "/properties/rental", label: "Rental Properties" },
          { to: "/properties/sale", label: "Sale Properties" }
        ]
      },
      { to: "/customers", label: "Customers", icon: "customers-icon.svg" },
      {
        label: "Notifications",
        icon: "notifications-icon.svg",
        children: [
          { to: "/send-push-notification", label: "Send Push Notification" },
          { to: "/notifications/email", label: "Send Email Notification" },
          { to: "/notifications/system", label: "System Notifications" },
          { to: "/notifications/history", label: "Notification History" }
        ]
      },
      { to: "/support", label: "Support", icon: "/support-icon.svg" },
      { to: "/reports", label: "Reports", icon: "/reports-icon.svg" }
    ];
    const isActiveParent = (item) => {
      if (item.children) {
        return item.children.some((child) => route.path.startsWith(child.to));
      }
      return item.to && route.path.startsWith(item.to);
    };
    const isActive = (path) => route.path === path;
    const handleClick = (item, event) => {
      if (item.children) {
        event.preventDefault();
        openDropdown.value = openDropdown.value === item.label ? null : item.label;
      } else {
        openDropdown.value = null;
      }
    };
    const isDropdownOpen = (item) => {
      return openDropdown.value === item.label || isActiveParent(item);
    };
    watch(
      () => route.path,
      () => {
        openDropdown.value = null;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border-r border-gray-200 flex flex-col h-screen" }, _attrs))}><div class="p-5 border-b border-gray-100">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "Logo.svg",
        alt: "Logo",
        width: "150"
      }, null, _parent));
      _push(`</div><nav class="flex-1 p-4 overflow-y-auto custom-scroll"><ul class="space-y-1"><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li class="relative">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to || "#",
          class: ["group flex items-center justify-between px-3 py-2 rounded-full transition-colors duration-200", isActiveParent(item) ? "bg-[#0F4841] text-white" : "text-gray-600 hover:bg-[#0F4841] hover:text-white"],
          onClick: ($event) => handleClick(item, $event)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center space-x-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: item.icon,
                alt: item.label,
                width: "20",
                class: ["transition-all duration-200", isActiveParent(item) ? "filter brightness-[4.5]" : "group-hover:filter group-hover:brightness-[4.5]"]
              }, null, _parent2, _scopeId));
              _push2(`<span class="${ssrRenderClass([isActiveParent(item) ? "text-white" : "text-[#595959] group-hover:text-white", "text-sm transition-colors duration-200"])}"${_scopeId}>${ssrInterpolate(item.label)}</span></div>`);
              if (item.children) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: "/dropdown-icon.svg",
                  alt: "Dropdown",
                  class: ["w-4 h-4 transition-transform", [
                    isDropdownOpen(item) ? "rotate-180" : "",
                    isActiveParent(item) ? "filter brightness-[4.5]" : "group-hover:filter group-hover:brightness-[4.5]"
                  ]]
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", { class: "flex items-center space-x-3" }, [
                  createVNode(_component_NuxtImg, {
                    src: item.icon,
                    alt: item.label,
                    width: "20",
                    class: ["transition-all duration-200", isActiveParent(item) ? "filter brightness-[4.5]" : "group-hover:filter group-hover:brightness-[4.5]"]
                  }, null, 8, ["src", "alt", "class"]),
                  createVNode("span", {
                    class: ["text-sm transition-colors duration-200", isActiveParent(item) ? "text-white" : "text-[#595959] group-hover:text-white"]
                  }, toDisplayString(item.label), 3)
                ]),
                item.children ? (openBlock(), createBlock(_component_NuxtImg, {
                  key: 0,
                  src: "/dropdown-icon.svg",
                  alt: "Dropdown",
                  class: ["w-4 h-4 transition-transform", [
                    isDropdownOpen(item) ? "rotate-180" : "",
                    isActiveParent(item) ? "filter brightness-[4.5]" : "group-hover:filter group-hover:brightness-[4.5]"
                  ]]
                }, null, 8, ["class"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        if (item.children && isDropdownOpen(item)) {
          _push(`<ul class="pl-6 mt-2 space-y-1"><!--[-->`);
          ssrRenderList(item.children, (child) => {
            _push(`<li class="flex items-center">`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: child.to,
              class: ["flex items-center space-x-2 text-sm transition-colors w-full py-2", isActive(child.to) ? "font-semibold text-[#0F4841]" : "text-[#595959] hover:text-[#0F4841]"],
              onClick: ($event) => openDropdown.value = null
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_NuxtImg, {
                    src: "/before-icon.svg",
                    alt: "icon",
                    width: "14",
                    height: "24"
                  }, null, _parent2, _scopeId));
                  _push2(`<span${_scopeId}>${ssrInterpolate(child.label)}</span>`);
                } else {
                  return [
                    createVNode(_component_NuxtImg, {
                      src: "/before-icon.svg",
                      alt: "icon",
                      width: "14",
                      height: "24"
                    }),
                    createVNode("span", null, toDisplayString(child.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav><div class="p-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"><span class="text-white text-sm font-medium">M</span></div><span class="text-gray-700 font-medium">Matt Villa</span></div><button class="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "user-red-icon.svg",
        alt: "User Menu",
        width: "20"
      }, null, _parent));
      _push(`</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=DashboardSidebar.vue.mjs.map
