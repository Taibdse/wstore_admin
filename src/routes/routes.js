import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

// import Dashboard from "@/pages/others/Dashboard.vue";
// import UserProfile from "@/pages/others/UserProfile.vue";
// import TableList from "@/pages/others/TableList.vue";
// import Typography from "@/pages/others/Typography.vue";
// import Icons from "@/pages/others/Icons.vue";
// import Maps from "@/pages/others/Maps.vue";
// import Notifications from "@/pages/others/Notifications.vue";
// import UpgradeToPRO from "@/pages/others/UpgradeToPRO.vue";
import ProductsPage from "@/pages/products/ProductsPage.vue";
import ProductDetailsPage from "@/pages/products/ProductDetailsPage.vue";
import OrdersPage from "@/pages/orders/OrdersPage.vue";
import OrderDetailsPage from "@/pages/orders/OrderDetailsPage.vue";
import ReviewsPage from '../pages/reviews/ReviewsPage.vue';
import ReviewDetailsPage from '../pages/reviews/ReviewDetailsPage.vue';
import PolicyDetailsPage from '../pages/policies/PolicyDetailsPage.vue';
import NewsPage from '../pages/news/NewsPage.vue';
import NewsDetailsPage from '../pages/news/NewsDetailsPage.vue';
import CategoriesPage from '../pages/categories/CategoriesPage.vue';
import CategoryDetailsPage from '../pages/categories/CategoryDetailsPage.vue';
import StoreInformationPage from '../pages/store_information/StoreInformationPage.vue';
import ShippingsPage from '../pages/shippings/ShippingsPage.vue';
import ShippingDetailsPage from '../pages/shippings/ShippingDetailsPage.vue';
import AdminLoginPage from '../pages/auth/AdminLoginPage.vue';
import AdminChangePasswordPage from '../pages/auth/AdminChangePasswordPage.vue';
import WebsiteInfoPage from '../pages/website/WebsiteInfoPage.vue';
import NotFoundPage from '../pages/notfound/NotFoundPage';

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    // redirect: "/dashboard",
    children: [
      // {
      //   path: '',
      //   name: 'dashboard',
      //   component: Dashboard
      // },

      //=========== INDEX ROUTES ==============
      {
        path: '',
        name: 'Index',
        redirect: 'products',
      },

      //=========== AUTH ROUTES ==============
      {
        path: 'login',
        name: 'Login',
        component: AdminLoginPage,
      },
      {
        path: 'change-password',
        name: 'Change Password',
        component: AdminChangePasswordPage,
      },

      //=========== PRODUCT ROUTES ==============
      {
        path: 'products',
        name: 'Products',
        component: ProductsPage,
      },
      {
        path: 'products/:productSlug',
        name: 'Update Product',
        component: ProductDetailsPage,
      },
      {
        path: 'products/insert',
        name: 'Insert product',
        component: ProductDetailsPage,
      },


      //=========== ORDER ROUTES ==============
      {
        path: 'orders',
        name: 'Orders',
        component: OrdersPage,
      },
      {
        path: 'orders/:orderId',
        name: 'Order Details',
        component: OrderDetailsPage,
      },


      //=========== REVIEWS ROUTES ==============
      {
        path: 'reviews',
        name: 'Reviews',
        component: ReviewsPage,
      },
      
      {
        path: 'reviews/:reviewSlug',
        name: 'Update Review',
        component: ReviewDetailsPage,
      },
      {
        path: 'reviews/insert',
        name: 'Insert Review',
        component: ReviewDetailsPage,
      },


      //=========== POLICY ROUTES ==============
      {
        path: 'policies',
        name: 'Policy',
        component: PolicyDetailsPage,
      },


      //=========== NEWS ROUTES ==============
      {
        path: 'news',
        name: 'News',
        component: NewsPage,
      },
      {
        path: 'news/insert',
        name: 'Insert News',
        component: NewsDetailsPage,
      },
      {
        path: 'news/:newsSlug',
        name: 'Update News',
        component: NewsDetailsPage,
      },

      
      //=========== CATEGORY ROUTES ==============
      {
        path: 'categories',
        name: 'Categories',
        component: CategoriesPage,
      },
      {
        path: 'categories/insert',
        name: 'Insert Categories',
        component: CategoryDetailsPage,
      },
      {
        path: 'categories/:categorySlug',
        name: 'Update Categories',
        component: CategoryDetailsPage,
      },


      //=========== STORE INFORMATION ROUTES ==============
      {
        path: 'information',
        name: 'Store Information',
        component: StoreInformationPage,
      },

      //=========== SHIPPING ROUTES ============== 
      {
        path: 'shippings',
        name: 'Shippings',
        component: ShippingsPage,
      },
      {
        path: 'shippings/:shippingType',
        name: 'Update Shipping',
        component: ShippingDetailsPage,
      },
      
       //=========== SHIPPING ROUTES ============== 
       {
        path: 'website',
        name: 'Website Info',
        component: WebsiteInfoPage,
      },

       //=========== NOT FOUND ROUTES ============== 
       {
        path: '*',
        name: 'Not Found',
        component: NotFoundPage,
      },

      
      // {
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: Dashboard
      // },
      // {
      //   path: "user",
      //   name: "User Profile",
      //   component: UserProfile
      // },
      // {
      //   path: "table",
      //   name: "Table List",
      //   component: TableList
      // },
      // {
      //   path: "typography",
      //   name: "Typography",
      //   component: Typography
      // },
      // {
      //   path: "icons",
      //   name: "Icons",
      //   component: Icons
      // },
      // {
      //   path: "maps",
      //   name: "Maps",
      //   meta: {
      //     hideFooter: true
      //   },
      //   component: Maps
      // },
      // {
      //   path: "notifications",
      //   name: "Notifications",
      //   component: Notifications
      // },
      // {
      //   path: "upgrade",
      //   name: "Upgrade to PRO",
      //   component: UpgradeToPRO
      // }
    ]
  }
];

export default routes;
