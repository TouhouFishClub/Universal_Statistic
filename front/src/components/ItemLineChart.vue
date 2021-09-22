<template>
  <div class="item-line-chart mx-auto mt-4">
<!--    {{itemId}}-->
    <line-chart v-if="chartData" :chart-data="chartData" :options="options"></line-chart>
<!--    <button @click="fillData()">Randomize</button>-->
  </div>
</template>

<script>
  import LineChart from '@/components/chart/LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        chartData: null,
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                color: 'rgba(150,150,150,0.3)'
              }
            }],
            yAxes: [{
              gridLines: {
                color: 'rgba(150,150,150,0.3)'
              }
            }]
          }
        },
        date: 0
      }
    },
    props: {
      itemId: {
        type: String,
        default: ''
      },
    },
    mounted () {
      this.fillData()
    },
    methods: {
      initData() {
        this.date = ~~(Date.now() / 86400000)
        this.getAllData()
      },
      async getAllData() {
        let allData = await Promise.all([0, 1, 2, 3, 4, 5, 6, 7].map(offset => this.fetchDate(this.itemId, this.date - offset)))
        this.fillData(allData)
      },
      fetchDate(id, date) {
        return new Promise(resolve => {
          this.$axios.get('/get_waiting_by_date', { params: {id, date}})
            .then(res => resolve(res.data))
        })
      },
      fillData (data) {
        // let labelInfo = [...Array(288).keys()].map(x => {
        //   return {
        //     h: (8 + ~~(x / 12)) % 24,
        //     m: 5 * (x % 12)
        //   }
        // })
        // 改为仅显示9 - 22
        let labelInfo = [...Array(156).keys()].map(x => {
          return {
            h: (9 + ~~(x / 12)) % 24,
            m: 5 * (x % 12)
          }
        })
        this.chartData = {
          labels : labelInfo.map(x => `${x.h}:${x.m}`),
          datasets: data.map((dayInfo, dayOffset) => {
            return {
              label: `data -${dayOffset}`,
              fill: false,
              radius: 0,
              borderColor: [
                '#f80c05',
                '#f8bdac',
                '#f8f8a5',
                '#f8adec',
                '#9ff8ab',
                '#a7f8e4',
                '#c8c7f8',
                '#a5b0f8'
              ][dayOffset],
              backgroundColor: [
                '#f80c05',
                '#f8bdac',
                '#f8f8a5',
                '#f8adec',
                '#9ff8ab',
                '#a7f8e4',
                '#c8c7f8',
                '#a5b0f8'
              ][dayOffset],
              // data: dayInfo.d.map(d => d.waiting_time)
              data: labelInfo.map(x => dayInfo.d.find(f => f.hour == x.h && f.min == x.m)?.waiting_time)
            }
          })
        }
      },
    },
    watch: {
      itemId(val) {
        this.initData()
      }
    }
  }
</script>

<style>
  .item-line-chart {
    max-width: 500px;
  }
</style>
