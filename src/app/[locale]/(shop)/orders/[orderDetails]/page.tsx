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
  Copy,
  ExternalLink
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'details' | 'tracking' | 'invoice'>('details');

  // بيانات وهمية للطلب
  const order: Order = {
    id: 'ORD-001',
    date: '2024-08-20T10:30:00',
    status: 'shipped',
    items: [
      {
        id: '1',
        name: 'iPhone 15 Pro - 256GB',
        image: '/api/placeholder/120/120',
        price: 1199.99,
        quantity: 1,
        sku: 'IPH15P-256-BLU',
        variant: 'أزرق تيتانيوم'
      },
      {
        id: '2',
        name: 'حافظة جلدية أصلية',
        image: '/api/placeholder/120/120',
        price: 59.99,
        quantity: 1,
        sku: 'CASE-LEA-BLK',
        variant: 'أسود'
      },
      {
        id: '3',
        name: 'شاحن لاسلكي سريع',
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
    paymentMethod: 'فيزا **** 1234',
    shippingAddress: {
      name: 'أحمد محمد علي',
      phone: '+966 50 123 4567',
      street: 'شارع الملك فهد، حي النخيل، مبنى 123',
      city: 'الرياض',
      state: 'الرياض',
      zipCode: '12345',
      country: 'السعودية'
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-08-25',
    tracking: [
      {
        status: 'تم تأكيد الطلب',
        date: '2024-08-20T10:30:00',
        description: 'تم استلام طلبكم وبدء المعالجة'
      },
      {
        status: 'قيد التحضير',
        date: '2024-08-20T14:15:00',
        description: 'جاري تحضير المنتجات وتغليفها'
      },
      {
        status: 'تم الشحن',
        date: '2024-08-21T09:00:00',
        location: 'مركز التوزيع - الرياض',
        description: 'تم تسليم الشحنة لشركة الشحن'
      },
      {
        status: 'في الطريق',
        date: '2024-08-22T11:30:00',
        location: 'مركز فرز الدمام',
        description: 'الشحنة في الطريق إلى العنوان المحدد'
      }
    ],
    notes: 'يرجى التسليم في المساء بعد الساعة 6 مساءً'
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
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'processing': return 'قيد المعالجة';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const copyTrackingNumber = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">تفاصيل الطلب #{order.id}</h1>
                <p className="text-sm text-gray-500">
                  تم الطلب في {new Date(order.date).toLocaleDateString('ar-SA')} الساعة {new Date(order.date).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
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
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="mr-2">{getStatusText(order.status)}</span>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900">${order.total}</p>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">رقم التتبع</p>
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
                  <Calendar className="w-4 h-4 ml-1" />
                  <span>التسليم المتوقع: {new Date(order.estimatedDelivery).toLocaleDateString('ar-SA')}</span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { key: 'details', label: 'تفاصيل الطلب', icon: Package },
                    { key: 'tracking', label: 'تتبع الشحنة', icon: Truck },
                    { key: 'invoice', label: 'الفاتورة', icon: Download }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key as any)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${activeTab === key
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      <Icon className="w-4 h-4 ml-1" />
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
                      <h3 className="text-lg font-medium text-gray-900 mb-4">المنتجات المطلوبة</h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 space-x-reverse p-4 border border-gray-200 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">رقم المنتج: {item.sku}</p>
                              {item.variant && (
                                <p className="text-sm text-gray-500">النوع: {item.variant}</p>
                              )}
                              <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-gray-900">${item.price}</p>
                              <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)} الإجمالي</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">ملاحظات خاصة</h3>
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
                      <h3 className="text-lg font-medium text-gray-900 mb-4">تتبع الشحنة</h3>
                      <div className="space-y-4">
                        {order.tracking?.map((track, index) => (
                          <div key={index} className="flex items-start space-x-4 space-x-reverse">
                            <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${index === 0 ? 'bg-blue-500' : 'bg-green-500'
                              }`}></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{track.status}</h4>
                                <span className="text-sm text-gray-500">
                                  {new Date(track.date).toLocaleDateString('ar-SA')} {new Date(track.date).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{track.description}</p>
                              {track.location && (
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 ml-1" />
                                  {track.location}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          تتبع الشحنة على موقع شركة الشحن
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Invoice Tab */}
                {activeTab === 'invoice' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">الفاتورة</h3>
                      <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                        <Download className="w-4 h-4 ml-1" />
                        تحميل الفاتورة
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">المجموع الفرعي</span>
                          <span className="font-medium">${order.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الشحن</span>
                          <span className="font-medium">${order.shipping}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الضريبة</span>
                          <span className="font-medium">${order.tax}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>الخصم</span>
                            <span className="font-medium">-${order.discount}</span>
                          </div>
                        )}
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>المجموع الكلي</span>
                            <span>${order.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">طريقة الدفع</h4>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{order.paymentMethod}</span>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">عنوان التسليم</h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.street}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
                <div className="pt-2 space-y-1">
                  <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">الإجراءات</h3>
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  تواصل معنا
                </button>
                {order.status === 'delivered' && (
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                    <Star className="w-4 h-4 ml-2" />
                    تقييم المنتجات
                  </button>
                )}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100">
                    <XCircle className="w-4 h-4 ml-2" />
                    إلغاء الطلب
                  </button>
                )}
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">تحتاج مساعدة؟</h3>
              <p className="text-sm text-blue-700 mb-4">فريق الدعم متاح لمساعدتك</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-blue-700">
                  <Phone className="w-4 h-4" />
                  <span>+966 11 123 4567</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-blue-700">
                  <Mail className="w-4 h-4" />
                  <span>support@store.com</span>
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