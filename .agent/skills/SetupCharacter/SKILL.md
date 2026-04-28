---
name: Setup Character
description: Create a site and put avatar into the 3D environment
---

# Avatar Setup:

This skill put the avatar into the 3D environment.

## Prerequisites:
- A 3D avatar model in GLB format inside the working directory.

## Workflow:

1. Read DESIGN.md to understand the UI design, layout, and color scheme.
2. Find the area in UI that is for avatar. The area should be quite empty, and it is usually on the left side or top part of the screen. If you can't find such area, ask the user to provide one.
3. Put the avatar into the 3D environment and make sure it is well-placed. Remove any placeholder background images from the designated area so the 3D canvas sits on a clean background.
4. The avatar should be centered horizontally in its designated area, positioned to tightly focus on the face and upper chest (typically with the Canvas camera at `position={[0, 1.5, 1.7]}` and `fov={30}`, the avatar at `position={[0, -2, 0]}` and `scale={2}`, and `OrbitControls` `target={[0, 1.4, 0]}`), and equipped with an emotion management system supporting a wide range of backend-driven emotion states ("neutral", "happy", "sad", "angry", "surprised", "thinking", "confused", "excited", "embarrassed", "fear"), as well as a toggleable mouth animation for speech.

## Emotion Management:

**Important Implementation Note:** 3D models (like GLB files) are often split into multiple sub-meshes (e.g., Head, Teeth, Body). When applying morph targets, you MUST traverse the scene, collect **all** `isSkinnedMesh` children that contain a `morphTargetDictionary` into an array, and iterate over that array to apply the morph target values. Do not assume there is only one mesh.

The system uses the following morph target values for each emotion state to map the backend agent tokens to consistent visual expressions:

- **Default / Neutral**: Eyes are slightly widened (`eyeWideLeft/Right` at 0.4) to maintain an alert, natural appearance.
- **Happy**: `mouthSmile` (0.8), `mouthSmileLeft/Right` (0.8), `cheekSquintLeft/Right` (0.7).
- **Sad**: `mouthFrownLeft/Right` (0.8), `browInnerUp` (0.8), `mouthRollLower` (0.5).
- **Angry**: `browDownLeft/Right` (1.0), `mouthPressLeft/Right` (0.6), `noseSneerLeft/Right` (0.7).
- **Surprised**: `eyeWideLeft/Right` (1.0), `browInnerUp` (1.0), `mouthDimpleLeft/Right` (0.5).
- **Thinking**: `browDownLeft/Right` (0.6), `mouthRollLower` (0.4), `eyeSquintLeft/Right` (0.5).
- **Confused**: `browOuterUpLeft` (1.0), `browDownRight` (0.8), `eyeWideLeft` (0.8), `mouthLeft` (0.4).
- **Excited**: `mouthSmile` (1.0), `eyeWideLeft/Right` (0.8), `browInnerUp` (0.8).
- **Embarrassed**: `cheekSquintLeft/Right` (0.8), `mouthSmile` (0.4), `browDownLeft/Right` (0.4).
- **Fear**: `eyeWideLeft/Right` (1.0), `browInnerUp` (1.0), `mouthFrownLeft/Right` (0.6).
- **Speech**: Dynamic values for `viseme_aa` (up to 0.5) and `jawOpen` (up to 0.35) are used for natural-looking speech animations.


## Rest Pose:

To ensure the avatar's arms rest naturally at its sides rather than defaulting to a T-pose, the following rotations should be applied to the `LeftArm` and `RightArm` bones during the scene traversal:
- **LeftArm**: `rotation.x = 1.5`, `rotation.y = 0`, `rotation.z = 0`
- **RightArm**: `rotation.x = 1.5`, `rotation.y = 0`, `rotation.z = 0`