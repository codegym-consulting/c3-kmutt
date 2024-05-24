<template>
  <div class="bg-gray-3">
    <UContainer>
      <div
        class="flex  flex-col space-y-2 shadow-lg flex-shrink-0 pt-4 max-w-[295px] border-0 bg-white px-4 py-5 sm:px-6 rounded">
        <h2 class="text-md font-medium">Knowledge</h2>
        <input id="search" v-model="value" type="text" placeholder="Type interest keyword here"
          class="block flex-1 p-2 rounded-sm text-sm border-0 bg-gray-1 text-gray-10 border-none placeholder:text-gray-400 sm:text-md sm:leading-6">
      </div>
      <UButton label="Download chart" type="primary" @click="downloadAsSvg" />
      <v-network-graph ref="graph" class="graph" :nodes="nodes" :edges="edges" :configs="configs" :layers="layers"
        :event-handlers="eventHandlers" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as vNG from 'v-network-graph'

const value = ref('')

type Node = {
  name: string
  color: string
  radius: number
}

const graph = ref<vNG.Instance>()

async function downloadAsSvg() {
  if (!graph.value) return
  const text = await graph.value.exportAsSvgText()
  const url = URL.createObjectURL(new Blob([text], { type: 'octet/stream' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'network-graph.svg' // filename to download
  a.click()
  window.URL.revokeObjectURL(url)
}

// function getRandomColor() {
//   const letters = '0123456789ABCDEF'
//   let color = '#'
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)]
//   }
//   return color
// }

// Define nodes and edges
const nodes = reactive({
  elderly: { name: 'Elderly', color: '#333333', radius: 60 },
  bed: { name: 'Bed', color: '#FFB74D', radius: 50 },
  publicSpace: { name: 'Public space', color: '#FFB74D', radius: 50 },
  automaticBed: { name: 'Automatic\n adjust bed\n for elderly', color: '#7986CB', radius: 60 },
  newElderlyBed: { name: 'New elderly bed', color: '#7986CB', radius: 40 },
  bedroom: { name: 'Bedroom', color: '#FFB74D', radius: 40 },
  interiorDesign: { name: 'Interior\n design', color: '#FF7043', radius: 40 },
  architectureDesign: { name: 'Architecture design', color: '#FF7043', radius: 60 },
  product: { name: 'Product', color: '#FF7043', radius: 40 },
  tech: { name: 'Tech', color: '#FF7043', radius: 40 },
  space: { name: 'Space', color: '#7986CB', radius: 40 },
  futureCity: { name: 'Future city park\n for new generation of elderly', color: '#7986CB', radius: 60 },
  footpaths: { name: 'Footpaths\n for elderly\n with tools\n to better\n in self living', color: '#7986CB', radius: 60 },
})

const edges = reactive({
  edge1: { source: 'elderly', target: 'bed' },
  edge2: { source: 'elderly', target: 'publicSpace' },
  edge3: { source: 'bed', target: 'automaticBed' },
  edge4: { source: 'bed', target: 'newElderlyBed' },
  edge5: { source: 'bed', target: 'bedroom' },
  edge6: { source: 'bed', target: 'interiorDesign' },
  edge7: { source: 'interiorDesign', target: 'architectureDesign' },
  edge8: { source: 'interiorDesign', target: 'product' },
  edge9: { source: 'interiorDesign', target: 'tech' },
  edge10: { source: 'publicSpace', target: 'space' },
  edge11: { source: 'publicSpace', target: 'futureCity' },
  edge12: { source: 'publicSpace', target: 'footpaths' },
})

const layers = {
  // {layername}: {position}
  badge: 'nodes',
}

// Configuration for the graph
const configs = reactive(vNG.defineConfigs({
  view: {
    autoPanAndZoomOnLoad: 'fit-content',
    fitContentMargin: '10%',
    scalingObjects: false,
    minZoomLevel: 1.0,
    maxZoomLevel: 16,
    panEnabled: false,
    zoomEnabled: false,
  },
  node: {
    selectable: true,
    // draggable: false,
    normal: {
      type: 'circle',
      radius: (node: Node) => node.radius,
      color: (node: Node) => node.color,
    },
    hover: {
      color: '#1b1b1b',
    },
    label: {
      visible: true,
      text: (node: Node) => node.name,
      color: '#FFFFFF',
      fontSize: 14,
      direction: 'center',
    },
  },
  edge: {
    normal: {
      color: '#D9D9D9',
      width: 2,
    },
  },
}))

const eventHandlers: vNG.EventHandlers = {
  'node:click': ({ node }) => {
    // toggle
    console.log('node:click', node)
    nodes[node].active = !nodes[node].active
    console.log(node)
    value.value = node
  },
}
</script>

<style>
.graph {
  width: '100%';
  height: 700px;
}
</style>
