# @HealthWise – AI-Powered Diabetes Risk Prediction System

> An AI/ML-powered full-stack healthcare application for early diabetes risk assessment using lifestyle, demographic, and health-related data.

---

## Overview

**@HealthWise** is a full-stack web application that uses Machine Learning to estimate the risk of diabetes based on user-provided lifestyle and health information.

The application provides an easy-to-use questionnaire through which users enter information related to their lifestyle, demographics, and health conditions. The collected responses are transformed into model-compatible features and sent to a Flask backend, where a trained **Random Forest Classifier** performs the prediction.

The system then displays the predicted diabetes risk and provides personalized lifestyle recommendations.

The application consists of four major layers:

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Python + Flask REST API
- **Database & Authentication:** Supabase + PostgreSQL
- **Machine Learning:** Scikit-learn + Random Forest + SMOTE

---

## Objectives

The main objectives of @HealthWise are:

- Provide an easy-to-use diabetes risk assessment system.
- Use Machine Learning for early risk identification.
- Convert simple lifestyle questions into model-compatible features.
- Provide real-time prediction through a REST API.
- Display prediction results through an interactive dashboard.
- Provide personalized health and lifestyle recommendations.
- Provide authentication and user-specific application access.
- Demonstrate the integration of AI/ML with a modern full-stack application.

---

# System Architecture

```text
                         ┌─────────────────────┐
                         │        USER         │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                     ┌──────────────────────────┐
                     │      FRONTEND LAYER      │
                     │                          │
                     │ React.js + Tailwind CSS  │
                     │                          │
                     │ • Home                   │
                     │ • Login / Signup         │
                     │ • Health Quiz            │
                     │ • Dashboard              │
                     │ • Recommendations       │
                     │ • History                │
                     └────────────┬─────────────┘
                                  │
                              REST API
                                  │
                                  ▼
                     ┌──────────────────────────┐
                     │      BACKEND LAYER       │
                     │                          │
                     │      Python + Flask      │
                     │                          │
                     │ • API Routes             │
                     │ • Validation             │
                     │ • Feature Processing     │
                     │ • ML Model Integration   │
                     │ • Recommendation Logic  │
                     └────────────┬─────────────┘
                                  │
                     ┌────────────┴─────────────┐
                     │                          │
                     ▼                          ▼
          ┌──────────────────────┐    ┌──────────────────────┐
          │   MACHINE LEARNING   │    │   DATABASE LAYER     │
          │        LAYER         │    │                      │
          │                      │    │       Supabase       │
          │ Random Forest Model  │    │                      │
          │ StandardScaler       │    │ PostgreSQL            │
          │ SMOTE                │    │ Authentication        │
          │ Joblib               │    │ User Data             │
          └──────────┬───────────┘    └──────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │   PREDICTION RESULT  │
          │                      │
          │ • Prediction         │
          │ • Probability        │
          │ • Risk Level         │
          │ • Explanation        │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  RECOMMENDATION      │
          │       ENGINE         │
          │                      │
          │ Personalized Health  │
          │ Recommendations      │
          └──────────┬───────────┘
                     │
                     ▼
              ┌───────────────┐
              │   DASHBOARD   │
              └───────────────┘
