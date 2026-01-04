import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Filter, 
  ChevronDown, 
  Camera, 
  X, 
  Check,
  User,
  Calendar,
  MoreHorizontal,
  Flag,
  Share2,
  Heart
} from 'lucide-react';

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
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [filterVerified, setFilterVerified] = useState(false);
  const [showImages, setShowImages] = useState(false);

  // بيانات وهمية للمنتج
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

  // بيانات وهمية للمراجعات
  const reviews: Review[] = [
    {
      id: '1',
      userId: '1',
      userName: 'أحمد محمد',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      title: 'منتج ممتاز وجودة عالية',
      content: 'اشتريت هذا الجهاز قبل شهرين وأنا راضٍ جداً عن الأداء. البطارية تدوم طوال اليوم، والكاميرا رائعة جداً خاصة في التصوير الليلي. التصميم أنيق والشاشة واضحة جداً. أنصح به بقوة.',
      date: '2024-08-20',
      verified: true,
      helpful: 23,
      notHelpful: 2,
      variant: 'أزرق تيتانيوم - 256GB',
      pros: ['جودة الكاميرا ممتازة', 'عمر البطارية طويل', 'التصميم الأنيق'],
      cons: ['السعر مرتفع نوعاً ما'],
      recommended: true,
      images: [
        { id: '1', url: '/api/placeholder/150/150', alt: 'صورة المنتج' },
        { id: '2', url: '/api/placeholder/150/150', alt: 'صورة الاستخدام' }
      ]
    },
    {
      id: '2',
      userId: '2',
      userName: 'فاطمة علي',
      userAvatar: '/api/placeholder/40/40',
      rating: 4,
      title: 'جيد لكن يحتاج تحسينات',
      content: 'الجهاز بشكل عام جيد، لكن لاحظت أن البطارية تنفد بسرعة عند استخدام الألعاب. الكاميرا ممتازة والشاشة واضحة. التطبيقات تعمل بسلاسة.',
      date: '2024-08-18',
      verified: true,
      helpful: 15,
      notHelpful: 3,
      variant: 'أسود - 128GB',
      pros: ['كاميرا ممتازة', 'شاشة واضحة'],
      cons: ['البطارية تنفد سريعاً مع الألعاب', 'يسخن قليلاً'],
      recommended: true
    },
    {
      id: '3',
      userId: '3',
      userName: 'خالد أحمد',
      rating: 3,
      title: 'متوسط الجودة',
      content: 'الجهاز ليس سيئاً لكن توقعت أفضل من ذلك بناءً على السعر. هناك بعض المشاكل في النظام والتطبيقات تتعطل أحياناً.',
      date: '2024-08-15',
      verified: false,
      helpful: 8,
      notHelpful: 12,
      variant: 'أبيض - 512GB',
      pros: ['التصميم جميل'],
      cons: ['مشاكل في النظام', 'السعر مرتفع', 'التطبيقات تتعطل'],
      recommended: false
    },
    {
      id: '4',
      userId: '4',
      userName: 'سارة محمود',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      title: 'أفضل هاتف اشتريته!',
      content: 'هذا الهاتف رائع حقاً. الكاميرا تلتقط صوراً مذهلة، والأداء سريع جداً. لا أندم على شرائه إطلاقاً.',
      date: '2024-08-12',
      verified: true,
      helpful: 31,
      notHelpful: 1,
      variant: 'ذهبي - 256GB',
      pros: ['كاميرا احترافية', 'أداء سريع', 'تصميم فاخر'],
      cons: [],
      recommended: true,
      images: [
        { id: '3', url: '/api/placeholder/150/150', alt: 'صورة الهاتف' }
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
      <div className="flex items-center space-x-1 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Product Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-6 space-x-reverse">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center space-x-4 space-x-reverse mt-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {renderStars(Math.round(product.rating))}
                  <span className="text-xl font-semibold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.totalReviews} مراجعة)</span>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">ملخص التقييمات</h2>
              
              {/* Overall Rating */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                <div className="mb-2">{renderStars(Math.round(product.rating))}</div>
                <div className="text-sm text-gray-500">من أصل {product.totalReviews} مراجعة</div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3 mb-6">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-3 space-x-reverse">
                    <button
                      onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                      className={`flex items-center space-x-1 space-x-reverse text-sm hover:text-blue-600 transition-colors ${
                        selectedRating === stars ? 'text-blue-600 font-medium' : 'text-gray-600'
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
                <h3 className="font-medium text-gray-900">تصفية المراجعات</h3>
                
                <label className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={filterVerified}
                    onChange={(e) => setFilterVerified(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">المراجعات المؤكدة فقط</span>
                </label>

                <label className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={showImages}
                    onChange={(e) => setShowImages(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">المراجعات مع الصور</span>
                </label>
              </div>

              {/* Write Review Button */}
              <button
                onClick={() => setShowWriteReview(true)}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                اكتب مراجعة
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                المراجعات ({filteredReviews.length})
              </h2>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="oldest">الأقدم</option>
                    <option value="helpful">الأكثر إفادة</option>
                    <option value="rating">الأعلى تقييماً</option>
                  </select>
                  <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {sortedReviews.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">لا توجد مراجعات</h3>
                  <p className="mt-2 text-gray-500">لم يتم العثور على مراجعات تطابق الفلاتر المحددة.</p>
                </div>
              ) : (
                sortedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                          {review.userAvatar ? (
                            <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <h4 className="font-medium text-gray-900">{review.userName}</h4>
                            {review.verified && (
                              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                <Check className="w-3 h-3 ml-1" />
                                مؤكد
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(review.date).toLocaleDateString('ar-SA')}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-3 space-x-reverse mb-3">
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
                            <h4 className="text-sm font-medium text-green-800 mb-2">المميزات:</h4>
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
                            <h4 className="text-sm font-medium text-red-800 mb-2">العيوب:</h4>
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

                    {/* Review Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex space-x-3 space-x-reverse mb-4">
                        {review.images.map((image) => (
                          <img
                            key={image.id}
                            src={image.url}
                            alt={image.alt}
                            className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-75 transition-opacity"
                          />
                        ))}
                      </div>
                    )}

                    {/* Recommendation */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                      review.recommended 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {review.recommended ? '✓ أنصح بالشراء' : '✗ لا أنصح بالشراء'}
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <button className="flex items-center space-x-1 space-x-reverse text-sm text-gray-500 hover:text-green-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>مفيد ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 space-x-reverse text-sm text-gray-500 hover:text-red-600 transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                          <span>غير مفيد ({review.notHelpful})</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
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
              <h2 className="text-xl font-bold text-gray-900">اكتب مراجعة</h2>
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
                  التقييم الإجمالي *
                </label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  {renderStars(newReviewRating, true, setNewReviewRating)}
                  <span className="text-sm text-gray-500 mr-2">
                    {newReviewRating > 0 && `${newReviewRating} نجوم`}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  عنوان المراجعة *
                </label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="اكتب عنواناً موجزاً لمراجعتك"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  تفاصيل المراجعة *
                </label>
                <textarea
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="شاركنا تجربتك مع هذا المنتج..."
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Add Images */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  إضافة صور (اختياري)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    اسحب الصور هنا أو انقر للاختيار
                  </p>
                  <button className="mt-2 bg-white border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                    اختر الصور
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 space-x-reverse p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowWriteReview(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                disabled={!newReviewRating || !newReviewTitle.trim() || !newReviewContent.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                نشر المراجعة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviewsPage;