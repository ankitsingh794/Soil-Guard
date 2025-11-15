import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount && (
              <Badge variant="warning">-{discount}%</Badge>
            )}
            {product.popular && (
              <Badge variant="success">Popular</Badge>
            )}
            {product.stock < 20 && product.stock > 0 && (
              <Badge variant="warning">Low Stock</Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="info">Out of Stock</Badge>
            )}
          </div>

          {/* Quick action on hover */}
          <div className="absolute inset-0 bg-soil-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<ShoppingCart className="w-4 h-4" />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-xs text-soil-500 uppercase tracking-wide mb-2">
            {product.category.replace('-', ' & ')}
          </p>

          {/* Title */}
          <h3 className="text-lg font-semibold text-soil-800 mb-2 line-clamp-2 group-hover:text-botanical-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-soil-600 mb-3 line-clamp-2 flex-1">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium text-soil-700">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-soil-500">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-botanical-600">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-soil-500 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
