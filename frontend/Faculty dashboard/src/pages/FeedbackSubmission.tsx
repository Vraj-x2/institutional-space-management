import React, { useState } from 'react';
import { MessageSquareIcon, StarIcon, SendIcon } from 'lucide-react';
interface FeedbackCategory {
  id: string;
  name: string;
  description: string;
}
const FeedbackSubmission: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ratings, setRatings] = useState({
    facilities: 0,
    services: 0,
    webapp: 0
  });
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const categories: FeedbackCategory[] = [{
    id: 'facilities',
    name: 'Campus Facilities',
    description: 'Classrooms, labs, and other physical spaces'
  }, {
    id: 'services',
    name: 'Campus Services',
    description: 'Administrative support, IT services, etc.'
  }, {
    id: 'webapp',
    name: 'Web Application',
    description: 'Dashboard functionality and user experience'
  }];
  const handleRatingChange = (category: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: rating
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log({
      category: selectedCategory,
      ratings,
      feedback,
      isAnonymous
    });
  };
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Feedback Submission
        </h1>
        <p className="text-gray-600">
          Share your feedback on campus facilities and services
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Category
              </label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full border rounded-md p-2" required>
                <option value="">Select a category</option>
                {categories.map(category => <option key={category.id} value={category.id}>
                    {category.name}
                  </option>)}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ratings
              </label>
              {Object.keys(ratings).map(category => <div key={category} className="mb-4">
                  <p className="text-sm text-gray-600 mb-2 capitalize">
                    {category}
                  </p>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => <button key={rating} type="button" onClick={() => handleRatingChange(category, rating)} className="focus:outline-none">
                        <StarIcon size={24} className={`${rating <= ratings[category as keyof typeof ratings] ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      </button>)}
                  </div>
                </div>)}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Feedback
              </label>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value)} className="w-full border rounded-md p-2" rows={6} placeholder="Please provide your detailed feedback here..." required />
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">
                  Submit feedback anonymously
                </span>
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
              <SendIcon size={20} className="mr-2" />
              Submit Feedback
            </button>
          </form>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Feedback Guidelines</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Be specific and provide examples when possible
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Focus on constructive criticism and suggestions for improvement
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Include both positive aspects and areas for improvement
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Keep feedback professional and respectful
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <MessageSquareIcon className="text-blue-600 mr-2" size={20} />
                <h3 className="font-medium text-blue-800">Need Help?</h3>
              </div>
              <p className="text-sm text-blue-600">
                If you need assistance or have questions about submitting
                feedback, please contact the support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FeedbackSubmission;