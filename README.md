# Chroma Vision Test - Ishihara Color Blindness Assessment

A professional-grade, interactive **Ishihara Color Vision Test** built with React, TypeScript, and Vite. This application provides a rapid, accurate screening tool for red-green color vision deficiencies (CVD) using the standardized 17-plate diagnostic protocol.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](chroma-vision-test.pxxl.click)

## 🚀 Key Features

*   **Comprehensive 17-Plate Assessment**: Derived from the standardized Ishihara 24-plate edition, focusing on screening, transformation, and vanishing plates.
*   **Advanced Clinical Diagnosis**: 
    *   **Protan Deficiency Detection** (Red-Blind).
    *   **Deutan Deficiency Detection** (Green-Blind).
    *   **Red-Green Deficiency Detection** (General CVD).
    *   **Total Color Blindness detection**.
*   **Intuitive UI/UX**: Clean, accessibility-focused interface with glass-morphic design elements and responsive layouts.
*   **Real-time Scoring**: Instant calculation of matching accuracy and professional clinical interpretation.
*   **Hands-free Options**: Designed for clinical usage with clear instructions for each plate type.

## 🛠️ Tech Stack

*   **Core**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **State Management**: React Hooks (useState, useEffect)
*   **Animated Transitions**: Lucide icons and Tailwind-animate

## 🏁 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/samolubukun/chroma-vision-test.git
    cd chroma-vision-test
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run locally**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📦 Deployment

This project is configured for easy deployment to **GitHub Pages**:

```bash
npm run deploy
```

For other platforms (Vercel, Render, Railway), ensure your **Root Directory** is set to `.` and your **Output Directory** is `dist`.

## ⚠️ Medical Disclaimer

*This application is for educational and screening purposes only. While it uses standardized Ishihara plates and logic, it is not a substitute for a formal clinical evaluation by a licensed eye care professional (optometrist or ophthalmologist). Always consult a specialist for a definitive diagnosis.*

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
**Developed by [Samuel Olubukun](https://github.com/samolubukun)**
