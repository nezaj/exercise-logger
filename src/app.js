import React from 'react'
import ReactDOM from 'react-dom'

import entries from './data/sample.js'
import EntryTable from './components/EntryTable.jsx'

ReactDOM.render(<EntryTable initialEntries={entries}/>,
                document.getElementById('dashboard'))
