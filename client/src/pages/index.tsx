import { Default } from 'components/layouts/Default';
import { Home } from 'components/templates/home';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
  useEffect(() => {}, []);
  return (
    <Default pageName="Home">
      <Home />
    </Default>
  );
};

export default HomePage;
