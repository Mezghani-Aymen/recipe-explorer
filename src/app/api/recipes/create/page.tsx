import Header from '@/app/component/header/page';
import Link from 'next/link';


export default async function Page() {
    return (
        <>
            <Header />
            <div className="p-6 flex justify-between  items-center">
                <h1 className="text-3xl font-bold mb-4">Recipe Details</h1>
                <Link href={'/api/recipes'} className="text-xl px-6 py-2 rounded text-primary border-primary border hover:bg-primary hover:text-black mb-4">
                    <span>Return</span>
                </Link>
            </div>
            <h1>Working on  !!</h1>
        </>
    );
}