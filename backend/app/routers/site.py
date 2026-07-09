from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.site import Site
from app.schemas.site import SiteCreate, SiteResponse

router = APIRouter(
    prefix="/sites",
    tags=["Sites"]
)

@router.post("/", response_model=SiteResponse)
def create_site(site: SiteCreate, db: Session = Depends(get_db)):

    new_site = Site(
        latitude=site.latitude,
        longitude=site.longitude,
        solar_score=site.solar_score,
        wind_score=site.wind_score,
        recommendation=site.recommendation
    )

    db.add(new_site)
    db.commit()
    db.refresh(new_site)

    return new_site