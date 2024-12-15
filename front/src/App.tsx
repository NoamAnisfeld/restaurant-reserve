import './App.css'
import { useQueryDiningTables, useQueryAllTimeslots } from './queries';
import { Spinner } from './components/ui/spinner';
import DiningTableCard from './components/DiningTableCard';

function App() {
  const diningTables = useQueryDiningTables();
  const timeslots = useQueryAllTimeslots();

  if (diningTables.isPending || timeslots.isPending) {
    return <Spinner aria-description='loading' />
  }

  if (diningTables.error || timeslots.error) {
    return <div>Error loading data</div>
  }

  return (
    <>
      {/* {JSON.stringify(timeslots.data, null, 2)} */}
      <div className='flex flex-wrap justify-center'>
        {diningTables.data.map((table, index) =>
          <DiningTableCard
            key={index}
            name={`Table number ${index + 1}`}
            seats={table.seats}
            available={timeslots.data[0].availability[index] === 'available'}
          />
        )}
      </div>
    </>
  )
}

export default App
