import Routes from './routes';
import ThemeCustomization from './themes';
import Snackbar from './ui-components/extended/Snackbar';
import NavigationScroll from './layout/NavigationScroll';
import { JWTProvider as AuthProvider } from './contexts/JWTContext'

// Axios config
import "./configs/axios"

const App = ()=>  {


  return (
    <ThemeCustomization>
        <NavigationScroll>
          <AuthProvider>
            <>
              <Routes />
              <Snackbar />
            </>
          </AuthProvider>
        </NavigationScroll>
    </ThemeCustomization>
  )
}

export default App
