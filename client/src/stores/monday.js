import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


const inventoryBoardColumns = {
  status: 'status',
  store: 'multi_selecti0j9cnxp',
  carType: 'single_selectdn7oazf',
  titleOrPayoff: 'single_select1h3ilkm',
  titleStatus: 'single_selecteuuhmw9',
  payoffAmount: 'numberi3tr3ou7',
  goodTillDate: 'datexdlnpy7n',
  lienHolder: 'short_textx0819yu8',
  perDiam: 'number9da8ds1t',
  notes: 'long_texthgdlm5pj',
  attachments: 'file30p9d1mi',
  priority: 'color_mm1rnnyt'
};

class InventoryItem {
  constructor(item) {
    this.uid = item.id
    this.submitBy = item.name
    this.status = item.column_values.find(val => val.id == inventoryBoardColumns.status).text
    this.store = item.column_values.find(val => val.id == inventoryBoardColumns.store).text
    this.carType = item.column_values.find(val => val.id == inventoryBoardColumns.carType).text
    this.titleOrPayoff = item.column_values.find(val => val.id == inventoryBoardColumns.titleOrPayoff).text
    this.titleStatus = item.column_values.find(val => val.id == inventoryBoardColumns.titleStatus).text
    this.payoffAmount = item.column_values.find(val => val.id == inventoryBoardColumns.payoffAmount).text
    this.goodTillDate = item.column_values.find(val => val.id == inventoryBoardColumns.goodTillDate).text
    this.lienHolder = item.column_values.find(val => val.id == inventoryBoardColumns.lienHolder).text
    this.perDiam = item.column_values.find(val => val.id == inventoryBoardColumns.perDiam).text
    this.notes = item.column_values.find(val => val.id == inventoryBoardColumns.notes).text
    this.attachments = item.column_values.find(val => val.id == inventoryBoardColumns.attachments).text
    this.priority = item.column_values.find(val => val.id == inventoryBoardColumns.priority).text
  }
}


export const useMondayStore = defineStore('monday', () => {
    const loading = ref(true)
    const allItems = ref([])

    const storeOptions = computed(() => {
        const storeNames = new Set()
        if(itemCount.value) {
            allItems.value.forEach(item => storeNames.add(item.store))
        }
        return storeNames
    })

    const itemCount = computed(() => {
        return allItems.value.length
    })

  async function getItems() {
    loading.value = true
    const response = await fetch("https://bad76-service-32093452-c0a7fb28.us.monday.app/get-items")
    .then(res => res.json())
    .catch(err => console.log("Item Load Error:", err))
    allItems.value = response.data.boards[0].items_page.items.map(item => new InventoryItem(item))
    loading.value = false
  }

  async function getItemsByStore(storeName) {
    const nameArr = storeName.split('-').map(txt => { 
        const text = String(txt)
        return text.charAt(0).toUpperCase() + text.slice(1)
    }).join(' ')
    return allItems.value.filter(item => item.store == nameArr)
  }

  return { loading, allItems, itemCount, storeOptions, getItems, getItemsByStore }
})