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

function App() {
  const { products, loading, error } = useProducts();

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
              {products.map((product) => (
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
