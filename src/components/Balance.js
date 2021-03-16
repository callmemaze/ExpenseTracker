import React, { useContext } from 'react';
import {GlobalContext} from '../context/GlobalState'
//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Balance = () => {
  const { balance } = useContext(GlobalContext);
  
  //const total = transactions.reduce((acc, currVal) => (currVal.type === 'Income' ? acc + currVal.amount : acc - currVal.amount), 0)
  return (
    <>
      <h4>Your Total Balance</h4>
    <h1>{moneyFormatter(balance)}</h1>
    </>
  )
}