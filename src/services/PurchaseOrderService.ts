import { apiClient } from '@/adapter';
import store from '@/store';

const fetchFutureInventory = async (params: any): Promise<any> => {
  const omstoken = store.getters['user/getUserToken'];
  const baseURL = store.getters['user/getMaargBaseUrl'];

  return await apiClient({
    url: "oms/futureInventory",
    method: "GET",
    baseURL,
    params,
    headers: {
      "Authorization": "Bearer " + omstoken,
      "Content-Type": "application/json"
    }
  });
}

const fetchFutureInventoryDetail = async(id: string): Promise<any> => {
  const omstoken = store.getters['user/getUserToken'];
  const baseURL = store.getters['user/getMaargBaseUrl'];

  return await apiClient({
    url: "oms/futureInventoryGroups",
    method: "GET",
    params: {
      externalId: id
    },
    baseURL,
    headers: {
      "Authorization": "Bearer " + omstoken,
      "Content-Type": "application/json"
    }
  });
}

const fetchProducts = async(payload: any): Promise<any> => {
  const omstoken = store.getters['user/getUserToken'];
  const baseURL = store.getters['user/getMaargBaseUrl'];

  return await apiClient({
    url: "admin/runSolrQuery",
    data: payload,
    method: "POST",
    baseURL,
    headers: {
      "Authorization": "Bearer " + omstoken,
      "Content-Type": "application/json"
    }
  });
}

export const PurchaseOrderService = {
  fetchFutureInventory,
  fetchFutureInventoryDetail,
  fetchProducts
}