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

  const cleanName = product.name.split(' - ')[0];

  const handleAdd = () => {
    dispatch({ type: 'ADD', product, quantity });
    setQuantity(1);
  };

  return (
    <Card
      padding={0}
      radius="lg"
      w={302}
      h={414}
      style={{
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
      }}
    >
      <Box style={{ display: 'flex', justifyContent: 'center', padding: '16px', height: '276px' }}>
        <Image
          src={product.image}
          w={276}
          h={276}
          fit="contain"
          alt={cleanName}
        />
      </Box>

      <Box p="md" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <Group justify="space-between" align="center" w={270} h={30} wrap="nowrap" mx="auto">
          <Group gap={8} align="baseline" wrap="nowrap">
            <Text fw={600} size="md" c="#222" style={{ lineHeight: 1 }}>
              {cleanName}
            </Text>
            <Text size="sm" c="#888" style={{ lineHeight: 1 }}>
              {getWeight(cleanName)}
            </Text>
          </Group>

          <Group
            gap={0}
            style={{
              border: '1px solid #E8E8E8',
              borderRadius: 8,
              overflow: 'hidden',
              height: 30,
            }}
          >
            <ActionIcon
              variant="transparent"
              color="gray"
              size={30}
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
                  width: 30,
                  height: 30,
                  textAlign: 'center',
                  border: 'none',
                  borderLeft: '1px solid #E8E8E8',
                  borderRight: '1px solid #E8E8E8',
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
              size={30}
              aria-label="Увеличить количество"
              onClick={() => handlersRef.current?.increment()}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <Group justify="space-between" align="center" w={270} h={44} wrap="nowrap" mx="auto">
          <Text fw={700} size="lg" c="#222" style={{ fontSize: 20 }}>
            $ {product.price}
          </Text>
          <Button
            radius="md"
            h={44}
            style={{ flexGrow: 1, marginLeft: 16 }}
            color="green"
            variant="light"
            onClick={handleAdd}
            rightSection={<IconShoppingCart size={18} />}
            styles={{
              root: {
                backgroundColor: '#EAF7E5',
                color: '#54B44A',
                fontWeight: 600,
                fontSize: 15,
              },
              label: { width: '100%', justifyContent: 'center' },
            }}
          >
            Add to cart
          </Button>
        </Group>

      </Box>
    </Card>
  );
};
