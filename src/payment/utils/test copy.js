// App.js
import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  // const userAgent = useState(navigator.userAgent); // Obtener el User-Agent

  const login = async () => {
    try {
        //llamamos a login
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ userAgent })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);  // Muestra el mensaje de éxito
      } else {
        setMessage(data.message);  // Muestra el mensaje de error
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setMessage('Hubo un error al intentar hacer login.');
    }
  };

  const protectedRequest = async () => {
    try {
      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        credentials: 'include' // Para enviar cookies (el token)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);  // Muestra el mensaje de éxito
      } else {
        setMessage(data.message);  // Muestra el mensaje de error
      }
    } catch (error) {
      console.error("Error en la solicitud protegida:", error);
      setMessage('Hubo un error al intentar acceder a la página protegida.');
    }
  };

  return (
    <div className="App">
      <h1>Autenticación con JWT y User-Agent</h1>

      <button onClick={login}>Login</button>
      <button onClick={protectedRequest}>Acceder a página protegida</button>

      <p>{message}</p>
    </div>
  );
}

export default App;