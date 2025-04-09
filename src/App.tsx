import Routes from './routes';
import ThemeCustomization from './themes';
import NavigationScroll from './layout/NavigationScroll';

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
