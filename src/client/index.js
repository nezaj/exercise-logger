import React from 'react'
import ReactDOM from 'react-dom'

import seedEntries from '../server/data/seed.js'
import EntryTable from './components/EntryTable.jsx'

ReactDOM.render(<EntryTable initialEntries={seedEntries}/>,
                document.getElementById('dashboard'))
