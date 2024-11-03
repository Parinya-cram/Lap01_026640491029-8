import { useState } from "react";
import { Link } from "@remix-run/react";
import { data_Book } from "./data";

export default function CardBook() {
    const [filter, setFilter] = useState<'bestseller' | 'non-bestseller' | 'sale' | 'all'>('all');
    const dataBook = data_Book;

    const filteredItems = dataBook.filter((item) => {
        switch (filter) {
            case 'bestseller':
                return item.Bestseller;
            case 'non-bestseller':
                return !item.Bestseller;
            case 'sale':
                return item.Flashsale;
            case 'all':
            default:
                return true; 
        }
    });

    function Bestseller({ active }: { active: boolean }) {
        return active ? <p className="text-yellow-600 font-bold">Bestseller</p> : null;
    }
    function Flashsale({ active }: { active: boolean }) {
        return active ? <p className="text-red-600 font-bold">Flashsale</p> : null;
    }

    return (
        <div className="font-sans p-12 rounded-xl">
            <h1 className="text-4xl mb-4">รายการหนังสือ</h1>
            <div className="mb-4">
                <button 
                    onClick={() => setFilter('all')} 
                    className={`mr-2 px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilter('bestseller')} 
                    className={`mr-2 px-4 py-2 rounded ${filter === 'bestseller' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Bestseller
                </button>
                <button 
                    onClick={() => setFilter('non-bestseller')} 
                    className={`mr-2 px-4 py-2 rounded ${filter === 'non-bestseller' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Non-Bestseller
                </button>
                <button 
                    onClick={() => setFilter('sale')} 
                    className={`mr-2 px-4 py-2 rounded ${filter === 'sale' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Flash Sale
                </button>
            </div>
            {filteredItems.map((item) => (
                <div key={item.Code} className="mb-6">
                    <Link
                        to={`/Book/detail/${item.Code}`}
                        className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition hover:shadow-xl"
                    >
                        <img
                            className="object-cover w-full h-96 md:h-auto md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                            src={item.Cover}
                            alt={`Cover of ${item.Title}`}
                        />
                        <div className="flex flex-col justify-between p-6 leading-normal">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                                {item.Title}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                ISBN: {item.Code}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                ผู้เขียน: {item.Author}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                สำนักพิมพ์: {item.Pubishing}
                            </p>
                            <p className="text-gray-700 dark:text-gray-400 mb-3">
                                {item.Description}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <Bestseller active={item.Bestseller} />
                                    <Flashsale active={item.Flashsale} />
                                </div>
                                <p className="font-semibold text-gray-900 dark:text-gray-200">
                                    Price: {item.Price} บาท
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
