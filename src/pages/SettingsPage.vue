<template>
  <q-page class="">
    <div class="row">
      <div class="col">
        <q-btn @click="printAllDocs" label="print all db data" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn @click="resetDbData" label="delete db data" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import db from 'components/db'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const $router = useRouter()

    async function printAllDocs() {
      db.getAllDocs()
        .then((result) => {
          console.log(result)
        })
        .catch((err) => console.log(err))
    }

    async function resetDbData() {
      await db.resetDB()
      $router.push('/')
      console.log('push /')
    }

    return {
      printAllDocs,
      resetDbData,
    }
  },
})
</script>
