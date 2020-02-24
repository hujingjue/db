const bookStore={
    state:{
        id:'newbook',
        detailData:{}
    },
    mutations:{
        getType(state,payload){
            state.id=payload.id
        },
        getDetailData(state,payload){
            state.detailData=payload.detailData
        }
    }
}

export default bookStore