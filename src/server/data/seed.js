/* Seed data for bootstraping app */

import uuid from 'node-uuid'

const entries = [
  {
    'id': uuid.v4(),
    'date': '(Sunday): 01/24/16',
    'foods': [
      { 'id': uuid.v4(), 'value': 'Breaded Chicken (330) + BBQ Chicken (175)' },
      { 'id': uuid.v4(), 'value': 'Veggies (75)' },
      { 'id': uuid.v4(), 'value': 'Protein Ice Cream (70)' },
      { 'id': uuid.v4(), 'value': 'Mandarins (70) + Avocado (275)' },
      { 'id': uuid.v4(), 'value': 'Cottage Cheese (180) + Carrots (50)' },
      { 'id': uuid.v4(), 'value': 'BBQ Chicken (175) + Chicken Tenders (330)' },
      { 'id': uuid.v4(), 'value': 'Protein Ice Cream (140)' }
    ]
  },
  {
    'id': uuid.v4(),
    'date': '(Saturday): 01/23/16',
    'foods': [
      { 'id': uuid.v4(), 'value': 'Breaded Chicken (220) + Meatballs (150)' },
      { 'id': uuid.v4(), 'value': 'Veggies (75)' },
      { 'id': uuid.v4(), 'value': 'Halo Top (240) + Englightened (80)' },
      { 'id': uuid.v4(), 'value': 'Artic Zero (70)' },
      { 'id': uuid.v4(), 'value': 'Dinner w/ Friends (1000)' }
    ]
  },
  {
    'id': uuid.v4(),
    'date': '(Friday): 01/22/16',
    'foods': [
      { 'id': uuid.v4(), 'value': 'Protein Powder (120) + Cottage Cheese (150)' },
      { 'id': uuid.v4(), 'value': 'Beef Jerky (210)' },
      { 'id': uuid.v4(), 'value': 'Breaded Chicken (330) + BBQ Chicken (150)' },
      { 'id': uuid.v4(), 'value': 'Veggies (75)' },
      { 'id': uuid.v4(), 'value': 'Mandarins (70)' },
      { 'id': uuid.v4(), 'value': 'Artic Zero (70) + Halo Top (80)' }
    ]
  },
  {
    'id': uuid.v4(),
    'date': '(Thursday): 01/21/16',
    'foods': [
      { 'id': uuid.v4(), 'value': 'Protein Powder (120)' },
      { 'id': uuid.v4(), 'value': 'Turkey Sanwhich + Salad (650)' },
      { 'id': uuid.v4(), 'value': 'Protein Ice Cream (150)' },
      { 'id': uuid.v4(), 'value': 'Cottage Cheese (180) + Carrots (30)' },
      { 'id': uuid.v4(), 'value': 'Family Dinner (1500)' }
    ]
  },
  {
    'id': uuid.v4(),
    'date': '(Wednesday): 01/20/16',
    'foods': [
      { 'id': uuid.v4(), 'value': 'Turkey Balls (300) + Veggies (75)' },
      { 'id': uuid.v4(), 'value': 'Protein Powder (120)' },
      { 'id': uuid.v4(), 'value': 'Cottage Cheese (240)' },
      { 'id': uuid.v4(), 'value': 'Turkey Balls (300) + Veggies (75)' },
      { 'id': uuid.v4(), 'value': 'Protein Powder (120)' }
    ]
  },
  {
    'id': uuid.v4(),
    'date': '(Tuesday): 01/19/16',
    'foods': [
      { 'id': uuid.v4(), 'value': 'Turkey Balls (300) + Veggies (75)' },
      { 'id': uuid.v4(), 'value': 'Protein Powder (120)' },
      { 'id': uuid.v4(), 'value': 'Cottage Cheese (90) + Tomatoes (100)' },
      { 'id': uuid.v4(), 'value': 'Protein Powder (120)' },
      { 'id': uuid.v4(), 'value': 'Indian Food (1000)' }
    ]
  },
  {
    'id': uuid.v4(),
    'date': '(Monday): 01/18/16',
    'foods': [
      { 'id': uuid.v4(), 'value': 'Family Lunch + Sweets (2250)' },
      { 'id': uuid.v4(), 'value': 'PB Cookie (250)' }
    ]
  }
]

export default entries
