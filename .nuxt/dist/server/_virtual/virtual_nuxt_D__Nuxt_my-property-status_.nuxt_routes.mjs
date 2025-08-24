import __nuxt_page_meta from "../pages/dashboard.vue2.mjs";
function handleHotUpdate(_router, _generateRoutes) {
}
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import("../pages/index.vue.mjs")
  },
  {
    name: "reports",
    path: "/reports",
    component: () => import("../pages/reports.vue.mjs")
  },
  {
    name: "support",
    path: "/support",
    component: () => import("../pages/support.vue.mjs")
  },
  {
    name: "agencies",
    path: "/agencies",
    component: () => import("../pages/agencies.vue.mjs")
  },
  {
    name: "customers",
    path: "/customers",
    component: () => import("../pages/customers.vue.mjs")
  },
  {
    name: "dashboard",
    path: "/dashboard",
    meta: __nuxt_page_meta || {},
    component: () => import("../pages/dashboard.vue.mjs")
  },
  {
    name: "admin-users",
    path: "/admin-users",
    component: () => import("../pages/admin-users.vue.mjs")
  },
  {
    name: "terms-conditions",
    path: "/terms-conditions",
    component: () => import("../pages/terms-conditions.vue.mjs")
  },
  {
    name: "send-push-notification",
    path: "/send-push-notification",
    component: () => import("../pages/send-push-notification.vue.mjs")
  },
  {
    name: "new-connection-requests",
    path: "/new-connection-requests",
    component: () => import("../pages/new-connection-requests.vue.mjs")
  }
];
export {
  _routes as default,
  handleHotUpdate
};
//# sourceMappingURL=virtual_nuxt_D__Nuxt_my-property-status_.nuxt_routes.mjs.map
