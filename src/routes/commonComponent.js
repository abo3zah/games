import { Link } from 'react-router-dom';

export function ReturnButton() {
    return (
        <Link
            to='/'
            className='text-center self-start w-full bg-slate-100 border border-black rounded h-10 grid items-center'>
            الرجوع للقائمة الرئيسية
        </Link>
    );
}

export const arabicNumberCode = [
    '0x0660',
    '0x0661',
    '0x0662',
    '0x0663',
    '0x0664',
    '0x0665',
    '0x0666',
    '0x0667',
    '0x0668',
    '0x0669',
];
