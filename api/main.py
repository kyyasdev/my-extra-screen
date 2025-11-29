from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import ContactDeveloperRequest, QuoteResponse, Quotes, Messages, OnlineCounter, OnlineRecords
import models
from database import engine, SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import func

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/quote")
async def get_quote(db: db_dependency) -> QuoteResponse:
    quote = db.query(Quotes).order_by(func.random()).first()
    if not quote:
        return QuoteResponse(text="The only way to do great work is to love what you do", author="Steve Jobs")
    return QuoteResponse(text=quote.text, author=quote.author)
       
@app.get("/online-counter")
async def get_online_counter(db: db_dependency) -> int:
    online_record = OnlineRecords()
    db.add(online_record)
    
    counter = db.query(OnlineCounter).first()
    if counter:
        counter.count += 1
        counter.all_time += 1
    else:
        counter = OnlineCounter(count=1, all_time=1)
        db.add(counter)
    db.commit()

    return counter.count

@app.post("/contact-developer")
async def contact_developer(request: ContactDeveloperRequest, db: db_dependency):
    data = request.model_dump()
    message = Messages(title=data["title"], message=data["message"], contact=data["contact"])
    
    db.add(message)
    db.commit()