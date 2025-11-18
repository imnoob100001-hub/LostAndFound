import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, MessageSquare, ArrowLeft } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface ItemDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  status: string;
  type: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/items/${id}`);
      setItem(response.data.item);
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to fetch item', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async () => {
    if (!user) {
      showToast('Please login to contact', 'error');
      navigate('/login');
      return;
    }

    try {
      await api.post('/messages', {
        recipientId: item?.user.id,
        itemId: item?.id,
        message: `Hi! I'm interested in your ${item?.type} item: ${item?.title}`,
      });
      showToast('Message sent successfully!', 'success');
      navigate('/messages');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to send message', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Item not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-96 bg-gray-200">
            <img
              src={item.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.type === 'lost'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>Posted by {item.user.name}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {item.category}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {user && user.id !== item.user.id && (
              <button
                onClick={handleContact}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Contact Owner</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
