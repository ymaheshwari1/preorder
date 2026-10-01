import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import PurchaseOrderState from './PurchaseOrder'
import * as types from './mutation-types'
import { PurchaseOrderService } from '@/services/PurchaseOrderService'
import store from '@/store'

const actions: ActionTree<PurchaseOrderState, RootState> = {
  async fetchFutureInventory({ commit }, params) {
    const productIds: Array<string> = [];
    const facilityIds: Array<string> = [];
    const orders: any[] = [];

    try {
      const resp = await PurchaseOrderService.fetchFutureInventory(params);
      if(resp.data?.futureInventoryItems?.length) {
        resp.data.futureInventoryItems.reduce((ords: any, order: any) => {
          if(!ords[order.externalId]) {
            ords[order.externalId] = {
              externalId: order.externalId,
              facilityId: order.facilityId,
              promiseDate: order.promiseDate,
              productStoreId: order.productStoreId,
              createdStamp: order.createdStamp,
              lastUpdatedStamp: order.lastUpdatedStamp,
              shipments: [],
              items: []
            }
            orders.push(ords[order.externalId])
          }
          if(order.shipmentExternalId) {
            ords[order.externalId]["shipments"].push(order)
          } else {
            ords[order.externalId]["items"].push(order)
          }

          productIds.push(order.productId)
          if(order.facilityId) facilityIds.push(order.facilityId)
          return ords
        }, {})

        store.dispatch("product/fetchProductsMaarg", { productIds })
        store.dispatch("util/fetchFacilityDetails", [...new Set(facilityIds)])
      }
    } catch(err) {
      console.error("Failed to fetch future inventory details", err)
    }
    commit(types.PURCHASEORDER_LIST_UPDATED, { orders, total: orders.length })
  },

  async fetchFutureInventoryDetails({ commit }, id) {
    try {
      const resp = await PurchaseOrderService.fetchFutureInventoryDetail(id);
      if(resp.data?.futureInventoryItemGroups?.length) {
        const productIds = resp.data.futureInventoryItemGroups[0].items.map((item: any) => item.productId)
        store.dispatch("product/fetchProductsMaarg", {productIds})

        commit(types.PURCHASEORDER_CURRENT_UPDATED, resp.data.futureInventoryItemGroups[0])
      }
    } catch(err) {
      console.error("Failed to fetch future inventory details", err)
    }
  }
}

export default actions;