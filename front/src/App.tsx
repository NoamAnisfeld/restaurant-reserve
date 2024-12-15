import './App.css'
import { useQueryDiningTables, useQueryAllTimeslots } from './queries';
import { Spinner } from './components/ui/spinner';
import DiningTableCard from './components/DiningTableCard';
import TimeslotSelect from './components/TimeslotSelect';
import { useState } from 'react';

function App() {
  const diningTables = useQueryDiningTables();
  const timeslots = useQueryAllTimeslots();
  const [currentSlot, setCurrentSlot] = useState(0);

  if (diningTables.isPending || timeslots.isPending) {
    return <Spinner aria-description='loading' />
  }

  if (diningTables.error || timeslots.error) {
    return <div>Error loading data</div>
  }

  return (
    <>
      <TimeslotSelect slots={timeslots.data} currentSlot={currentSlot} onSlotChange={setCurrentSlot} />
      <div className='flex flex-wrap justify-center'>
        {diningTables.data.map((table, index) =>
          <DiningTableCard
            key={index}
            name={`Table number ${index + 1}`}
            seats={table.seats}
            available={timeslots.data[currentSlot].availability[index] === 'available'}
          />
        )}
      </div>
    </>
  )
}

export default App
