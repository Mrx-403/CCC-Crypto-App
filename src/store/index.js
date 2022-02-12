import { createStore } from "vuex";
import CoinGecko from "coingecko-api";

//Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

export default createStore({
  state: {
    globalData: {},
    top10Coins: {},
  },
  mutations: {
    setGlobalData(state, payload) {
      state.globalData = payload;
    },
    setTop10Coins(state, payload) {
      state.top10Coins = payload;
    },
  },
  actions: {
    async fetchGlobalData(context) {
      const res = await CoinGeckoClient.global();
      context.commit("setGlobalData", res.data.data);
    },
    async fetchTop10Coins(context) {
      const res = await CoinGeckoClient.coins.all();
      context.commit("setTop10Coins", res.data.slice(0, 10));
    },
  },
  modules: {},
});
