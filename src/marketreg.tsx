import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the path if needed
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
    name: string;
    description: string;
    category: string;
    price: number;
    coin: string;
}

async function save(savedData: any) {
    try {
        const marketDocRef = doc(collection(db, "market"));
        await setDoc(marketDocRef, savedData);
        console.log("Market saved successfully with ID:", marketDocRef.id);
    } catch (error) {
        console.error("Error saving market data:", error);
    }
}

export default function Marketreg() {
    const [product, setProduct] = useState<Product>({
        name: "",
        description: "",
        category: "",
        price: 0,
        coin: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value: string) => {
        setProduct((prev) => ({
            ...prev,
            category: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await save(product);
        setProduct({
            name: "",
            description: "",
            category: "",
            price: 0,
            coin: "",
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-900 text-gray-300">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">Create New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="text-gray-300 mb-1 block">Name</Label>
                        <Input id="name" name="name" type="text" value={product.name} onChange={handleChange} className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700" />
                    </div>
                    <div>
                        <Label htmlFor="description" className="text-gray-300 mb-1 block">Description</Label>
                        <Input id="description" name="description" type="text" value={product.description} onChange={handleChange} className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700" />
                    </div>
                    <div>
                        <Label htmlFor="category" className="text-gray-300 mb-1 block">Category</Label>
                        <Select onValueChange={handleCategoryChange} value={product.category}>
                            <SelectTrigger className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Sports">Sports</SelectItem>
                                <SelectItem value="LLM">LLM</SelectItem>
                                <SelectItem value="Weather">Weather</SelectItem>
                                <SelectItem value="Payment">Payment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="price" className="text-gray-300 mb-1 block">Price</Label>
                        <Input id="price" name="price" type="text" value={product.price} onChange={handleChange} className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700" />
                    </div>
                    <div>
                        <Label htmlFor="coin" className="text-gray-300 mb-1 block">Coin</Label>
                        <Input id="coin" name="coin" type="text" value={product.coin} onChange={handleChange} className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700" />
                    </div>
                    <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">Save Product</Button>
                </form>
            </div>
        </div>
    );
}