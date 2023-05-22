import { ISubNav } from '../SubNav/SubNav';

const NAV_LINKS: ISubNav[] = [
  {
    label: 'Mint Device',
    href: '/mint-device',
  },
  {
    label: 'View Data',
    href: '/view-data',
  },
  {
    label: 'Manage Device',
    href: '/',
    children: [
      {
        subLabel: 'Update Device firmware',
        label: 'Update Firmware',
        href: '/update-firmware',
      },
      {
        subLabel: 'Assign device to user',
        label: 'Assign Device',
        href: '/assign-devices',
      },
    ],
  },
  {
    label: 'Transactions',
    href: '/transactions',
  },

  // {
  //   label: 'Balances',
  //   href: '/balances',
  //   children: [
  //     {
  //       label: 'ERC20',
  //       subLabel: 'Get your ERC20 balances',
  //       href: '/balances/erc20',
  //       logo: 'token',
  //     },
  //     {
  //       label: 'NFT',
  //       subLabel: 'Get your ERC721 an ERC1155 balances',
  //       href: '/balances/nft',
  //       logo: 'pack',
  //     },
  //   ],
  // },
];

export default NAV_LINKS;
