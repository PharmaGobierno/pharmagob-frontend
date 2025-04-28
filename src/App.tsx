import Routes from './routes';
import ThemeCustomization from './themes';
import NavigationScroll from './layout/NavigationScroll';

// Axios config
import "./configs/axios"
import { useEffect } from 'react';
import { Authenticate } from './configs/axios';

const App = ()=>  {

  useEffect(() => {
    Authenticate()
  }, [])

  return (
    <ThemeCustomization>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
    </ThemeCustomization>
  )
}

export default App
