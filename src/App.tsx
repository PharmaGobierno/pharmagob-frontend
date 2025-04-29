import Routes from './routes';
import ThemeCustomization from './themes';
import NavigationScroll from './layout/NavigationScroll';

// Axios config
import "./configs/axios"

const App = ()=>  {


  return (
    <ThemeCustomization>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
    </ThemeCustomization>
  )
}

export default App
