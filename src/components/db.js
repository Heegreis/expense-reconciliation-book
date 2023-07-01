import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)

let db = new PouchDB('expense-reconciliation-book')

async function setInitData() {
  // set 現金 Account
  await db
    .createIndex({
      index: { fields: ['type'] },
    })
    .then(function () {
      db.find({
        selector: { type: 'account' },
      }).then(function (result) {
        if (result.docs.length === 0) {
          db.put({
            _id: Date.now().toString(),
            type: 'account',
            accountType: 'cash',
            name: '現金',
            init: 0,
            rate: 1,
            remark: '',
          }).catch(function (err) {
            console.log(err)
          })
        }
      })
    })
    .catch(function (err) {
      console.log(err)
    })
  // set expense-category
  await db.get('expense-category').catch(function (err) {
    if (err.name === 'not_found') {
      const options = new Map([
        [
          '食品酒水',
          ['早餐', '午餐', '晚餐', '菸酒茶飲料', '水果零食', '食材'],
        ],
        ['居家物業', ['日常用品', '水電瓦斯', '房租房貸']],
        [
          '行車交通',
          [
            '公共交通費',
            '計程車費',
            '汽機車加油費',
            '火車飛機費',
            '汽機車維修費',
            '停車費',
          ],
        ],
        ['交流通訊', ['電話費', '手機費', '網路費', '有線電視費']],
        [
          '休閒娛樂',
          [
            '運動健身',
            '朋友聚餐',
            '休閒娛樂',
            '寵物寶貝',
            '旅遊度假',
            '奢侈敗家',
            '直播訂閱',
          ],
        ],
        ['進修學習', ['書報雜誌', '上課進修', '網上學習', '其他書籍']],
        ['人情往來', ['送禮請客', '尊親費用', '慈善捐款']],
        [
          '醫療保健',
          [
            '生病醫療',
            '勞健保費',
            '保險費用',
            '健康食品',
            '美容養生',
            '健康檢查',
            '健康用品',
          ],
        ],
        [
          '金融保險',
          ['銀行手續', '投資損益', '分期付款', '稅捐支出', '賠償罰款'],
        ],
        [
          '其他雜項',
          [
            '其他支出',
            '遺失拾獲',
            '呆帳遺失',
            '補貼家用',
            '工作相關',
            '網站管理',
          ],
        ],
      ])
      db.put({
        _id: 'expense-category',
        options: options,
      }).catch(function (err) {
        console.log(err)
      })
    }
  })
  // set income-category
  await db.get('income-category').catch(function (err) {
    if (err.name === 'not_found') {
      const options = new Map([
        [
          '工作收入',
          [
            '薪水收入',
            '利息收入',
            '兼職收入',
            '獎金收入',
            '水果零食',
            '差旅費',
          ],
        ],
        [
          '其他收入',
          [
            '禮金收入',
            '意外收入',
            '投資收入',
            '呆帳落差',
            '紅利回饋',
            '家人資助',
          ],
        ],
      ])
      db.put({
        _id: 'income-category',
        options: options,
      }).catch(function (err) {
        console.log(err)
      })
    }
  })
}

function create(doc) {
  return db.post(doc)
}

function read(id) {
  return db.get(id)
}

function update(data) {
  return db.put(data)
}

function deleteItem(id, rev) {
  return db.remove(id, rev)
}

async function getAllDocs() {
  return db
    .allDocs({
      include_docs: true,
      attachments: true,
    })
    .then(function (result) {
      return result
    })
    .catch(function (err) {
      console.log(err)
    })
}

async function resetDB() {
  try {
    await db.destroy()
    console.log('database destroyed')
    db = new PouchDB('expense-reconciliation-book')
    console.log('database reset')
  } catch (err) {
    console.log('error occurred')
  }
}

export default {
  setInitData,
  create,
  read,
  update,
  deleteItem,
  getAllDocs,
  resetDB,
}
