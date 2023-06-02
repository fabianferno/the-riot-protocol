import { Default } from 'components/layouts/Default';
import { Home } from 'components/templates/home';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { luniverseActions } from 'store/luniverseSlice';
import { LUNIVERSE_ACCESS_KEY, LUNIVERSE_NODE_ID, LUNIVERSE_SECRET_KEY } from '../constants';

const HomePage: NextPage = () => {
  const { accessToken } = useSelector((state: any) => state.luniverse);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('/api/get-auth-token', {
          method: 'POST',
          body: JSON.stringify({
            nodeId: LUNIVERSE_NODE_ID,
            secretKey: LUNIVERSE_SECRET_KEY,
            accessKey: LUNIVERSE_ACCESS_KEY,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const { accessToken } = data;
        dispatch(luniverseActions.setAccessToken(accessToken));
      } catch (e) {}
    })();
  }, []);
  return (
    <Default pageName="Home">
      <Home />
    </Default>
  );
};

export default HomePage;
