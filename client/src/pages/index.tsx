import { Default } from 'components/layouts/Default';
import { Home } from 'components/templates/home';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { luniverseActions } from 'store/luniverseSlice';

const HomePage: NextPage = () => {
  const { accessToken } = useSelector((state: any) => state.luniverse);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () { })();
  }, []);
  return (
    <Default pageName="Home">
      <Home />
    </Default>
  );
};

export default HomePage;
