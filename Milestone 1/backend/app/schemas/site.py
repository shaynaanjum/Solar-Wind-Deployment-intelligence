from pydantic import BaseModel

class SiteCreate(BaseModel):
    latitude: float
    longitude: float
    solar_score: float
    wind_score: float
    recommendation: str


class SiteResponse(SiteCreate):
    id: int

    class Config:
        from_attributes = True