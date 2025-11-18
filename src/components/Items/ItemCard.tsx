import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    imageUrl: string;
    status: string;
    type: string;
    createdAt: string;
  };
}

const ItemCard = ({ item }: ItemCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Link to={`/item/${item.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48 bg-gray-200">
          <img
            src={item.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.type === 'lost'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {item.type === 'lost' ? 'Lost' : 'Found'}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {item.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
