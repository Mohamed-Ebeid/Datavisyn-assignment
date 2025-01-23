from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd
import os

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#  Allow All Origins
origins = ["*"]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Path to your CSV file
CSV_FILE_PATH = "genes_human.csv" 
#CSV_FILE_PATH = "try.csv"

@app.get("/read-csv/{page}")
async def read_csv_by_name(name: str = "", page: int = 1):
    if not os.path.exists(CSV_FILE_PATH):
        raise HTTPException(status_code=404, detail="CSV file not found")

    try:
        # Read the CSV file using pandas
        df = pd.read_csv(CSV_FILE_PATH, delimiter=';')
        df = df.fillna('')
        # columns = list(df.iloc[0].keys())
        
        # Filter the DataFrame by the name if it sent by the frontend
        if name:
            filtered_df = df[df['Name'].str.contains(name, case=False)]
        else:
            filtered_df = df
        # Page the DataFrame
        start = (page - 1) * 100
        end = start + 100
        data = filtered_df.iloc[start:end].to_dict(orient="records")
        # Return a JSON response with the data
        # return JSONResponse(content={"columns": columns, "data": data})
        return JSONResponse(content=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    # source .env/bin/activate
    # uvicorn main:app --reload