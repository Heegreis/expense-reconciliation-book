<template>
  <q-page class="flex justify-around">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import db from 'components/db'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    db.setInitData()
  },
})
</script>
