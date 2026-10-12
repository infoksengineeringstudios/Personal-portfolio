---
title: Aboriginal Gathering Place
discipline: Civil
role: Structural Engineer
summary: "Fourth-year civil capstone — the structural design of a community gathering place, from a concept comparison (RC vs steel) through to detailed steel design: a Revit model, Autodesk Robot analysis, critical-member checks to AS 4100, and connection details produced in Revit with a custom Revit MCP."
period: July 2026 – November 2026
featured: true
cover: 1. Concept design/Aerial view.png
technologies:
  - Structural design
  - Structural steel
  - Reinforced concrete
  - Revit Structure
  - Autodesk Robot
  - Revit MCP (AI-assisted detailing)
  - AS 4100 steel design
  - Composite floor systems
learnings:
  - Developed and compared two structural schemes, then took the preferred one into detailed design.
  - Resolved a large column-free clear span with an efficient steel framing strategy.
  - Analysed the frame in Autodesk Robot and checked the critical members to AS 4100.
  - Produced the steel connection details in Revit using a Revit MCP, selecting the connection types and sizes and checking the output.
---

## Overview

A fourth-year civil engineering capstone: the structural design of a community Aboriginal Gathering Place. I lead the **structural discipline**, taking the building from concept design through to a detailed, analysed and documented steel scheme. The project is ongoing — more will be added as it develops.

## Concept design

The Multi-Purpose Room had to be a fully open, column-free space; that clear span drove the strategy and separated the two concepts:

- **Reinforced concrete** — a 250 × 250 mm column grid on wall lines, 200 × 300 mm beams (deeper 275 × 425 mm over the long spans), and a 150–175 mm RC slab using one- and two-way action.
- **Structural steel** — a 250UC72.9 column grid with 410UB53.7 primary beams and a lighter 120 mm composite slab on profiled steel decking, with long-span framing over the Multi-Purpose Room.

Structural steel was recommended, for the column-free room, lighter structure and faster construction.

## Detailed design

The preferred scheme is modelled in **Revit** and analysed in **Autodesk Robot**: the Revit geometry drives a Robot analytical model, and the roof is run under the ULS and SLS combinations for axial force, shear, bending and deflection. From those results I checked the governing members against **AS 4100** — the primary and secondary roof beams, the most heavily loaded column and a roof brace — each on its own design sheet showing the actions, the capacity checks and the governing utilisation. The scheme is then documented as a full set of general-arrangement drawings: the 3D steel frame, key and setout plans, sections and elevations.

## Connection detailing with a Revit MCP

The standout of the detailed phase was producing the steel connection details in Revit through a **Revit MCP** — a Model Context Protocol link that lets Claude drive Revit directly. Claude called Autodesk's Revit MCP server to read and set element parameters and used a desktop link to operate Revit and lay out the detail views; I chose the connection types and sizes and checked every result.

Five connection types cover the whole roof — C1 base plate, C2 cap plate, C3 hub, C4 fin plate, C5 purlin cleat and the C6 bracing connection. The most complex is the **C3 hub**, where four or more roof beams frame into a single column cap; it is drawn as a dimensioned multi-beam typical so one detail covers every hub in the roof. Turning the engineering intent into coordinated Revit details and drawings this way cut the drafting time sharply while keeping me in control of the structural decisions.

The "How the Revit MCP was used" gallery walks through the workflow step by step — plain-English instructions, a full model audit, bulk parameter edits, the problems it caught, the connections it drew, and an honest look at what it couldn't do.
