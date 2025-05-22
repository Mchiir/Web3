import { UserContext } from "./context/UserContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import GenerateLink from "./components/GenerateLink"
import NotFound from "./components/NotFound"
import Home from "./components/Home"
import { useState } from "react"


const App: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null)

  return (
      <UserContext.Provider value={{ address, setAddress }}>
        <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route path="/" element={<NotFound />} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/generate-link" element={<GenerateLink />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
      </UserContext.Provider>
  )
}

export default App
