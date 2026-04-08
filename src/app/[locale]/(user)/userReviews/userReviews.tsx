'use client';
import React, { useState } from 'react';
import {
    Star,
    Edit,
    Trash2,
    ThumbsUp,
    MessageCircle,
    Award,
    TrendingUp,
    Eye,
    ChevronDown,
    Plus,
    Search,
    MoreHorizontal,
    ExternalLink,
    Check,
    Clock
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

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
    const t = useTranslations("profile.reviews");
    const locale = useLocale();
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'pending' | 'rejected'>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful' | 'views'>('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [showStats] = useState(true);

    // Mock stats
    const userStats: UserStats = {
        totalReviews: 24,
        totalHelpful: 156,
        totalViews: 892,
        averageRating: 4.2,
        reviewsThisMonth: 5,
        helpfulRate: 87
    };

    // Mock reviews
    const userReviews: UserReview[] = [
        {
            id: '1',
            productId: 'p1',
            productName: locale === 'ar' ? 'آيفون 15 برو - 256 جيجابايت' : 'iPhone 15 Pro - 256GB',
            productImage: '/api/placeholder/80/80',
            productCategory: locale === 'ar' ? 'هواتف ذكية' : 'Smartphones',
            rating: 5,
            title: locale === 'ar' ? 'أفضل هاتف على الإطلاق' : 'Best phone ever',
            content: locale === 'ar' 
                ? 'اشتريت هذا الهاتف قبل 3 أشهر وأنا راضٍ جداً عن الأداء. الكاميرا رائعة، والبطارية تدوم طويلاً، والتصميم أنيق جداً. أنصح به بشدة لكل من يبحث عن هاتف متطور.'
                : 'I bought this phone 3 months ago and I am very satisfied with the performance. The camera is great, the battery lasts long, and the design is very elegant. I strongly recommend it to everyone looking for a sophisticated phone.',
            date: '2024-08-20',
            helpful: 45,
            views: 234,
            status: 'published',
            images: ['/api/placeholder/120/120', '/api/placeholder/120/120'],
            pros: locale === 'ar' ? ['كاميرا ممتازة', 'عمر بطارية طويل', 'تصميم أنيق'] : ['Excellent camera', 'Long battery life', 'Elegant design'],
            cons: locale === 'ar' ? ['السعر مرتفع'] : ['High price'],
            recommended: true,
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
            <div className="flex items-center gap-1">
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
                        <p className="mt-2 text-gray-600">{t("subtitle")}</p>
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
                                <div className="ms-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t("stats.total_reviews")}</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{userStats.totalReviews}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="text-sm text-green-600 flex items-center">
                                    <TrendingUp className="w-4 h-4 me-1" />
                                    +{userStats.reviewsThisMonth} {t("stats.this_month")}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <ThumbsUp className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="ms-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t("stats.helpful_likes")}</dt>
                                        <dd className="text-2xl font-semibold text-gray-900">{userStats.totalHelpful}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="text-sm text-gray-600">
                                    {userStats.helpfulRate}% {t("stats.helpful_rate")}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Eye className="h-8 w-8 text-purple-600" />
                                </div>
                                <div className="ms-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t("stats.total_views")}</dt>
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
                                <div className="ms-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t("stats.avg_rating")}</dt>
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
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder={t("filters.search_placeholder")}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="ps-10 pe-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value as UserReview['status'] | 'all')}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg ps-4 pe-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">{t("filters.status.all")}</option>
                                    <option value="published">{t("filters.status.published")}</option>
                                    <option value="pending">{t("filters.status.pending")}</option>
                                    <option value="rejected">{t("filters.status.rejected")}</option>
                                </select>
                                <ChevronDown className="absolute end-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg ps-4 pe-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="newest">{t("filters.sort.newest")}</option>
                                    <option value="oldest">{t("filters.sort.oldest")}</option>
                                    <option value="rating">{t("filters.sort.rating")}</option>
                                    <option value="helpful">{t("filters.sort.helpful")}</option>
                                    <option value="views">{t("filters.sort.views")}</option>
                                </select>
                                <ChevronDown className="absolute end-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Add Review Button */}
                        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4 me-2" />
                            {t("filters.add_new")}
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {sortedReviews.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">{t("list.empty.title")}</h3>
                            <p className="mt-2 text-gray-500">{t("list.empty.desc")}</p>
                        </div>
                    ) : (
                        sortedReviews.map((review) => (
                            <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                {/* Review Header */}
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={review.productImage}
                                                alt={review.productName}
                                                className="w-12 h-12 rounded-lg object-cover"
                                                width={48}
                                                height={48}
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{review.productName}</h3>
                                                <p className="text-sm text-gray-500">{review.productCategory}</p>
                                            </div>
                                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                                                {review.status === 'published' && <Check className="w-3 h-3 me-1" />}
                                                {review.status === 'pending' && <Clock className="w-3 h-3 me-1" />}
                                                {t(`filters.status.${review.status}`)}
                                            </div>
                                            {review.verified && (
                                                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                    <Check className="w-3 h-3 me-1" />
                                                    {t("list.verified")}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
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
                                            <div className="flex items-center gap-3 mb-2">
                                                {renderStars(review.rating)}
                                                <span className="text-sm text-gray-500">
                                                    {new Date(review.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                                                </span>
                                                {review.edited && (
                                                    <span className="text-xs text-gray-400">
                                                        • {t("list.edited_on")} {new Date(review.editDate!).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
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
                                                    <h5 className="text-sm font-medium text-green-800 mb-2">{t("list.pros")}</h5>
                                                    <ul className="space-y-1">
                                                        {review.pros.map((pro, index) => (
                                                            <li key={index} className="text-sm text-green-700 flex items-start gap-1">
                                                                <span className="text-green-500 mt-1">+</span>
                                                                <span>{pro}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {review.cons && review.cons.length > 0 && (
                                                <div>
                                                    <h5 className="text-sm font-medium text-red-800 mb-2">{t("list.cons")}</h5>
                                                    <ul className="space-y-1">
                                                        {review.cons.map((con, index) => (
                                                            <li key={index} className="text-sm text-red-700 flex items-start gap-1">
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
                                        <div className="flex gap-3 mb-4 flex-wrap">
                                            {review.images.map((image, index) => (
                                                <Image
                                                    key={index}
                                                    src={image}
                                                    alt="Review photo"
                                                    className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                                    width={80}
                                                    height={80}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Recommendation */}
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${review.recommended
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {review.recommended ? `✓ ${t("list.recommend")}` : `✗ ${t("list.not_recommend")}`}
                                    </div>

                                    {/* Stats and Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-4 flex-wrap">
                                        <div className="flex items-center gap-6 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>{review.helpful} {t("list.helpful")}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{review.views} {t("list.views")}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {review.status === 'published' && (
                                                <>
                                                    <button className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                        <Edit className="w-4 h-4 me-1" />
                                                        {t("list.actions.edit")}
                                                    </button>
                                                    <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors">
                                                        <Trash2 className="w-4 h-4 me-1" />
                                                        {t("list.actions.delete")}
                                                    </button>
                                                </>
                                            )}
                                            {review.status === 'pending' && (
                                                <span className="text-sm text-yellow-600 font-medium">{t("list.actions.pending")}</span>
                                            )}
                                            {review.status === 'rejected' && (
                                                <button className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                    <Edit className="w-4 h-4 me-1" />
                                                    {t("list.actions.resubmit")}
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
                    <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                {t("pagination.prev")}
                            </button>
                            <button className="relative ms-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                {t("pagination.next")}
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    {t("pagination.showing")} <span className="font-medium">1</span> {t("pagination.to")} <span className="font-medium">{sortedReviews.length}</span> {t("pagination.of")}{' '}
                                    <span className="font-medium">{sortedReviews.length}</span> {t("pagination.reviews")}
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <button className="relative inline-flex items-center rounded-s-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
                                        {t("pagination.prev")}
                                    </button>
                                    <button className="relative inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 transition-colors">
                                        1
                                    </button>
                                    <button className="relative inline-flex items-center rounded-e-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
                                        {t("pagination.next")}
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