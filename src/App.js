import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'


function App() {

  //state Principal (en lugar de 1 state grande, lo divido en varias piezas)
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({})

  //lo que va entre corchetes en useEffect es que parte del state tiene que escuchar
  //el use effect para ejecutarse (se ejecuta cuando el comp esta listo o cuando hay cambios)
  useEffect(() => {
    //prevenir la ejecucion automatica
    if(ciudad === ''){
      return;
    }else{
    const consultarAPI = async () => {
    
      const appId = '82e3357b7cf4d402f4251d3b3de7c28d';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      //consultar la url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
  
   
    }
  
    consultarAPI();
}
  }, [ ciudad, pais ]);


  //funcion a pasar a formulario para tomar los datos
  const datosConsulta = datos => {
    //validar que ambos campos esten
    if(datos.ciudad === '' || datos.pais === '') {
      //un error
      guardarError(true);
      return;
    }
    //ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  

  //cargar un componente condicionalmente
  let componente;
  if(error){
    //hay un error, mostrarlo
    componente = <Error mensaje="Ambos campos son obligatorios" />
  } else if (resultado.cod === '404'){
    componente = <Error mensaje="La ciudad no existe en nuestro registro" />
  } else {
    //mostrar el clima
    componente = <Clima 
                  resultado={resultado}
                 />;
  }

  return (
    <div className="App">
      <Header
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta} 
              />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
