'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Calendar, CheckCircle, Beaker, FileText, Clock, MapPin, Phone, Upload } from 'lucide-react';

export default function SoilTestingPage() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    sampleType: '',
    testingDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Test',
      price: 1499,
      description: 'Essential soil health parameters',
      tests: ['pH Level', 'NPK (Nitrogen, Phosphorus, Potassium)', 'Organic Matter', 'Soil Texture'],
      turnaround: '3-5 business days',
      recommended: 'Home gardens & small plots',
    },
    {
      id: 'advanced',
      name: 'Advanced Test',
      price: 2999,
      description: 'Comprehensive soil analysis',
      tests: [
        'Everything in Basic Test',
        'Micronutrients (Fe, Mn, Zn, Cu, B)',
        'Electrical Conductivity',
        'Cation Exchange Capacity',
        'Heavy Metals Screening',
      ],
      turnaround: '5-7 business days',
      recommended: 'Commercial farms & large gardens',
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium Test',
      price: 4999,
      description: 'Complete soil health & contamination check',
      tests: [
        'Everything in Advanced Test',
        'Full Heavy Metals Panel',
        'Pesticide Residue Analysis',
        'Biological Activity Assessment',
        'Salinity Analysis',
        'Detailed Recommendations Report',
      ],
      turnaround: '7-10 business days',
      recommended: 'Industrial sites & remediation projects',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Choose Your Package',
      description: 'Select the testing package that suits your needs',
      icon: <Beaker className="w-8 h-8" />,
    },
    {
      step: 2,
      title: 'Schedule Collection',
      description: 'We collect soil samples from your location',
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      step: 3,
      title: 'Lab Analysis',
      description: 'Our experts analyze your soil in certified labs',
      icon: <FileText className="w-8 h-8" />,
    },
    {
      step: 4,
      title: 'Get Results',
      description: 'Receive detailed report with recommendations',
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.sampleType) newErrors.sampleType = 'Sample type is required';
    if (!formData.testingDate) newErrors.testingDate = 'Preferred date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-botanical-500 to-soil-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Professional Soil Testing Services
            </h1>
            <p className="text-xl text-botanical-100 mb-8">
              Get comprehensive soil analysis from certified labs. Know exactly what your soil needs for optimal growth.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-botanical-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Certified Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Fast Results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Expert Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {step !== 3 && (
        <>
          {/* How It Works */}
          <section className="section-spacing bg-sand-50">
            <div className="container-custom">
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-12 text-center">
                How It Works
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                {howItWorks.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4 text-botanical-600">
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold text-botanical-600 mb-2">Step {item.step}</div>
                    <h3 className="text-lg font-semibold text-soil-800 mb-2">{item.title}</h3>
                    <p className="text-soil-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Step 1: Choose Package */}
          {step === 1 && (
            <section className="section-spacing bg-white">
              <div className="container-custom">
                <h2 className="text-3xl font-display font-bold text-soil-800 mb-12 text-center">
                  Choose Your Testing Package
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`card p-8 relative hover:shadow-card-hover transition-shadow ${
                        pkg.popular ? 'border-2 border-botanical-500' : ''
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-botanical-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </div>
                      )}
                      <h3 className="text-2xl font-display font-bold text-soil-800 mb-2">{pkg.name}</h3>
                      <p className="text-soil-600 mb-4">{pkg.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-botanical-600">₹{pkg.price}</span>
                        <span className="text-soil-600"> / test</span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="text-sm text-soil-700">
                          <strong>Tests Included:</strong>
                        </div>
                        <ul className="space-y-2">
                          {pkg.tests.map((test, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-soil-700">
                              <CheckCircle className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
                              <span>{test}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 mb-6 pb-6 border-b border-soil-200">
                        <div className="flex items-center gap-2 text-sm text-soil-600">
                          <Clock className="w-4 h-4" />
                          <span>{pkg.turnaround}</span>
                        </div>
                        <div className="text-sm text-soil-600">
                          <strong>Best for:</strong> {pkg.recommended}
                        </div>
                      </div>

                      <Button
                        variant={pkg.popular ? 'primary' : 'outline'}
                        size="lg"
                        className="w-full"
                        onClick={() => handlePackageSelect(pkg.id)}
                      >
                        Select Package
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Booking Form */}
          {step === 2 && selectedPkg && (
            <section className="section-spacing bg-white">
              <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                      className="mb-4"
                    >
                      ← Back to Packages
                    </Button>
                    <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
                      Book Your Soil Test
                    </h2>
                    <div className="card p-6 bg-botanical-50 border-botanical-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-soil-800">{selectedPkg.name}</h3>
                          <p className="text-soil-600">{selectedPkg.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-botanical-600">₹{selectedPkg.price}</div>
                          <div className="text-sm text-soil-600">{selectedPkg.turnaround}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="card p-8">
                    <h3 className="text-xl font-semibold text-soil-800 mb-6">Contact Information</h3>
                    <div className="space-y-6 mb-8">
                      <Input
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                        required
                      />
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          required
                        />
                        <Input
                          label="Phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          error={errors.phone}
                          required
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-soil-800 mb-6">Sample Collection Address</h3>
                    <div className="space-y-6 mb-8">
                      <Input
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                        required
                      />
                      <div className="grid md:grid-cols-3 gap-6">
                        <Input
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          error={errors.city}
                          required
                        />
                        <Input
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          error={errors.state}
                          required
                        />
                        <Input
                          label="Postal Code"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          error={errors.postalCode}
                          required
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-soil-800 mb-6">Testing Details</h3>
                    <div className="space-y-6 mb-8">
                      <div>
                        <label htmlFor="sampleType" className="block text-sm font-medium text-soil-700 mb-2">
                          Sample Type <span className="text-accent-error">*</span>
                        </label>
                        <select
                          id="sampleType"
                          name="sampleType"
                          value={formData.sampleType}
                          onChange={handleChange}
                          className={`input ${errors.sampleType ? 'border-accent-error' : ''}`}
                        >
                          <option value="">Select sample type</option>
                          <option value="garden">Garden Soil</option>
                          <option value="lawn">Lawn/Turf</option>
                          <option value="agricultural">Agricultural Field</option>
                          <option value="potting">Potting Mix</option>
                          <option value="industrial">Industrial Site</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.sampleType && (
                          <p className="text-sm text-accent-error mt-1">{errors.sampleType}</p>
                        )}
                      </div>

                      <Input
                        label="Preferred Collection Date"
                        name="testingDate"
                        type="date"
                        value={formData.testingDate}
                        onChange={handleChange}
                        error={errors.testingDate}
                        helperText="We'll contact you to confirm this date"
                        required
                      />

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-soil-700 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={4}
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Any specific concerns or additional information..."
                          className="input min-h-[100px] resize-y"
                        />
                      </div>
                    </div>

                    <div className="bg-sand-50 rounded-lg p-6 mb-6">
                      <h4 className="font-semibold text-soil-800 mb-3">What happens next?</h4>
                      <ul className="space-y-2 text-sm text-soil-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
                          <span>We'll confirm your booking within 24 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
                          <span>Our team will collect soil samples from your location</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
                          <span>Receive detailed test results via email</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <section className="section-spacing bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="card p-12">
                <div className="w-20 h-20 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-botanical-600" />
                </div>
                <h2 className="text-3xl font-display font-bold text-soil-800 mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-lg text-soil-600 mb-8">
                  Thank you for booking soil testing with Soil Guard. We've sent a confirmation email to{' '}
                  <strong>{formData.email}</strong>
                </p>

                <div className="bg-sand-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold text-soil-800 mb-4">Booking Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-soil-600">Package:</span>
                      <span className="font-medium text-soil-800">{selectedPkg?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soil-600">Amount:</span>
                      <span className="font-medium text-soil-800">₹{selectedPkg?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soil-600">Collection Date:</span>
                      <span className="font-medium text-soil-800">{formData.testingDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soil-600">Location:</span>
                      <span className="font-medium text-soil-800">{formData.city}, {formData.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soil-600">Turnaround:</span>
                      <span className="font-medium text-soil-800">{selectedPkg?.turnaround}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8 text-sm text-soil-600">
                  <p>Our team will contact you at <strong>{formData.phone}</strong> to confirm the collection schedule.</p>
                  <p>You'll receive detailed test results via email within the specified turnaround time.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => (window.location.href = '/')}
                  >
                    Back to Home
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => (window.location.href = '/products')}
                  >
                    Browse Products
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {step === 1 && (
        <section className="section-spacing bg-botanical-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-soil-800 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="card p-6">
                  <h3 className="font-semibold text-soil-800 mb-2">How do I collect a soil sample?</h3>
                  <p className="text-soil-700">
                    Don't worry! Our trained team will come to your location and collect the soil samples professionally. We ensure proper sampling techniques for accurate results.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="font-semibold text-soil-800 mb-2">How accurate are the tests?</h3>
                  <p className="text-soil-700">
                    All tests are performed in NABL-certified laboratories using international standards. Our accuracy rate is 99.5%+ for all parameters.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="font-semibold text-soil-800 mb-2">Do I get recommendations with the report?</h3>
                  <p className="text-soil-700">
                    Yes! Every report includes detailed recommendations on soil amendments, fertilizers, and treatments specific to your soil condition and intended use.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="font-semibold text-soil-800 mb-2">Can I book multiple tests?</h3>
                  <p className="text-soil-700">
                    Absolutely! Contact us for bulk testing discounts on multiple samples or large agricultural areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <ChatBot />
    </Layout>
  );
}
