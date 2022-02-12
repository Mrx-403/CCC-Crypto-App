<template>
  <div class="flex w-4/5 sm:w-2/3 mx-auto py-4 items-center justify-between">
    <div class="flex items-center w-52">
      <div
        class="flex items-center justify-center bg-gray-800 w-8 h-8 rounded-full mr-2 index"
      >
        <span class="text-white">{{ index + 1 }}</span>
      </div>
      <div class="coin-avatar bg-gray-800 rounded-full p-3 mr-4 shadow-lg">
        <img :src="coinInfo.image.small" alt="" class="h-8 w-8" />
      </div>
      <div class="coin-info">
        <h2 class="text-white text-md coin-name">{{ coinInfo.name }}</h2>
        <span class="text-gray-500 text-sm coin-symbol">{{
          coinInfo.symbol
        }}</span>
      </div>
    </div>
    <div class="miniChart hidden md:flex">
      <canvas :id="coinInfo.symbol"></canvas>
    </div>
    <div class="coin-market-cap w-32 flex-col hidden lg:flex">
      <h2 class="text-md text-white mb-2 text-center">
        {{ "$" + marketCap }}
      </h2>
      <div
        class="text-center"
        :class="{
          'text-red-400':
            coinInfo.market_data.market_cap_change_percentage_24h < 0,
          'text-green-400':
            coinInfo.market_data.market_cap_change_percentage_24h > 0,
        }"
      >
        <i
          class="bx bxs-down-arrow"
          v-if="coinInfo.market_data.market_cap_change_percentage_24h < 0"
        ></i>
        <i class="bx bxs-up-arrow" v-else></i>
        {{
          coinInfo.market_data.market_cap_change_percentage_24h.toFixed(2) + "%"
        }}
      </div>
    </div>
    <div class="coin-current-price w-32 flex flex-col">
      <h2 class="text-md text-white mb-2 text-center">
        {{ "$" + coinInfo.market_data.current_price["usd"] }}
      </h2>
      <div
        class="text-center"
        :class="{
          'text-red-400': coinInfo.market_data.price_change_percentage_24h < 0,
          'text-green-400':
            coinInfo.market_data.price_change_percentage_24h > 0,
        }"
      >
        <i
          class="bx bxs-down-arrow"
          v-if="coinInfo.market_data.price_change_percentage_24h < 0"
        ></i>
        <i class="bx bxs-up-arrow" v-else></i>
        {{ coinInfo.market_data.price_change_percentage_24h.toFixed(2) + "%" }}
      </div>
    </div>
  </div>
</template>

<script>
import CoinGecko from "coingecko-api";
import { format } from "d3-format";
import { Chart, registerables } from "chart.js";

//Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

export default {
  props: ["coinInfo", "index"],
  name: "CoinBox",
  data() {
    return {
      marketCap: format(".2s")(this.coinInfo.market_data.market_cap["usd"]),
      chartData: null,
      showChart: false,
    };
  },
  methods: {
    async fetchChartData() {
      let res = await CoinGeckoClient.coins.fetchMarketChart(this.coinInfo.id, {
        days: "7",
      });
      let priceArrays = res.data.prices;
      let dates = priceArrays.map((priceArray) =>
        new Date(priceArray[0]).toString().substring(0, 10)
      );
      let prices = priceArrays.map((priceArray) => priceArray[1]);
      let pricesArrayLength = prices.length;
      let overallChange = prices[pricesArrayLength - 1] - prices[0];
      this.chartData = {
        dates,
        prices,
      };
      this.showChart = true;
      let ctx = document
        .getElementById(`${this.coinInfo.symbol}`)
        .getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartData.dates,
          datasets: [
            {
              label: "price",
              data: this.chartData.prices,
              fill: false,
              borderColor:
                overallChange < 0
                  ? "rgba(248, 113, 113)"
                  : "rgba(52, 211, 153)",
              tension: 0.1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
            y: {
              display: false,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    },
  },
  created() {
    Chart.register(...registerables);
  },
  mounted() {
    this.fetchChartData();
  },
};
</script>

<style scoped>
.miniChart {
  height: 88px;
  width: 180px;
}
@media (max-width: 400px) {
  .coin-name {
    font-size: 13px;
  }
  .coin-symbol {
    font-size: 11px;
  }
  .index {
    display: none;
  }
}
</style>
