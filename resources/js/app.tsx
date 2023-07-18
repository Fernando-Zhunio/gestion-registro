import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Authenticated from './Layouts/AuthenticatedLayout';
import { AppContextProvider } from './Context/AppContext';
// import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
declare const isAuthenticated: boolean;
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>  
    // resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),

    {
        // resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx'))
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        let page: any = pages[`./Pages/${name}.tsx`];
        // if (!page.default?.layout) {
        //     page.default.layout = isAuthenticated ?  (page: any) => {
        //         return <Authenticated children={page}/>
        //     }: page.default.layout;
        // }
        page.default.layout = page.default.layout || ((page: any) => <AppContextProvider><Authenticated children={page}/></AppContextProvider>)
                
        return page;
        

    },
    
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
