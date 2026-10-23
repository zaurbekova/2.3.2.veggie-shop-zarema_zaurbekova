import {
  Container,
  SimpleGrid,
  Loader,
  Center,
  Alert,
  Text,
  Title,
  Box,
} from '@mantine/core';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { useProducts } from './hooks/useProducts';
import { CartProvider } from './context/CartContext';

const PRICE_MAP: Record<string, number> = {
  'Broccoli': 120,
  'Cauliflower': 120,
  'Cucumber': 120,
  'Beetroot': 120,
  'Carrot': 82,
  'Tomato': 82,
  'Beans': 82,
  'Brinjal': 82,
  'Green Pepper': 82,
  'Mushroom': 82,
  'Potato': 82,
  'Pumpkin': 82,
  'Corn': 82,
  'Onion': 82,
  'Apple': 82,
  'Banana': 82,
  'Grapes': 82,
  'Mango': 82,
  'Melon': 82,
  'Orange': 82,
  'Pear': 82,
  'Pomegranate': 82,
  'Raspberry': 82,
  'Strawberry': 82,
  'Water Melon': 82,
  'Almonds': 82,
  'Pista': 82,
  'Nuts Mixture': 82,
  'Cashews': 82,
  'Walnuts': 82,
};

function App() {
  const { products, loading, error } = useProducts();

  const productsWithMockPrices = products.map((product) => {
    const cleanName = product.name.split(' - ')[0];
    const mockPrice = PRICE_MAP[cleanName];
    return mockPrice !== undefined ? { ...product, price: mockPrice } : product;
  });

  return (
    <CartProvider>
      <Box style={{ minHeight: '100vh', background: '#F5F6F8' }}>
        <Header />

        <Container size="xl" py="xl" px="xl">
          <Title
            order={1}
            mb="xl"
            style={{ fontSize: 32, fontWeight: 700, color: '#222' }}
          >
            Catalog
          </Title>

          {loading && (
            <Center h={300}>
              <Loader size="xl" color="#54B44A" />
            </Center>
          )}

          {error && !loading && (
            <Alert color="red" title="Ошибка">
              {error}
            </Alert>
          )}

          {!loading && !error && products.length === 0 && (
            <Center h={200}>
              <Text c="dimmed">Товары не найдены</Text>
            </Center>
          )}

          {!loading && !error && products.length > 0 && (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
              {productsWithMockPrices.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </CartProvider>
  );
}

export default App;
