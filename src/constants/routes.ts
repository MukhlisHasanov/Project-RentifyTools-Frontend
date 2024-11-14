//v141124    export enum TOOLS_APP_ROUTES {
//v141124      HOME = "/",
//v141124      ADD_ADVERTS = "/add_adverts",
//v141124      LOGIN = "/login",
//v141124      PROFILE = "/profile",
//v141124      HELP = "/help",
//v141124      ADVERTISING = "/advertising",
//v141124      ABOUT_US = "/about_us",
//v141124      CONTACTS = "/contacts",
//v141124      PRIVACY_POLICY = "privacy_policy",
//v141124      CONDITIONS = "/conditions",
//v141124      IMPRINT = "/imprint",
//v141124      SOCIAL_MEDIA = "/medias",
//v141124      NOT_FOUND = "*",
    
//v141124    }
  

// VExsemple 141424
export const TOOLS_APP_ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  LOGIN: "/login",
  MY_ADVERT: "/my-advert", 
 
 
  ADD_ADVERTS: "/add-adverts",


  HELP: "/help",
  ADVERTISING: "/advertising",
  ABOUT_US: "/about-us",
  CONTACTS: "/contacts",
  PRIVACY_POLICY: "/privacy-policy",
  CONDITIONS: "/conditions-of-use",
  IMPRINT: "/imprint",
  SOCIAL_MEDIA: "/social-media",


} as const;

export type AppRoutes = typeof TOOLS_APP_ROUTES[keyof typeof TOOLS_APP_ROUTES];
