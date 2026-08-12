import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import React from 'react';
import { normalizeLocalizedHref } from '@/lib/normalize-localized-href';

const BorderBtn = ({ text, link, className }) => {
    console.log(text);
    
    return (
        <Link
            href={normalizeLocalizedHref(link)}
            className={`shine-btn group inline-flex gap-3 items-center text-[20px] px-8 py-3.25 border border-primary rounded-full transition-all duration-300 ${className}`}
        >
            {text}
            <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
    );
};

export default BorderBtn;
