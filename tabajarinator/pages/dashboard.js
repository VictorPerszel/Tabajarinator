import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  useAuth();

  return <div>Bem-vindo ao painel!</div>;
};

export default Dashboard;