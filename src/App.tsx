import ResponsiveDrawer from "./components/drawer/Drawer";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <ProtectedRoute>
      <ResponsiveDrawer />
    </ProtectedRoute>
  );
};

export default App;
