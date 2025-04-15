import ReactDOM from "react-dom/client";

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
/* import { PersistGate } from 'redux-persist/integration/react'; */
// project imports
import App from './App';
import { BASE_PATH } from './config';
import { ConfigProvider } from './contexts/ConfigContext';
import { store, persister } from './store';

// style + assets
import './assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error("Elemento root no encontrado");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persister}> */}
            <ConfigProvider>
                <BrowserRouter basename={BASE_PATH}>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
        {/* </PersistGate> */}
    </Provider>,
);
