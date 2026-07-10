from sqlalchemy import Column, Integer, Float, String
from app.database.database import Base

class Site(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    solar_score = Column(Float)
    wind_score = Column(Float)
    recommendation = Column(String)