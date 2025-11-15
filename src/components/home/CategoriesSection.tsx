import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  image,
  href,
  icon,
}) => {
  return (
    <Link href={href} className="group block">
      <div className="card card-hover overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil-900/60 to-transparent" />
          <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-lg">
            {icon}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-soil-800 mb-2 group-hover:text-botanical-600 transition-colors">
            {title}
          </h3>
          <p className="text-soil-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center text-botanical-600 font-medium group-hover:gap-2 transition-all">
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      title: 'Garden & Lawn',
      description: 'Premium soil mixes for vibrant gardens and lush lawns',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      href: '/categories/garden-lawn',
      icon: '🌻',
    },
    {
      title: 'Indoor Planting',
      description: 'Specially formulated for houseplants and indoor gardens',
      image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800',
      href: '/categories/indoor-planting',
      icon: '🪴',
    },
    {
      title: 'Industrial Remediation',
      description: 'Professional-grade solutions for commercial projects',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800',
      href: '/categories/industrial-remediation',
      icon: '🏗️',
    },
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-soil-800 mb-4">
            Explore Our Soil Solutions
          </h2>
          <p className="text-lg text-soil-600 max-w-2xl mx-auto">
            From backyard gardens to industrial sites, we have the perfect soil solution for every application
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
