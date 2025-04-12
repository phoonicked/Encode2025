// src/components/Marketplace.tsx
import React, { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "OpenAI API Basic",
    description: "Access to basic GPT-3.5 models with 100k tokens per month",
    category: "LLM",
    price: 20,
  },
  {
    id: 2,
    name: "OpenAI API Pro",
    description:
      "Full access to GPT-4 models with priority support and 500k tokens per month",
    category: "LLM",
    price: 50,
  },
  {
    id: 3,
    name: "Stripe API",
    description:
      "Payment processing and advanced transaction management features",
    category: "Payment",
    price: 15,
  },
  {
    id: 4,
    name: "Weather API",
    description: "Real-time weather data, forecasting, and historical trends",
    category: "Weather",
    price: 10,
  },
  {
    id: 5,
    name: "Maps API",
    description: "Geolocation, mapping, and route optimization services",
    category: "Location",
    price: 25,
  },
];

const categories = ["Sports", "LLM", "Weather", "Payment"];
const sortOptions = ["Release", "Lowest Price", "Highest Price"];

export default function Marketplace() {
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOption, setSortOption] = useState<string>("Release");
  const [showModal, setShowModal] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState<Product | null>(
    null
  );

  const handleBuy = (product: Product) => {
    setPurchasedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPurchasedProduct(null);
  };

  // Compute the filtered products
  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts;

    if (searchQuery.trim().length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "Lowest Price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Highest Price":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, minPrice, maxPrice, sortOption]);

  // Determine if filters are not applied
  const showHero =
    searchQuery.trim() === "" &&
    selectedCategories.length === 0 &&
    minPrice === "" &&
    maxPrice === "";

  // For simplicity, here is a dummy rendering for category filters and sort:
  // ... (render checkboxes and sort radio buttons in the sidebar as needed)

  return (
    <div className="flex h-screen bg-zinc-900 text-gray-300">
      {/* Sidebar */}
      <aside className="w-[300px] p-6 bg-zinc-800 border-r border-zinc-700 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-purple-300">Flow Market</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Filter</h3>
          {/* Category filter */}
          <div className="mb-4">
            <p className="font-medium mb-1">Category</p>
            <div className="space-y-1 text-sm">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="accent-purple-500"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category]
                      )
                    }
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Price filter */}
          <div className="mb-4">
            <p className="font-medium mb-1">Price</p>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value ? Number(e.target.value) : "")
                }
                className="w-1/2 bg-zinc-900 text-white p-1 border border-zinc-700 rounded"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? Number(e.target.value) : "")
                }
                className="w-1/2 bg-zinc-900 text-white p-1 border border-zinc-700 rounded"
              />
            </div>
          </div>
          {/* Sort section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Sort by</h3>
            <div className="space-y-1 text-sm">
              {sortOptions.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    value={option}
                    checked={sortOption === option}
                    onChange={() => setSortOption(option)}
                    className="accent-purple-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
        {/* Search Bar */}
        <div className="bg-zinc-800 p-2 rounded-xl flex items-center">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 text-white p-2 rounded focus:outline-none"
          />
        </div>
        {/* Hero Product Section (conditionally rendered) */}
        {showHero && (
          <div className="bg-zinc-800 p-6 rounded-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 h-[80%]">
            {/* Hero product details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-purple-300">
                Featured Product Name
              </h2>
              <p className="mt-2 text-gray-400">
                This is a highlighted product that we think you'll love. It
                comes with special features and a limited time offer.
              </p>
              <div className="mt-4">
                <button className="bg-purple-300 text-black px-4 py-2 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Product List */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-800 p-4 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-purple-300">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Price: ${product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuy(product)}
                    className="mt-4 bg-purple-300 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded"
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-800 p-6 rounded-lg text-center">
              <p className="text-lg font-medium">
                No products match your filters.
              </p>
            </div>
          )}
        </div>
      </main>
      {showModal && purchasedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-sm text-center shadow-xl">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Thank you for purchasing{" "}
              <span className="text-purple-300">{purchasedProduct.name}</span>!
            </h2>
            <button
              onClick={closeModal}
              className="bg-purple-300 text-white px-4 py-2 rounded hover:bg-purple-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
