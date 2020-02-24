import axios from 'axios'

export const get=({url,params={}})=>{
    return axios({
        url,
        params
    })
   
}