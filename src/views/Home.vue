<template>
  <div
    class="bg-gray-900 w-full h-screen flex items-center justify-center"
    v-if="!showData"
  >
    <SyncLoader :loading="!showData" />
  </div>

  <div class="main-container bg-gray-900 w-full" v-if="showData">
    <Header @authModalOpened="isAuthModalOpen = true" />
    <Drawer />
    <MarketGlobalStatus :globalData="globalData" />
    <SearchBox />
    <div class="flex w-4/5 sm:w-2/3 mx-auto py-4 items-center justify-between">
      <div class="flex items-center w-52">
        <div
          class="flex items-center justify-center bg-gray-800 w-8 h-8 rounded-full mr-2 index"
        >
          <span class="text-white text-sm sm:text-md">#</span>
        </div>
        <div
          class="bg-gray-800 rounded-full p-3 shadow-lg flex items-center justify-center coin-info-div"
        >
          <span class="text-white text-sm sm:text-md coin-info"
            >Name and Symbol</span
          >
        </div>
      </div>
      <div
        class="bg-gray-800 rounded-full p-3 shadow-lg miniChartCard items-center justify-center hidden md:flex"
      >
        <span class="text-white text-sm sm:text-md">7day Chart</span>
      </div>
      <div
        class="bg-gray-800 rounded-full w-32 p-3 shadow-lg hidden lg:flex items-center justify-center"
      >
        <span class="text-white text-sm sm:text-md">Market Cap</span>
      </div>
      <div
        class="bg-gray-800 rounded-full w-32 p-3 shadow-lg flex items-center justify-center current-price-div"
      >
        <span class="text-white text-sm sm:text-md current-price"
          >Current Price</span
        >
      </div>
    </div>
    <CoinBox
      v-for="(coin, index) in top10Coins"
      :key="coin.symbol"
      :index="index"
      :coinInfo="coin"
    />
    <Modal
      :isOpen="isAuthModalOpen"
      :insetX="'inset-x-1/10 lg:inset-x-1/4'"
      :insetY="'inset-y-1/4'"
      @ModalClosed="isAuthModalOpen = false"
    >
      <LoginForm
        @changeauthModalType="authModalType = 'Signup'"
        v-if="authModalType == 'Login'"
      />
      <SignupForm
        @changeauthModalType="authModalType = 'Login'"
        v-if="authModalType == 'Signup'"
      />
    </Modal>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import MarketGlobalStatus from "../components/MarketGlobalStatus.vue";
import SearchBox from "../components/SearchBox.vue";
import CoinBox from "../components/CoinBox.vue";
import Drawer from "../components/Drawer.vue";
import Modal from "../components/utils/Modal.vue";
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
export default {
  name: "Home",
  components: {
    Header,
    MarketGlobalStatus,
    SearchBox,
    CoinBox,
    Drawer,
    Modal,
    LoginForm,
    SignupForm,
    SyncLoader,
  },
  data() {
    return {
      showData: false,
      intervalFunc: null,
      isAuthModalOpen: false,
      authModalType: "Login",
    };
  },
  computed: {
    globalData() {
      return this.$store.state.globalData;
    },
    top10Coins() {
      return this.$store.state.top10Coins;
    },
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchGlobalData");
      await this.$store.dispatch("fetchTop10Coins");
      this.showData = true;
      this.intervalFunc = setInterval(() => {
        this.$store.dispatch("fetchGlobalData");
        this.$store.dispatch("fetchTop10Coins");
      }, 60000);
    },
  },
  mounted() {
    this.fetchData();
  },
  unmounted() {
    clearInterval(this.intervalFunc);
  },
};
</script>

<style scoped>
.miniChartCard {
  width: 180px;
}
@media (max-width: 400px) {
  .coin-info {
    font-size: 12px;
  }
  .current-price {
    font-size: 12px;
  }
  .index {
    display: none;
  }
}
@media (max-width: 330px) {
  .coin-info-div {
    display: none;
  }
  .current-price-div {
    display: none;
  }
}
</style>
