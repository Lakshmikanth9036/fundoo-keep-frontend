import React from 'react'

const viewContext = React.createContext({view: false, viewController: () => {}});

export default viewContext;