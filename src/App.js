
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/Notestate';
import CreateNotes from './components/CreateNotes';
import Editnotes from './components/Editnotes';


function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route>
              <Route exact path="home" element={<Home />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="createnote" element={<CreateNotes/>} />
              <Route exact path="editnote/:id" element={<Editnotes/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
