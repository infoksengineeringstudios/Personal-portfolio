# Revit Learning Project — Garden Studio (Beginner)

A small, complete project that teaches you the whole Revit workflow in one sitting
(~3–4 hours). You'll model a simple building and produce a real drawing set — which
you can then drop into the **Revit** project on your portfolio (it's currently a
placeholder).

**What you'll build:** a 6 m × 8 m single-room garden studio — slab, four walls,
one door, two windows, a gable roof — then a documentation set: floor plan, two
elevations, one section, a 3D view, and a door/window schedule, all on one titled
A3 sheet exported to PDF.

**What you'll learn (the Revit fundamentals):** levels, walls, floors, hosted
doors/windows, roofs, views (plan / elevation / section / 3D), dimensions & tags,
schedules, sheets & title blocks, and PDF export.

---

## Before you start
- Revit 2024 or newer. Students get it free from Autodesk Education.
- Start a **New** model → choose the **Architectural** template.
- Set units to millimetres: **Manage → Project Units → Length → millimeters**.
- Save now as `Garden-Studio.rvt` and press **Ctrl+S** often.
- Handy navigation: hold **middle mouse** to pan, **scroll** to zoom, **Shift +
  middle mouse** to orbit (in 3D).

---

## Phase 1 — Levels (5 min)
1. In the **Project Browser** (left panel) open **Elevations → East**.
2. You'll see **Level 1** (at 0) and **Level 2**. Double-click Level 2's height
   value and set it to **3000** (your eave height).
3. That's it — levels are the horizontal datums everything hosts to.

## Phase 2 — Walls (15 min)
1. Open **Floor Plans → Level 1**.
2. **Architecture** tab → **Wall** → *Wall: Architectural*.
3. On the **Options Bar**: Height = **Level 2**, Location Line = **Finish Face:
   Exterior**.
4. Draw a rectangle **8000 × 6000**. As you draw, type the dimension and press
   **Tab** to jump between the two fields; click to finish, then **Esc**.
5. You now have four exterior walls.

## Phase 3 — Floor slab (10 min)
1. **Architecture → Floor** → *Floor: Architectural* (this opens sketch mode).
2. Use **Pick Walls** (Draw panel) and click each wall to create a closed loop,
   or trace the rectangle with **Boundary Line**.
3. Click the green **✓ (Finish Edit Mode)**.
4. If it asks about joining geometry, **No** is fine for now.

## Phase 4 — Door & windows (10 min)
1. **Architecture → Door**. Pick a type (e.g. single-flush **900 × 2100**),
   hover over a wall and click to place. Press **Spacebar** before clicking to
   flip which way it opens.
2. **Architecture → Window** — place **two** windows (e.g. **1200 × 1200**) on
   different walls.
3. Nudge them using the blue **temporary dimensions**.
> Key concept: doors and windows are *hosted* — they only place onto walls.

## Phase 5 — Roof (15 min)
1. Open **Floor Plans → Level 2**.
2. **Architecture → Roof → Roof by Footprint**.
3. Use **Pick Walls** with **"Defines Slope" ticked**; set **Overhang ≈ 300**.
   Pick all four walls to form the loop.
4. For a gable, select the two *end* slope lines and untick "Defines Slope" so
   only the long sides slope. Set slope to about **25°**.
5. Finish Edit Mode (**✓**).
6. Select the four walls → **Attach Top/Base → Attach**, then click the roof so
   the walls follow the gable.

## Phase 6 — Views (10 min)
- **Elevations** (North/East/South/West) already exist — open each to check.
- **Section:** **View → Section**, draw a line straight through the building,
  then double-click the section head to open that view.
- **3D:** click the little house icon (**Default 3D View**) on the Quick Access
  Toolbar. Orbit with **Shift + middle mouse**.

## Phase 7 — Annotate the plan (15 min)
1. In **Level 1** plan: **Annotate → Aligned** dimension → dimension the overall
   size and the window/door positions.
2. **Architecture → Room** → click inside the building to drop a Room; then
   **Annotate → Tag Room**.
3. Add a north arrow / text if you like (**Annotate → Text**).

## Phase 8 — Schedules (10 min)
1. **View → Schedules → Schedule/Quantities → Doors**. Add fields: **Mark,
   Width, Height, Level** → OK. A table appears and stays live.
2. Repeat for **Windows**.

## Phase 9 — Sheet & title block (15 min)
1. **View → Sheet** → pick an **A3** title block → OK.
2. Fill the title block (project name, your name, date) in the sheet's Properties.
3. Before placing views, set each view's **scale** on the **View Control Bar**
   (bottom-left) — e.g. plan & elevations at **1:50**.
4. **Drag** from the Project Browser onto the sheet: the Level 1 plan, one
   elevation, the section, the 3D view, and the door schedule. Arrange neatly.
5. Rename each viewport title under the view.

## Phase 10 — Export (5 min)
1. **File → Export → PDF** (or Print → PDF). Select your sheet.
2. Save as `Garden-Studio-A3.pdf`.

---

## Turn it into your portfolio piece
Your site already has a **Revit** project — currently a placeholder. To fill it:
1. Put the exported `Garden-Studio-A3.pdf` plus 2–3 view screenshots (3D, plan,
   section) into `Assets/Projects/Revit/`.
2. Update that folder's `Description.md`: real `title`, `summary`, `period`,
   `discipline: Digital`, a `cover:` image, and `technologies: [Revit, BIM,
   Construction documentation]`.
3. Tell me and I'll wire it in and confirm it displays.

## Stretch goals (once the basics click)
- **Structural version:** new model from the *Structural* template — model
  columns, beams, a slab, and footings. This is the most civil-relevant path.
- **Model your Podside pod** — you already know that design inside out.
- Add a **wall section detail**, apply **materials**, and produce a **rendered**
  3D view.

## Common beginner gotchas
- *Nothing draws* → you're on the wrong view/level. Check you're on Level 1.
- *Door won't place* → it must be on a wall.
- *Walls don't reach the roof* → select walls → **Attach Top**.
- *Dimensions look wrong* → **Manage → Project Units → millimeters**.
- *Lost a view* → everything lives in the **Project Browser** on the left.
