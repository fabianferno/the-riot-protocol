import { ISubNav } from '../SubNav/SubNav';
import { useSelector } from 'react-redux';

export default function getNavLinks() {
  const { currentChain } = useSelector((state: any) => state.metamask);

  return currentChain.chainId == 80001
    ? [
        {
          label: 'Mint Device',
          href: '/mint-device',
        },
        {
          label: 'Your Profile',
          href: '/profile',
        },
      ]
    : [
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
      ];
}
