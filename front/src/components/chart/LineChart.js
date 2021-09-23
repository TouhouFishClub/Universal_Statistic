import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import { mapState } from 'vuex'

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {}
    }
  },
  // props: ['options'],
  mounted () {
    // this.chartData 在 mixin 创建.
    // 如果你需要替换 options , 请创建本地的 options 对象
    this.options = {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(150,150,150,0.3)'
          }
        }],
        yAxes: this.createYAxes()
      }
    }
    this.renderChart(this.chartData, this.options)
  },
  computed: {
    ...mapState(['stackedChart'])
  },
  methods: {
    createYAxes() {
      let yAxes
      if(this.stackedChart) {
        yAxes = [{
          id: 'history',
          position: 'right',
          stacked: this.stackedChart,
          ticks: {
            min: 0
          },
          gridLines: {
            color: 'rgba(150,150,150,0.3)'
          }
        }, {
          id: 'today',
          position: 'left',
          ticks: {
            min: 0
          },
          gridLines: {
            color: 'rgba(150,150,150,0.3)'
          }
        }]
      } else {
        yAxes = [{
          id: 'normal',
          position: 'left',
          ticks: {
            min: 0
          },
          gridLines: {
            color: 'rgba(150,150,150,0.3)'
          }
        }]
      }
      return yAxes
    }
  },
  watch: {
    stackedChart(val) {
      // 切换模式时重新设置 options.scales.yAxes
      this.$data._chart.options.scales.yAxes = this.createYAxes()
      //TODO： 更新 option 时不渲染，利用 store 触发 data 同时更新，使用 mixins 中 data 的监听更新图表
      this.$store.commit('attachRenderData')
      // this.$data._chart.update()
    }
  }
}
