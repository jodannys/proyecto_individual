// Importar las funciones y componentes necesarios para las pruebas
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // Suponiendo que App es tu componente principal

// Definir una prueba
test('clicking the button triggers a specific action', () => {
  // Renderizar el componente que se va a probar
  render(<App />);

  // Encontrar el botón que se va a clickear
  const buttonElement = screen.getByRole('button', { name: /Click me/i });

  // Simular un clic en el botón
  fireEvent.click(buttonElement);

  // Verificar que después de clickear el botón, se muestre el texto esperado
  const outputText = screen.getByText(/Button clicked/i);
  expect(outputText).toBeInTheDocument();
});
