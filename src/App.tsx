import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import Home from './components/Home';
import Promovente from './components/Promovente';
import DatosRegistrales from './components/DatosRegistrales'
import DatosAclarar from './components/DatosAclarar'
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import VistaPrevia from './components/VistaPrevia'
import Acuse from './components/Acuse/AcuseVP'
import AcuseNVP from './components/Acuse/AcuseNVP'
import Titular from './components/titular'


function App() {
    return (
        <RecoilRoot>
            <Layout>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/aclaraciones">
                            <Route path="" element={<Home/>}/>
                            <Route path="promovente" element={<Promovente/>}/>
                            <Route path="datos-registrales" element={<DatosRegistrales/>}/>
                            <Route path="titular" element={<Titular/>}/>
                            <Route path="datos-aclarar" element={<DatosAclarar/>}/>
                            <Route path="vista-previa" element={<VistaPrevia/>}/>
                        </Route>
                        <Route path="/acuse">
                            <Route path="aclaracion" element={<Acuse/>}/>
                            <Route path="folio/:numeroFolio" element={<AcuseNVP/>}/>
                        </Route>
                        <Route path="*" element={<NotFound msg='Página NO encontrada.'/>} />
                    </Routes>
                </Router>
            </Layout>
        </RecoilRoot>
    );
}

export default App;
