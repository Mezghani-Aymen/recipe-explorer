import React from 'react';
import Link from 'next/link';
import Header from '@/app/component/header/page';

export default function RecipePage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <>
            <Header />
            <div className="p-6">
                <h1 className="text-3xl font-bold">Recipe Details</h1>
                <p className="text-xl mt-4">You are viewing the recipe with ID: {id}</p>
                <Link href={'/api/recipes'} className="text-xl px-6 py-2 rounded text-secondry border-secondry border hover:bg-secondry hover:text-customText">
                    Get the recipe
                </Link>
            </div>
        </>
    );
}
