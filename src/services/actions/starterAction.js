import {
  starter_request,
  starter_request_success,
  starter_request_failed,
} from "../types";
import Api from "../../ClientApi/Api";
import { compareProduct } from "./compareAction";
import { user } from "./userAction";
import { hotDeal } from "./dealAction";
import store from "../store";

export const starter = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: starter_request,
      });

      let apiCall = store.getState().starterApi;

      if (apiCall !== true) {
        try {
          const res = await Api().get("getDetails");

          const data = res?.data;

          dispatch({
            type: starter_request_success,
            maintenance: data.maintenance,
            siteName: data.site_name,
            metaDescription: data.meta_description,
            siteMoto: data.site_moto,
            metaKeyword: data.meta_keyword,
            metaPhoto: data.metaPhoto,
            siteColor: data.site_base_color,
            siteHoverColor: data.site_hover_color,
            siteFavicon: data.favicon,
            defaultCurrency: data.defaultCurrency,
            currencySymbolFormat: data.symbolFormat,
            decimalFormat: data.decimalFormat,
            currencyCode: data.currencyCode,
            currencyConversionRate: data.currencyConversionRate,
            vendor: data.vendor,
            siteTitle: data.site_name,
            reCaptcha: data.reCaptcha,
            googleAnalytics: data.googleAnalytics,
            facebookPixel: data.facebookAnalytics,
            messengerChat: data.messengerChat,
            cookieText: data.cookie_text,
            cookieStatus: data.cookie_status,
            popupStatus: data.popup_status,
            popupContent: data.popup_content,
            newsletterStatus: data.newsletter_status,
            bannerLink: data.banner_link,
            bannerStatus: data.banner_status,
            banner: data.banner,
            phone: data.phone,
            mail: data.mail,
            logo: data.logo,
            stickyHeader: data.sticky_header,
            copyright: data.copy_right,
            footerDescription: data.footer_description,
            contactNumber: data.contact_number,
            whatsappNumber: data.whatsapp_number,
            contactAddress: data.contact_address,
            contactEmail: data.contactEmail,
            footerPaymentStatus: data.footerPaymentStatus,
            todaysDeal: data.todaysDeal,
            bannerOne: data.bannerOne,
            bannerTwo: data.bannerTwo,
            bannerThree: data.bannerThree,
            featuredTrendingTopRated: data.featuredTrendingTopRated,
            featured: data.featured,
            trending: data.trending,
            topRated: data.topRated,
            topTenCategory: data.topTenCategory,
            topTenBrands: data.topTenBrands,
            showCategory: data.showCategory,
            flashdealFeatured: data.flashdeal_featured,
          });

          if (typeof window !== "undefined") {
            const root = document.querySelector(":root");
            if (root) {
              root.style.setProperty(
                "--primaryColor",
                data.site_base_color || "#000",
              );
              root.style.setProperty(
                "--secondaryColor",
                data.site_hover_color || "#000",
              );
            }
          }

          if (data.todaysDeal > 0) {
            dispatch(hotDeal());
          }

          dispatch(user());
          dispatch(compareProduct());
        } catch (error) {
          dispatch({
            type: starter_request_failed,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: starter_request_failed,
      });
    }
  };
};
