ANALYTICA AI

Analytica AI is a modern, AI-powered platform designed for seamless data ingestion, cleaning, analysis, and reporting. It provides a user-friendly interface to handle complex data workflows, leveraging generative AI to offer smart features like automated data cleaning, natural language querying, and explainable AI (XAI) for transparent processing.
The application also features a prototype of a blockchain-based version history system, showcasing how data provenance and immutability can be achieved for critical datasets.

KEY FEATURES:

Data Workflow Management:

File Upload: Supports both CSV and XLSX file formats for data ingestion.
AI-Powered Auto-Cleaning: Intelligently analyzes datasets and automatically suggests a cleaning plan, identifying appropriate techniques for missing value imputation and outlier detection.
Manual Cleaning Configuration: Provides granular control over data cleaning with modules for schema mapping, missing value imputation (Mean, Median, KNN), outlier removal (IQR, Z-Score, Winsorization), and rule-based validation.
Explainable AI (XAI): Generates clear, human-readable explanations of the data cleaning techniques applied, promoting transparency and trust in the process.
Analytics & Insights:
Natural Language Query (NLQ): Users can ask questions about their data in plain English and receive instant answers from an AI data analyst.
Interactive Visualizations: Explore data visually with interactive charts that can be filtered by date ranges and data columns.
Blockchain-Inspired Version Control:
Simulated Immutable Ledger: A "Version History" page showcases a prototype of a blockchain-based system for tracking every change made to a dataset.
Data Provenance: Each version includes a unique commit hash, author, timestamp, and commit message, creating a transparent and immutable audit trail.
Integrations:
Kaggle Integration: A dedicated page to simulate importing from and exporting datasets to Kaggle.


AI AND GENKIT FLOWS:

The application's AI capabilities are powered by Google's Gemini models through the Genkit framework. Key AI flows include:
autoClean: Automatically proposes a data cleaning plan.
explainCleaning: Explains the data cleaning techniques used in simple terms.
naturalLanguageQuery: Answers user questions about the dataset.
generateSmartDocumentation: (Not yet fully integrated) Can generate documentation for the processing steps.


TECH STACK:

Framework: Next.js (with App Router)
Language: TypeScript
UI: React
Styling: Tailwind CSS
UI Components: ShadCN UI
Generative AI: Firebase Genkit with Google Gemini
Icons: Lucide React
