import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the path if needed
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ethers } from "ethers";

interface Product {
    name: string;
    description: string;
    category: string;
    coin_name: string;
    coin_symbol: string;
    initial_supply: number;
}

const factoryAddress = "0xa8d12B50d1e627a17562C6ab823AE767a88721d4";
const factoryABI = [
    "function createToken(string name, string symbol, uint256 initialSupply) external",
];

async function spawnToken(name: string, symbol: string, supply: number) {
    //@ts-ignore
    if (!window.ethereum) {
        alert("Install MetaMask first!");
        return;
    }

    //@ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    //@ts-ignore
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = await provider.getSigner();
    const factory = new ethers.Contract(factoryAddress, factoryABI, signer);

    const tx = await factory.createToken(name, symbol, supply);
    console.log(`Creating ${name}... TX: ${tx.hash}`);
    const res = await tx.wait();
    console.log(`${name} created!`);
    return res.to;
}

async function save(savedData: any) {
    try {
        const marketDocRef = doc(collection(db, "market"));
        const res = await spawnToken(savedData.coin_name, savedData.coin_symbol, savedData.initial_supply);
        await setDoc(marketDocRef, {
            ...savedData,
            tokenAddress: res,
        });
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
        coin_name: "",
        coin_symbol: "",
        initial_supply: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "initial_supply" ? Number(value) : value,
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
            coin_name: "",
            coin_symbol: "",
            initial_supply: 0,
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
                        <Label htmlFor="coin_name" className="text-gray-300 mb-1 block">Coin Name</Label>
                        <Input id="coin_name" name="coin_name" type="text" value={product.coin_name} onChange={handleChange} className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700" />
                    </div>
                    <div>
                        <Label htmlFor="coin_symbol" className="text-gray-300 mb-1 block">Coin Symbol</Label>
                        <Input id="coin_symbol" name="coin_symbol" type="text" value={product.coin_symbol} onChange={handleChange} className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700" />
                    </div>
                    <div>
                        <Label htmlFor="initial_supply" className="text-gray-300 mb-1 block">Initial Supply</Label>
                        <Input id="initial_supply" name="initial_supply" type="number" value={product.initial_supply} onChange={handleChange} className="w-full bg-zinc-900 text-white p-2 rounded border border-zinc-700" />
                    </div>
                    <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">Save Product</Button>
                </form>
            </div>
        </div>
    );
}