export default{
    getCartLength(state){
        return state.cartList.length
    },
    getCartList(state){
        return state.cartList
    },
    getCartTotalPrice(state){
        return state.cartList.filter((elem) => {
                    return elem.checked === true
                }).reduce((a,b) => {
                    return a + b.price * b.count
                },0)
    }
}