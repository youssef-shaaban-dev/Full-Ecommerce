'use client'
import React, { useState } from 'react';
import {
    Search,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Package,
    Truck,
    ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface Order {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    itemsCount: number;
    image: string;
    trackingNumber?: string;
}

const CustomerOrdersPage = () => {
    const t = useTranslations("orders");
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data
    const orders: Order[] = [
        {
            id: 'ORD-001',
            date: '2024-08-20T10:30:00',
            status: 'shipped',
            total: 1412.16,
            itemsCount: 4,
            image: '/api/placeholder/80/80',
            trackingNumber: 'TRK123456789'
        },
        {
            id: 'ORD-002',
            date: '2024-08-15T14:20:00',
            status: 'delivered',
            total: 245.50,
            itemsCount: 2,
            image: '/api/placeholder/80/80',
            trackingNumber: 'TRK987654321'
        },
        {
            id: 'ORD-003',
            date: '2024-08-10T09:00:00',
            status: 'cancelled',
            total: 89.99,
            itemsCount: 1,
            image: '/api/placeholder/80/80'
        }
    ];

    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'all' || order.status === activeTab;
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.trackingNumber?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
            case 'processing': return 'text-blue-600 bg-blue-100 border-blue-200';
            case 'shipped': return 'text-purple-600 bg-purple-100 border-purple-200';
            case 'delivered': return 'text-green-600 bg-green-100 border-green-200';
            case 'cancelled': return 'text-red-600 bg-red-100 border-red-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const statusIcons = {
        pending: <Clock className="w-4 h-4" />,
        processing: <Package className="w-4 h-4" />,
        shipped: <Truck className="w-4 h-4" />,
        delivered: <CheckCircle className="w-4 h-4" />,
        cancelled: <XCircle className="w-4 h-4" />
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t("list.title")}</h1>
                    <p className="mt-2 text-gray-600">{t("list.subtitle")}</p>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Tabs */}
                        <div className="flex p-1 bg-gray-100 rounded-lg overflow-x-auto no-scrollbar">
                            {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${activeTab === tab
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {t(`list.tabs.${tab}`)}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute inset-y-0 right-3 flex items-center w-4 h-4 text-gray-400 pointer-events-none mt-3 rtl:left-3 rtl:right-auto" />
                            <input
                                type="text"
                                placeholder={t("list.search_placeholder")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none rtl:pl-10 rtl:pr-4"
                            />
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-200 transition-all overflow-hidden group"
                            >
                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            {/* Order Image/Preview */}
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={order.image}
                                                    alt={order.id}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Order Meta */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        {t("list.order_card.order_no")}{order.id}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 me-1" />
                                                    <span>{new Date(order.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                <span className="me-1.5">{statusIcons[order.status]}</span>
                                                {t(`status.${order.status}`)}
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-gray-500 me-2">{order.itemsCount} {t("list.order_card.items_count")}</span>
                                                <span className="font-bold text-gray-900">{t("list.order_card.total")} ${order.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-100 flex items-center justify-end gap-3">
                                    <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                                        <span>{t("list.order_card.view_details")}</span>
                                        <ArrowLeft className="w-4 h-4 ms-1 rtl:rotate-180" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">{t("list.empty.title")}</h3>
                            <p className="text-gray-500 mt-1">{t("list.empty.desc")}</p>
                            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                {t("list.empty.action")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerOrdersPage;