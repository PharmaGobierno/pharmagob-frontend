import ReactDOM from "react-dom/client";

// third party
import { BrowserRouter } from 'react-router-dom';
// project imports
import App from './App';
import { BASE_PATH } from './config';
import { ConfigProvider } from './contexts/ConfigContext';

// style + assets
import './assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("Elemento root no encontrado");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
      <ConfigProvider>
          <BrowserRouter basename={BASE_PATH}>
              <App />
          </BrowserRouter>
      </ConfigProvider>,
);
