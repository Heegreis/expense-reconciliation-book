<template>
  <q-page class="">
    <div class="row">
      <div class="col">
        <q-btn
          to="new-record"
          color="white"
          text-color="black"
          label="記一筆"
        />
      </div>
      <div class="col-3">
        <q-btn color="white" text-color="black" label="帳戶" />
      </div>
    </div>
    <q-footer>
      <q-btn-group spread>
        <q-btn label="First" icon="timeline" />
        <q-btn label="Second" icon="visibility" />
        <q-btn label="Third" icon="update" />
      </q-btn-group>
    </q-footer>
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
