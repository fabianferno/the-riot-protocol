import { HStack } from '@chakra-ui/react';
import { NavItem } from '../NavItem';
import getNavLinks from './paths';

const NavBar = () => {
  return (
    <HStack gap={'15px'}>
      {getNavLinks().map((link) => (
        <NavItem key={`link-${link.label}`} {...link} />
      ))}
    </HStack>
  );
};

export default NavBar;
