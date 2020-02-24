const bookList={
    state:{
        position:0,
        page:1,
        sign:false
    },
    mutations:{
        getBookListPosition(state,payload){
            state.position=payload.position
            state.page=payload.page
        }
    }
}

export {
    bookList
}