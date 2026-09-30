import { GetterTree } from 'vuex'
import PurchaseOrderState from './PurchaseOrder'
import RootState from '@/store/RootState'

const getters: GetterTree<PurchaseOrderState, RootState> = {
  getList(state) {
    return state.list.orders
  },
  getListTotal(state) {
    return state.list.total
  },
  getCurrent(state) {
    return state.current
  },
}
export default getters;