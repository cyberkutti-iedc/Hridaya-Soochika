interface ResultCardProps { 
  compatibility: number;
  details: Record<string, string | number | boolean>; // More specific type
}

export default function ResultCard({ compatibility, details }: ResultCardProps) {
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-green-300';
    if (score >= 40) return 'bg-yellow-300';
    if (score >= 20) return 'bg-orange-300';
    return 'bg-red-300';
  };

  const getEmoji = (score: number) => {
    if (score >= 80) return '😍';
    if (score >= 60) return '❤️';
    if (score >= 40) return '🙂';
    if (score >= 20) return '😐';
    return '😥';
  };

  const getDescription = (score: number) => {
    if (score >= 80) return 'Perfect Match! You two are cosmically aligned.';
    if (score >= 60) return 'Great Match! You have a strong connection.';
    if (score >= 40) return 'Good Potential! You may need to work on some aspects.';
    if (score >= 20) return 'Challenge Ahead! You will need to put in effort.';
    return 'Difficult Match! You may be better as friends.';
  };

  return (
    <div className="text-center">
      <div className="mx-auto w-40 h-40 mb-4 rounded-full flex items-center justify-center text-4xl border-8 border-pink-200" 
        style={{ background: `conic-gradient(${getCompatibilityColor(compatibility)} ${compatibility}%, #f3f4f6 0)` }}>
        <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center flex-col">
          <span className="text-3xl">{getEmoji(compatibility)}</span>
          <span className="text-xl font-bold">{compatibility}%</span>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-pink-600 mb-4">
        {getDescription(compatibility)}
      </h2>
      
      <div className="mt-6 bg-pink-50 p-4 rounded-lg text-left">
        <h3 className="font-medium text-lg text-pink-700 mb-2">Compatibility Analysis</h3>
        
        <div className="space-y-3">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="text-sm">
              <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</div>
              <div className="text-gray-700">{String(value)}</div> {/* Ensure proper rendering */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
