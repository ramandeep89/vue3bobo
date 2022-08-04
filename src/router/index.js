import { createRouter, createWebHashHistory } from "vue-router";

/* Regular Loading */
// import HomeView from "@/views/HomeView";
// import JobResultsView from "@/views/JobResultsView";
// import JobView from "@/views/JobView";

/* Lazy loading */
const HomeView = () => import("@/views/HomeView");
const JobResultsView = () =>
  import(/* webpackChunkName: "jobs" */ "@/views/JobResultsView");
const JobView = () => import(/* webpackChunkName: "jobs" */ "@/views/JobView");
const TeamsView = () => import("@/views/TeamsView");

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/jobs/results",
      name: "JobResults",
      component: JobResultsView,
    },
    {
      path: "/jobs/results/:id",
      name: "JobListing",
      component: JobView,
    },
    {
      path: "/teams",
      name: "Teams",
      component: TeamsView,
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
