// thru.us — prototype data fixtures
// Intentionally minimal. Three orgs, five donors, five recipients, three ground team members.

export type Org = {
  id: string;
  name: string;
  mission: string;
  location: string;
  arc: 'liberation' | 'restoration' | 'relationship';
  color: string;
};

export type Recipient = {
  id: string;
  orgId: string;
  name: string;
  familySize: number;
  location: string;
  story: string;
  need: string;
  needAmount: number;
  photo: string; // emoji placeholder for prototype
  language: string;
  messageFromFamily: string; // in their language
  messageTranslated: string; // english translation
  freedDate?: string;
};

export type Donor = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  giftAmount: number;
  giftDate: string;
  orgId: string;
  recipientId: string;
  status: 'pending_confirmation' | 'confirmed' | 'connected';
};

export type GroundTeamMember = {
  id: string;
  orgId: string;
  name: string;
  role: string;
};

export type AdminUser = {
  id: string;
  orgId: string;
  name: string;
  role: string;
};

// --- ORGS ---

export const orgs: Org[] = [
  {
    id: 'conduit-mission',
    name: 'Conduit Mission',
    mission: 'Liberating families from debt slavery in Pakistan',
    location: 'Pakistan / Nashville, TN',
    arc: 'liberation',
    color: '#C8973A',
  },
  {
    id: 'charity-water',
    name: 'Charity: Water',
    mission: 'Clean water for every person on the planet',
    location: 'Global / New York, NY',
    arc: 'restoration',
    color: '#2A8C8C',
  },
  {
    id: 'unwavering-resolve',
    name: 'Unwavering Resolve',
    mission: 'Creative capacity building for homeless shelter staffs',
    location: 'Nashville, TN',
    arc: 'relationship',
    color: '#7B61FF',
  },
];

// --- RECIPIENTS ---

export const recipients: Recipient[] = [
  {
    id: 'rahman-family',
    orgId: 'conduit-mission',
    name: 'The Rahman Family',
    familySize: 5,
    location: 'Lahore, Pakistan',
    story: 'Tariq Rahman borrowed 180,000 rupees five years ago to cover medical costs for his youngest daughter. The debt, compounding at 40% monthly interest, had grown to nearly 400,000 rupees — an amount his entire family could never repay in their lifetimes. His three children had stopped attending school to help work off the debt.',
    need: 'Full liberation from generational debt bond',
    needAmount: 3500,
    photo: '👨‍👩‍👧‍👦',
    language: 'Urdu',
    messageFromFamily: 'آپ کی مہربانی سے ہماری زندگی بدل گئی۔ میرے بچے اب اسکول جا سکتے ہیں۔ اللہ آپ کو خوش رکھے۔',
    messageTranslated: 'Your kindness has changed our lives. My children can now go to school. May God keep you happy.',
    freedDate: '2024-04-04',
  },
  {
    id: 'hussain-family',
    orgId: 'conduit-mission',
    name: 'The Hussain Family',
    familySize: 7,
    location: 'Faisalabad, Pakistan',
    story: 'Amina Hussain\'s husband passed away two years ago, leaving her with six children and a debt inherited from his family\'s failed harvest. The landlord had threatened to take their home.',
    need: 'Full liberation from inherited family debt',
    needAmount: 3500,
    photo: '👩‍👧‍👦',
    language: 'Urdu',
    messageFromFamily: 'میں نے کبھی نہیں سوچا تھا کہ کوئی ہماری مدد کرے گا۔ آپ نے ہمیں نئی زندگی دی۔',
    messageTranslated: 'I never thought anyone would help us. You gave us a new life.',
  },
  {
    id: 'ali-family',
    orgId: 'conduit-mission',
    name: 'The Ali Family',
    familySize: 4,
    location: 'Karachi, Pakistan',
    story: 'Zafar Ali worked as a rickshaw driver whose vehicle was seized by a creditor. Without transportation he could not work, deepening the debt spiral.',
    need: 'Full liberation from debt and vehicle recovery',
    needAmount: 3500,
    photo: '👨‍👩‍👦',
    language: 'Urdu',
    messageFromFamily: 'میرا رکشہ واپس آ گیا۔ میں پھر سے کام کر سکتا ہوں۔ شکریہ۔',
    messageTranslated: 'My rickshaw is back. I can work again. Thank you.',
  },
  {
    id: 'marcus-johnson',
    orgId: 'unwavering-resolve',
    name: 'Marcus Johnson',
    familySize: 1,
    location: 'Nashville, TN',
    story: 'Marcus spent three years living under the Jefferson Street bridge after losing his job and apartment in the same month. He has been at the shelter for four months and is working with a case manager toward stable housing.',
    need: 'Art supplies and creative workshop enrollment',
    needAmount: 285,
    photo: '🧑🏾',
    language: 'English',
    messageFromFamily: 'I painted something for the first time in fifteen years. I forgot I could do that.',
    messageTranslated: 'I painted something for the first time in fifteen years. I forgot I could do that.',
  },
  {
    id: 'elena-vasquez',
    orgId: 'unwavering-resolve',
    name: 'Elena Vasquez',
    familySize: 1,
    location: 'Nashville, TN',
    story: 'Elena fled domestic violence with her two children eighteen months ago. She and her children are now in stable transitional housing and she is pursuing her GED.',
    need: 'Music lessons and instrument for her daughter',
    needAmount: 420,
    photo: '👩🏽',
    language: 'Spanish',
    messageFromFamily: 'Mi hija tocó el piano por primera vez hoy. Me hizo llorar de alegría.',
    messageTranslated: 'My daughter played piano for the first time today. It made me cry with joy.',
  },
];

// --- DONORS ---

export const donors: Donor[] = [
  {
    id: 'david-chen',
    name: 'David Chen',
    location: 'Nashville, TN',
    avatar: '👤',
    giftAmount: 3500,
    giftDate: '2024-03-31',
    orgId: 'conduit-mission',
    recipientId: 'rahman-family',
    status: 'pending_confirmation',
  },
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    location: 'Franklin, TN',
    avatar: '👤',
    giftAmount: 3500,
    giftDate: '2024-04-01',
    orgId: 'conduit-mission',
    recipientId: 'hussain-family',
    status: 'pending_confirmation',
  },
  {
    id: 'james-okafor',
    name: 'James Okafor',
    location: 'Atlanta, GA',
    avatar: '👤',
    giftAmount: 3500,
    giftDate: '2024-04-02',
    orgId: 'conduit-mission',
    recipientId: 'ali-family',
    status: 'pending_confirmation',
  },
  {
    id: 'margaret-hollis',
    name: 'Margaret Hollis',
    location: 'Brentwood, TN',
    avatar: '👤',
    giftAmount: 285,
    giftDate: '2024-04-03',
    orgId: 'unwavering-resolve',
    recipientId: 'marcus-johnson',
    status: 'pending_confirmation',
  },
  {
    id: 'tom-bradley',
    name: 'Tom Bradley',
    location: 'Nashville, TN',
    avatar: '👤',
    giftAmount: 420,
    giftDate: '2024-04-03',
    orgId: 'unwavering-resolve',
    recipientId: 'elena-vasquez',
    status: 'pending_confirmation',
  },
];

// --- GROUND TEAM ---

export const groundTeam: GroundTeamMember[] = [
  {
    id: 'fatima-malik',
    orgId: 'conduit-mission',
    name: 'Fatima Malik',
    role: 'Field Coordinator',
  },
  {
    id: 'yusuf-ahmed',
    orgId: 'conduit-mission',
    name: 'Yusuf Ahmed',
    role: 'Liberation Officer',
  },
  {
    id: 'priya-nathaniel',
    orgId: 'unwavering-resolve',
    name: 'Priya Nathaniel',
    role: 'Program Coordinator',
  },
];

// --- ADMINS ---

export const admins: AdminUser[] = [
  {
    id: 'admin-conduit',
    orgId: 'conduit-mission',
    name: 'Rachel Torres',
    role: 'Operations Director',
  },
  {
    id: 'admin-unwavering',
    orgId: 'unwavering-resolve',
    name: 'Bruce Koblish',
    role: 'Executive Director',
  },
];

// --- HELPER FUNCTIONS ---

export function getOrgById(id: string) {
  return orgs.find(o => o.id === id);
}

export function getRecipientById(id: string) {
  return recipients.find(r => r.id === id);
}

export function getDonorById(id: string) {
  return donors.find(d => d.id === id);
}

export function getDonorsByOrg(orgId: string) {
  return donors.filter(d => d.orgId === orgId);
}

export function getRecipientsByOrg(orgId: string) {
  return recipients.filter(r => r.orgId === orgId);
}
