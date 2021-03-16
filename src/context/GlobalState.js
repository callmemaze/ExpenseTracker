import React,{createContext,useReducer} from 'react'
import ContextReducer from './ContextReducer'
const initialState = //JSON.parse(localStorage.getItem('transactions')) || 
{
    transactions: [
    ]
}
export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(ContextReducer, initialState);
    
    function deleteTransaction(id){
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id,
        })
    }
    function addTransaction(transaction){
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
        })
    }
    const balance = state.transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);
    return (
        <GlobalContext.Provider value={{transactions:state.transactions,balance,deleteTransaction,addTransaction}}>
            {children}
        </GlobalContext.Provider>
    )
}

    
