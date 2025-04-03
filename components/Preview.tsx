interface PreviewProps {
    userData: {
      fullName: string;
      dob: string;
      email: string;
      gender: string;
    };
    partnerData: {
      fullName: string;
      dob: string;
      gender: string;
    };
    onBack: () => void;
    onCalculate: () => void;
    isLoading: boolean;
  }
  
  export default function Preview({ 
    userData, 
    partnerData, 
    onBack, 
    onCalculate,
    isLoading
  }: PreviewProps) {
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Not provided';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Review Details</h2>
        
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg text-pink-700 mb-2">Your Information</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Name:</div>
            <div className="text-sm font-medium">{userData.fullName}</div>
            
            <div className="text-sm text-gray-500">Date of Birth:</div>
            <div className="text-sm font-medium">{formatDate(userData.dob)}</div>
            
            <div className="text-sm text-gray-500">Email:</div>
            <div className="text-sm font-medium">{userData.email}</div>
            
            <div className="text-sm text-gray-500">Gender:</div>
            <div className="text-sm font-medium capitalize">{userData.gender}</div>
          </div>
        </div>
        
        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg text-pink-700 mb-2">Partner Information</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-gray-500">Name:</div>
            <div className="text-sm font-medium">{partnerData.fullName}</div>
            
            <div className="text-sm text-gray-500">Date of Birth:</div>
            <div className="text-sm font-medium">{partnerData.dob ? formatDate(partnerData.dob) : 'Not provided'}</div>
            
            <div className="text-sm text-gray-500">Gender:</div>
            <div className="text-sm font-medium capitalize">{partnerData.gender}</div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-200 disabled:opacity-50"
          >
            Back
          </button>
          
          <button
            type="button"
            onClick={onCalculate}
            disabled={isLoading}
            className="py-2 px-4 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition duration-200 disabled:opacity-50 flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </>
            ) : 'Calculate Compatibility'}
          </button>
        </div>
      </div>
    );
  }
  