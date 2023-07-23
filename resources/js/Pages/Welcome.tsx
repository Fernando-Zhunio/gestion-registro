import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Dashboard from './Dashboard';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <Dashboard />
        </>
    );
}
