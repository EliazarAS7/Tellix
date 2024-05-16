// App.js
import React from 'react';
import Preload from '../views/preload';

function App() {
  const questions = [
    {
      question: '¿Cómo puedo aprender React?',
      answers: ['Tomando cursos online', 'Estudiando documentación oficial', 'Ambas opciones'],
    },
    {
      question: '¿Qué es JSX?',
      answers: ['Es una extensión de JavaScript', 'Es un framework de React', 'Es un lenguaje de programación'],
    },
    // Agrega más preguntas aquí
  ];

  return (
    <div className="App">
      {questions.map((q, i) => (
        <Preload key={i} {...q} />
      ))}
    </div>
  );
}

export default App;
