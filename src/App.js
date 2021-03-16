import './styles/style.css';
import { Balance } from './components/Balance';
import Header from './components/Header';
import Expenses from './components/Expenses'
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import {useSpeechContext} from "@speechly/react-client"
import {PushToTalkButton, PushToTalkButtonContainer} from '@speechly/react-ui'
import {Typography,Grid} from "@material-ui/core"
function App() {
  const {segment} = useSpeechContext()
  return (
    <>
      <Header/>
      <Balance/>
      <div className="inc-exp-container">
      <Expenses title = "Income"/>
      <Expenses title = "Expenses"/>
      </div>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && segment.words.map((w) => w.value).join(" ")}
        </Typography>
      </Grid>
      <TransactionList/>
      <AddTransaction/>
      <PushToTalkButtonContainer>
        <PushToTalkButton/>
      </PushToTalkButtonContainer>
    </>
  )
}

export default App;
