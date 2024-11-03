import type { MetaFunction } from "@remix-run/node";
import CardBook from "./Book.ShowCard";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4">รายการโครงงาน</h1>
        <CardBook />
      </div>
    </div>
  );
} 
