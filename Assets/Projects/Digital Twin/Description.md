---
title: Digital Twin Fire Alarm Verification System
discipline: Digital
role: Researcher — Computer Vision
summary: "Final-year research project (Monash, supervised by Dr Yihai Fang): a Digital Twin advisory layer using environmental sensing and YOLO computer vision to flag the likely cause of a fire alarm, tested beside a working fire panel. I led the computer-vision work."
period: Feb 2026 – Nov 2026
featured: true
technologies:
  - Digital Twin
  - Computer vision (YOLOv8)
  - Intel RealSense depth camera
  - Python / Ultralytics
  - IoT environmental sensing
  - BIM
  - Fire safety engineering
learnings:
  - Built a YOLOv8 vision channel on a depth camera and tested it in a real occupied room, not just on a dataset.
  - Showed an independent sensor layer can flag a disturbance 7–74 s before the detector and 15–110 s before the panel alarmed.
  - Learned where computer vision fails in the wild — false positives on faces and ceiling fittings — and designed it to corroborate, not decide.
  - Coordinated an isolated, standards-compliant test rig across academics, a fire contractor and university facilities.
---

## Overview

False fire alarms are a persistent, costly problem at Monash. The university's Fire Rescue Victoria log showed **1,332 activations between 2020 and April 2026** (90% at Clayton) and **196 false alarms in 2025 alone — roughly one every 1.9 days** — each one disrupting teaching and research and risking an FRV call-out charge of $675 per appliance per 15 minutes. Most are triggered not by fire but by steam, aerosols, dust and cooking fumes, which a photoelectric smoke detector cannot tell apart from smoke.

Certified fire systems can't legally be modified, so our team (Sihong Lin, Pou Chon Wong, Krishiraj Santchurn and Hao Yu Wong) tested a **Digital Twin advisory layer**: an independent set of sensors and a virtual model of the room that run *beside* the certified system, never override it, and tell facilities staff *why* an alarm has probably occurred.

## My role

I authored the paper's abstract and introduction and led the **computer-vision channel** end to end — running a YOLOv8 object-detection model on an **Intel RealSense D455 depth camera**, using the depth stream to place each detection in the room and measure its distance, and designing the confirmation logic (consecutive-frame checks and confidence thresholds). I also coordinated the project across the academic supervisors, **Blue Fire Systems** and **Monash Buildings & Property** to stand up an isolated, standards-compliant fire panel and detectors for testing.

## What we tested

An **ETHERA NEMO** environmental sensor (particulate matter, temperature, humidity, CO₂) and the depth camera were set up beside three photoelectric smoke detectors (two Simplex TrueAlarm, one Tyco Vigilant 850P) and a stand-alone fire panel. Because live fire isn't permitted in the test room, we ran three nuisance scenarios — **steam, aerosol and vape/smoke-generator** — plus printed fire images for the vision channel, and compared the timing of every signal.

## Key findings

The environmental sensor registered the disturbance **before** the first detector warning in all nine detector–scenario combinations — 7–74 s before the detector and 15–110 s before the panel alarmed — leaving a useful window to gather evidence before an evacuation is triggered.

The vision channel analysed **12,781 frames across 16 runs (~23 min)** and recognised fire imagery reliably at normal room distances (best at 2.0–2.5 m, peak confidence up to 0.91), but it also mistook a face and ceiling fittings for fire. The clear lesson: the camera should **corroborate** the other sensors, not decide on its own.

## Outcome

The work showed that an add-on advisory layer can give staff early context on an alarm's likely cause **without touching the certified system** — moving the concept from proposal to evidence tested against a working fire panel, and setting up an automatic environmental-trigger-to-camera workflow as the next stage.
