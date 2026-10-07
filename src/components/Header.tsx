import { Group, Box, Badge, Button, Popover } from '@mantine/core';
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
      <Group
        justify="space-between"
        align="center"
        px="xl"
        py="md"
        maw={1400}
        mx="auto"
      >
        <Group gap="xs" align="center">
          <Box
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#222',
              letterSpacing: 0.2,
            }}
          >
            Vegetable
          </Box>
          <Badge
            size="lg"
            radius="sm"
            color="green"
            tt="uppercase"
            styles={{
              root: {
                fontWeight: 700,
                letterSpacing: 1,
                padding: '0 10px',
              },
            }}
          >
            Shop
          </Badge>
        </Group>

        <Popover
          opened={opened}
          onClose={close}
          position="bottom-end"
          width={420}
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
                      width: 26,
                      height: 26,
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
              rightSection={<IconShoppingCart size={18} />}
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
