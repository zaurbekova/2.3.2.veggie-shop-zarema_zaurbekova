import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test-utils/render';
import { ProductCard } from './ProductCard';
import { CartProvider } from '../context/CartContext';
import type { Product } from '../types';

const mockProduct: Product = {
  id: 1,
  name: 'Broccoli',
  price: 120,
  image: 'https://example.com/broccoli.png',
  description: 'Fresh broccoli',
};

const renderCard = () =>
  render(
    <CartProvider>
      <ProductCard product={mockProduct} />
    </CartProvider>,
  );

describe('ProductCard', () => {
  it('отображает название, вес и цену товара', () => {
    renderCard();
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('1 kg')).toBeInTheDocument();
    expect(screen.getByText('$ 120')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('показывает изображение товара', () => {
    renderCard();
    const image = screen.getByRole('img', { name: 'Broccoli' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
  });

  it('увеличивает количество при клике на "+"', async () => {
    renderCard();
    const plusButton = screen.getByRole('button', { name: /увеличить количество/i });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('1');
    await userEvent.click(plusButton);
    expect(input.value).toBe('2');
  });

  it('уменьшает количество при клике на "-"', async () => {
    renderCard();
    const plusButton = screen.getByRole('button', { name: /увеличить количество/i });
    const minusButton = screen.getByRole('button', { name: /уменьшить количество/i });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(plusButton);
    await userEvent.click(plusButton);
    expect(input.value).toBe('3');
    await userEvent.click(minusButton);
    expect(input.value).toBe('2');
  });

  it('не уменьшает количество ниже 1', async () => {
    renderCard();
    const minusButton = screen.getByRole('button', { name: /уменьшить количество/i });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(minusButton);
    expect(input.value).toBe('1');
  });

  it('сбрасывает количество на 1 после "Add to cart"', async () => {
    renderCard();
    const plusButton = screen.getByRole('button', { name: /увеличить количество/i });
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(plusButton);
    await userEvent.click(plusButton);
    expect(input.value).toBe('3');
    await userEvent.click(addButton);
    expect(input.value).toBe('1');
  });
});
