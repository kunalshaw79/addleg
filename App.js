import './App.css';
import '../src/components/component.css'
import { getDatabase, ref, set } from "firebase/database";
import {initializeApp} from 'firebase/app'
import { useState } from 'react'

function App() {
  const [data, setData] = useState({
    lot: "",
    position: "",
    option_type: "",
    expiry: "",
    strike_criteria: "",
    strike_type: "Strike type",
    momentum:"",
    trial_sl:""
  });
  const firebaseConfig = {
    apiKey: "AIzaSyC2gKkiu3H1V_pDPQ8b-H6O07goG1unFdo",
    authDomain: "backtest-1fa09.firebaseapp.com",
    projectId: "backtest-1fa09",
    storageBucket: "backtest-1fa09.appspot.com",
    messagingSenderId: "55457760291",
    appId: "1:55457760291:web:b51b0e87c5c66333bf5d96",
    measurementId: "G-4VNMBV0QEY"
  };
  
  // initiliazing data base
   initializeApp(firebaseConfig);
  const final_submit=()=>{
    saveindatabase()
    console.log('your data is saved in data base')
  }
  const saveindatabase=()=>{
    const state =`{
      'lot': "${data.lot}",
      'position': "${data.position}",
      'option_type': "${data.option_type}",
      'expiry': "${data.expiry}",
      'strike_criteria': "${data.strike_criteria}",
      'strike_type': "${data.strike_type}",
      'momentum':"${data.momentum}",
      'trial_sl':"${data.trial_sl}"
    }`
    const db = getDatabase();
  set(ref(db, 'users/'),state);
    console.log('DATA SAVED');
  }
  const submit = () => {
    console.log('submiting the form ')
    document.getElementById("leg").style.visibility = "visible"
  }
  const cancel = () => {
    console.log('no function is defined now')
    window.location.reload()
  }
  const remove=()=>{
    document.getElementById("leg").style.visibility = "hidden"
  }
  const setValues = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data)


  }
  const strike = () => {
    if (data.strike_criteria === 'straddle width') {
      document.getElementById('striketyp').innerHTML = `
      <b>Strike type</b> <br/>
      <select required name="position" className="select" onChange={setValues} id="posi">
        <option value="buy">+</option>
        <option value="sell">-</option>
      </select>
      (<input id="lotin" type="number"/> x Atm straddle price)
      `
      document.getElementById('striketyp2').innerHTML = `
      <select required name="position" className="select" onChange={setValues} id="posi">
        <option value="buy">+</option>
        <option value="sell">-</option>
      </select>
      (<input id="lotin" type="number"/> x Atm straddle price)
      `
    }
    if (data.strike_criteria === 'closet premium') {
      document.getElementById('striketyp').innerHTML = 'closet'
      document.getElementById('striketyp2').innerHTML = 'closet'
    }
    if (data.strike_criteria === 'Premium range') {
      document.getElementById('striketyp').innerHTML = 'premium'
      document.getElementById('striketyp2').innerHTML = 'premium'
    }
    if (data.strike_criteria === 'Strike type') {
      document.getElementById('striketyp').innerHTML = `
      <select required name="strike_type" onChange={setValues} className="select1">
      <option value='null'>select</option>
        <option value="ATM">ATM</option>
        <option value="ITM1">ITM1</option>
        <option value="ITM2">ITM2</option>
        <option value="ITM3">ITM3</option>
      </select>
      `
    }
  }
  const onChangeValue = (e) => {
    changeDom(e.currentTarget.value)
  }
  const changeDom = (value) => {
    if (value === 'futures') {
      console.log('future hai ')
    }
    else {
      console.log('options hai')
    }
    console.log(data.strike_criteria)

  }
  return (
    <>
      <div id="addleg">
        <div id="row1" className="leg_row">
          <div className="cont"><b>select segments</b></div>
          <div className="cont">
            <div className="switch-field">
              <input type="radio" onClick={onChangeValue} id="radio-one" name="switch-one" value='options' checked />
              <label htmlFor="radio-one">Options</label>
              <input type="radio" onClick={onChangeValue} id="radio-two" name="switch-one" value='futures' />
              <label htmlFor="radio-two">Futures</label>
            </div>
          </div>
        </div>
        <div id="row2" className="leg_row">
          <div id="totallot"><b>total lot</b><br /><input required name='lot' id="lotin" type="number" onChange={setValues} /></div>
          <div id="position"><b>position</b><br />
            <select required name="position" className="select" onChange={setValues} id="posi">
              <option value="null">position</option>
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>
          </div>
          <div id="optiontype"><b>option type</b><br />
            <select required name="option_type" onChange={setValues} className="select">
              <option value="null">choose</option>
              <option value="call">call</option>
              <option value="put">put</option>
            </select></div>
          <div id="expiry"><b>expiry</b><br />
            <select required name="expiry" onChange={setValues} className="select1">
              <option value="null">select expiry</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>
          </div>
          <div id="strike"><b>select strike criteria</b><br />
            <select required onClick={strike} name="strike_criteria" onChange={setValues} className="select1">
              <option selected value="Strike type">Strike type</option>
              <option value="Premium range">Premium range</option>
              <option value="closet premium">closet premium</option>
              <option value="straddle width">straddle width</option>
            </select>
          </div>

          <div id="striketyp"> <b>strike type</b><br />

          </div>
        </div>
        <div id="row3" className="leg_row">
          <button onClick={submit} className="addleg">add leg</button>
          <button onClick={cancel} className="cancel">cancel</button>
        </div>
      </div>
      <div id="leg">
        <div className="row_leg">
        <input required value={data.lot} name='lot' id="lotin2" type="number" onChange={setValues} />
        <select required value={data.position} name="position" className="select3" onChange={setValues} id="posi2">
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>
            <select value={data.option_type} required name="option_type" onChange={setValues} className="select3">
              <option value="null">choose</option>
              <option value="call">call</option>
              <option value="put">put</option>
            </select>
            <select required value={data.expiry} name="expiry" onChange={setValues} className="select3">
              <option value="null">select expiry</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>
            <select required value={data.strike_criteria} onClick={strike} name="strike_criteria" onChange={setValues} className="select3">
              <option selected value="Strike type">Strike type</option>
              <option value="Premium range">Premium range</option>
              <option value="closet premium">closet premium</option>
              <option value="straddle width">straddle width</option>
            </select>
            <div id="striketyp2"> <b>strike type</b><br />
            </div>
        </div>
        <div className="row_leg">
          <div>
         <b> simple momentum </b> <br />
          <select required name="momentum" onChange={setValues} className="select3">
              <option value="null">choose</option>
              <option value="points up">points up</option>
              <option value="points down">points down</option>
              <option value="percentage up">percentage up</option>
              <option value="percentage down">percentage down</option>
            </select>
            </div>
            <div>
          <b> trial sl </b><br />
          <select required name="trial_sl" onChange={setValues} className="select3">
              <option value="null">choose</option>
              <option value="call">points</option>
              <option value="put">percentage</option>
            </select>
            </div>
        </div>
        <div className="row_leg">
          <button onClick={final_submit} id="submit">submit</button>
          <button onClick={remove} id="remove">Remove</button>
        </div>
      </div>
    </>
  );
}

export default App;
