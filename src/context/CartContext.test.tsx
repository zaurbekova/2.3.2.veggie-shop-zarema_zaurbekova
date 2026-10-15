import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test-utils/render';
import { CartProvider, useCart } from './CartContext';
import type { Product } from '../types';

const productA: Product = {
  id: 1,
  name: 'Broccoli',
  price: 120,
  image: 'a.png',
  description: '',
};

const productB: Product = {
  id: 2,
  name: 'Carrot',
  price: 82,
  image: 'b.png',
  description: '',
};

const TestComponent = () => {
  const { state, dispatch, totalCount, totalPrice } = useCart();

  return (
    <div>
      <div data-testid="count">{totalCount}</div>
      <div data-testid="price">{totalPrice}</div>
      <div data-testid="items">{state.items.length}</div>
      <button
        onClick={() => dispatch({ type: 'ADD', product: productA, quantity: 2 })}
      >
        add A x2
      </button>
      <button
        onClick={() => dispatch({ type: 'ADD', product: productB, quantity: 1 })}
      >
        add B x1
      </button>
      <button
        onClick={() => dispatch({ type: 'REMOVE', id: productA.id })}
      >
        remove A
      </button>
      <button
        onClick={() =>
          dispatch({ type: 'UPDATE_QTY', id: productB.id, quantity: 5 })
        }
      >
        set B qty 5
      </button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>,
  );

describe('CartContext', () => {
  it('изначально корзина пуста', () => {
    renderWithProvider();

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('price')).toHaveTextContent('0');
    expect(screen.getByTestId('items')).toHaveTextContent('0');
  });

  it('добавляет товар и считает итоговую стоимость', async () => {
    renderWithProvider();

    await userEvent.click(screen.getByText('add A x2'));

    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('price')).toHaveTextContent('240');
    expect(screen.getByTestId('items')).toHaveTextContent('1');
  });

  it('суммирует несколько разных товаров', async () => {
    renderWithProvider();

    await userEvent.click(screen.getByText('add A x2'));
    await userEvent.click(screen.getByText('add B x1'));

    expect(screen.getByTestId('count')).toHaveTextContent('3');
    expect(screen.getByTestId('price')).toHaveTextContent('322');
    expect(screen.getByTestId('items')).toHaveTextContent('2');
  });

  it('увеличивает количество при повторном добавлении того же товара', async () => {
    renderWithProvider();

    await userEvent.click(screen.getByText('add A x2'));
    await userEvent.click(screen.getByText('add A x2'));

    expect(screen.getByTestId('count')).toHaveTextContent('4');
    expect(screen.getByTestId('price')).toHaveTextContent('480');
    expect(screen.getByTestId('items')).toHaveTextContent('1');
  });

  it('удаляет товар из корзины', async () => {
    renderWithProvider();

    await userEvent.click(screen.getByText('add A x2'));
    await userEvent.click(screen.getByText('add B x1'));
    expect(screen.getByTestId('items')).toHaveTextContent('2');

    await userEvent.click(screen.getByText('remove A'));

    expect(screen.getByTestId('items')).toHaveTextContent('1');
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('price')).toHaveTextContent('82');
  });

  it('обновляет количество товара через UPDATE_QTY', async () => {
    renderWithProvider();

    await userEvent.click(screen.getByText('add B x1'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    await userEvent.click(screen.getByText('set B qty 5'));
    expect(screen.getByTestId('count')).toHaveTextContent('5');
    expect(screen.getByTestId('price')).toHaveTextContent('410');
  });
});
