import { names, type Lang } from '../localization/strings'
export const phases = [
  [0, 'deepNight', '✦', '#344A91'],
  [180, 'preDawn', '☾', '#7868B2'],
  [300, 'dawn', '☼', '#C18AC2'],
  [360, 'sunrise', '☼', '#F49A91'],
  [420, 'morning', '☼', '#F7B36D'],
  [540, 'lateMorning', '☼', '#F7CF69'],
  [660, 'noon', '☼', '#FFE66D'],
  [780, 'afternoon', '☼', '#F4BB83'],
  [960, 'lateAfternoon', '☼', '#E99480'],
  [1080, 'sunset', '☼', '#D978A7'],
  [1140, 'dusk', '☾', '#A779BF'],
  [1200, 'evening', '☾', '#718AC1'],
  [1260, 'lateNight', '☾', '#5067A7']
] as const
export const validZone = (id:string) => { try { new Intl.DateTimeFormat('en',{timeZone:id});return true }catch{return false} }
export const browserLocale = navigator.languages?.[0] || navigator.language || 'en-GB'
export const locale = (l:Lang) => l==='de'?(browserLocale.toLowerCase().startsWith('de')?browserLocale:'de-DE'):(browserLocale.toLowerCase().startsWith('en')?browserLocale:'en-GB')
export const hourCycle = () => {const stored=localStorage.getItem('tz-hour-cycle');return stored==='h12'||stored==='h23'?stored:(new Intl.DateTimeFormat(browserLocale,{hour:'numeric'}).resolvedOptions().hourCycle==='h12'?'h12':'h23')}
export const displayLocale = (l:Lang) => localStorage.getItem('tz-locale') || locale(l)
export function parts(date:Date, zone:string) { const p=new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);return Number(p.find(x=>x.type==='hour')?.value)*60+Number(p.find(x=>x.type==='minute')?.value) }
export function phase(date:Date, zone:string,lang:Lang){const min=parts(date,zone);const p=[...phases].reverse().find(x=>min>=x[0])!;return {name:names[lang][p[1]],icon:p[2],color:p[3]}}
export function clock(date:Date,zone:string,lang:Lang){return new Intl.DateTimeFormat(locale(lang),{timeZone:zone,hour:'2-digit',minute:'2-digit',hourCycle:hourCycle()}).format(date)}
export function day(date:Date,zone:string,lang:Lang,_long=false){void _long;return new Intl.DateTimeFormat(displayLocale(lang),{timeZone:zone,day:'numeric',month:'long',year:'numeric'}).format(date)}
