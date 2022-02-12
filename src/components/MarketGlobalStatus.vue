<template>
  <div
    class="w-4/5 sm:w-2/3 mx-auto flex items-center justify-between pt-4 text-white mb-5"
  >
    <div class="flex flex-col text-center">
      <h2 class="text-sm text-gray-300 mb-2">Market Cap</h2>
      <div>
        <span class="text-md mb-2 mr-1">{{ "$ " + marketCap }}</span>
        <span
          class="text-sm"
          :class="{
            'text-red-400': marketCapChange24h < 0,
            'text-green-400': marketCapChange24h > 0,
          }"
        >
          <i class="bx bxs-down-arrow" v-if="marketCapChange24h < 0"></i>
          <i class="bx bxs-up-arrow" v-else></i>
          {{ marketCapChange24h + "%" }}
        </span>
      </div>
    </div>
    <div class="flex flex-col text-center">
      <h2 class="text-sm text-gray-300 mb-2">BTC Dominance</h2>
      <span class="text-md">{{ btcDominance + "%" }}</span>
    </div>
  </div>
</template>

<script>
import { format } from "d3-format";

export default {
  name: "MarketGlobalStatus",
  props: ["globalData"],
  data() {
    return {
      marketCap: format(".2s")(this.globalData.total_market_cap["usd"]),
      marketCapChange24h:
        this.globalData.market_cap_change_percentage_24h_usd.toFixed(2),
      totalVolume: format(".2s")(this.globalData.total_volume["usd"]),
      btcDominance: this.globalData.market_cap_percentage["btc"].toFixed(2),
    };
  },
};
</script>

<style></style>
