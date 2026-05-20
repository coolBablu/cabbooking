export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  pricing: "/pricing",
  contact: "/contact",
  blog: "/blog",
  faq: "/faq",
  terms: "/terms",
  privacy: "/privacy",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  driverDashboard: "/driver",
  booking: "/booking",
  ride: (id: string | number = "sw-2451") => `/ride/${id}`,
  payment: "/payment",
  bookingSuccess: "/booking/success",
  admin: "/admin",
  adminBookings: "/admin/bookings",
  adminDrivers: "/admin/drivers",
  adminUsers: "/admin/users",
  adminPayments: "/admin/payments",
  adminSupport: "/admin/support",
  adminSettings: "/admin/settings",
} as const;

/** External destinations. Open in new tabs with rel="noopener noreferrer". */
export const SOCIAL = {
  twitter: "https://twitter.com/swiftcab",
  instagram: "https://instagram.com/swiftcab",
  linkedin: "https://linkedin.com/company/swiftcab",
  github: "https://github.com/swiftcab",
} as const;

export const APP_STORE = {
  ios: "https://apps.apple.com/app/swiftcab",
  android: "https://play.google.com/store/apps/details?id=com.swiftcab",
} as const;

export const MAIN_NAV = [
  { label: "Services", href: ROUTES.services },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "About", href: ROUTES.about },
  { label: "Blog", href: ROUTES.blog },
  { label: "Contact", href: ROUTES.contact },
];
