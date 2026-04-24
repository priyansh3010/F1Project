# 🏎️ F1 Race Results Predictor

An end-to-end **machine learning pipeline** that predicts Formula 1 race finishing order using historical telemetry data and real-time weather. Trained on the 2022 - 2024 seasons and blindly evaluated on all 24 races of the **2025 F1 season** as unseen test data.

---

## 📈 Results

XGBoost outperformed Random Forest across nearly every metric on the held-out **2025 season** (24 races):

| Metric | XGBoost | Random Forest |
|---|---|---|
| Mean Absolute Error | **1.996** | 2.208 |
| Root Mean Squared Error | **2.838** | 3.015 |
| R² | **0.622** | 0.579 |
| Median Absolute Error | 1.458 | 1.458 |
| Spearman ρ | **0.811** | 0.789 |
| Kendall τ | **0.720** | 0.637 |

XGBoost leads on every metric except Median AE, where both models are identical.

---

### Circuit-Level Highlights

XGBoost was exceptionally strong at several circuits — Suzuka, Baku, and Jeddah were the standout rounds:

| Circuit | XGBoost Spearman ρ | RFR Spearman ρ | XGBoost MAE | XGBoost R² |
|---|---|---|---|---|
| Suzuka 🇯🇵 | **0.976** | 0.962 | 0.60 | 0.952 |
| Baku 🇦🇿 | **0.972** | 0.909 | 0.74 | 0.944 |
| Jeddah 🇸🇦 | **0.969** | 0.938 | 0.78 | 0.938 |
| Marina Bay 🇸🇬 | **0.955** | 0.850 | 1.00 | 0.910 |
| Austin 🇺🇸 | **0.937** | 0.856 | 1.16 | 0.874 |

XGBoost also led at every one of these circuits individually. The biggest gap was Marina Bay, where XGBoost (ρ = 0.955) pulled 10 points ahead of RFR (ρ = 0.850).

The hardest circuits for both models were Silverstone (XGBoost ρ = 0.368, R² = -0.264) and Zandvoort (ρ = 0.691), likely driven by unpredictable race conditions or safety car periods distorting qualifying-based predictions.

---

### Detailed Results

Full per-race metrics and driver-level predictions (qualifying position → predicted finish → actual finish) for both models are available in [`results/`](./results/).

---

## 🔧 Pipeline Overview

```
Raw Data Ingestion
    ├── FastF1 API        → Historical lap times, sector data, tyre strategy (2022–2024)
    └── Open-Meteo API    → Real-time race-day weather per circuit

Feature Engineering
    └── Driver performance metrics, circuit-specific stats, weather features

Model Training
    ├── Random Forest Regressor  (scikit-learn)
    └── XGBoost Regressor

Prediction → Rank Conversion
    └── Custom ranking logic converts per-driver regression outputs → full 20-driver finishing order

Evaluation
    └── Blindly tested on all 24 races of the 2025 season
```

---

## 🚀 Features

- **Automated data ingestion** from FastF1 and Open-Meteo with CSV caching for reproducible preprocessing
- **Multi-driver modeling** - independent regression for all 20 drivers, unified into a single race order prediction
- **Custom ranking logic** - converts continuous regression outputs into a consistent finishing position ranking
- **Full-season blind evaluation** - no 2025 data was seen during training or validation
- **Strong circuit generalization** - Spearman above 0.93 at 7 different circuits, peaking at Suzuka (0.976)
- **Persisted evaluation results** - per-race metrics and season averages exported to CSV for both models, alongside driver-level prediction breakdowns (qualifying position → predicted finish → actual finish) for every 2025 race, available in [`results/`](./results/)

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Python | Core language |
| XGBoost | Primary prediction model |
| scikit-learn | Random Forest, preprocessing, evaluation |
| FastF1 | F1 telemetry & historical race data |
| Open-Meteo | Real-time weather API |
| Pandas / NumPy | Data manipulation |
| Git | Version control |

---

## 📁 Project Structure

```
f1-race-results-predictor/
├── data/
│   ├── 2022/        # Processed data for all 2022 races
│   └── 2023/        # Processed data for all 2023 races
│   └── 2024/        # Processed data for all 2024 races
│   └── 2025/        # Processed data for all 2025 races
├── src/
│   ├── data_collection.py         # Data ingestion & caching
│   ├── train.py          # Model training & hyperparameter tuning
│   └── evaluate.py       # Metrics: MAE, MSE, RMSE, R², MedianAE, Spearman, Kendall
├── requirements.txt
└── README.md
```

---

## ⚙️ Setup & Usage

```bash
# Clone the repo
git clone https://github.com/priyansh3010/f1-race-results-predictor.git
cd f1-predictor

# Install dependencies
pip install -r requirements.txt

# Collect and cache data (2022–2025)
python src/data_collection.ipynb

# Train models
python src/train.ipynb

# Eevaluate on 2025 season
python src/evaluate.ipynb
```

---

## 📦 Dependencies

```
fastf1
xgboost
scikit-learn
pandas
numpy
requests
```

---

## 🔗 References

- [FastF1 Documentation](https://docs.fastf1.dev/)
- [Open-Meteo API](https://open-meteo.com/)
- [XGBoost Documentation](https://xgboost.readthedocs.io/)
