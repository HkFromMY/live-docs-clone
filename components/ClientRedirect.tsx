"use client";

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const ClientRedirect = ({ href }: { href: string }) => {
    
    useEffect(() => {
        redirect(href);
    }, [href]);

    return null;
}

export default ClientRedirect
