import React, { useState } from 'react';
import {
    MapPin,
    Plus,
    Edit,
    Trash2,
    Home,
    Building,
    Phone,
    User,
    X,
    Star,
    Navigation,
    Clock,
    AlertCircle
} from 'lucide-react';

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
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            type: 'home',
            title: 'المنزل',
            fullName: 'أحمد محمد علي',
            phone: '+966 50 123 4567',
            email: 'ahmed@example.com',
            country: 'السعودية',
            city: 'الرياض',
            state: 'الرياض',
            zipCode: '12345',
            addressLine1: 'شارع الملك فهد، حي النخيل',
            addressLine2: 'مبنى رقم 123، الطابق الثالث',
            landmark: 'بجانب مسجد النور',
            instructions: 'الرجاء الاتصال عند الوصول',
            isDefault: true,
            createdAt: '2024-01-15',
            updatedAt: '2024-08-20'
        },
        {
            id: '2',
            type: 'work',
            title: 'العمل',
            fullName: 'أحمد محمد علي',
            phone: '+966 50 123 4567',
            country: 'السعودية',
            city: 'الرياض',
            state: 'الرياض',
            zipCode: '11564',
            addressLine1: 'شارع العليا، برج المملكة',
            addressLine2: 'الطابق 15، مكتب 1505',
            landmark: 'مقابل مول المملكة',
            instructions: 'مكتب الاستقبال في الطابق الأرضي',
            isDefault: false,
            createdAt: '2024-02-20',
            updatedAt: '2024-07-10'
        },
        {
            id: '3',
            type: 'other',
            title: 'منزل الوالدين',
            fullName: 'محمد علي أحمد',
            phone: '+966 55 987 6543',
            country: 'السعودية',
            city: 'جدة',
            state: 'مكة المكرمة',
            zipCode: '23444',
            addressLine1: 'شارع الأمير سلطان، حي الزهراء',
            addressLine2: 'فيلا رقم 456',
            landmark: 'بجانب حديقة الزهراء',
            isDefault: false,
            createdAt: '2024-03-10',
            updatedAt: '2024-06-15'
        }
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState<Partial<Address>>({
        type: 'home',
        title: '',
        fullName: '',
        phone: '',
        email: '',
        country: 'السعودية',
        city: '',
        state: '',
        zipCode: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        instructions: '',
        isDefault: false
    });

    const handleInputChange = (field: keyof Address, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingAddress) {
            // Update existing address
            setAddresses(prev => prev.map(addr =>
                addr.id === editingAddress.id
                    ? { ...addr, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
                    : formData.isDefault ? { ...addr, isDefault: false } : addr
            ));
            setEditingAddress(null);
        } else {
            // Add new address
            const newAddress: Address = {
                ...formData as Address,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0]
            };

            if (formData.isDefault) {
                setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })).concat(newAddress));
            } else {
                setAddresses(prev => prev.concat(newAddress));
            }
        }

        setShowAddModal(false);
        setFormData({
            type: 'home',
            title: '',
            fullName: '',
            phone: '',
            email: '',
            country: 'السعودية',
            city: '',
            state: '',
            zipCode: '',
            addressLine1: '',
            addressLine2: '',
            landmark: '',
            instructions: '',
            isDefault: false
        });
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setFormData(address);
        setShowAddModal(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا العنوان؟')) {
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
            case 'home': return <Home className="w-5 h-5 text-blue-600" />;
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
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">دفتر العناوين</h1>
                                <p className="mt-2 text-gray-600">إدارة عناوين التسليم والفواتير</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4 ml-2" />
                                إضافة عنوان جديد
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <MapPin className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="mr-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">إجمالي العناوين</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{addresses.length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Star className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div className="mr-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">العنوان الافتراضي</dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {addresses.find(addr => addr.isDefault)?.title || 'غير محدد'}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="mr-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">آخر تحديث</dt>
                                    <dd className="text-sm font-semibold text-gray-900">
                                        {addresses.length > 0
                                            ? new Date(Math.max(...addresses.map(addr => new Date(addr.updatedAt).getTime()))).toLocaleDateString('ar-SA')
                                            : '-'}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {addresses.map((address) => (
                        <div key={address.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Card Header */}
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        {getAddressIcon(address.type)}
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{address.title}</h3>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAddressTypeColor(address.type)}`}>
                                                {address.type === 'home' ? 'منزل' : address.type === 'work' ? 'عمل' : 'أخرى'}
                                            </span>
                                        </div>
                                    </div>
                                    {address.isDefault && (
                                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                            <Star className="w-3 h-3 ml-1 fill-current" />
                                            افتراضي
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="px-6 py-4">
                                <div className="space-y-3">
                                    {/* Name and Phone */}
                                    <div>
                                        <div className="flex items-center space-x-2 space-x-reverse text-sm">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-900">{address.fullName}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mt-1">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span>{address.phone}</span>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p className="font-medium">{address.addressLine1}</p>
                                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                                        <p>{address.city}, {address.state} {address.zipCode}</p>
                                        <p className="text-gray-500">{address.country}</p>
                                    </div>

                                    {/* Landmark */}
                                    {address.landmark && (
                                        <div className="flex items-start space-x-2 space-x-reverse text-sm text-gray-600">
                                            <Navigation className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span>{address.landmark}</span>
                                        </div>
                                    )}

                                    {/* Instructions */}
                                    {address.instructions && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <div className="flex items-start space-x-2 space-x-reverse">
                                                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-blue-800">{address.instructions}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Actions */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 space-x-reverse">
                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            <Edit className="w-4 h-4 ml-1" />
                                            تعديل
                                        </button>
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 ml-1" />
                                            حذف
                                        </button>
                                    </div>
                                    {!address.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(address.id)}
                                            className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            <Star className="w-4 h-4 ml-1" />
                                            تعيين كافتراضي
                                        </button>
                                    )}
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    آخر تحديث: {new Date(address.updatedAt).toLocaleDateString('ar-SA')}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Address Card */}
                    <div
                        onClick={() => setShowAddModal(true)}
                        className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group"
                    >
                        <div className="flex flex-col items-center justify-center py-12 px-6">
                            <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-colors">
                                <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">إضافة عنوان جديد</h3>
                            <p className="text-sm text-gray-500 text-center">
                                أضف عنوان تسليم جديد لتسهيل عملية الطلب
                            </p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {addresses.length === 0 && (
                    <div className="text-center py-12">
                        <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">لا توجد عناوين محفوظة</h3>
                        <p className="mt-2 text-gray-500 mb-4">ابدأ بإضافة عنوان التسليم الأول</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 ml-2" />
                            إضافة عنوان
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Address Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingAddress ? 'تعديل العنوان' : 'إضافة عنوان جديد'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingAddress(null);
                                    setFormData({
                                        type: 'home',
                                        title: '',
                                        fullName: '',
                                        phone: '',
                                        email: '',
                                        country: 'السعودية',
                                        city: '',
                                        state: '',
                                        zipCode: '',
                                        addressLine1: '',
                                        addressLine2: '',
                                        landmark: '',
                                        instructions: '',
                                        isDefault: false
                                    });
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Address Type and Title */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        نوع العنوان *
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleInputChange('type', e.target.value as Address['type'])}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="home">منزل</option>
                                        <option value="work">عمل</option>
                                        <option value="other">أخرى</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        عنوان مخصص *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="مثل: المنزل، المكتب، منزل الوالدين"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        الاسم الكامل *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        رقم الهاتف *
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="+966 50 123 4567"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    البريد الإلكتروني (اختياري)
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        الدولة *
                                    </label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="السعودية">السعودية</option>
                                        <option value="الإمارات">الإمارات</option>
                                        <option value="الكويت">الكويت</option>
                                        <option value="قطر">قطر</option>
                                        <option value="البحرين">البحرين</option>
                                        <option value="عُمان">عُمان</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        المدينة *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        المنطقة *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => handleInputChange('state', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        العنوان التفصيلي *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.addressLine1}
                                        onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                                        placeholder="الشارع والحي"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        الرمز البريدي *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    تفاصيل إضافية (اختياري)
                                </label>
                                <input
                                    type="text"
                                    value={formData.addressLine2}
                                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                                    placeholder="رقم المبنى، الطابق، رقم الشقة"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    معلم مرجعي (اختياري)
                                </label>
                                <input
                                    type="text"
                                    value={formData.landmark}
                                    onChange={(e) => handleInputChange('landmark', e.target.value)}
                                    placeholder="مثل: بجانب المسجد، مقابل السوق"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    تعليمات للتسليم (اختياري)
                                </label>
                                <textarea
                                    value={formData.instructions}
                                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                                    placeholder="مثل: الاتصال قبل التسليم، التسليم في المساء فقط"
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Default Address */}
                            <div className="flex items-center space-x-3 space-x-reverse">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={formData.isDefault}
                                    onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isDefault" className="text-sm font-medium text-gray-900">
                                    تعيين كعنوان افتراضي
                                </label>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-3 space-x-reverse pt-6 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setEditingAddress(null);
                                        setFormData({
                                            type: 'home',
                                            title: '',
                                            fullName: '',
                                            phone: '',
                                            email: '',
                                            country: 'السعودية',
                                            city: '',
                                            state: '',
                                            zipCode: '',
                                            addressLine1: '',
                                            addressLine2: '',
                                            landmark: '',
                                            instructions: '',
                                            isDefault: false
                                        });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editingAddress ? 'حفظ التعديلات' : 'حفظ العنوان'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAddressesPage;