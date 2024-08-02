import React, { useEffect } from 'react';
import BFHLForm from './components/BFHLForm';

function App() {
     useEffect(() => {
          document.title = 'AP21110011194';
     }, []);

     return (
          <div className="App">
               <BFHLForm />
          </div>
     );
}

export default App;