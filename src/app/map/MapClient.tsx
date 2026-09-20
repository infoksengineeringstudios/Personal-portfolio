"use client";

import { useEffect, useRef } from "react";
import "./capmap.css";

const MAP_HTML = `<div class="map-viewport" aria-label="Engineering capability map">
    <div class="map">
      <div class="blueprint-landscape" aria-hidden="true">
        <span class="ambient-sketch ambient-bridge"></span>
        <span class="ambient-sketch ambient-frame"></span>
        <span class="ambient-sketch ambient-model"></span>
        <span class="ambient-sketch ambient-construction"></span>
        <span class="ambient-sketch ambient-section"></span>
      </div>
      <p class="map-title">ENGINEERING CAPABILITY MAP</p>
      <svg class="connections" viewBox="0 0 1536 1024" aria-hidden="true">
        <g fill="none" stroke-width="2.4">
          <path class="link engineer-link" d="M768 294V364"/>
          <path class="link lead-link" d="M541 333Q580 346 606 377"/>
          <path class="link model-link" d="M996 333Q950 344 926 377"/>
          <path class="link optimise-link" d="M623 557L574 623"/>
          <path class="link build-link" d="M908 557L960 623"/>
          <path class="story-link teal" d="M374 245Q404 153 528 139"/>
          <path class="story-link teal" d="M1006 139Q1120 149 1157 245"/>
          <path class="story-link teal" d="M1280 503Q1274 579 1231 621"/>
          <path class="story-link gold" d="M718 823Q768 839 819 823"/>
          <path class="story-link violet" d="M254 504Q258 581 314 623"/>
        </g>
        <g class="engineer-dots"><circle cx="768" cy="294" r="5.5"/><circle cx="768" cy="364" r="5.5"/><circle cx="574" cy="623" r="5.5"/></g>
        <g class="lead-dots"><circle cx="541" cy="333" r="5.5"/></g>
        <g class="teal-dots"><circle cx="374" cy="245" r="5.5"/><circle cx="528" cy="139" r="5.5"/><circle cx="1006" cy="139" r="5.5"/><circle cx="1157" cy="245" r="5.5"/><circle cx="996" cy="333" r="5.5"/><circle cx="1280" cy="503" r="5.5"/><circle cx="1231" cy="621" r="5.5"/></g>
        <g class="gold-dots"><circle cx="960" cy="623" r="5.5"/><circle cx="718" cy="823" r="5.5"/><circle cx="819" cy="823" r="5.5"/></g>
        <g class="violet-dots"><circle cx="254" cy="504" r="5.5"/><circle cx="314" cy="623" r="5.5"/></g>
      </svg>

      <header class="identity">
        <h1>KRISHIRAJ SANTCHURN</h1>
        <p>Civil + Structural + Infrastructure</p>
        <div class="identity-rule"></div>
        <p class="motto">DESIGN <span>→</span> DIGITALISE <span>→</span> DELIVER</p>
      </header>

      <section class="capability engineer" aria-labelledby="engineer-title">
        <div class="illustration engineer-art" aria-hidden="true"></div>
        <div class="card-heading"><span class="number">01</span><div><h2 id="engineer-title">ENGINEER</h2><p>Structural &amp; Civil</p></div></div>
        <p class="flow">RC • Steel • Analysis → Documentation</p>
        <div class="evidence"><h3>Key Experience</h3><p><a href="/internships/lux-consult">Lux Consult</a><br><a href="/projects/aboriginal-gathering-place">Aboriginal Gathering Place</a> • <a href="/projects/road-design">Rafflesia Vision Valley</a><br>SpaceGass • AutoCAD</p></div>
      </section>

      <section class="capability model" aria-labelledby="model-title">
        <div class="illustration model-art" aria-hidden="true"></div>
        <div class="card-heading"><span class="number">02</span><div><h2 id="model-title">MODEL</h2><p>BIM &amp; Digital Engineering</p></div></div>
        <p class="flow">Revit → BIM → Coordination → Data → Automation</p>
        <div class="evidence"><h3>Key Experience</h3><p><a href="/projects/revit">Apartment BIM model</a> • <a href="/projects/revit">Structural Revit model</a><br>Dynamo • <a href="/projects/digital-twin">Digital twin</a> • AI-assisted workflows</p></div>
      </section>

      <section class="capability build" aria-labelledby="build-title">
        <div class="illustration build-art" aria-hidden="true"></div>
        <div class="card-heading"><span class="number">03</span><div><h2 id="build-title">BUILD</h2><p>Construction</p></div></div>
        <p class="flow">Design → Documentation → Site → Delivery</p>
        <div class="evidence"><h3>Key Experience</h3><p><a href="/internships/taylemay-group">Taylemay</a> • <a href="/internships/ministry-of-national-infrastructure">Ministry of National Infrastructure</a><br>~1,000-unit development<br>Site coordination • Quality &amp; safety • Sequencing</p></div>
      </section>

      <section class="capability optimise" aria-labelledby="optimise-title">
        <div class="illustration optimise-art" aria-hidden="true"></div>
        <div class="card-heading"><span class="number">04</span><div><h2 id="optimise-title">OPTIMISE</h2><p>Technology + Commercial</p></div></div>
        <p class="flow">Engineering + Technology + Data + Commercial thinking<br><span>Better decisions</span></p>
        <div class="evidence"><h3>Key Experience</h3><p><a href="/projects/digital-twin">Digital Twin research</a> • AI • Data analysis<br>ACCA • CAPM • Excel • Cost estimation</p></div>
      </section>

      <section class="capability lead" aria-labelledby="lead-title">
        <div class="illustration lead-art" aria-hidden="true"></div>
        <div class="card-heading"><span class="number">05</span><div><h2 id="lead-title">LEAD</h2><p>People &amp; Projects</p></div></div>
        <p class="flow">Communication → Coordination → Leadership → Delivery</p>
        <div class="evidence"><h3>Key Experience</h3><p><a href="/leadership/monash-sustainable-building">Monash Sustainable Buildings</a> • <a href="/leadership/mauritian-society">Mauritian Society</a><br><a href="/leadership/aces">ACES</a> • <a href="/leadership/ambassador">Campus Ambassador</a> • <a href="/leadership/aws-student-builder-group">AWS Student Builder Group</a><br>Founded a society • AUD $4,000 sponsorship</p></div>
      </section>

      <div class="story story-lead">People and<br>technical delivery</div>
      <div class="story story-model">Design into<br>information</div>
      <div class="story story-build">Models into<br>site communication</div>
      <div class="story story-optimise">Site insight into better decisions</div>
      <div class="story story-people">Project constraints<br>into coordinated action</div>

      <footer>
        <p>Engineering understood across the project lifecycle.</p>
        <div>ENGINEERING <span>→</span> CONSTRUCTION <span>→</span> BIM / DIGITAL <span>→</span> COMMERCIAL <span>→</span> LEADERSHIP</div>
      </footer>
    </div>
  </div>`;

export function MapClient() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const viewport = root.querySelector(".map-viewport") as HTMLElement | null;
    const map = root.querySelector(".map") as HTMLElement | null;
    if (!viewport || !map) return;
    const fit = () => {
      if (window.matchMedia("(max-width: 799px)").matches) {
        map.style.removeProperty("transform");
        map.style.removeProperty("transform-origin");
        viewport.style.removeProperty("height");
        return;
      }
      const availW = viewport.clientWidth;
      const availH = window.innerHeight - 96; // room for the sticky header
      const scale = Math.min(availW / 1536, availH / 1024);
      const offX = Math.max(0, (availW - 1536 * scale) / 2); // centre when height-limited
      map.style.transformOrigin = "top left";
      map.style.transform = `translateX(${offX}px) scale(${scale})`;
      viewport.style.height = `${1024 * scale}px`;
    };
    fit();
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(fit);
      ro.observe(viewport);
    }
    window.addEventListener("resize", fit, { passive: true });
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);
  return (
    <div className="capmap-page" ref={ref} dangerouslySetInnerHTML={{ __html: MAP_HTML }} />
  );
}
