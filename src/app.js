import React from 'react'
import ReactDOM from 'react-dom'

import { EntryTable } from './components/entry'

const ENTRIES = [
  {
    'date': '01/17/16',
    'foods': [
      'Subway (320)',
      'Wedding food (1000)',
      'Family dinner (2000)'
    ]
  },
  {
    'date': '01/16/16',
    'foods': [
      'Beef Patty (375) + Veggies (75)',
      'Protein Powder (120)',
      'Protein Bar (210)',
      'Mediterranean Food (700)',
      'Beer (200)',
      'Avocados (550)'
    ]
  }
]

ReactDOM.render(<EntryTable entries={ENTRIES} />,
                document.getElementById('dashboard'))
