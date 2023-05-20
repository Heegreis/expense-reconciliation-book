/**
 * @typedef {Object} Account
 * @property {string} _id - timestamp string.
 * @property {string} type - Should be 'account'.
 * @property {string} accountType - 'cash', 'assests', 'value card', 'liabilities'.
 * @property {string} name - Account name.
 * @property {number} init - Account init amount.
 * @property {number} rate - Exchange Rate.
 * @property {string} remark - .
 */

/**
 * @typedef {Object} ExpenseCategory
 * @property {string} _id - Should be 'expense-category'.
 * @property {Object} options - tree of category and subCate.
 */

/**
 * @typedef {Object} Expense
 * @property {string} _id - timestamp string.
 * @property {string} type - Should be 'expense'.
 * @property {number} amount - Expense amount.
 * @property {Date} date - .
 * @property {string} category - .
 * @property {string} subCate - .
 * @property {number} account - _id of Account.
 * @property {string} remark - .
 */

/**
 * @typedef {Object} IncomeCategory
 * @property {string} _id - Should be 'income-category'.
 * @property {Object} options - tree of category and subCate.
 */

/**
 * @typedef {Object} Income
 * @property {string} _id - timestamp string.
 * @property {string} type - Should be 'income'.
 * @property {number} amount - Income amount.
 * @property {Date} date - .
 * @property {string} category - .
 * @property {string} subCate - .
 * @property {number} account - _id of Account.
 * @property {string} remark - .
 */

/**
 * @typedef {Object} Trans
 * @property {string} _id - timestamp string.
 * @property {string} type - Should be 'trans'.
 * @property {number} amount - Trans amount.
 * @property {number} fee - Trans fee.
 * @property {Date} date - .
 * @property {number} source - _id of source account.
 * @property {number} dest - _id of dest account.
 * @property {string} remark - .
 */

/**
 * @typedef {Object} Split
 * @property {string} _id - timestamp string.
 * @property {string} type - Should be 'split'.
 * @property {number} amount - Trans amount.
 * @property {Date} date - .
 * @property {number} account - _id of account.
 * @property {Array[number]} subRecord - list of _id of record.
 * @property {string} remark - .
 */

// export default {}

// export {}
