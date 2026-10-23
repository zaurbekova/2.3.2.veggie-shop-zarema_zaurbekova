import { Group, Box, Badge, Button, Popover, Text } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useCart } from '../context/CartContext';
import { CartPopup } from './CartPopup';

export const Header = () => {
  const { totalCount } = useCart();
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <Group justify="space-between" align="center" px="xl" py="md" maw={1400} mx="auto">
        <Group gap="xs" align="center">
          <Text style={{ fontSize: 24, fontWeight: 700, color: '#222' }}>Vegetable</Text>
          <Badge
            size="xl"
            radius="sm"
            color="green"
            tt="uppercase"
            styles={{ root: { fontWeight: 700, letterSpacing: 1, padding: '0 12px' } }}
          >
            Shop
          </Badge>
        </Group>

        <Popover
          opened={opened}
          onClose={close}
          position="bottom-end"
          width={440}
          withArrow={false}
          shadow="md"
          radius="lg"
        >
          <Popover.Target>
            <Button
              onClick={open}
              radius="md"
              size="md"
              color="green"
              leftSection={
                totalCount > 0 ? (
                  <Box
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      color: '#54B44A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {totalCount}
                  </Box>
                ) : null
              }
              rightSection={<IconShoppingCart size={20} />}
            >
              Cart
            </Button>
          </Popover.Target>

          <Popover.Dropdown p="lg">
            <CartPopup />
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Box>
  );
};
