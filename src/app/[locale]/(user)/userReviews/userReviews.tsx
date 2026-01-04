import React, { useState } from 'react';
import {
    Star,
    Edit,
    Trash2,
    ThumbsUp,
    MessageCircle,
    Calendar,
    Package,
    Award,
    TrendingUp,
    Eye,
    Filter,
    ChevronDown,
    Plus,
    Search,
    MoreHorizontal,
    ExternalLink,
    Image,
    Check,
    Clock
} from 'lucide-react';

interface UserReview {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    productCategory: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    helpful: number;
    views: number;
    status: 'published' | 'pending' | 'rejected';
    images?: string[];
    pros?: string[];
    cons?: string[];
    recommended: boolean;
    verified: boolean;
    edited?: boolean;
    editDate?: string;
}

interface UserStats {
    totalReviews: number;
    totalHelpful: number;
    totalViews: number;
    averageRating: number;
    reviewsThisMonth: number;
    helpfulRate: number;
}

const UserReviewsPage = () => {
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'pending' | 'rejected'>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful' | 'views'>('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [showStats, setShowStats] = useState(true);

    // إحصائيات المستخدم
    const userStats: UserStats = {
        totalReviews: 24,
        totalHelpful: 156,
        totalViews: 892,
        averageRating: 4.2,
        reviewsThisMonth: 5,
        helpfulRate: 87
    };

    // مراجعات المستخدم
    const userReviews: UserReview[] = [
        {
            id: '1',
            productId: 'p1',
            productName: 'iPhone 15 Pro - 256GB',
            productImage: '/api/placeholder/80/80',
            productCategory: 'الهواتف الذكية',
            rating: 5,
            title: 'أفضل هاتف استخدمته على الإطلاق',
            content: 'اشتريت هذا الهاتف قبل 3 أشهر وأنا راضٍ جداً عن الأداء. الكاميرا رائعة، البطارية تدوم طويلاً، والتصميم أنيق جداً. أنصح به بقوة لكل من يبحث عن هاتف متطور.',
            date: '2024-08-20',
            helpful: 45,
            views: 234,
            status: 'published',
            images: ['/api/placeholder/120/120', '/api/placeholder/120/120'],
            pros: ['كاميرا ممتازة', 'بطارية طويلة المدى', 'تصميم أنيق'],
            cons: ['السعر مرتفع'],
            recommended: true,
            verified: true
        },
        {
            id: '2',
            productId: 'p2',
            productName: 'MacBook Air M2',
            productImage: '/api/placeholder/80/80',
            productCategory: 'أجهزة الكمبيوتر',
            rating: 4,
            title: 'جهاز ممتاز للعمل والدراسة',
            content: 'لابتوب رائع للاستخدام اليومي. سريع، خفيف، وبطاريته تدوم طوال اليوم. مناسب جداً للطلاب والمحترفين.',
            date: '2024-08-15',
            helpful: 28,
            views: 156,
            status: 'published',
            pros: ['أداء سريع', 'بطارية ممتازة', 'خفيف الوزن'],
            cons: ['منافذ قليلة', 'ذاكرة غير قابلة للتطوير'],
            recommended: true,
            verified: true,
            edited: true,
            editDate: '2024-08-16'
        },
        {
            id: '3',
            productId: 'p3',
            productName: 'AirPods Pro 2nd Generation',
            productImage: '/api/placeholder/80/80',
            productCategory: 'الصوتيات',
            rating: 5,
            title: 'أفضل سماعات لاسلكية',
            content: 'جودة صوت مذهلة وإلغاء ضوضاء فعال جداً. مريحة جداً في الأذن ولا تسقط أبداً.',
            date: '2024-08-10',
            helpful: 67,
            views: 445,
            status: 'published',
            images: ['/api/placeholder/120/120'],
            pros: ['جودة صوت ممتازة', 'إلغاء ضوضاء فعال', 'مريحة جداً'],
            cons: [],
            recommended: true,
            verified: true
        },
        {
            id: '4',
            productId: 'p4',
            productName: 'Samsung Galaxy Watch 6',
            productImage: '/api/placeholder/80/80',
            productCategory: 'الساعات الذكية',
            rating: 3,
            title: 'جيدة لكن تحتاج تحسينات',
            content: 'الساعة بشكل عام جيدة لكن البطارية تنفد بسرعة والتطبيقات بطيئة أحياناً.',
            date: '2024-08-05',
            helpful: 12,
            views: 89,
            status: 'published',
            pros: ['تصميم جميل', 'مقاومة للماء'],
            cons: ['بطارية ضعيفة', 'تطبيقات بطيئة'],
            recommended: false,
            verified: true
        },
        {
            id: '5',
            productId: 'p5',
            productName: 'Sony WH-1000XM5 Headphones',
            productImage: '/api/placeholder/80/80',
            productCategory: 'الصوتيات',
            rating: 4,
            title: 'سماعات ممتازة للموسيقى',
            content: 'جودة صوت رائعة وإلغاء ضوضاء جيد. مريحة للاستخدام لفترات طويلة.',
            date: '2024-07-28',
            helpful: 23,
            views: 167,
            status: 'pending',
            pros: ['جودة صوت عالية', 'مريحة', 'بطارية جيدة'],
            cons: ['ثقيلة نوعاً ما'],
            recommended: true,
            verified: false
        },
        {
            id: '6',
            productId: 'p6',
            productName: 'iPad Pro 12.9 inch',
            productImage: '/api/placeholder/80/80',
            productCategory: 'الأجهزة اللوحية',
            rating: 2,
            title: 'لا يستحق السعر',
            content: 'الجهاز جيد لكن السعر مبالغ فيه بالنسبة للميزات المقدمة.',
            date: '2024-07-20',
            helpful: 8,
            views: 45,
            status: 'rejected',
            pros: ['شاشة جميلة'],
            cons: ['سعر مرتفع جداً', 'ثقيل', 'نظام محدود'],
            recommended: false,
            verified: true
        }
    ];

    const filteredReviews = userReviews.filter(review => {
        if (selectedStatus !== 'all' && review.status !== selectedStatus) return false;
        if (searchQuery && !review.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !review.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const sortedReviews = [...filteredReviews].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            case 'oldest':
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case 'rating':
                return b.rating - a.rating;
            case 'helpful':
                return b.helpful - a.helpful;
            case 'views':
                return b.views - a.views;
            default:
                return 0;
        }
    });

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center space-x-1 space-x-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const getStatusColor = (status: UserReview['status']) => {
        switch (status) {
            case 'published': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status: UserReview['status']) => {
        switch (status) {
            case 'published': return 'منشورة';
            case 'pending': return 'في الانتظار';
            case 'rejected': return 'مرفوضة';
            default: return status;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">مراجعاتي</h1>
                        <p className="mt-2 text-gray-600">إدارة وتتبع جميع مراجعاتك للمنتجات</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                {showStats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MessageCircle className="h-8 w-8 text-blue-600" />
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">إجمالي المراجعات</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{userStats.totalReviews}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="text-sm text-green-600 flex items-center">
                                    <TrendingUp className="w-4 h-4 ml-1" />
                                    +{userStats.reviewsThisMonth} هذا الشهر
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ThumbsUp className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">إعجابات مفيدة</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{userStats.totalHelpful}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="text-sm text-gray-600">
                                    {userStats.helpfulRate}% معدل الفائدة
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Eye className="h-8 w-8 text-purple-600" />
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">إجمالي المشاهدات</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{userStats.totalViews}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Award className="h-8 w-8 text-yellow-600" />
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">متوسط التقييم</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{userStats.averageRating}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-3">
                                {renderStars(Math.round(userStats.averageRating))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters and Controls */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="البحث في المراجعات..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">جميع الحالات</option>
                                    <option value="published">منشورة</option>
                                    <option value="pending">في الانتظار</option>
                                    <option value="rejected">مرفوضة</option>
                                </select>
                                <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="newest">الأحدث</option>
                                    <option value="oldest">الأقدم</option>
                                    <option value="rating">الأعلى تقييماً</option>
                                    <option value="helpful">الأكثر إفادة</option>
                                    <option value="views">الأكثر مشاهدة</option>
                                </select>
                                <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Add Review Button */}
                        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4 ml-2" />
                            إضافة مراجعة جديدة
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {sortedReviews.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">لا توجد مراجعات</h3>
                            <p className="mt-2 text-gray-500">لم يتم العثور على مراجعات تطابق البحث.</p>
                        </div>
                    ) : (
                        sortedReviews.map((review) => (
                            <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                {/* Review Header */}
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 space-x-reverse">
                                            <img
                                                src={review.productImage}
                                                alt={review.productName}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{review.productName}</h3>
                                                <p className="text-sm text-gray-500">{review.productCategory}</p>
                                            </div>
                                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                                                {review.status === 'published' && <Check className="w-3 h-3 ml-1" />}
                                                {review.status === 'pending' && <Clock className="w-3 h-3 ml-1" />}
                                                {getStatusText(review.status)}
                                            </div>
                                            {review.verified && (
                                                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                    <Check className="w-3 h-3 ml-1" />
                                                    مؤكد
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2 space-x-reverse">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="px-6 py-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                                                {renderStars(review.rating)}
                                                <span className="text-sm text-gray-500">
                                                    {new Date(review.date).toLocaleDateString('ar-SA')}
                                                </span>
                                                {review.edited && (
                                                    <span className="text-xs text-gray-400">
                                                        • معدلة في {new Date(review.editDate!).toLocaleDateString('ar-SA')}
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h4>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                                    {/* Pros and Cons */}
                                    {(review.pros?.length || review.cons?.length) && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            {review.pros && review.pros.length > 0 && (
                                                <div>
                                                    <h5 className="text-sm font-medium text-green-800 mb-2">المميزات:</h5>
                                                    <ul className="space-y-1">
                                                        {review.pros.map((pro, index) => (
                                                            <li key={index} className="text-sm text-green-700 flex items-start space-x-1 space-x-reverse">
                                                                <span className="text-green-500 mt-1">+</span>
                                                                <span>{pro}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {review.cons && review.cons.length > 0 && (
                                                <div>
                                                    <h5 className="text-sm font-medium text-red-800 mb-2">العيوب:</h5>
                                                    <ul className="space-y-1">
                                                        {review.cons.map((con, index) => (
                                                            <li key={index} className="text-sm text-red-700 flex items-start space-x-1 space-x-reverse">
                                                                <span className="text-red-500 mt-1">-</span>
                                                                <span>{con}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Review Images */}
                                    {review.images && review.images.length > 0 && (
                                        <div className="flex space-x-3 space-x-reverse mb-4">
                                            {review.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`صورة ${index + 1}`}
                                                    className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Recommendation */}
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${review.recommended
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {review.recommended ? '✓ أنصح بالشراء' : '✗ لا أنصح بالشراء'}
                                    </div>

                                    {/* Stats and Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
                                            <div className="flex items-center space-x-1 space-x-reverse">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>{review.helpful} مفيد</span>
                                            </div>
                                            <div className="flex items-center space-x-1 space-x-reverse">
                                                <Eye className="w-4 h-4" />
                                                <span>{review.views} مشاهدة</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 space-x-reverse">
                                            {review.status === 'published' && (
                                                <>
                                                    <button className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                        <Edit className="w-4 h-4 ml-1" />
                                                        تعديل
                                                    </button>
                                                    <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors">
                                                        <Trash2 className="w-4 h-4 ml-1" />
                                                        حذف
                                                    </button>
                                                </>
                                            )}
                                            {review.status === 'pending' && (
                                                <span className="text-sm text-yellow-600">في انتظار المراجعة</span>
                                            )}
                                            {review.status === 'rejected' && (
                                                <button className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                    <Edit className="w-4 h-4 ml-1" />
                                                    إعادة تقديم
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {sortedReviews.length > 0 && (
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
                                    عرض <span className="font-medium">1</span> إلى <span className="font-medium">{sortedReviews.length}</span> من{' '}
                                    <span className="font-medium">{sortedReviews.length}</span> مراجعة
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        السابق
                                    </button>
                                    <button className="relative inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20">
                                        1
                                    </button>
                                    <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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

export default UserReviewsPage;