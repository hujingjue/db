const Cart = {
    state: {
        list: [],
        arr: [],
        all: false,
        goodsAll: false,
        allPrice:0
    },
    mutations: {
        sendData(state, payload) {
            if (state.list.length!==0) {
                let res=state.list.find((value) => {
                    return value.subject_id === payload.list.subject_id
                })
                if(res){
                    res.count+=1
                }else{
                    payload.list.count = 1
                    state.list.push(payload.list)
                    state.arr.push(false)
                }
            } else {
                payload.list.count = 1
                state.list.push(payload.list)
                state.arr.push(false)
            }
        }
    }
}

export default Cart