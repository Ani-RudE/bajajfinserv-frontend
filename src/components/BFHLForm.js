import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const BFHLForm = () => {
     const [jsonInput, setJsonInput] = useState('');
     const [response, setResponse] = useState(null);
     const [error, setError] = useState('');
     const [selectedOptions, setSelectedOptions] = useState([]);

     const options = [
          { value: 'alphabets', label: 'Alphabets' },
          { value: 'numbers', label: 'Numbers' },
          { value: 'highest_alphabet', label: 'Highest Alphabet' },
     ];

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError('');
          setResponse(null);

          try {
               const parsedJson = JSON.parse(jsonInput);

               const { data } = await axios.post('https://bajajfinserv-backend.vercel.app/bfhl', parsedJson);

               setResponse(data);
          } catch (err) {
               if (err.response) {
                    setError(`API error: ${err.response.data.message || 'Unknown error'}`);
               } else if (err.request) {
                    setError('No response received from the server');
               } else {
                    setError('Invalid JSON input or request setup error');
               }
               console.error('Full error:', err);
          }
     };

     const filterResponse = (response) => {
          if (!response) return null;
          const filtered = {};
          selectedOptions.forEach(option => {
               if (response[option.value]) {
                    filtered[option.value] = response[option.value];
               }
          });
          return filtered;
     };

     return (
          <div className="min-h-screen bg-gray-900 text-white p-8">
               <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                    <div>
                         <label htmlFor="jsonInput" className="block text-sm font-medium mb-2">
                              JSON Input
                         </label>
                         <textarea
                              id="jsonInput"
                              value={jsonInput}
                              onChange={(e) => setJsonInput(e.target.value)}
                              className="w-full px-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="4"
                              placeholder='{"data": ["A","1","B","2","C","3"]}'
                         ></textarea>
                    </div>
                    <button
                         type="submit"
                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    >
                         Submit
                    </button>
               </form>

               {response && (
                    <div className="mt-8 max-w-lg mx-auto">
                         <Select
                              isMulti
                              name="filters"
                              options={options}
                              className="mb-4"
                              classNamePrefix="select"
                              onChange={setSelectedOptions}
                              styles={{
                                   control: (base) => ({
                                        ...base,
                                        backgroundColor: '#374151',
                                        borderColor: '#4B5563',
                                   }),
                                   menu: (base) => ({
                                        ...base,
                                        backgroundColor: '#374151',
                                   }),
                                   option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? '#4B5563' : '#374151',
                                        color: 'white',
                                   }),
                                   multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: '#4B5563',
                                   }),
                                   multiValueLabel: (base) => ({
                                        ...base,
                                        color: 'white',
                                   }),
                                   multiValueRemove: (base) => ({
                                        ...base,
                                        color: 'white',
                                        ':hover': {
                                             backgroundColor: '#6B7280',
                                        },
                                   }),
                              }}
                         />
                         <div className="bg-gray-800 p-4 rounded-md">
                              <pre className="whitespace-pre-wrap">
                                   {JSON.stringify(filterResponse(response), null, 2)}
                              </pre>
                         </div>
                    </div>
               )}

               {error && (
                    <div className="mt-4 max-w-lg mx-auto text-red-500">
                         {error}
                    </div>
               )}
          </div>
     );
};

export default BFHLForm;