import { useState } from 'react'
import type { Zone } from '../data/models'
import { names, type Lang } from '../localization/strings'
import { parts, phase, clock, day } from '../utils/time'
// Pick a readable tick color independently for each side of the slider.
function tickColor(hex:string):string {
 const channels=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
 const luminance=0.2126*channels[0]+0.7152*channels[1]+0.0722*channels[2];
 return luminance>0.179?'#141218':'#ffffff';
}
export default function Compare({zone,lang,onClose}:{zone:Zone;lang:Lang;onClose:()=>void}){
 const t=names[lang];const local=Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC';
 const [reference,setReference]=useState(()=>new Date());const [minute,setMinute]=useState(()=>Math.min(1440,Math.round(parts(new Date(),local)/30)*30));
 const localParts=new Intl.DateTimeFormat('en-US',{timeZone:local,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(reference);
 const val=(k:string)=>Number(localParts.find(x=>x.type===k)?.value);
 const midnight=new Date(Date.UTC(val('year'),val('month')-1,val('day')));
 const offset=(d:Date)=>{const ps=new Intl.DateTimeFormat('en-US',{timeZone:local,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(d);const get=(k:string)=>Number(ps.find(x=>x.type===k)?.value);return Date.UTC(get('year'),get('month')-1,get('day'),get('hour'),get('minute'),get('second'))-d.getTime()};
 const dateFor=(m:number)=>{const naive=new Date(midnight.getTime()+m*60000);let actual=new Date(naive.getTime()-offset(naive));actual=new Date(naive.getTime()-offset(actual));return actual};
 const date=dateFor(minute),p1=phase(date,local,lang),p2=phase(date,zone.ianaId,lang);
 return <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="dialog compare" style={{'--left':p1.color,'--right':p2.color,'--progress':`${minute/1440*100}%`} as React.CSSProperties}>
 <h2>{t.compare}</h2><div className="compare-clocks"><div><small>{t.your}</small><strong>{clock(date,local,lang)}</strong><small>{day(date,local,lang,true)}</small><small style={{color:p1.color}}>{p1.icon} {p1.name}</small></div><div className="right"><small>{zone.displayName}</small><strong>{clock(date,zone.ianaId,lang)}</strong><small>{day(date,zone.ianaId,lang,true)}</small><small style={{color:p2.color}}>{p2.icon} {p2.name}</small></div></div>
 <div className="slider-block"><div className="compare-side-label" style={{color:p1.color}}>{t.your}</div><div className="slider-labels"><span>{clock(dateFor(0),local,lang)}</span><span>{clock(dateFor(720),local,lang)}</span><span>{clock(dateFor(1440),local,lang)}</span></div><div className="compare-range"><div className="hour-ticks">{Array.from({length:23},(_,i)=><i key={i} className={i===11?"noon-tick":undefined} style={{left:`${((i+1)/24)*100}%`,backgroundColor:tickColor((i+1)*60<=minute?p1.color:p2.color)}}/>)}</div><input aria-label={t.compare} type="range" min="0" max="1440" step="10" value={minute} onChange={e=>setMinute(Number(e.target.value))}/></div><div className="slider-labels"><span>{clock(dateFor(0),zone.ianaId,lang)}</span><span>{clock(dateFor(720),zone.ianaId,lang)}</span><span>{clock(dateFor(1440),zone.ianaId,lang)}</span></div><div className="compare-side-label remote" style={{color:p2.color}}>{zone.displayName}</div></div>
 <div className="actions compare-actions"><button onClick={()=>{const n=new Date();setReference(n);setMinute(Math.min(1440,Math.round(parts(n,local)/30)*30))}}>{t.now}</button><button className="primary" onClick={onClose}>{t.done}</button></div></section></div>
}
