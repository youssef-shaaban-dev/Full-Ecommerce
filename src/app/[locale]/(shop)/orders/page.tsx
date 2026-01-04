'use client'
import React, { useState } from 'react';
import { Package, Eye, Download, Star, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';

interface OrderItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
    trackingNumber?: string;
}




const CustomerOrdersPage = () => {
    const router = useRouter();
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'delivered' | 'cancelled'>('all');
    function showOrderDetails(id: number) {
        router.push(`/${locale}/${id}`)
    }
    // بيانات وهمية للطلبات
    const orders: Order[] = [
        {
            id: 'ORD-001',
            date: '2024-08-20',
            status: 'delivered',
            total: 299.99,
            items: [
                {
                    id: '1',
                    name: 'iPhone 15 Pro',
                    image: '/api/placeholder/80/80',
                    price: 299.99,
                    quantity: 1
                }
            ],
            trackingNumber: 'TRK123456789'
        },
        {
            id: 'ORD-002',
            date: '2024-08-18',
            status: 'shipped',
            total: 159.98,
            items: [
                {
                    id: '2',
                    name: 'Samsung Galaxy Watch',
                    image: '/api/placeholder/80/80',
                    price: 79.99,
                    quantity: 2
                }
            ],
            trackingNumber: 'TRK987654321'
        },
        {
            id: 'ORD-003',
            date: '2024-08-15',
            status: 'processing',
            total: 89.99,
            items: [
                {
                    id: '3',
                    name: 'Wireless Headphones',
                    image: '/api/placeholder/80/80',
                    price: 89.99,
                    quantity: 1
                }
            ]
        },
        {
            id: 'ORD-004',
            date: '2024-08-10',
            status: 'cancelled',
            total: 199.99,
            items: [
                {
                    id: '4',
                    name: 'Gaming Keyboard',
                    image: '/api/placeholder/80/80',
                    price: 199.99,
                    quantity: 1
                }
            ]
        }
    ];

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'processing': return 'text-blue-600 bg-blue-100';
            case 'shipped': return 'text-purple-600 bg-purple-100';
            case 'delivered': return 'text-green-600 bg-green-100';
            case 'cancelled': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'processing': return <Package className="w-4 h-4" />;
            case 'shipped': return <Truck className="w-4 h-4" />;
            case 'delivered': return <CheckCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    const getStatusText = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'في الانتظار';
            case 'processing': return 'قيد المعالجة';
            case 'shipped': return 'تم الشحن';
            case 'delivered': return 'تم التسليم';
            case 'cancelled': return 'ملغي';
            default: return status;
        }
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'all') return true;
        return order.status === activeTab;
    });

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">طلباتي</h1>
                        <p className="mt-2 text-gray-600">تتبع وإدارة جميع طلباتك</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 space-x-reverse">
                            {[
                                { key: 'all', label: 'جميع الطلبات', count: orders.length },
                                { key: 'pending', label: 'في الانتظار', count: orders.filter(o => o.status === 'pending').length },
                                { key: 'delivered', label: 'تم التسليم', count: orders.filter(o => o.status === 'delivered').length },
                                { key: 'cancelled', label: 'ملغية', count: orders.filter(o => o.status === 'cancelled').length }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.key
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">لا توجد طلبات</h3>
                            <p className="mt-2 text-gray-500">لم تقم بإجراء أي طلبات بعد.</p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                {/* Order Header */}
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 space-x-reverse">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">طلب #{order.id}</h3>
                                                <p className="text-sm text-gray-500">تاريخ الطلب: {new Date(order.date).toLocaleDateString('ar-SA')}</p>
                                            </div>
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="mr-1">{getStatusText(order.status)}</span>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                                            {order.trackingNumber && (
                                                <p className="text-sm text-gray-500">رقم التتبع: {order.trackingNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="px-6 py-4">
                                    <div className="space-y-4">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 space-x-reverse">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                                                    width={64}
                                                    height={64}
                                                />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-medium text-gray-900">${item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Actions */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-3 space-x-reverse">
                                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                <Eye className="w-4 h-4 ml-1" onClick={() => showOrderDetails(Number(order.id))} />
                                                عرض التفاصيل
                                            </button>
                                            {order.status === 'delivered' && (
                                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    <Download className="w-4 h-4 ml-1" />
                                                    تحميل الفاتورة
                                                </button>
                                            )}
                                            {order.trackingNumber && (
                                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    <Truck className="w-4 h-4 ml-1" />
                                                    تتبع الشحنة
                                                </button>
                                            )}
                                        </div>
                                        {order.status === 'delivered' && (
                                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                <Star className="w-4 h-4 ml-1" />
                                                تقييم المنتج
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filteredOrders.length > 0 && (
                    <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                السابق
                            </button>
                            <button className="relative mr-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                التالي
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    عرض <span className="font-medium">1</span> إلى <span className="font-medium">{filteredOrders.length}</span> من{' '}
                                    <span className="font-medium">{filteredOrders.length}</span> طلب
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        السابق
                                    </button>
                                    <button className="relative inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                        1
                                    </button>
                                    <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        التالي
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerOrdersPage;