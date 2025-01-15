# Ishaara - Indian Sign Language Translator 

Ishaara is an innovative web application that translates Indian Sign Language (ISL) to text in real-time using cutting-edge AI technology. Our goal is to bridge communication gaps and promote inclusivity for the deaf and mute community in India.

---

## Features

- Real-time Indian Sign Language detection and translation.
- User-friendly interface with webcam integration.
- Multiple AI models for accurate sign language interpretation.
- Responsive design using **Next.js** and **Tailwind CSS**.
- Dark mode support for enhanced usability.

---

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI.
- **AI**: TensorFlow.js for sign language detection.
- **Charts and Visuals**: Chart.js for interactive charts.

---

## Live Demo

Visit the live application here: [ishaara.vercel.app](https://ishaara.vercel.app)

---

## Directory Structure

```plaintext
rsayyed591-ishaara-v3/
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── .eslintrc.json
├── public/
│   ├── best_web_model/
│   │   ├── model.json
│   │   ├── group1-shard1of25.bin
│   │   ├── group1-shard2of25.bin
│   │   └── ... (other shard files)
│   ├── ishaara models/
│   ├── models/
│   ├── team/
│   ├── usecase/
│   └── vid/
│       ├── VID-20240428-WA0001.webm
│       ├── VID-20240428-WA0002.webm
│       └── ... (other video files)
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── details/
│   │   │   └── [modelId]/
│   │   │       └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── models/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   └── translate/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Loader.tsx
│   │   ├── aceternity.tsx
│   │   ├── footer.tsx
│   │   ├── hero-content.tsx
│   │   ├── navbar.tsx
│   │   ├── services-content.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── glare-card.tsx
│   │       ├── hero-highlight.tsx
│   │       ├── meteors.tsx
│   │       ├── mode-toggle.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── switch.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── utils/
│       ├── detect.js
│       ├── labels.json
│       ├── renderBox.js
│       └── webcam.js
```

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rsayyed591/ishaara-v3.git
   ```

2. Navigate to the project directory:

   ```bash
   cd rsayyed591-ishaara-v3
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## AI Model Integration

The AI models for ISL detection are stored in the `public/best_web_model/` directory. Key files include:
- `model.json`: Neural network structure.
- Shard files (`group1-shard*.bin`): Pre-trained weights for the model.

Ensure all files are in the correct directory for the app to function properly.

---

## Scripts

The following npm scripts are available:

- **`dev`**: Starts the development server.
- **`build`**: Builds the production-ready application.
- **`start`**: Runs the production build.
- **`lint`**: Lints the codebase using ESLint.

---

## Contributing

Contributions are welcome! If you’d like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request for review.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by the vision of creating inclusivity for the deaf and mute community in India.
- Special thanks to TensorFlow.js and open-source contributors for their tools and libraries.

---

Feel free to reach out with any questions or suggestions. Let’s build a more inclusive world together! 😊