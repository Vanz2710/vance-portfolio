/* Fixed ambient background: grid, film grain, cursor spotlight,
   floating code glyphs and slow geometric shapes (all parallaxed on scroll).
   Colors read the theme tokens (--line triplet / --ac) so they follow
   dark/light mode and the accent override. */
const line = (a) => `rgba(var(--line), ${a})`
const ac = (pct) => `color-mix(in oklab, var(--ac, #C778DD) ${pct}%, transparent)`

export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-grid" data-grid="" />
      <div className="bg-noise" />
      <div className="bg-spot" data-spot="" />
      <span data-bgp=".05" style={{ position: 'absolute', left: '6%', top: '18%', fontSize: 22, color: line(.1), animation: 'floaty 9s ease-in-out infinite' }}>{'{ }'}</span>
      <span data-bgp=".08" style={{ position: 'absolute', right: '7%', top: '13%', fontSize: 20, color: ac(13), animation: 'floaty 11s ease-in-out 1.2s infinite' }}>{'</>'}</span>
      <span data-bgp=".04" style={{ position: 'absolute', left: '11%', top: '66%', fontSize: 28, color: line(.1), animation: 'floaty 8s ease-in-out .6s infinite' }}>;</span>
      <span data-bgp=".09" style={{ position: 'absolute', right: '13%', top: '58%', fontSize: 18, color: ac(11), animation: 'floaty 10s ease-in-out 2s infinite' }}>{'=>'}</span>
      <span data-bgp=".03" style={{ position: 'absolute', left: '46%', top: '7%', fontSize: 24, color: line(.09), animation: 'floaty 12s ease-in-out infinite' }}>#</span>
      <span data-bgp=".07" style={{ position: 'absolute', right: '31%', top: '84%', fontSize: 20, color: line(.1), animation: 'floaty 9.5s ease-in-out 1.6s infinite' }}>[ ]</span>
      <span data-bgp=".06" style={{ position: 'absolute', left: '30%', top: '88%', fontSize: 19, color: ac(11), animation: 'floaty 10.5s ease-in-out .9s infinite' }}>::</span>
      <div data-bgp=".05" data-bgr="" style={{ position: 'absolute', left: -44, top: '42%', width: 150, height: 150, border: `1px solid ${ac(14)}` }} />
      <div data-bgp=".09" style={{ position: 'absolute', right: -26, top: '24%', width: 96, height: 96, border: `1px solid ${line(.12)}`, animation: 'spin360 90s linear infinite' }} />
      <div data-bgp=".07" style={{ position: 'absolute', right: '17%', bottom: '9%', width: 120, height: 120, backgroundImage: `radial-gradient(${line(.16)} 1.2px,transparent 1.2px)`, backgroundSize: '17px 17px' }} />
      <div data-bgp=".04" style={{ position: 'absolute', left: '21%', top: '31%', width: 100, height: 100, backgroundImage: `radial-gradient(${ac(14)} 1.2px,transparent 1.2px)`, backgroundSize: '16px 16px' }} />
    </div>
  )
}
