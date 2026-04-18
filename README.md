Here is the website guide for my API - https://robixrai.github.io/UFC-API-Guide/



UFC API Guide
A lightweight, public API documentation and demo site for MMA fighter data — searchable fighter lists, fighter profiles, rankings, and ready‑to‑copy examples for building prediction models, dashboards, or apps.

Built for the MMA Community • 2026 April

Quick start
Clone and view the docs (fastest)


bash
git clone https://github.com/robixrai/UFC-API-Guide.git
cd UFC-API-Guide
# open index.html in your browser or serve locally
# Python 3 (serves on http://localhost:8000)
python -m http.server 8000 --bind 0.0.0.0
What you’ll see

Static docs and examples served from index.html (GitHub Pages ready).

Example requests that call the public API endpoints shown in the docs.

If you run the API locally (optional)  
Provide a sanitized example dataset and an .env.example for secrets. Use docker-compose or your framework’s dev server; document exact commands in CONTRIBUTING.md.

Base URL
Base URL  
https://ufc-predictor-v1.onrender.com

API Reference
Summary of core endpoints

Endpoint	Method	Description	Example
/fighters	GET	Returns a list of fighter names; supports optional filters	/fighters?gender=men%27s&division=Lightweight
/fighters/{name}	GET	Full details for one fighter; supports block param to filter categories	/fighters/Charles%20Oliveira?block=career
/rankings/champions	GET	Nested dictionary of every champion in every division	/rankings/champions?gender=men%27s&division=Lightweight
/rankings/divisions	GET	List of all division names	/rankings/divisions?gender=men%27s
/rankings/{gender}/{division}	GET	Rankings for a specific weight class; optional rank param	/rankings/men%27s/lightweight?rank=1
/rankings/search/{name}	GET	Returns rank(s) of a fighter (division + gender); matches name fragments	/rankings/search/Charles%20Oliveira
Parameter notes

Optional Parameters: gender, division, block, rank (depending on endpoint).

Encoding: encode special characters in query strings (example: men%27s for men's).

Response format: JSON. Example responses are shown in the docs.

Examples
curl

bash
# List fighters (filter by gender and division)
curl "https://ufc-predictor-v1.onrender.com/fighters?gender=men%27s&division=Lightweight"

# Fighter detail with block parameter
curl "https://ufc-predictor-v1.onrender.com/fighters/Charles%20Oliveira?block=career"
Python (requests)

python
import requests

BASE = "https://ufc-predictor-v1.onrender.com"
fighter_url = f"{BASE}/fighters/Charles Oliveira"

try:
    response = requests.get(fighter_url, timeout=60)
    if response.status_code == 200:
        data = response.json()
        print(data)
except Exception as e:
    print(f"Connection Error: {e}")
JavaScript (fetch)

js
fetch('https://ufc-predictor-v1.onrender.com/fighters')
  .then(r => r.json())
  .then(data => console.log(data));
Notes

Tip: encode special characters in query strings. Example: men%27s instead of men's.

Try it: the docs include copy buttons and example URLs for quick testing.

JSON Response Preview
json
{
  "personal-info": {
    "name": "Charles Oliveira",
    "nickname": "Do Bronxs",
    "birth-date": "1989-10-17",
    "nationality": "Brazilian",
    "fighting-out-of": "Guarujá, São Paulo, Brazil",
    "country-code": "BR",
    "weight-class": "Lightweight",
    "gym": "Chute Boxe Diego Lima",
    "status": "Active",
    "gender": "Male"
  },
  "specs": {
    "height": 178,
    "reach": 74,
    "stance": "Orthodox"
  },
  "career": {
    "api-id": 0,
    "wins": 37,
    "losses": 11,
    "draws": 0,
    "no-contests": 1,
    "ko-tko-wins": 10,
    "sub-wins": 22,
    "win-streak": 2,
    "last-five": [1,1,0,1,0],
    "fight-history": [
      "W vs Max Holloway (U-Dec) R5 5:00 - UFC 326",
      "W vs Mateusz Gamrot (Sub - Rear Naked Choke) R2 2:48 - UFC Fight Night 261",
      "L vs Ilia Topuria (KO/TKO - Strikes) R1 2:27 - UFC 317"
    ]
  },
  "description": "Charles Do Bronx is a Submission Specialist..."
}
Usage patterns and tips
Filtering: use query parameters to filter results (gender, division, block, rank).

Flexible ranking paths: /rankings/{gender} returns all divisions for that gender; /rankings/{gender}/{division} returns a single division.

Search: /rankings/search/{name} returns all matches for a name fragment.

Rate limits and keys: if/when API keys are required, examples will show header and query param usage.

Contributing
How to contribute

Fork the repo → create a branch → open a PR.

Open issues for bugs, data corrections, or feature requests.

Add tests or examples when you add endpoints.

Local development

Serve the static docs locally (see Quick start).

If you run the API locally, include an .env.example and a sanitized dataset. Provide docker-compose or framework commands in CONTRIBUTING.md.

Testing & CI

Add unit tests for any new endpoint logic.

Use CI to run tests and deploy docs to GitHub Pages on main pushes.

Security and operational notes
Do not commit secrets. Use environment variables or secret stores.

Protect production: use API keys, quotas, and logging to detect misuse.

CORS: configure CORS to allow intended clients only.

Backups and monitoring: add uptime checks and error monitoring for the API.

License
This project is released under the MIT License. See LICENSE for details.

Support and contact
Open issues on GitHub for bugs, data corrections, or feature requests. For direct contact: Robert (robixrai) — issues and PRs welcome.
