export default{
    addCounter(state, payload){
        payload.count ++
    },
    addToCart(state,payload){
        state.cartList.push(payload)
    },
    cancelSelect(state){
        state.cartList.forEach(element => {
            element.checked = false
        });
    },
    selectAll(state){
        state.cartList.forEach(element => {
            element.checked = true
        })
    }
}