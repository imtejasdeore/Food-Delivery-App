import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/solid';
import { 
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import axios from '../utils/axios';
import PromoBanner from '../components/promotions/PromoBanner';
import ProductCard from '../components/product/ProductCard';

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    isVegetarian: searchParams.get('isVegetarian') === 'true',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'name',
    sortOrder: searchParams.get('sortOrder') || 'asc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== '' && value !== false) {
            params.append(key, value);
          }
        });

        const response = await axios.get(`/api/products?${params.toString()}`);
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== false) {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      isVegetarian: false,
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'sortBy' && value === 'name') return false;
    if (key === 'sortOrder' && value === 'asc') return false;
    return value !== '' && value !== false;
  });

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding-sm">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-responsive-lg font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-gray-600">
            Discover our delicious selection of food items with customizable options
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food items..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 btn-touch"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 btn-touch"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category._id} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 btn-touch"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="basePrice-asc">Price (Low to High)</option>
                <option value="basePrice-desc">Price (High to Low)</option>
                <option value="rating.average-desc">Rating (High to Low)</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors btn-touch whitespace-nowrap"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid md:grid-cols-3 gap-4">
                {/* Vegetarian Filter */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.isVegetarian}
                    onChange={(e) => handleFilterChange('isVegetarian', e.target.checked)}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Vegetarian Only</span>
                </label>

                {/* Price Range */}
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Promotional Banner */}
        <div className="mb-6 sm:mb-8">
          <PromoBanner type="delivery" />
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {products.length} of {pagination.total} items
            {filters.category && ` in ${filters.category}`}
            {filters.search && ` for "${filters.search}"`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid-responsive-cards">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-40 sm:h-48 bg-gray-200"></div>
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid-responsive-cards">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FunnelIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(pagination.pages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterChange('page', index + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pagination.current === index + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;