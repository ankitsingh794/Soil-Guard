'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    addressLine1: '123 Green Lane',
    addressLine2: 'Eco District',
    city: 'Bangalore',
    state: 'Karnataka',
    postalCode: '560001',
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const orders = [
    {
      id: 'SG12345678',
      date: '2025-11-10',
      status: 'In Transit',
      total: 3499,
      items: 2,
    },
    {
      id: 'SG12345677',
      date: '2025-10-25',
      status: 'Delivered',
      total: 1999,
      items: 1,
    },
    {
      id: 'SG12345676',
      date: '2025-10-10',
      status: 'Delivered',
      total: 4599,
      items: 3,
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Garden Soil Mix',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      inStock: true,
    },
    {
      id: 2,
      name: 'Organic Compost Premium',
      price: 899,
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
      inStock: true,
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-5 h-5" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-bold mb-2">My Account</h1>
          <p className="text-botanical-100">Manage your profile, orders, and preferences</p>
        </div>
      </div>

      <section className="section-spacing bg-sand-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-8">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b border-soil-200">
                  <div className="w-20 h-20 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-botanical-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-soil-800">{profileData.fullName}</h2>
                  <p className="text-sm text-soil-600">{profileData.email}</p>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-botanical-500 text-white'
                          : 'text-soil-700 hover:bg-sand-100'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="card p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-display font-bold text-soil-800">
                      Profile Information
                    </h2>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="md"
                        onClick={handleEdit}
                        leftIcon={<Edit2 className="w-4 h-4" />}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={handleSave}
                          leftIcon={<Save className="w-4 h-4" />}
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="md"
                          onClick={handleCancel}
                          leftIcon={<X className="w-4 h-4" />}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-soil-800 mb-4">Personal Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Full Name"
                          name="fullName"
                          value={isEditing ? tempData.fullName : profileData.fullName}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={isEditing ? tempData.email : profileData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <Input
                          label="Phone"
                          name="phone"
                          type="tel"
                          value={isEditing ? tempData.phone : profileData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-soil-800 mb-4">Address</h3>
                      <div className="space-y-4">
                        <Input
                          label="Address Line 1"
                          name="addressLine1"
                          value={isEditing ? tempData.addressLine1 : profileData.addressLine1}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <Input
                          label="Address Line 2"
                          name="addressLine2"
                          value={isEditing ? tempData.addressLine2 : profileData.addressLine2}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <div className="grid md:grid-cols-3 gap-4">
                          <Input
                            label="City"
                            name="city"
                            value={isEditing ? tempData.city : profileData.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                          <Input
                            label="State"
                            name="state"
                            value={isEditing ? tempData.state : profileData.state}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                          <Input
                            label="Postal Code"
                            name="postalCode"
                            value={isEditing ? tempData.postalCode : profileData.postalCode}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">
                      Order History
                    </h2>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-soil-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-soil-800">Order #{order.id}</h3>
                                <span
                                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                                    order.status === 'Delivered'
                                      ? 'bg-botanical-100 text-botanical-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-soil-600">
                                Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </p>
                              <p className="text-sm text-soil-600">{order.items} items</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-2xl font-bold text-soil-800">₹{order.total}</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => (window.location.href = `/track-order?order=${order.id}`)}
                                >
                                  Track Order
                                </Button>
                                {order.status === 'Delivered' && (
                                  <Button variant="ghost" size="sm">
                                    Buy Again
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">
                      My Wishlist
                    </h2>
                    {wishlistItems.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="border border-soil-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-48 bg-sand-100">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-soil-800 mb-2">{item.name}</h3>
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-botanical-600">₹{item.price}</span>
                                {item.inStock ? (
                                  <span className="text-sm text-botanical-600 font-medium">In Stock</span>
                                ) : (
                                  <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="primary" size="sm" className="flex-1">
                                  Add to Cart
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-soil-300 mx-auto mb-4" />
                        <p className="text-soil-600 mb-4">Your wishlist is empty</p>
                        <Button variant="primary" onClick={() => (window.location.href = '/products')}>
                          Browse Products
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-2xl font-display font-bold text-soil-800 mb-6">
                      Account Settings
                    </h2>
                    <div className="space-y-6">
                      <div className="pb-6 border-b border-soil-200">
                        <h3 className="font-semibold text-soil-800 mb-4">Password</h3>
                        <Button variant="outline" size="md">
                          Change Password
                        </Button>
                      </div>

                      <div className="pb-6 border-b border-soil-200">
                        <h3 className="font-semibold text-soil-800 mb-4">Email Preferences</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-soil-300 text-botanical-600 focus:ring-botanical-500" />
                            <span className="text-soil-700">Order updates and shipping notifications</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-soil-300 text-botanical-600 focus:ring-botanical-500" />
                            <span className="text-soil-700">Promotional emails and special offers</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded border-soil-300 text-botanical-600 focus:ring-botanical-500" />
                            <span className="text-soil-700">Product recommendations</span>
                          </label>
                        </div>
                      </div>

                      <div className="pb-6 border-b border-soil-200">
                        <h3 className="font-semibold text-soil-800 mb-4">Privacy</h3>
                        <div className="space-y-3">
                          <Button variant="outline" size="md">
                            Download My Data
                          </Button>
                          <Button variant="outline" size="md" className="ml-3">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </Layout>
  );
}
