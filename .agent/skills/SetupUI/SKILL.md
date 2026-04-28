---
name: Setup UI
description: Initialize Avatar Project with Stitch MCP and 3D compatible methods
---

# Initialize Avatar Project

This skill sets up the foundation for a 3D Avatar Chat application.

## Prerequisites
- [Stitch MCP](https://github.com/google-deepmind/stitch) must be available.
- Node.js and npm must be installed.

## Workflow

### 1. Environment Setup
- **Goal**: Initialize the project directory and install necessary dependencies.
- **Actions**:
    1. Check if `package.json` exists. If not, initialize with `npm init -y`.
    2. Install core dependencies:
        ```bash
        npm install react react-dom three @types/three @react-three/fiber @react-three/drei vite @vitejs/plugin-react tailwindcss postcss autoprefixer
        ```
    3. Initialize Tailwind CSS:
        ```bash
        npx tailwindcss init -p
        ```
    4. Configure `tailwind.config.js` to include standard paths (e.g., `./src/**/*.{js,jsx,ts,tsx}`).

### 2. Design Selection
- **Goal**: Connect to Stitch MCP and select a UI design to serve as the project's visual foundation.
- **Actions**:
    1. List all available projects using `mcp_stitch_list_projects`.
    2. Prompt the user to select a project from the list.
    3. List screens for the selected project using `mcp_stitch_list_screens`.
    4. Prompt the user to select a specific variant (screen).
    5. Create a "design showcase" (e.g., a Markdown file/artifact) that displays the selected design's theme, colors, and screenshot.
    6. Write the content of DESIGN.md into `DESIGN.md`.
    7. **Pixel-Perfect Matching**: Use the appropriate Stitch MCP tool (e.g., `mcp_stitch_get_screen_code`) to download the full `index.html`, CSS, and component source code for the selected design.
    8. **Implementation Strategy**: Instead of interpreting the design visually, the agent MUST use the downloaded `index.html` as a structural blueprint. Replicate the DOM structure, class names, and layout logic exactly to ensure the final UI is indistinguishable from the Stitch design.
    9. **Visual Verification**: If available, use the browser subagent to navigate to the design preview and compare the implementation against the original, adjusting the code until a perfect match is achieved.
    10. **Error Case**: If no projects are found or Stitch MCP is unavailable, inform the user and stop execution.

## Output
- The `DESIGN.md` file detailing the chosen visual direction.
- A fully initialized project with `node_modules` and basic configurations.
