import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { user, updateProfile, addAddress, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [addressData, setAddressData] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    landmark: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const result = await addAddress(addressData);
    if (result.success) {
      setShowAddressForm(false);
      setAddressData({
        type: 'home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        landmark: ''
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-mobile section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-responsive-lg font-bold text-gray-900 mb-8 text-center">
            My Profile
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-outline btn-sm"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="btn btn-primary flex-1">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{user?.name || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-900">{user?.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Status</p>
                        <p className="font-medium text-green-600">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl shadow-soft p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Addresses
                </h2>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="btn btn-primary btn-sm"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Address
                </button>
              </div>

              {showAddressForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddAddress}
                  className="mb-6 p-4 border border-gray-200 rounded-xl space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Type
                      </label>
                      <select
                        value={addressData.type}
                        onChange={(e) => setAddressData({ ...addressData, type: e.target.value })}
                        className="input-field"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Landmark
                      </label>
                      <input
                        type="text"
                        value={addressData.landmark}
                        onChange={(e) => setAddressData({ ...addressData, landmark: e.target.value })}
                        className="input-field"
                        placeholder="Near..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={addressData.street}
                      onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                      className="input-field"
                      placeholder="House/Flat No., Street Name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={addressData.city}
                        onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={addressData.state}
                        onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={addressData.zipCode}
                      onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="btn btn-primary flex-1">
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="btn btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Address List */}
              <div className="space-y-4">
                {user?.addresses && user.addresses.length > 0 ? (
                  user.addresses.map((address, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900 capitalize">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="badge badge-primary">Default</span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {address.street}, {address.city}, {address.state} - {address.zipCode}
                            </p>
                            {address.landmark && (
                              <p className="text-gray-500 text-xs mt-1">
                                Near {address.landmark}
                              </p>
                            )}
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MapPinIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No addresses added yet</p>
                    <p className="text-sm text-gray-400">Add an address to get started with delivery</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {user?.orderCount || 0}
              </div>
              <p className="text-gray-600">Total Orders</p>
            </div>
            <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                ₹{user?.totalSpent || 0}
              </div>
              <p className="text-gray-600">Total Spent</p>
            </div>
            <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
              <div className="text-2xl font-bold text-accent-600 mb-2">
                {user?.loyaltyPoints || 0}
              </div>
              <p className="text-gray-600">Loyalty Points</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;