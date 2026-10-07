import {
  Stack,
  Group,
  Text,
  Image,
  ActionIcon,
  Divider,
  Box,
  Center,
} from '@mantine/core';
import { IconShoppingCartOff } from '@tabler/icons-react';
import { useCart } from '../context/CartContext';
import { getWeight } from '../utils/weight';

export const CartPopup = () => {
  const { state, dispatch, totalPrice } = useCart();

  if (state.items.length === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="sm">
          <IconShoppingCartOff size={72} color="#D0D0D0" stroke={1.2} />
          <Text c="dimmed" size="sm">
            You cart is empty!
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="md">
      {state.items.map((item, idx) => (
        <Box key={item.id}>
          {idx > 0 && <Divider mb="md" color="#F1F3F5" />}
          <Group wrap="nowrap" align="center" gap="md">
            <Image
              src={item.image}
              w={52}
              h={52}
              fit="contain"
              alt={item.name}
            />
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Group gap={8} align="baseline" wrap="nowrap">
                <Text fw={600} size="sm" c="#222" truncate>
                  {item.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {getWeight(item.name)}
                </Text>
              </Group>
              <Text size="sm" fw={600} mt={6} c="#222">
                ${item.price}
              </Text>
            </Box>
            <Group gap={6} align="center" wrap="nowrap">
              <ActionIcon
                variant="default"
                size={28}
                radius="md"
                onClick={() => {
                  if (item.quantity > 1) {
                    dispatch({
                      type: 'UPDATE_QTY',
                      id: item.id,
                      quantity: item.quantity - 1,
                    });
                  }
                }}
                styles={{
                  root: {
                    backgroundColor: '#F1F3F5',
                    border: 'none',
                    fontWeight: 700,
                    color: '#555',
                  },
                }}
              >
                −
              </ActionIcon>
              <Text w={20} ta="center" fw={600} size="sm">
                {item.quantity}
              </Text>
              <ActionIcon
                variant="default"
                size={28}
                radius="md"
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_QTY',
                    id: item.id,
                    quantity: item.quantity + 1,
                  })
                }
                styles={{
                  root: {
                    backgroundColor: '#F1F3F5',
                    border: 'none',
                    fontWeight: 700,
                    color: '#555',
                  },
                }}
              >
                +
              </ActionIcon>
            </Group>
          </Group>
        </Box>
      ))}

      <Divider color="#F1F3F5" />

      <Group justify="space-between">
        <Text fw={600} c="#222">
          Total
        </Text>
        <Text fw={700} c="#222">
          ${totalPrice}
        </Text>
      </Group>
    </Stack>
  );
};
