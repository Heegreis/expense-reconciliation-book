<script setup>
import { computed } from 'vue'
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

const amountMiddle = computed({
  get() {
    return props.modelValue['amount']
  },
  set(newValue) {
    const newModelValue = props.modelValue
    newModelValue['amount'] = Number(newValue)
    return emit('update:modelValue', newModelValue)
  },
})
const dateMiddle = computed({
  get() {
    return props.modelValue['date']
  },
  set(newValue) {
    const newModelValue = props.modelValue
    newModelValue['date'] = newValue
    return emit('update:modelValue', newModelValue)
  },
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
      <q-select v-model="model" :options="options" label="分類" />
      <!-- 要撈資料庫的選項，如果餵入''就去資料庫找預設選項 -->
      <!-- 但暫時沒資料庫，先完善下面的選項 -->
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-select v-model="model" :options="options" label="子分類" />
      <!-- 要撈資料庫的選項，如果餵入''就去資料庫找預設選項 -->
      <!-- 但暫時沒資料庫，先完善下面的選項 -->
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-select v-model="model" :options="options" label="帳戶" />
      <!-- 要撈資料庫的選項，如果餵入''就去資料庫找預設選項 -->
      <!-- 但暫時沒資料庫，先完善下面的選項 -->
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-input v-model="text" autogrow label="備註"></q-input>
    </div>
  </div>
  <!-- amount: 0, -->
  <!-- date: '', -->
  <!-- category: '', -->
  <!-- subCate: '', -->
  <!-- account: '', -->
  <!-- remark: '', -->
</template>
