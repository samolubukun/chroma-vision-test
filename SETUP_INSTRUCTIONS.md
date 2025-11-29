# Ishihara Color Vision Test - Setup Instructions

## 📋 Quick Start

### 1. Extract the Plate Images

The Ishihara test plates are included in `public/plates/Plates.zip`. You need to extract them:

```bash
cd public/plates
unzip Plates.zip
```

After extraction, you should have these image files directly in `public/plates/`:
- 24.jpg through 40.jpg (Plates 1-17)
- 45.jpg through 48.jpg (Plates 22-25)  
- 51.jpg through 54.jpg (Plates 18-21)

**Total: 21 plate images**

### 2. Run the Application

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:8080`

## 🎯 Features

- **21 Authentic Ishihara Plates**: Complete color vision screening
- **Voice Input**: Use speech recognition to answer (Web Speech API)
- **Text Input**: Type answers manually
- **Text-to-Speech**: Audio instructions for each plate
- **20-Second Timer**: Standard testing time per plate
- **Auto-Advance**: Moves to next plate after answer submission
- **Detailed Results**: See which plates you got correct/incorrect
- **Pass Threshold**: 17/21 correct = Normal color vision

## 🔊 Browser Compatibility

**Voice Features Require:**
- Chrome/Edge (best support)
- Safari (limited support)
- Modern browsers with Web Speech API

Voice features will gracefully degrade if not supported.

## 🎨 Design

Clean medical aesthetic with:
- Professional blue color scheme
- Inter Tight font family
- Responsive design for all devices
- Accessible high-contrast UI

## 📱 Usage

1. Click "Start Test" on the welcome screen
2. View each plate for up to 20 seconds
3. Answer by voice (click mic) or type your response
4. Submit to move to the next plate
5. View your results at the end

## ⚠️ Important Notes

- This is a **screening tool**, not a diagnostic test
- Consult an eye care professional for medical diagnosis
- Ensure proper lighting when taking the test
- View plates at arm's length on a quality display
- Do not take the test if you're fatigued or under stress

## 🏗️ Project Structure

```
src/
├── components/
│   ├── WelcomeScreen.tsx    # Introduction and instructions
│   ├── TestScreen.tsx       # Main test interface
│   └── ResultsScreen.tsx    # Score and detailed results
├── hooks/
│   ├── useSpeechRecognition.ts  # Voice input
│   └── useTextToSpeech.ts       # Audio instructions
├── data/
│   └── plates.ts            # Plate data and scoring logic
└── pages/
    └── Index.tsx            # Main app orchestration

public/plates/               # Ishihara plate images (extract here)
```

## 🎓 Test Information

### Plate Types:
- **Common**: Everyone should see the same number
- **Diagnostic**: Differentiates normal from color deficient
- **Vanishing**: Visible to normal, invisible to color deficient
- **Classification**: Distinguishes Protan from Deuteran
- **Trace**: Follow colored paths

### Scoring:
- **17-21 correct**: Normal color vision
- **Below 17**: Possible red-green color deficiency

---

Enjoy testing! 👁️
