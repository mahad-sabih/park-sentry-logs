
export type FaultStatus = 'Outstanding' | 'Parts Ordered' | 'Completed';

export interface FaultReportType {
  id: string;
  date: string;
  carPark: string;
  equipment: string;
  equipmentType: string;
  description: string;
  reportedBy: string;
  status: FaultStatus;
  notes: string;
  aiSuggestions?: string[];
}

export const carParks = [
  'Virginia Water',
  'Virginia Water South',
  'Savill Garden',
  'Wick',
  'Rangers',
  'Cranbourne',
];

export const equipmentTypes = ['POF', 'Entry', 'Exit'];

export const statuses: FaultStatus[] = ['Outstanding', 'Parts Ordered', 'Completed'];

export const faultReportsData: FaultReportType[] = [
  {
    id: 'F32145',
    date: '2023-04-12',
    carPark: 'Virginia Water',
    equipment: 'POF 3',
    equipmentType: 'POF',
    description: 'Display showing error code E45, screen flickers and then goes blank',
    reportedBy: 'JD',
    status: 'Outstanding',
    notes: 'Tried power cycling but issue persists',
    aiSuggestions: [
      '78% of similar cases, replacing the display cable resolved E45 errors',
      '62% of flickering display issues were power-related'
    ]
  },
  {
    id: 'F32141',
    date: '2023-04-10',
    carPark: 'Savill Garden',
    equipment: 'Entry 1',
    equipmentType: 'Entry',
    description: 'Barrier not raising fully, stops at about 70% elevation',
    reportedBy: 'KA',
    status: 'Parts Ordered',
    notes: 'Appears to be mechanical issue with arm. Ordered replacement hydraulic unit',
    aiSuggestions: [
      '83% of partial barrier elevation issues were resolved by adjusting the tension springs',
      '45% of cases involved debris in the barrier track'
    ]
  },
  {
    id: 'F32140',
    date: '2023-04-10',
    carPark: 'Virginia Water South',
    equipment: 'Exit 3',
    equipmentType: 'Exit',
    description: 'Barrier arm detached from mechanism',
    reportedBy: 'JD',
    status: 'Parts Ordered',
    notes: 'Arm attachment bracket broken. Replacement ordered from Skidata',
    aiSuggestions: [
      '91% of detached barrier arms required bracket replacement',
      '24% of cases showed evidence of impact damage'
    ]
  },
  {
    id: 'F32137',
    date: '2023-04-08',
    carPark: 'Cranbourne',
    equipment: 'Exit 2',
    equipmentType: 'Exit',
    description: 'Card reader not accepting payments, shows red light on insertion',
    reportedBy: 'JD',
    status: 'Completed',
    notes: 'Card reader head cleaned and recalibrated. Now working normally',
    aiSuggestions: [
      '67% of card reader failures were resolved by cleaning the reader head',
      '32% required recalibration of the magnetic sensors'
    ]
  },
  {
    id: 'F32136',
    date: '2023-04-08',
    carPark: 'Virginia Water',
    equipment: 'POF 2',
    equipmentType: 'POF',
    description: 'Receipt printer not working, error code P12',
    reportedBy: 'KA',
    status: 'Completed',
    notes: 'Paper jam cleared, printer realigned',
    aiSuggestions: [
      '74% of P12 error codes indicated paper jams',
      '18% were resolved by replacing the printer ribbon'
    ]
  },
  {
    id: 'F32135',
    date: '2023-04-07',
    carPark: 'Virginia Water South',
    equipment: 'POF 1',
    equipmentType: 'POF',
    description: 'Coin acceptor jammed, not taking any coins',
    reportedBy: 'JD',
    status: 'Completed',
    notes: 'Foreign object removed from coin slot. System tested and working properly',
    aiSuggestions: [
      '82% of coin acceptor jams were caused by foreign objects',
      '15% were resolved by recalibrating the coin recognition sensors'
    ]
  },
  {
    id: 'F32130',
    date: '2023-04-05',
    carPark: 'Wick',
    equipment: 'Entry 2',
    equipmentType: 'Entry',
    description: 'Ticket printer out of paper, showing error message',
    reportedBy: 'KA',
    status: 'Completed',
    notes: 'Refilled ticket paper and reset printer. Working normally',
    aiSuggestions: [
      '95% of ticket printer errors were resolved by replacing paper',
      '23% also required a system reset after paper replacement'
    ]
  },
];
