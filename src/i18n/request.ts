import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// force reload
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
    locale = routing.defaultLocale;
  }

  const navbar = (await import(`../../messages/${locale}/navbar.json`)).default;
  const auth = (await import(`../../messages/${locale}/auth.json`)).default;
  const home = (await import(`../../messages/${locale}/home.json`)).default;
  const about = (await import(`../../messages/${locale}/about.json`)).default;
  const contact = (await import(`../../messages/${locale}/contact.json`)).default;
  const shop = (await import(`../../messages/${locale}/shop.json`)).default;
  const user = (await import(`../../messages/${locale}/user.json`)).default;
  const product = (await import(`../../messages/${locale}/product.json`)).default;
  const orders = (await import(`../../messages/${locale}/orders.json`)).default;
  const profile = (await import(`../../messages/${locale}/profile.json`)).default;

  return {
    locale,
    messages: {
      navbar,
      auth,
      home,
      about,
      contact,
      shop,
      user,
      product,
      orders,
      profile,
    },
  };




});

