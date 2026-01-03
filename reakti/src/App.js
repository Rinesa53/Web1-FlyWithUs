import Menu from './components/Menu.js';
import KushJemi from './components/KushJemi.js';
import About from './components/About.js';
import Stats from './components/Stats.js';
import Form from './components/Form.js';
import Footer from './components/Footer.js';

import './App.css'
import logo from './airplane-logo.png'

function App() {
  return (

<div>

     <Menu logo={logo} />

    <KushJemi /> 

    <About />

        <Stats />
        <Form />

    <Footer />
    </div>
  );
}

export default App;
