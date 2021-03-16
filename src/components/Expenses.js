import React,{useContext} from 'react'
import '../styles/style.css'
import { GlobalContext } from '../context/GlobalState';
import useTransaction from '../Hooks/useTransaction'
import { Card,CardContent,CardHeader,Typography } from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2'
import useStyle from './style'

const Expenses = ({title}) => {
  const classes = useStyle()
  const { transactions } = useContext(GlobalContext);
  const {total, chartData} = useTransaction(title)
    return (
      <Card className={title === 'Income' ? classes.income : classes.expense}>
          <CardHeader title={title}/>
          <CardContent>
              <Typography variant="h5">${total}</Typography>
              <Doughnut data={chartData} height={100} width={200}/>
          </CardContent>
    </Card>
    )
}
  export default Expenses