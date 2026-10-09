import { Navigate, Outlet } from 'react-router';

import { useInstance } from '../helpers/index';

type TPrivateWrapperProps = {
  path?: string;
};

export const PrivateWrapper = ({ path = '/login' }: TPrivateWrapperProps) => {
  const { instance } = useInstance();
  if (instance?.idInstance) return <Outlet />;
  return <Navigate to={path} />;
};
