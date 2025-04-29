import React, { useState } from 'react';
import {  ChevronLeftIcon, ChevronRightIcon,  } from 'lucide-react';
interface Event {
  id: number;
  title: string;
  type: 'class' | 'meeting' | 'office-hours' | 'other';
  start: string;
  end: string;
  location: string;
  description?: string;
}
const ScheduleViewer: React.FC = () => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const events: Event[] = [{
    id: 1,
    title: 'CS101 Lecture',
    type: 'class',
    start: '10:00 AM',
    end: '11:30 AM',
    location: 'Room 305',
    description: 'Introduction to Programming'
  }, {
    id: 2,
    title: 'Department Meeting',
    type: 'meeting',
    start: '2:00 PM',
    end: '3:00 PM',
    location: 'Conference Room A'
  }, {
    id: 3,
    title: 'Office Hours',
    type: 'office-hours',
    start: '3:30 PM',
    end: '5:00 PM',
    location: 'Office 401'
  }];
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'office-hours':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 8; i <= 18; i++) {
      slots.push(`${i}:00`);
    }
    return slots;
  };
  const generateWeekDays = () => {
    const days = [];
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay();
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr.setDate(first + i));
      days.push(day);
    }
    return days;
  };
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewType === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewType === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Schedule Viewer</h1>
        <p className="text-gray-600">View and manage your academic schedule</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigateDate('prev')} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeftIcon size={20} />
              </button>
              <h2 className="text-lg font-semibold">
                {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
              </h2>
              <button onClick={() => navigateDate('next')} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronRightIcon size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setViewType('day')} className={`px-3 py-1 rounded-md ${viewType === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Day
              </button>
              <button onClick={() => setViewType('week')} className={`px-3 py-1 rounded-md ${viewType === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Week
              </button>
              <button onClick={() => setViewType('month')} className={`px-3 py-1 rounded-md ${viewType === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                Month
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {generateWeekDays().map((day, index) => <div key={index} className={`text-center p-2 ${day.toDateString() === new Date().toDateString() ? 'bg-blue-50 rounded-md' : ''}`}>
                <div className="text-sm text-gray-500">
                  {day.toLocaleDateString('en-US', {
                weekday: 'short'
              })}
                </div>
                <div className="font-semibold">
                  {day.toLocaleDateString('en-US', {
                day: 'numeric'
              })}
                </div>
              </div>)}
          </div>
        </div>
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          <div className="bg-white w-20">
            {generateTimeSlots().map(time => <div key={time} className="h-20 p-2 text-sm text-gray-500">
                {time}
              </div>)}
          </div>
          {generateWeekDays().map((day, dayIndex) => <div key={dayIndex} className="bg-white relative">
              {generateTimeSlots().map((time, timeIndex) => <div key={`${dayIndex}-${timeIndex}`} className="h-20 border-t border-gray-100">
                  {events.map(event => <div key={event.id} className={`absolute w-[calc(100%-8px)] mx-1 p-2 rounded-md border ${getEventTypeColor(event.type)}`} style={{
              top: `${timeIndex * 80}px`,
              height: '75px'
            }}>
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs">
                        {event.start} - {event.end}
                      </div>
                      <div className="text-xs">{event.location}</div>
                    </div>)}
                </div>)}
            </div>)}
        </div>
      </div>
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {events.map(event => <div key={event.id} className={`p-4 rounded-lg border ${getEventTypeColor(event.type)}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm">
                      {event.start} - {event.end}
                    </p>
                    <p className="text-sm">{event.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize`}>
                    {event.type.replace('-', ' ')}
                  </span>
                </div>
                {event.description && <p className="text-sm mt-2">{event.description}</p>}
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default ScheduleViewer;