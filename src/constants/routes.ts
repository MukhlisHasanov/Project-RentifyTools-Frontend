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

export enum TOOLS_APP_ROUTES {
  HOME = "/",
  ADD_ADVERTS = "/add_adverts",
  LOGIN = "/login",
  PROFILE = "/profile",
  MESSAGES = "/profile/messages",
  MY_ADVERTS = "/profile/my_adverts",
  FAVOURITES = "/profile/favourites",
  RENTED_TOOLS = "/profile/rented_tools",
  HELP = "/help",
  ADVERTISING = "/advertising",
  ABOUT_US = "/about_us",
  CONTACTS = "/contacts",
  PRIVACY_POLICY = "privacy_policy",
  CONDITIONS = "/conditions",
  IMPRINT = "/imprint",
  SOCIAL_MEDIA = "/medias",
  NOT_FOUND = "*",
  PRODUCTS = "/products"
    HOME = "/",
    ADD_ADVERTS = "/add-adverts",
    LOGIN = "/login",
    PROFILE = "/profile",
    MESSAGES = "/profile/messages",
    MY_ADVERTS = "/profile/my-adverts",
    FAVOURITES = "/profile/favourites",
    RENTED_TOOLS = "/profile/rented-tools",
    HELP = "/help",
    ADVERTISING = "/advertising",
    ABOUT_US = "/about-us",
    CONTACTS = "/contacts",
    PRIVACY_POLICY = "privacy-policy",
    CONDITIONS = "/conditions",
    IMPRINT = "/imprint",
    SOCIAL_MEDIA = "/medias",
    NOT_FOUND = "*",
  }
  

//v141124    export const TOOLS_APP_ROUTES = {
//v141124      HOME: "/",
//v141124      PROFILE: "/profile",
//v141124      LOGIN: "/login",
//v141124      MY_ADVERT: "/my-advert", 
 //v141124    
//v141124     
//v141124      ADD_ADVERTS: "/add-adverts",
//v141124    
//v141124    
//v141124      HELP: "/help",
//v141124      ADVERTISING: "/advertising",
//v141124      ABOUT_US: "/about-us",
//v141124      CONTACTS: "/contacts",
//v141124      PRIVACY_POLICY: "/privacy-policy",
//v141124      CONDITIONS: "/conditions-of-use",
//v141124      IMPRINT: "/imprint",
//v141124      SOCIAL_MEDIA: "/social-media",
//v141124    
  
 //v141124   } as const;
  
//v141124    export type AppRoutes = typeof TOOLS_APP_ROUTES[keyof typeof TOOLS_APP_ROUTES];