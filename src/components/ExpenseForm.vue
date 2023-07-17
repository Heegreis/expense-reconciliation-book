<script setup>
import { ref, computed, watch } from 'vue'
import VueInputCalculator from 'vue-input-calculator'
import db from 'components/db'

const props = defineProps({
  modelValue: {
    type: Object,
    validator(value) {
      // keys in the object
      if (typeof value !== 'object') return false
      const keyFormat = {
        amount: 0,
        date: '',
        category: '',
        subCate: '',
        account: '',
        remark: '',
      }
      const correctKeys = Object.keys(keyFormat).sort()
      const valueKeys = Object.keys(value).sort()
      if (JSON.stringify(correctKeys) !== JSON.stringify(valueKeys))
        return false
      // TODO: check type of all values type in the object
      return true
    },
  },
})
// 只用一個 prop data，拆成多個 Middle 餵給多個 input
const emit = defineEmits(['update:modelValue'])

function setMiddleValue(valueName) {
  return computed({
    get() {
      return props.modelValue[valueName]
    },
    set(newValue) {
      const newModelValue = props.modelValue
      newModelValue[valueName] = newValue
      return emit('update:modelValue', newModelValue)
    },
  })
}

const amountMiddle = setMiddleValue('amount')
const dateMiddle = setMiddleValue('date')
const categoryMiddle = setMiddleValue('category')
const subCateMiddle = setMiddleValue('subCate')
const accountMiddle = setMiddleValue('account')
const remarkMiddle = setMiddleValue('remark')

const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

const categoryOptions = ref([])
let subCateOptions = []
db.read('expense-category').then(function (result) {
  const expenseCategory = result.options

  categoryOptions.value = Array.from(expenseCategory.keys())
  categoryMiddle.value = categoryOptions.value[0]

  subCateOptions = computed(() => {
    return expenseCategory.get(categoryMiddle.value)
  })
  subCateMiddle.value = subCateOptions.value[0]
  watch(subCateOptions, (newSubCateOptions) => {
    subCateMiddle.value = newSubCateOptions[0]
  })
})

const accountOptions = ref([])
db.getAccounts().then(function (result) {
  let accountTypeArray = []
  result.docs.forEach((doc) => {
    accountTypeArray.push(doc.name)
  })
  accountOptions.value = accountTypeArray
  accountMiddle.value = accountOptions.value[0]
})
</script>

<template>
  <div class="row">
    <div class="col">
      <VueInputCalculator enableKeyboard v-model="amountMiddle">
        <q-input v-model.number="amountMiddle" type="number" label="金額" />
      </VueInputCalculator>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-input v-model="dateMiddle" type="date" label="日期" />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-select
        v-model="categoryMiddle"
        :options="categoryOptions"
        label="分類"
      />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-select
        v-model="subCateMiddle"
        :options="subCateOptions"
        label="子分類"
      />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-select
        v-model="accountMiddle"
        :options="accountOptions"
        label="帳戶"
      />
      <!-- 要撈資料庫的選項，如果餵入''就去資料庫找預設選項 -->
      <!-- 但暫時沒資料庫，先完善下面的選項 -->
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-input v-model="remarkMiddle" autogrow label="備註"></q-input>
    </div>
  </div>
  <!-- amount: 0, -->
  <!-- date: '', -->
  <!-- category: '', -->
  <!-- subCate: '', -->
  <!-- account: '', -->
  <!-- remark: '', -->
</template>
