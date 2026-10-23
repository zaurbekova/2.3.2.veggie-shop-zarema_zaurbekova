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
import { IconShoppingCart, IconMinus, IconPlus } from '@tabler/icons-react';
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
      padding={0}
      radius="xl"
      style={{
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      }}
    >
      <Box style={{ display: 'flex', justifyContent: 'center', padding: '32px 16px' }}>
        <Image
          src={product.image}
          height={160}
          fit="contain"
          alt={product.name}
        />
      </Box>

      <Box p="lg" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Group gap="xs" align="baseline" mb="sm" wrap="nowrap">
          <Text fw={600} size="md" c="#222" style={{ lineHeight: 1 }}>
            {product.name}
          </Text>
          <Text size="sm" c="#888" style={{ lineHeight: 1 }}>
            {getWeight(product.name)}
          </Text>
        </Group>

        <Group justify="space-between" align="center" wrap="nowrap" mt="auto">
          <Text fw={600} size="lg" c="#222" style={{ fontSize: 20 }}>
            $ {product.price}
          </Text>

          <Group gap={8} align="center" wrap="nowrap">
            <Group
              gap={0}
              style={{
                border: '1px solid #E0E0E0',
                borderRadius: 8,
                overflow: 'hidden',
                height: 32,
              }}
            >
              <ActionIcon
                variant="transparent"
                color="gray"
                size={32}
                aria-label="Уменьшить количество"
                onClick={() => handlersRef.current?.decrement()}
              >
                <IconMinus size={16} />
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
                    width: 32,
                    height: 32,
                    textAlign: 'center',
                    border: 'none',
                    borderLeft: '1px solid #E0E0E0',
                    borderRight: '1px solid #E0E0E0',
                    padding: 0,
                    fontWeight: 600,
                    backgroundColor: 'transparent',
                    fontSize: 14,
                  },
                }}
              />
              <ActionIcon
                variant="transparent"
                color="gray"
                size={32}
                aria-label="Увеличить количество"
                onClick={() => handlersRef.current?.increment()}
              >
                <IconPlus size={16} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>

        <Button
          radius="md"
          size="md"
          color="green"
          variant="light"
          onClick={handleAdd}
          mt="md"
          fullWidth
          rightSection={<IconShoppingCart size={18} />}
        >
          Add to cart
        </Button>
      </Box>
    </Card>
  );
};
