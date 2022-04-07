import * as React from 'react';
import DasScreen from './DasScreen';
import CommonDash from "./CommonDash"


export default function Dashboard() {


  return (
  <>
  <CommonDash compo = {<DasScreen/>} />
  </>
  );
}