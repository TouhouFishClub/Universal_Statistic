<template>
  <div class="item-line-chart mx-auto mt-4">
<!--    {{itemId}}-->
    <v-col
        cols="12"
        sm="6"
        class="py-2"
    >
      <v-btn-toggle
          :value="stackedChart"
          dense
          :dark="$store.state.isDark"
      >
        <v-btn :value="false" @click="$store.commit('setStackedChart', false)">
          <v-icon>mdi-chart-line</v-icon>
          <span>普通显示</span>
        </v-btn>
        <v-btn :value="true" @click="$store.commit('setStackedChart', true)">
          <v-icon>mdi-chart-line-stacked</v-icon>
          <span>堆叠显示</span>
        </v-btn>
      </v-btn-toggle>
    </v-col>
    <line-chart
        v-if="chartData"
        :chart-data="chartData"
    ></line-chart>
  </div>
</template>

<script>
  import LineChart from '@/components/chart/LineChart.js'
  import { mapState } from 'vuex'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        chartData: null,
        date: 0,
        dataTmp: null
      }
    },
    props: {
      itemId: {
        type: String,
        default: ''
      },
    },
    methods: {
      initData() {
        this.date = ~~(Date.now() / 86400000)
        this.getAllData()
      },
      async getAllData() {
        let allData = await Promise.all([0, 1, 2, 3, 4, 5, 6, 7].map(offset => this.fetchDate(this.itemId, this.date - offset)))
        this.dataTmp = allData
        this.fillData(allData)
      },
      fetchDate(id, date) {
        return new Promise(resolve => {
          this.$axios.get('/get_waiting_by_date', { params: {id, date}})
            .then(res => resolve(res.data))
        })
      },
      fillData (data) {
        // 更新data
        // let labelInfo = [...Array(288).keys()].map(x => {
        //   return {
        //     h: (8 + ~~(x / 12)) % 24,
        //     m: 5 * (x % 12)
        //   }
        // })
        // 改为仅显示9 - 22, 间隔15分钟
        let labelInfo = [...Array(52).keys()].map(x => {
          return {
            h: (9 + ~~(x / 4)) % 24,
            m: 15 * (x % 4)
          }
        })

        this.chartData = {
          labels : labelInfo.map(x => `${x.h}:${x.m}`),
          datasets: data.map((dayInfo, dayOffset) => {
            return {
              label: `${dayOffset ? dayOffset + '天前' : '今天'}`,
              fill: dayOffset ? this.stackedChart: false,
              spanGaps: true,
              lineTension: 0,
              borderJoinStyle: 'round',
              radius: 0,
              borderWidth: dayOffset ? (this.stackedChart ? 0 : 1) : 3,
              yAxisID: this.stackedChart ? (dayOffset ? 'history': 'today') : 'normal',
              order: dayOffset ? 1 : 0,
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
              data: this.insertData(labelInfo.map(x => dayInfo.d.find(f => f.hour == x.h && f.min == x.m)?.waiting_time))
            }
          })
        }
      },
      createLabel(dayOffset) {
        return `x月x日（是否公休）`
      },
      insertData(data) {
        if(data.length) {
          let st = -1
          for(let i = 0; i < data.length; i ++) {
            if(typeof data[i] == 'number') {
              if(st + 1 == i || st == -1) {
                st = i
              } else {
                for(let j = i - 1; j > st; j --) {
                  data[j] = ~~((data[i] - data[st]) / (i - st) * (j - st) + data[st])
                }
                st = i
              }
            }
          }
        }
        return data
      }
    },
    computed: {
      ...mapState(['stackedChart', 'renderChart'])
    },
    watch: {
      itemId(val) {
        this.initData()
      },
      renderChart(val) {
        if(this.dataTmp) {
          this.fillData(this.dataTmp)
        }
      }
    }
  }
</script>

<style>
  .item-line-chart {
    max-width: 500px;
  }
</style>
