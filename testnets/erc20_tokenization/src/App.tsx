import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import GenerateLink from "./components/GenerateLink"
import NotFound from "./components/NotFound"
import Home from "./components/Home"


function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/generate-link" element={<GenerateLink />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
