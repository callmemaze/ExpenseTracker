export default (state,action) => {
    let transactions;
    switch(action.type){
        case 'DELETE_TRANSACTION':
            transactions =  state.transactions.filter(transaction => transaction.id !== action.payload)
            localStorage.setItem('transactions',JSON.stringify(transactions))
            return{
                ...state,
                transactions
            }

        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state.transactions]
            localStorage.setItem('transactions',JSON.stringify(transactions))
            return{
            ...state,
            transactions
            }
        default:
            return state;
    }
}