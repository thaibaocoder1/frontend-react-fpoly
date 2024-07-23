import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./protected";
import LoadingV2 from "@components/LoadingV2/LoadingV2";

const AdminLayout = lazy(() => import("@layout/AdminLayout"));
const AccountAdd = lazy(() =>
  import("@modules/admin/Account/components/AccountAdd")
);
const AccountEdit = lazy(() =>
  import("@modules/admin/Account/components/AccountEdit")
);
const LoginForm = lazy(() =>
  import("@modules/admin/Auth/components/LoginForm/LoginForm")
);
const ProductAddEdit = lazy(() =>
  import("@modules/admin/Product/components/ProductAddEdit")
);
const Login = lazy(() => import("@modules/client/Auth/components/Login"));
const Register = lazy(() => import("@modules/client/Auth/components/Register"));
const Index = lazy(() => import("@modules/client/Dashboard/pages/Index"));
const OrderDetail = lazy(() =>
  import("@modules/client/Dashboard/pages/OrderDetail")
);
const Orders = lazy(() => import("@modules/client/Dashboard/pages/Orders"));
const NotFound = lazy(() => import("@pages/NotFound"));
const AccountAdmin = lazy(() => import("@pages/admin/Account"));
const CategoryAdmin = lazy(() => import("@pages/admin/Category"));
const CouponAdmin = lazy(() => import("@pages/admin/Coupon"));
const DashboardAdmin = lazy(() => import("@pages/admin/Dashboard"));
const OrderAdmin = lazy(() => import("@pages/admin/Order"));
const OrderDetailAdmin = lazy(() => import("@pages/admin/OrderDetail"));
const ProductAdmin = lazy(() => import("@pages/admin/Product"));
const ProfileAdmin = lazy(() => import("@pages/admin/Profile"));
const ActiveAccount = lazy(() => import("@pages/client/ActiveAccount"));
const AuthPage = lazy(() => import("@pages/client/AuthPage"));
const Cart = lazy(() => import("@pages/client/Cart"));
const ChangePassword = lazy(() => import("@pages/client/ChangePassword"));
const CheckoutPage = lazy(() => import("@pages/client/Checkout"));
const ConfirmRecover = lazy(() => import("@pages/client/ConfirmRecover"));
const Dashboard = lazy(() => import("@pages/client/Dashboard"));
const ForgotAccount = lazy(() => import("@pages/client/ForgotAccount"));
const Home = lazy(() => import("@pages/client/Home"));
const MyWishList = lazy(() => import("@pages/client/MyWishList"));
const OrderComplete = lazy(() => import("@pages/client/OrderComplete"));
const RecoverAccount = lazy(() => import("@pages/client/RecoverAccount"));
const ResetAccount = lazy(() => import("@pages/client/ResetAccount"));
const Shop = lazy(() => import("@pages/client/Shop"));
const ShopDetail = lazy(() => import("@pages/client/ShopDetail"));
const ClientLayout = lazy(() => import("@layout/ClientLayout"));

const RoutesFeature = () => {
  let element = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingV2></LoadingV2>}>
          <ClientLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "shops",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <Shop />
                </Suspense>
              ),
            },
            {
              path: "detail/:id",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ShopDetail />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <CheckoutPage />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <Dashboard />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <Index />
                </Suspense>
              ),
            },
            {
              path: "orders",
              children: [
                {
                  index: true,
                  element: (
                    <Suspense fallback={<LoadingV2></LoadingV2>}>
                      <Orders />
                    </Suspense>
                  ),
                },
                {
                  path: ":id",
                  element: (
                    <Suspense fallback={<LoadingV2></LoadingV2>}>
                      <OrderDetail />
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: "wishlist",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <MyWishList />
                </Suspense>
              ),
            },
            {
              path: "change",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ChangePassword />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "auth",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <AuthPage />
            </Suspense>
          ),
          children: [
            {
              path: "active/:id",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ActiveAccount />
                </Suspense>
              ),
            },
            {
              path: "forgot",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ForgotAccount />
                </Suspense>
              ),
            },
            {
              path: "reset/:id",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ResetAccount />
                </Suspense>
              ),
            },
            {
              path: "recover",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <RecoverAccount />
                </Suspense>
              ),
            },
            {
              path: "confirm",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ConfirmRecover />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "/order/complete",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <OrderComplete />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingV2></LoadingV2>}>
            <AdminLayout />
          </Suspense>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <DashboardAdmin />
            </Suspense>
          ),
        },
        {
          path: "category",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <CategoryAdmin />
            </Suspense>
          ),
        },
        {
          path: "coupon",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <CouponAdmin />
            </Suspense>
          ),
        },
        {
          path: "product",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ProductAdmin />
                </Suspense>
              ),
            },
            {
              path: "add",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ProductAddEdit />
                </Suspense>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <ProductAddEdit />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "accounts",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <AccountAdmin />
                </Suspense>
              ),
            },
            {
              path: "add",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <AccountAdd />
                </Suspense>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <AccountEdit />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "orders",
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <OrderAdmin />
                </Suspense>
              ),
            },
            {
              path: ":id",
              element: (
                <Suspense fallback={<LoadingV2></LoadingV2>}>
                  <OrderDetailAdmin />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<LoadingV2></LoadingV2>}>
              <ProfileAdmin />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/admin/login",
      element: (
        <Suspense fallback={<LoadingV2></LoadingV2>}>
          <LoginForm />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<LoadingV2></LoadingV2>}>
          <NotFound />
        </Suspense>
      ),
    },
  ]);

  return element;
};

export default RoutesFeature;
