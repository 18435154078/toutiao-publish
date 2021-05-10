<template>
    <div>
        <div ref="main" style="width: 800px;height:600px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
// import 'echarts/dist/extension/bmap.min.js'
import 'echarts-gl/dist/echarts-gl.min.js'
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
            var myChart = echarts.init(this.$refs.main)
            var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
            var option = {
                backgroundColor: '#000',
                globe: {
                    baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
                    heightTexture: ROOT_PATH + "/data-gl/asset/bathymetry_bw_composite_4k.jpg",
                    displacementScale: 0.2,
                    shading: 'realistic',
                    environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
                    realisticMaterial: {
                        roughness: ROOT_PATH + '/asset/get/s/data-1497599804873-H1SHkG-mZ.jpg',
                        metalness: ROOT_PATH + '/asset/get/s/data-1497599800643-BJbHyGWQW.jpg',
                        textureTiling: [8, 4]
                    },
                    postEffect: {
                        enable: true
                    },
                    viewControl: {
                        autoRotate: false
                    },
                    light: {
                        main: {
                            intensity: 2,
                            shadow: true
                        },
                        ambientCubemap: {
                            texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                            exposure: 2,
                            diffuseIntensity: 2,
                            specularIntensity: 2
                        }
                    }
                }
            };
            myChart.setOption(option)
        }
    }
}
</script>

<style lang="css" scoped>

</style>