import {
  Card,
  Image,
  Text,
  Group,
  Button,
  NumberInput,
  Box,
  ActionIcon,
  type NumberInputHandlers,
} from '@mantine/core';
import { useRef, useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { getWeight } from '../utils/weight';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const handlersRef = useRef<NumberInputHandlers>(null);
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({ type: 'ADD', product, quantity });
    setQuantity(1);
  };

  return (
    <Card
      padding="lg"
      radius="lg"
      style={{
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 0 24px',
          minHeight: 180,
        }}
      >
        <Image
          src={product.image}
          height={140}
          width={140}
          fit="contain"
          alt={product.name}
        />
      </Box>

      <Group justify="space-between" align="center" mb="md" wrap="nowrap">
        <Group gap={8} align="baseline" wrap="nowrap">
          <Text fw={600} size="md" c="#222">
            {product.name}
          </Text>
          <Text size="xs" c="dimmed">
            {getWeight(product.name)}
          </Text>
        </Group>

        <Group gap={6} align="center" wrap="nowrap">
          <ActionIcon
            variant="default"
            size={28}
            radius="md"
            aria-label="Уменьшить количество"
            onClick={() => handlersRef.current?.decrement()}
            styles={{
              root: {
                backgroundColor: '#F1F3F5',
                border: 'none',
                fontWeight: 700,
                fontSize: 16,
                color: '#555',
              },
            }}
          >
            −
          </ActionIcon>
          <NumberInput
            value={quantity}
            onChange={(val) => setQuantity(Number(val) || 1)}
            min={1}
            max={99}
            hideControls
            handlersRef={handlersRef}
            aria-label="Количество"
            styles={{
              input: {
                width: 36,
                textAlign: 'center',
                border: 'none',
                padding: 0,
                fontWeight: 600,
                backgroundColor: 'transparent',
              },
            }}
          />
          <ActionIcon
            variant="default"
            size={28}
            radius="md"
            aria-label="Увеличить количество"
            onClick={() => handlersRef.current?.increment()}
            styles={{
              root: {
                backgroundColor: '#F1F3F5',
                border: 'none',
                fontWeight: 700,
                fontSize: 16,
                color: '#555',
              },
            }}
          >
            +
          </ActionIcon>
        </Group>
      </Group>

      <Group justify="space-between" align="center" wrap="nowrap" mt="auto">
        <Text fw={700} size="lg" c="#222">
          ${product.price}
        </Text>
        <Button
          radius="md"
          size="sm"
          color="green"
          variant="light"
          onClick={handleAdd}
          rightSection={<IconShoppingCart size={16} />}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};
