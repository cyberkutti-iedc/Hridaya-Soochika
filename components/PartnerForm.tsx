'use client';

import { useState } from 'react';

interface PartnerData {
  fullName: string;
  dob: string;
  gender: string;
}

interface PartnerFormProps {
  initialData: PartnerData;
  onSubmit: (data: PartnerData) => void;
}

export default function PartnerForm({ initialData, onSubmit }: PartnerFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Partner\'s name is required';
    }
    
    // DOB is optional for partner
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Partner Details</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter partner's full name"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth (Optional)
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
        >
          Back
        </button>
        
        <button
          type="submit"
          className="py-2 px-4 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition duration-200"
        >
          Continue
        </button>
      </div>
    </form>
  );
}