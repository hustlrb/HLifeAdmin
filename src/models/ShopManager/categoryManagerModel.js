/**
 * Created by lilu on 2017/2/28.
 */
import {parse} from 'qs'
import {getShopCategoryList,getShopTagList,createShopCategory,updateShopCategory,createShopTag,updateShopTag,updateChoosenCategory} from '../../services/ShopManager/CategoryManager'

export default {
  namespace: 'shopCategoryManager',
  state:{
    categoryList:[],
    tagList:[],
    loading: false,
    categoryPool:[],
    categoryChoosenPool:[],
  },
  subscriptions:{

  },
  effects:{
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const category = yield call(getShopCategoryList, parse(payload))
      const tag = yield call(getShopTagList,parse(payload))
      if (category.success&&tag.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            categoryList: category.categoryList,
            tagList: tag.tagList
          }
        })
      }
    },
    *submitChoosenCategory({payload}, {call, put}) {
      yield call(updateChoosenCategory, parse(payload))
      yield put({
        type:'query',
      })
    }
    ,
    *addChoosenCategory({payload},{call,put}){

      },
    *tagcreate({payload}, {call, put}){
      yield put({type: 'showLoading'})
      const tag = yield call(createShopTag, parse(payload))
      if (tag.success) {
        yield put({
          type: 'query',

        })
      }
      },
    *create ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const category = yield call(createShopCategory, parse(payload))
      if (category.success) {
        yield put({
          type: 'query',

        })
      }
    },
    *update ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const category = yield call(updateShopCategory, parse(payload))
      if (category.success) {
        yield put({
          type: 'query',

        })
      }
    },
    *tagupdate ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const category = yield call(updateShopTag, parse(payload))
      if (category.success) {
        yield put({
          type: 'query',

        })
      }
    }
  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {categoryList,tagList} = action.payload

      return {
        ...state,categoryList:categoryList,tagList:tagList
      }
    },
    queryPoolSuccess(state,action){
      let {categoryPool,categoryChoosenPool} = action.payload
      return {
        ...state,categoryPool:categoryPool,categoryChoosenPool:categoryChoosenPool
      }
    }
  }
}