import { useState } from 'react'
import MainContent from './components/MainContent'
import {Container} from "@mui/material"
import "./App.css"
function App() {
  return (
  <>
    <div style={{display:"flex", width:"100vw"}}>
       <Container  maxWidth="xl">
        <MainContent/>
        </Container>
    </div>
  </>
)
}

export default App
