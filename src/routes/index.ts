import Loadable from "react-loadable";
import LazyLoading from "components/LazyLoading";

const ScanTagResultPage = Loadable({
  loader: () => import("views/ScanTagResultPage"),
  loading: LazyLoading,
});
const NotFoundPage = Loadable({
  loader: () => import("views/404"),
  loading: LazyLoading,
});

const routes = [
  { path: "/:antiCounterfeitTag", component: ScanTagResultPage },
  {
    path: "*",
    component: NotFoundPage,
  },
];

export default routes;
