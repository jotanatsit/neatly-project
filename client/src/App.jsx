import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import { BookingProvider } from "./contexts/booking";

function App() {
  const auth = useAuth();
  return (
    <BookingProvider>
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </BookingProvider>
  );
}

export default App;
