interface FilterPanelProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const FilterPanel = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
}: FilterPanelProps) => {
  const categories = ['Electronics', 'Clothing', 'Accessories', 'Books', 'ID Cards', 'Keys', 'Other'];
  const locations = ['Library', 'Hostel', 'Canteen', 'Academic Block', 'Sports Complex', 'Auditorium', 'Other'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedType('')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedType === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedType('lost')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedType === 'lost'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lost
          </button>
          <button
            onClick={() => setSelectedType('found')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedType === 'found'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Found
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc.toLowerCase()}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
