<template>
    <div>
        <div ref="main" style="width: 800px;height:600px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import $ from 'jquery'
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        this.loadEcharts()
    },
    methods: {
        loadEcharts() {
            var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'
            var myChart = echarts.init(this.$refs.main)
            var option
            $.get(ROOT_PATH + '/data/asset/data/flare.json', function (data) {
                option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',

                            data: [data],

                            top: '1%',
                            left: '7%',
                            bottom: '1%',
                            right: '20%',

                            symbolSize: 7,

                            label: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 9
                            },

                            leaves: {
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            },

                            emphasis: {
                                focus: 'descendant'
                            },

                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                }
                
                myChart.showLoading(option)
                data.children.forEach(function (datum, index) {
                    index % 2 === 0 && (datum.collapsed = true);
                });
                // 

                
                myChart.hideLoading();
                myChart.setOption(option)
            });
            // myChart.setOption(option)
        }
    }
}
</script>

<style lang="css" scoped>

</style>