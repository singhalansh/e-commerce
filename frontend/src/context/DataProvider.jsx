import React from 'react'

export const DataContext = React.createContext({
    account: '',
    setAccount: () => {},
});

function DataProvider({children}) {
    const [account, setAccount] = React.useState('');

  return (
    <DataContext.Provider value={{ account, setAccount }}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider;