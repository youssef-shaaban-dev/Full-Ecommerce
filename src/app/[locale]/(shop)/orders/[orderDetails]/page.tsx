'use client'
import React, { useState } from 'react';
import {
  ArrowRight,
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  Download,
  MessageCircle,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  Phone,
  Mail,
  Copy
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sku: string;
  variant?: string;
}

interface ShippingAddress {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderTracking {
  status: string;
  date: string;
  location?: string;
  description: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
  estimatedDelivery?: string;
  tracking?: OrderTracking[];
  notes?: string;
}

const OrderDetailsPage = () => {
  const t = useTranslations("orders");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'details' | 'tracking' | 'invoice'>('details');

  // Bilingual Mock Data
  const order: Order = {
    id: 'ORD-001',
    date: '2024-08-20T10:30:00',
    status: 'shipped',
    items: [
      {
        id: '1',
        name: locale === 'ar' ? 'آيفون 15 برو - 256 جيجابايت' : 'iPhone 15 Pro - 256GB',
        image: '/api/placeholder/120/120',
        price: 1199.99,
        quantity: 1,
        sku: 'IPH15P-256-BLU',
        variant: locale === 'ar' ? 'أزرق تيتانيوم' : 'Blue Titanium'
      },
      {
        id: '2',
        name: locale === 'ar' ? 'حافظة جلدية أصلية' : 'Original Leather Case',
        image: '/api/placeholder/120/120',
        price: 59.99,
        quantity: 1,
        sku: 'CASE-LEA-BLK',
        variant: locale === 'ar' ? 'أسود' : 'Black'
      },
      {
        id: '3',
        name: locale === 'ar' ? 'شاحن لاسلكي سريع' : 'Fast Wireless Charger',
        image: '/api/placeholder/120/120',
        price: 39.99,
        quantity: 2,
        sku: 'WCH-FAST-15W'
      }
    ],
    subtotal: 1339.96,
    shipping: 15.00,
    tax: 107.20,
    discount: 50.00,
    total: 1412.16,
    paymentMethod: locale === 'ar' ? 'فيزا **** 1234' : 'Visa **** 1234',
    shippingAddress: {
      name: locale === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohamed Ali',
      phone: '+966 50 123 4567',
      street: locale === 'ar' ? 'شارع الملك فهد، حي النخيل، مبنى 123' : 'King Fahd Road, Al Nakheel Dist, Bldg 123',
      city: locale === 'ar' ? 'الرياض' : 'Riyadh',
      state: locale === 'ar' ? 'الرياض' : 'Riyadh',
      zipCode: '12345',
      country: locale === 'ar' ? 'السعودية' : 'Saudi Arabia'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-08-25',
    tracking: [
      {
        status: 'order_confirmed',
        date: '2024-08-20T10:30:00',
        description: 'order_received_desc'
      },
      {
        status: 'preparing',
        date: '2024-08-20T14:15:00',
        description: 'preparing_desc'
      },
      {
        status: 'shipped',
        date: '2024-08-21T09:00:00',
        location: locale === 'ar' ? 'مركز التوزيع' : 'Distribution Center',
        description: 'delivered_to_carrier_desc'
      },
      {
        status: 'on_the_way',
        date: '2024-08-22T11:30:00',
        location: locale === 'ar' ? 'مركز الفرز' : 'Sorting Center',
        description: 'shipped_to_address_desc'
      }
    ],
    notes: locale === 'ar' ? 'يرجى التسليم في المساء بعد الساعة 6 مساءً' : 'Please deliver in the evening after 6 PM'
  };

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

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'processing': return <Package className="w-5 h-5" />;
      case 'shipped': return <Truck className="w-5 h-5" />;
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'cancelled': return <XCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    return t(`status.${status}`);
  };

  const copyTrackingNumber = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors rtl:rotate-180">
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t("details.title")}{order.id}</h1>
                <p className="text-sm text-gray-500">
                  {t("details.date")} {new Date(order.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')} {t("details.at")} {new Date(order.date).toLocaleTimeString(locale === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ms-2">{getStatusText(order.status)}</span>
                </div>
                <div className="text-right rtl:text-left">
                  <p className="text-2xl font-bold text-gray-900">${order.total}</p>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t("details.tracking_no")}</p>
                      <p className="text-lg font-mono text-blue-600">{order.trackingNumber}</p>
                    </div>
                    <button
                      onClick={copyTrackingNumber}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {order.estimatedDelivery && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 me-1" />
                  <span>{t("details.estimated")}: {new Date(order.estimatedDelivery).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}</span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 overflow-x-auto">
                <nav className="flex whitespace-nowrap">
                  {[
                    { key: 'details', label: t("details.tabs.details"), icon: Package },
                    { key: 'tracking', label: t("details.tabs.tracking"), icon: Truck },
                    { key: 'invoice', label: t("details.tabs.invoice"), icon: Download }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key as typeof activeTab)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      <Icon className="w-4 h-4 me-1" />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Order Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">{t("details.products.title")}</h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg flex-wrap sm:flex-nowrap">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                              width={80}
                              height={80}
                            />
                            <div className="flex-1 min-w-[200px]">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">{t("details.products.sku")}: {item.sku}</p>
                              {item.variant && (
                                <p className="text-sm text-gray-500">{t("details.products.variant")}: {item.variant}</p>
                              )}
                              <p className="text-sm text-gray-500">{t("details.products.qty")}: {item.quantity}</p>
                            </div>
                            <div className="text-right rtl:text-left w-full sm:w-auto">
                              <p className="font-medium text-gray-900">${item.price}</p>
                              <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)} {t("details.products.total")}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{t("details.notes")}</h3>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-gray-700">{order.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tracking Tab */}
                {activeTab === 'tracking' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">{t("details.tabs.tracking")}</h3>
                      <div className="relative ps-6 border-s border-gray-200 space-y-8">
                        {order.tracking?.map((track, index) => (
                          <div key={index} className="relative">
                            <div className={`absolute -start-[30px] w-4 h-4 rounded-full border-2 border-white ${index === 0 ? 'bg-blue-500 ring-4 ring-blue-50' : 'bg-green-500'
                              }`}></div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between gap-4 flex-wrap">
                                <h4 className="font-medium text-gray-900">{t(`status.${track.status}`)}</h4>
                                <span className="text-sm text-gray-500">
                                  {new Date(track.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{t(`details.tracking.${track.description}`)}</p>
                              {track.location && (
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 me-1" />
                                  {track.location}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Invoice Tab */}
                {activeTab === 'invoice' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <h3 className="text-lg font-medium text-gray-900">{t("details.tabs.invoice")}</h3>
                      <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4 me-2" />
                        {t("details.tabs.invoice")}
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="space-y-4">
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-600">{t("details.payment.subtotal")}</span>
                          <span className="font-medium">${order.subtotal}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-600">{t("details.payment.shipping")}</span>
                          <span className="font-medium">${order.shipping}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-600">{t("details.payment.tax")}</span>
                          <span className="font-medium">${order.tax}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-green-600 gap-4">
                            <span>{t("details.payment.discount")}</span>
                            <span className="font-medium">-${order.discount}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex justify-between text-lg font-bold text-gray-900 gap-4">
                            <span>{t("details.payment.total")}</span>
                            <span>${order.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{t("details.payment.title")}</h4>
                      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-4">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700 font-medium">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t("details.shipping_addr")}</h3>
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-gray-900">{order.shippingAddress.name}</p>
                <div className="text-gray-600 space-y-1">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t("details.actions.title")}</h3>
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-4 h-4 me-2" />
                  {t("details.actions.contact")}
                </button>
                {order.status === 'delivered' && (
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                    <Star className="w-4 h-4 me-2" />
                    {t("details.actions.rate")}
                  </button>
                )}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 transition-colors">
                    <XCircle className="w-4 h-4 me-2" />
                    {t("details.actions.cancel")}
                  </button>
                )}
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-600 rounded-lg p-6 text-white shadow-md">
              <h3 className="text-lg font-bold mb-2">{t("details.help.title")}</h3>
              <p className="text-sm text-blue-50 mb-4 opacity-90">{t("details.help.desc")}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-medium">+966 11 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium">support@store.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default OrderDetailsPage;