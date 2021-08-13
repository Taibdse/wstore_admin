import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import ProductsPage from "@/pages/products/ProductsPage.vue";
import ProductDetailsPage from "@/pages/products/ProductDetailsPage.vue";
import OrdersPage from "@/pages/orders/OrdersPage.vue";
import OrderDetailsPage from "@/pages/orders/OrderDetailsPage.vue";
import ReviewsPage from "../pages/reviews/ReviewsPage.vue";
import ReviewDetailsPage from "../pages/reviews/ReviewDetailsPage.vue";
import ReviewTypePage from "../pages/review-type/ReviewTypePage.vue";
import ReviewTypeDetailsPage from "../pages/review-type/ReviewTypeDetailsPage.vue";
import TipsPage from "../pages/tips/TipsPage.vue";
import TipDetailsPage from "../pages/tips/TipDetailsPage.vue";
import PolicyDetailsPage from "../pages/policies/PolicyDetailsPage.vue";
import PoliciesPage from "../pages/policies/PoliciesPage.vue";
import NewsPage from "../pages/news/NewsPage.vue";
import NewsDetailsPage from "../pages/news/NewsDetailsPage.vue";
import CategoriesPage from "../pages/categories/CategoriesPage.vue";
import CategoryDetailsPage from "../pages/categories/CategoryDetailsPage.vue";
import StoreInformationPage from "../pages/store_information/StoreInformationPage.vue";
import ShippingsPage from "../pages/shippings/ShippingsPage.vue";
import ShippingDetailsPage from "../pages/shippings/ShippingDetailsPage.vue";
import AdminLoginPage from "../pages/auth/AdminLoginPage.vue";
import AdminChangePasswordPage from "../pages/auth/AdminChangePasswordPage.vue";
import WebsiteInfoPage from "../pages/website/WebsiteInfoPage.vue";
import LanguagePage from "../pages/language/LanguagePage.vue";
import CustomersPage from "../pages/customer/CustomersPage.vue";
import PaymentMethodPage from "../pages/payment-method/PaymentMethodPage.vue";
import PromotionCodesPage from "../pages/promotion-code/PromotionCodesPage.vue";
import PromotionCodeDetailsPage from "../pages/promotion-code/PromotionCodeDetailsPage.vue";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import LoginTempPage from "../pages/auth/LoginTemp.vue";

import { PathRouteConstants } from "./pathRoutes";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      //=========== INDEX ROUTES ==============
      {
        path: PathRouteConstants.indexRoute,
        name: "Index",
        redirect: "orders",
      },

      //=========== AUTH ROUTES ==============
      {
        path: PathRouteConstants.loginRoute,
        name: "Login",
        component: LoginTempPage,
      },
      {
        path: PathRouteConstants.changePasswordRoute,
        name: "Change Password",
        component: AdminChangePasswordPage,
      },

      //=========== PRODUCT ROUTES ==============
      {
        path: PathRouteConstants.productsRoute,
        name: "Products",
        component: ProductsPage,
      },
      {
        path: PathRouteConstants.productDetailsRoute,
        name: "Update Product",
        component: ProductDetailsPage,
      },
      {
        path: PathRouteConstants.productInsertRoute,
        name: "Insert product",
        component: ProductDetailsPage,
      },

      //=========== ORDER ROUTES ==============
      {
        path: PathRouteConstants.ordersRoute,
        name: "Orders",
        component: OrdersPage,
      },
      {
        path: PathRouteConstants.orderDetailsRoute,
        name: "Order Details",
        component: OrderDetailsPage,
      },

      //=========== REVIEWS ROUTES ==============
      {
        path: PathRouteConstants.reviewsRoute,
        name: "Reviews",
        component: ReviewsPage,
      },

      {
        path: PathRouteConstants.reviewDetailsRoute,
        name: "Update Review",
        component: ReviewDetailsPage,
      },
      {
        path: PathRouteConstants.reviewInsertRoute,
        name: "Insert Review",
        component: ReviewDetailsPage,
      },

      //=========== REVIEWTYPE ROUTES ==============
      {
        path: PathRouteConstants.reviewTypesRoute,
        name: "Review Types",
        component: ReviewTypePage,
      },

      {
        path: PathRouteConstants.reviewTypeDetailsRoute,
        name: "Update ReviewTypes",
        component: ReviewTypeDetailsPage,
      },
      {
        path: PathRouteConstants.reviewTypeInsertRoute,
        name: "Insert ReviewTypes",
        component: ReviewTypeDetailsPage,
      },

      //=========== TIPS ROUTES ==============
      {
        path: PathRouteConstants.tipsRoute,
        name: "Tips",
        component: TipsPage,
      },

      {
        path: PathRouteConstants.tipDetailsRoute,
        name: "Update Tip",
        component: TipDetailsPage,
      },
      {
        path: PathRouteConstants.tipInsertRoute,
        name: "Insert Tip",
        component: TipDetailsPage,
      },

      //=========== POLICY ROUTES ==============
      {
        path: PathRouteConstants.policiesRoute,
        name: "Policy",
        component: PoliciesPage,
      },
      {
        path: PathRouteConstants.policyDetailsRoute,
        name: "Policy",
        component: PolicyDetailsPage,
      },

      //=========== NEWS ROUTES ==============
      {
        path: PathRouteConstants.newsListRoute,
        name: "News",
        component: NewsPage,
      },
      {
        path: PathRouteConstants.newsInsertRoute,
        name: "Insert News",
        component: NewsDetailsPage,
      },
      {
        path: PathRouteConstants.newsDetailsRoute,
        name: "Update News",
        component: NewsDetailsPage,
      },

      //=========== CATEGORY ROUTES ==============
      {
        path: PathRouteConstants.categoriesRoute,
        name: "Categories",
        component: CategoriesPage,
      },
      {
        path: PathRouteConstants.categoryInsertRoute,
        name: "Insert Categories",
        component: CategoryDetailsPage,
      },
      {
        path: PathRouteConstants.categoryDetailsRoute,
        name: "Update Categories",
        component: CategoryDetailsPage,
      },

      //=========== STORE INFORMATION ROUTES ==============
      {
        path: PathRouteConstants.informationRoute,
        name: "Store Information",
        component: StoreInformationPage,
      },

      //=========== SHIPPING ROUTES ==============
      {
        path: PathRouteConstants.shippingsRoute,
        name: "Shippings",
        component: ShippingsPage,
      },
      {
        path: PathRouteConstants.shippingDetailsRoute,
        name: "Update Shipping",
        component: ShippingDetailsPage,
      },

      //=========== SHIPPING ROUTES ==============
      {
        path: PathRouteConstants.websiteRoute,
        name: "Website Info",
        component: WebsiteInfoPage,
      },

      //=========== LANGUAGE ROUTES ==============
      {
        path: PathRouteConstants.languagesRoute,
        name: "Language",
        component: LanguagePage,
      },

      //=========== CUSTOMER ROUTES ==============
      {
        path: PathRouteConstants.customersRoute,
        name: "Customer",
        component: CustomersPage,
      },

      {
        path: PathRouteConstants.paymentMethodsRoute,
        name: "PaymentMethod",
        component: PaymentMethodPage,
      },

      {
        path: PathRouteConstants.promotionCodesRoute,
        name: "Promotion Code",
        component: PromotionCodesPage,
      },
      {
        path: PathRouteConstants.promotionCodeInsertRoute,
        name: "Insert Promotion Code",
        component: PromotionCodeDetailsPage,
      },
      {
        path: PathRouteConstants.promotionCodeDetailsRoute + "/:id",
        name: "Update Promotion Code",
        component: PromotionCodeDetailsPage,
      },

      //=========== NOT FOUND ROUTES ==============
      {
        path: "*",
        name: "Not Found",
        component: NotFoundPage,
      },
    ],
  },
];

export default routes;
