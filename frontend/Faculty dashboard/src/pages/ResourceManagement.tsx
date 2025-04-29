import React, { useState } from 'react';
import { PackageIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, CalendarIcon } from 'lucide-react';
interface Resource {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'in-use' | 'maintenance';
  location: string;
  nextAvailable?: string;
  description: string;
}
const ResourceManagement: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const resources: Resource[] = [{
    id: 'proj1',
    name: 'Projector P1000',
    type: 'projector',
    status: 'available',
    location: 'Room 101',
    description: '4K Resolution, HDMI & VGA inputs'
  }, {
    id: 'lab1',
    name: 'Chemistry Lab Kit',
    type: 'lab',
    status: 'in-use',
    location: 'Lab 2B',
    nextAvailable: '2:30 PM',
    description: 'Complete set of basic chemistry equipment'
  }, {
    id: 'cam1',
    name: 'Document Camera',
    type: 'camera',
    status: 'maintenance',
    location: 'IT Department',
    nextAvailable: 'Tomorrow',
    description: '1080p HD Document Camera with zoom capability'
  }];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="flex items-center text-green-700 bg-green-100 px-2 py-1 rounded-full text-sm">
            <CheckCircleIcon size={16} className="mr-1" />
            Available
          </span>;
      case 'in-use':
        return <span className="flex items-center text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-sm">
            <AlertCircleIcon size={16} className="mr-1" />
            In Use
          </span>;
      case 'maintenance':
        return <span className="flex items-center text-red-700 bg-red-100 px-2 py-1 rounded-full text-sm">
            <XCircleIcon size={16} className="mr-1" />
            Maintenance
          </span>;
      default:
        return null;
    }
  };
  const filteredResources = selectedType === 'all' ? resources : resources.filter(resource => resource.type === selectedType);
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Resource Management
        </h1>
        <p className="text-gray-600">
          Manage and reserve teaching resources and equipment
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Available Resources</h2>
                <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="border-gray-200 rounded-md text-sm">
                  <option value="all">All Types</option>
                  <option value="projector">Projectors</option>
                  <option value="lab">Lab Equipment</option>
                  <option value="camera">Cameras</option>
                </select>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4">
                {filteredResources.map(resource => <button key={resource.id} onClick={() => setSelectedResource(resource)} className={`w-full text-left p-4 rounded-lg border ${selectedResource?.id === resource.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-500'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{resource.name}</h3>
                        <p className="text-sm text-gray-600">
                          {resource.location}
                        </p>
                      </div>
                      {getStatusBadge(resource.status)}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {resource.description}
                    </p>
                    {resource.nextAvailable && <p className="text-sm text-gray-500 mt-1">
                        Next available: {resource.nextAvailable}
                      </p>}
                  </button>)}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-semibold mb-4">Resource Booking</h2>
            {selectedResource ? <div>
                <div className="mb-4">
                  <h3 className="font-medium">{selectedResource.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedResource.location}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="flex items-center">
                      <CalendarIcon size={20} className="text-gray-400 absolute ml-3" />
                      <input type="date" className="pl-10 w-full border rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Slot
                    </label>
                    <select className="w-full border rounded-md">
                      <option>8:00 AM - 9:30 AM</option>
                      <option>9:30 AM - 11:00 AM</option>
                      <option>11:00 AM - 12:30 PM</option>
                      <option>1:00 PM - 2:30 PM</option>
                      <option>2:30 PM - 4:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purpose
                    </label>
                    <textarea className="w-full border rounded-md" rows={3} placeholder="Enter the purpose of booking..." />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors" disabled={selectedResource.status !== 'available'}>
                    {selectedResource.status === 'available' ? 'Book Resource' : 'Currently Unavailable'}
                  </button>
                </div>
              </div> : <div className="text-center py-8">
                <PackageIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Select a resource to make a booking
                </p>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default ResourceManagement;