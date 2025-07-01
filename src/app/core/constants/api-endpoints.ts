export const API_ENDPOINTS = (() => {
  // const SALES_BASE = 'api/sales/';
  return {
    AUTH: {
      LOGIN: `api/v1/auth/authenticate`,
      LOGOUT: ``,
      FORGOT_PASSWORD: ``,
      RESET_PASSWORD: ``,
      CHANGE_PASSWORD: ``,
    },
    REGISTER: {
      CREATE_USER: `api/v1/auth/register`,
      GET_ALL_USERS: ``,
      GET_USER_BY_ID: ``,
      UPDATE_USER: ``,
      DELETE_USER: ``,
    },
    SALVAGES_AUCTION: {
      CREATE: 'api/salvages',
      GET_ALL_SALVAGES: `api/salvages`,
      GET_SALVAGE_BY_ID: `api/salvages`,
      UPCOMING_SALVAGES: `api/salvages/upcoming`,
      UPLOAD_IMAGE: (Id: any) => `api/salvage-images/upload?salvageId=` + Id,
      AUCTION_VIEW: (Id: any) => `api/salvages/` + Id,
      BID_HISTORY: (Id: any) => `api/salvages/` + Id + `/bid`,
      PARTICIPATE_IN_BIDDING: 'AuctionParticipant/join',
      PLACE_BID: (Id: any) => 'api/salvages/' + Id + '/bid',
      ADD_WATCHLIST: 'AuctionParticipant/add/watchlist',
    },
    DASHBOARD: {
      GET_BIDDER_DASHBOARD: (Id: any) => `api/dashboard/bidder/` + Id,
      GET_BY_ID_SALVAGE: (Id: any) => `api/salvages/user/` + Id,
      GET_BY_ID_AUCTON: (Id: any) => `AuctionParticipant/myauctions/` + Id,
      GET_COMPANY_DASHBOARD: `api/dashboard/insurance`,
      GET_BIDDER_APPROVAL: (Id: any) => `AuctionParticipant/participants/posted-by/` + Id,

      STATUS_UPDATE: (Id: any, status: any) => `AuctionParticipant/approve/` + Id + `?status=` + status,

      GET_WATCH_LIST: (Id: any) => `AuctionParticipant/watchlist/` + Id,
      GET_WON_ITEMS: (Id: any) => `api/winners/my-items?userId=` + Id,
      GET_WON_ITEMS_BY_ID: (Id: any) => `api/winners/` + Id,
      GET_WINNING_AUCTION: (Id: any) => 'api/auction-results',
      DECLARE_WINNER: 'api/winners/declare'
    },
    LOCATION: {
      GET_COUNTRY: 'api/location/countries',
      GET_REGION: (Id: any) => 'api/location/regions/' + Id,
      GET_DISTRICTS: (Id: any) => 'api/location/districts/' + Id,
    },
    DROP_DOWN: {
      GET_CONDITION: 'api/location/dropdown/condition-status'
    }
  }
})();
