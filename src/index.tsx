import ReactDOM from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(document.getElementById('root')!);
    root.render(<App />);
} else {
    console.error('Missing root element for react to render');
}
