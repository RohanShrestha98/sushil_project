import Layout from "./components/Layout/Layout";
import { AuthContextProvider } from "./components/contexts/authContext";


function App() {
  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  );
}

export default App;
