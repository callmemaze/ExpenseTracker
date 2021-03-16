import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, {useState, useContext, useEffect} from 'react'
import {GlobalContext} from '../context/GlobalState'
import {incomeCategories, expenseCategories} from './constant/categories'
import {useSpeechContext} from "@speechly/react-client"
import SnackBar from './SnackBar'

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
  };

export const AddTransaction = () => {
    const {addTransaction} = useContext(GlobalContext)
    const {segment} = useSpeechContext()
    const [formData, setFormData] = useState(initialState);
    const [open, setOpen] = useState(false);
    const onSubmit = e => {
        e.preventDefault()
        addTransaction({...formData, amount : +formData.amount,id: Math.floor(Math.random() * 10000000)})
        setOpen(true)
    }
    const createTransaction = (e) => {
        if (Number.isNaN(Number(formData.amount)))return;
    
        if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
          setFormData({ ...formData, type: 'Income' });
        } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
          setFormData({ ...formData, type: 'Expense' });
        }
        addTransaction({ ...formData, amount: Number(formData.amount), id: Math.floor(Math.random() * 10000000) });
        setFormData(initialState);
        setOpen(true)
      };
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories
    useEffect(() => {
        if(segment) {
            if(segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expenses' })
            } else if(segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' })
            } else if(segment.isFinal && segment.intent.intent === 'create_transaction') {
                return onsubmit()
            } else if(segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState)
            } 

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount' :
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        setFormData({ ...formData, category });
                        break;
                    default:
                        break;
                }
            })
            if(segment.isFinal && formData.amount && formData.category && formData.type){
                createTransaction()
            }
        }
    },[segment])
  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
            <SnackBar open={open} setOpen={setOpen}></SnackBar>
            <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <MenuItem value="Income" >Income</MenuItem>
              <MenuItem value="Expenses">Expenses</MenuItem>
          </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className="form-control">
          <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}