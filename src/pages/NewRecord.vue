<template>
  <!-- <q-page class="q-pa-md q-gutter-md"> -->
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-tabs v-model="tab">
          <q-tab name="expense" label="支出" />
          <q-tab name="income" label="收入" />
          <q-tab name="trans" label="轉帳" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="expense">
            <ExpenseForm v-model="expenseData" />
          </q-tab-panel>

          <q-tab-panel name="income">
            <IncomeForm v-model="incomeData" />
          </q-tab-panel>

          <q-tab-panel name="trans">
            <TransForm v-model="incomeData" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <q-footer>
      <q-btn-group spread>
        <q-btn label="再記一筆" />
        <q-separator vertical dark />
        <q-btn @click="save" label="儲存" />
      </q-btn-group>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { date } from 'quasar'
import db from 'components/db'
// import VueInputCalculator from 'vue-input-calculator'
import ExpenseForm from 'components/ExpenseForm.vue'
import IncomeForm from 'src/components/IncomeForm.vue'
import TransForm from 'src/components/TransForm.vue'

export default defineComponent({
  name: 'NewRecord',
  components: { ExpenseForm, IncomeForm, TransForm },
  setup() {
    const $router = useRouter()
    const tab = ref('expense')

    const formattedDate = date.formatDate(Date.now(), 'YYYY-MM-DD')
    const expenseData = ref({
      amount: 0,
      date: formattedDate,
      category: '',
      subCate: '',
      account: '',
      remark: '',
    })
    const incomeData = ref({
      amount: 0,
      date: formattedDate,
      category: '',
      subCate: '',
      account: '',
      remark: '',
    })
    const transData = ref({
      amount: 0,
      fee: 0,
      date: formattedDate,
      source: '',
      dest: '',
      remark: '',
    })

    async function save() {
      let doc = {
        _id: Date.now().toString(),
        type: tab.value,
      }
      if (tab.value === 'expense') {
        Object.assign(doc, expenseData.value)
      } else if (tab.value === 'income') {
        Object.assign(doc, incomeData.value)
      } else if (tab.value === 'trans') {
        Object.assign(doc, transData.value)
      }
      await db.create(doc)
      $router.push('/')
      console.log('push /')
    }

    return {
      tab,
      expenseData,
      incomeData,
      save,
    }
  },
})
</script>
