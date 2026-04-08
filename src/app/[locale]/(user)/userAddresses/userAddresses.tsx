'use client';
import React, { useState } from 'react';
import {
    MapPin,
    Plus,
    Edit,
    Trash2,
    Home as HomeIcon,
    Building,
    Phone,
    User,
    Star,
    AlertCircle
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface Address {
    id: string;
    type: 'home' | 'work' | 'other';
    title: string;
    fullName: string;
    phone: string;
    email?: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    instructions?: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

const UserAddressesPage = () => {
    const t = useTranslations("profile.addresses");
    const locale = useLocale();
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            type: 'home',
            title: locale === 'ar' ? 'المنزل' : 'Home',
            fullName: 'Ahmed Mohamed Ali',
            phone: '+966 50 123 4567',
            email: 'ahmed@example.com',
            country: 'Saudi Arabia',
            city: 'Riyadh',
            state: 'Riyadh',
            zipCode: '12345',
            addressLine1: 'King Fahd Road, Al-Nakheel District',
            addressLine2: 'Building 123, 3rd Floor',
            landmark: 'Next to Al Nour Mosque',
            instructions: 'Please call on arrival',
            isDefault: true,
            createdAt: '2024-01-15',
            updatedAt: '2024-08-20'
        }
    ]);

    const [, setShowAddModal] = useState(false);

    const handleEdit = () => {
        setShowAddModal(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            setAddresses(prev => prev.filter(addr => addr.id !== id));
        }
    };

    const handleSetDefault = (id: string) => {
        setAddresses(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const getAddressIcon = (type: Address['type']) => {
        switch (type) {
            case 'home': return <HomeIcon className="w-5 h-5 text-blue-600" />;
            case 'work': return <Building className="w-5 h-5 text-green-600" />;
            default: return <MapPin className="w-5 h-5 text-purple-600" />;
        }
    };

    const getAddressTypeColor = (type: Address['type']) => {
        switch (type) {
            case 'home': return 'bg-blue-100 text-blue-800';
            case 'work': return 'bg-green-100 text-green-800';
            default: return 'bg-purple-100 text-purple-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
                                <p className="mt-2 text-gray-600">{t("subtitle")}</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                            >
                                <Plus className="w-4 h-4 me-2" />
                                {t("add_new")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {addresses.map((address) => (
                        <div key={address.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getAddressIcon(address.type)}
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{address.title}</h3>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAddressTypeColor(address.type)}`}>
                                                {t(`types.${address.type}`)}
                                            </span>
                                        </div>
                                    </div>
                                    {address.isDefault && (
                                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                            <Star className="w-3 h-3 me-1 fill-current" />
                                            {t("default")}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="px-6 py-4">
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-900">{address.fullName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span>{address.phone}</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p className="font-medium">{address.addressLine1}</p>
                                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                                        <p>{address.city}, {address.state} {address.zipCode}</p>
                                        <p className="text-gray-500">{address.country}</p>
                                    </div>

                                    {address.instructions && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                                <p className="text-sm text-blue-800">{address.instructions}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="inline-flex items-center px-1 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            <Edit className="w-4 h-4 me-1" />
                                            {t("edit")}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="inline-flex items-center px-1 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 me-1" />
                                            {t("delete")}
                                        </button>
                                    </div>
                                    {!address.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(address.id)}
                                            className="inline-flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                                        >
                                            <Star className="w-3 h-3 me-1" />
                                            {t("set_default")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div
                        onClick={() => setShowAddModal(true)}
                        className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group flex flex-col items-center justify-center py-12 px-6 min-h-[300px]"
                    >
                        <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{t("add_new")}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAddressesPage;