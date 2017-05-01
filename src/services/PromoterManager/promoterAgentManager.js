/**
 * Created by lilu on 2017/4/1.
 */
import AV from 'leancloud-storage'


export async function fetchPromoterList(payload) {
  try {
     console.log('===========+>hello=======+>',payload)

    let promoterList = await AV.Cloud.run('promoterFetchPromoter', {...payload,limit:100})

    // console.log('hello=======+>',commissionCof.config)
    return {
      success: true, promoterList: promoterList.promoters
    }
  } catch (err) {
    return {success: false}
  }
}

export async function getPromoterInfoById(payload){
  try{
    let promoterDetail=await AV.Cloud.run('promoterGetPromoterDetail',payload)
    // console.log('promoterDetail',promoterDetail,payload)
    return{success:true,promoterDetail:promoterDetail}
  }catch (err){
    return{success:false}
  }
}




export async function fetchAgentList(payload) {
  try {
    // console.log('===========+>hello=======+>')

    let promoterList = await AV.Cloud.run('promoterGetAgent', {...payload,limit:100})

    // console.log('hello=======+>',promoterList.promoters)
    return {
      success: true, promoterList: promoterList.promoters
    }
  } catch (err) {
    return {success: false}
  }
}

export async function agentSet(payload) {
  try {
    // console.log('===========+>hello=======+>',payload)
    let agent = {
      promoterId: payload.promoterId,
      identity: payload.identity,
      province: payload.identityArea[1],
      city: payload.identityArea[2],
      district: payload.identityArea[3]
    }
    // console.log('===========+>hello=======+>',agent)

    await AV.Cloud.run('promoterSetAgent', agent)

    // console.log('hello=======+>',commissionCof.config)
    return {
      success: true
    }
  } catch (err) {
    return {success: false}
  }
}
