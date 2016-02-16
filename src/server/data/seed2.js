/* Seed data for bootstraping app */

import uuid from 'node-uuid'

const entries = [
  {
    'id': uuid.v4(),
    'date': '(Sunday): 01/24/16',
    'diet': [
      'Breaded Chicken (330) + BBQ Chicken (175)',
      'Veggies (75)',
      'Protein Ice Cream (70)',
      'Mandarins (70) + Avocado (275)',
      'Cottage Cheese (180) + Carrots (50)',
      'BBQ Chicken (175) + Chicken Tenders (330)',
      'Protein Ice Cream (140)'
    ],
    'exercise': {
      'header': 'Lift, Embarcadero Run, Jiu-Jitsu',
      'effort': [
        'Crazy 8s: 5x75 Day 6 (Complete)',
        'Skulls Crushers: 5x75 Day 6 (Complete)',
        'Squats: 5x200x5 (Complete)',
        'Bench: 5x175x5 (Complete)'
      ]
    },
    'notes': [
      'Woke up early and took care of some personal chores',
      'Great lift session, completed rx',
      'Beautiful day, motivated to do another run',
      'Triple workout day'
    ]
  }
]

export default entries
