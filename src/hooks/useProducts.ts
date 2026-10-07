import { useEffect, useState } from 'react';
import type { Product } from '../types';

const API_URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        const data: Product[] = await res.json();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
};
