import AuthProvider from "./Provider/AuthProvider";
import "./app.css";
import Layout from "./layout/Layout";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <AuthProvider>
     <Layout />
  </AuthProvider>;
}

export default App;
