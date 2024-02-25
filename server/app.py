from flask import Flask, request, jsonify
import csv
import spacy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
nlp = spacy.load("en_core_web_sm")
file_path = r"C:\Users\dell\Downloads\Book1.csv"

def load_jobs_from_csv(file_path):
    jobs = []
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            jobs.append(row)
    return jobs

def preprocess_text(text):
    doc = nlp(text)
    return " ".join([token.text for token in doc if token.pos_ in ['NOUN', 'ADJ']])

def suggest_job(qualification, skills, jobs):
    suggested_jobs = []
    for job in jobs:
        required_skills = job['skills'].lower().split()
        if any(skill.lower() in skills for skill in required_skills):
            if qualification.lower() == '10th' and job['qualification'].lower() == '10th':
                suggested_jobs.append(job['jobs'])
            elif qualification.lower() == '12th':
                suggested_jobs.append(job['jobs'])
    return suggested_jobs

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    qualification = data.get('qualification')
    skills = preprocess_text(data.get('skills'))
    # Process user input and suggest jobs
    jobs = load_jobs_from_csv(file_path)
    suggested_jobs = suggest_job(qualification, skills, jobs)
    return jsonify(suggested_jobs)

if __name__ == "__main__":
    app.run(debug=True)
