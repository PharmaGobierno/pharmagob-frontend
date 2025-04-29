import Routes from './routes';
import ThemeCustomization from './themes';
import NavigationScroll from './layout/NavigationScroll';
import { JWTProvider as AuthProvider } from './contexts/JWTContext'

const App = ()=>  {

  return (
    <ThemeCustomization>
        <NavigationScroll>
          <AuthProvider>
            <>
              <Routes />
            </>
          </AuthProvider>
        </NavigationScroll>
    </ThemeCustomization>
  )
}

export default App
