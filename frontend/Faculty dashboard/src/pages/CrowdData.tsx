import React, { useState } from 'react';
import { UsersIcon, MapPinIcon, FilterIcon } from 'lucide-react';
interface Location {
  id: string;
  name: string;
  type: 'classroom' | 'library' | 'cafeteria' | 'lab';
  crowdLevel: number; // 0-100
  capacity: number;
  currentOccupancy: number;
}
const CrowdData: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const locations: Location[] = [{
    id: 'lib1',
    name: 'Main Library',
    type: 'library',
    crowdLevel: 75,
    capacity: 200,
    currentOccupancy: 150
  }, {
    id: 'cafe1',
    name: 'Central Cafeteria',
    type: 'cafeteria',
    crowdLevel: 90,
    capacity: 150,
    currentOccupancy: 135
  }, {
    id: 'room101',
    name: 'Room 101',
    type: 'classroom',
    crowdLevel: 30,
    capacity: 40,
    currentOccupancy: 12
  }, {
    id: 'lab1',
    name: 'Computer Lab 1',
    type: 'lab',
    crowdLevel: 60,
    capacity: 30,
    currentOccupancy: 18
  }];
  const getCrowdLevelColor = (level: number) => {
    if (level < 40) return 'bg-green-100 text-green-800';
    if (level < 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  const filteredLocations = selectedType === 'all' ? locations : locations.filter(loc => loc.type === selectedType);
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Real-Time Crowd Data
        </h1>
        <p className="text-gray-600">
          Monitor campus occupancy and crowd levels
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Total Occupancy</span>
            </div>
            <span className="text-2xl font-bold">
              {locations.reduce((sum, loc) => sum + loc.currentOccupancy, 0)}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Campus Locations</h2>
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-400" />
              <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="border-gray-200 rounded-md text-sm">
                <option value="all">All Locations</option>
                <option value="classroom">Classrooms</option>
                <option value="library">Libraries</option>
                <option value="cafeteria">Cafeterias</option>
                <option value="lab">Labs</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLocations.map(location => <div key={location.id} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {location.type}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdLevelColor(location.crowdLevel)}`}>
                    {location.crowdLevel}% Full
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Current Occupancy</span>
                    <span>
                      {location.currentOccupancy}/{location.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${location.crowdLevel < 40 ? 'bg-green-500' : location.crowdLevel < 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                  width: `${location.crowdLevel}%`
                }} />
                  </div>
                </div>
                <button className="mt-4 w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  View on Map
                </button>
              </div>)}
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Crowd Level Legend</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-sm">Low (&lt;40%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            <span className="text-sm">Moderate (40-70%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <span className="text-sm">High (&gt;70%)</span>
          </div>
        </div>
      </div>
    </div>;
};
export default CrowdData;