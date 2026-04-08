"use client"
import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ChevronDown,
  Camera,
  X,
  Check,
  User,
  Calendar,
  MoreHorizontal,
  Flag,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface ReviewImage {
  id: string;
  url: string;
  alt: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: ReviewImage[];
  variant?: string;
  pros?: string[];
  cons?: string[];
  recommended: boolean;
}

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const ProductReviewsPage = () => {
  const t = useTranslations("product.reviews_page");
  const locale = useLocale();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [filterVerified, setFilterVerified] = useState(false);
  const [showImages, setShowImages] = useState(false);

  // Mock product data
  const product: Product = {
    id: '1',
    name: 'iPhone 15 Pro - 256GB',
    image: '/api/placeholder/400/300',
    rating: 4.3,
    totalReviews: 1247,
    ratingDistribution: {
      5: 687,
      4: 298,
      3: 156,
      2: 78,
      1: 28
    }
  };

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      userId: '1',
      userName: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      title: locale === 'ar' ? 'منتج ممتاز وجودة عالية' : 'Excellent product and high quality',
      content: locale === 'ar' 
        ? 'اشتريت هذا الجهاز قبل شهرين وأنا راضٍ جداً عن الأداء. البطارية تدوم طوال اليوم، والكاميرا رائعة جداً خاصة في التصوير الليلي.'
        : 'Bought this device two months ago and I am very satisfied with the performance. The battery lasts all day, and the camera is fantastic, especially in night mode.',
      date: '2024-08-20',
      verified: true,
      helpful: 23,
      notHelpful: 2,
      variant: locale === 'ar' ? 'أزرق تيتانيوم - 256GB' : 'Blue Titanium - 256GB',
      pros: locale === 'ar' ? ['جودة الكاميرا ممتازة', 'عمر البطارية طويل'] : ['Excellent camera quality', 'Long battery life'],
      cons: locale === 'ar' ? ['السعر مرتفع نوعاً ما'] : ['Price is somewhat high'],
      recommended: true,
      images: [
        { id: '1', url: '/api/placeholder/150/150', alt: 'Product image' },
        { id: '2', url: '/api/placeholder/150/150', alt: 'Usage image' }
      ]
    }
  ];

  const filteredReviews = reviews.filter(review => {
    if (selectedRating && review.rating !== selectedRating) return false;
    if (filterVerified && !review.verified) return false;
    if (showImages && !review.images?.length) return false;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          >
            <Star
              className={`w-5 h-5 ${star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
                }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const calculatePercentage = (count: number, total: number) => {
    return Math.round((count / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-6">
            <Image
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover"
              width={80}
              height={80}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  {renderStars(Math.round(product.rating))}
                  <span className="text-xl font-semibold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-gray-500">{t("total_reviews", { count: product.totalReviews })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Reviews Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t("summary")}</h2>

              {/* Overall Rating */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                <div className="mb-2 flex justify-center">{renderStars(Math.round(product.rating))}</div>
                <div className="text-sm text-gray-500">{t("out_of", { count: product.totalReviews })}</div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3 mb-6">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                      className={`flex items-center gap-1 text-sm hover:text-blue-600 transition-colors ${selectedRating === stars ? 'text-blue-600 font-medium' : 'text-gray-600'
                        }`}
                    >
                      <span>{stars}</span>
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                    </button>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${calculatePercentage(product.ratingDistribution[stars as keyof typeof product.ratingDistribution], product.totalReviews)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">
                      {product.ratingDistribution[stars as keyof typeof product.ratingDistribution]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">{t("filter_title")}</h3>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filterVerified}
                    onChange={(e) => setFilterVerified(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{t("verified_only")}</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showImages}
                    onChange={(e) => setShowImages(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{t("with_images")}</span>
                </label>
              </div>

              {/* Write Review Button */}
              <button
                onClick={() => setShowWriteReview(true)}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t("write_review")}
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-900">
                {t("title", { count: filteredReviews.length })}
              </h2>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg ps-4 pe-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">{t("sort.newest")}</option>
                  <option value="oldest">{t("sort.oldest")}</option>
                  <option value="helpful">{t("sort.helpful")}</option>
                  <option value="rating">{t("sort.rating")}</option>
                </select>
                <ChevronDown className="absolute end-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {sortedReviews.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{t("no_reviews")}</h3>
                  <p className="mt-2 text-gray-500">{t("no_reviews_desc")}</p>
                </div>
              ) : (
                sortedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                          {review.userAvatar ? (
                            <Image src={review.userAvatar} alt={review.userName} width={40} height={40} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-medium text-gray-900">{review.userName}</h4>
                            {review.verified && (
                              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                <Check className="w-3 h-3 me-1" />
                                {t("verified")}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(review.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-3">
                      {renderStars(review.rating)}
                      {review.variant && (
                        <span className="text-sm text-gray-500">• {review.variant}</span>
                      )}
                    </div>

                    {/* Review Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{review.title}</h3>

                    {/* Pros and Cons */}
                    {(review.pros?.length || review.cons?.length) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {review.pros && review.pros.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-green-800 mb-2">{t("pros")}</h4>
                            <ul className="space-y-1">
                              {review.pros.map((pro, index) => (
                                <li key={index} className="text-sm text-green-700 flex items-start gap-1">
                                  <span className="text-green-500 mt-1 shrink-0">+</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {review.cons && review.cons.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-red-800 mb-2">{t("cons")}</h4>
                            <ul className="space-y-1">
                              {review.cons.map((con, index) => (
                                <li key={index} className="text-sm text-red-700 flex items-start gap-1">
                                  <span className="text-red-500 mt-1 shrink-0">-</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Review Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-3 mb-4 flex-wrap">
                        {review.images.map((image) => (
                          <Image
                            key={image.id}
                            src={image.url}
                            alt={image.alt}
                            width={80}
                            height={80}
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
                      {review.recommended ? `✓ ${t("recommend")}` : `✗ ${t("not_recommend")}`}
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-4">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{t("helpful", { count: review.helpful })}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{t("not_helpful", { count: review.notHelpful })}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">{t("modal.title")}</h2>
              <button
                onClick={() => setShowWriteReview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t("modal.rating_label")}
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(newReviewRating, true, setNewReviewRating)}
                  {newReviewRating > 0 && (
                    <span className="text-sm text-gray-500 ms-2">
                      {t("modal.stars", { count: newReviewRating })}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t("modal.review_title")}
                </label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder={t("modal.review_title_placeholder")}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t("modal.review_content")}
                </label>
                <textarea
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder={t("modal.review_content_placeholder")}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Add Images */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t("modal.add_images")}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    {t("modal.drag_drop")}
                  </p>
                  <button className="mt-2 bg-white border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                    {t("modal.choose_images")}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowWriteReview(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t("modal.cancel")}
              </button>
              <button
                disabled={!newReviewRating || !newReviewTitle.trim() || !newReviewContent.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t("modal.submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviewsPage;