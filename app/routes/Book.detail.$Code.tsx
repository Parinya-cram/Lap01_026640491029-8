import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { data_Book } from "./data";

export let loader = async ({ params }) => {
    const { Code } = params;
    const book = data_Book.find((item) => item.Code === Code);

    if (!book) {
        throw new Response("Book not found", { status: 404 });
    }
    return json(book);
};

export default function BookDetail() {
    const book = useLoaderData();

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{book.Title}</h1>
            <img 
                src={book.Cover} 
                alt={`Cover of ${book.Title}`} 
                className="w-full h-auto rounded-lg mb-4" 
            />
            <div className="mb-4">
                <p><strong>ISBN:</strong> {book.Code}</p>
                <p><strong>Author:</strong> {book.Author}</p>
                <p><strong>Publisher:</strong> {book.Pubishing}</p>
                <p className="mb-3">{book.Description}</p>
                <p className="font-semibold"><strong>Price:</strong> {book.Price} บาท</p>
            </div>
            {book.Bestseller && <p className="text-yellow-600 font-bold">Bestseller</p>}
            {book.Flashsale && <p className="text-red-600 font-bold">Flashsale</p>}

        </div>
    );
}