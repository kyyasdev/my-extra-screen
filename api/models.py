from pydantic import BaseModel, Field
from database import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from typing import Optional

class QuoteResponse(BaseModel):
    text: str = Field(example='The only way to do great work is to love what you do.')
    author: Optional[str] =  Field(default=None, example='Steve Jobs')

class ContactDeveloperRequest(BaseModel):
    title: Optional[str] = Field(default=None, example='Feature Request')
    message: Optional[str] = Field(default=None, example='It would be useful if you add music to the app')
    contact: Optional[str] = Field(default=None, example='john.doe@example.com')

class Quotes(Base):
    __tablename__ = 'quotes'

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    author = Column(String, nullable=True)

class Messages(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    message = Column(String, nullable=True)
    contact = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.now)

class OnlineCounter(Base):
    __tablename__ = 'online_counter'

    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)
    all_time = Column(Integer, default=0)

class OnlineRecords(Base):
    __tablename__ = 'online_records'

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now)