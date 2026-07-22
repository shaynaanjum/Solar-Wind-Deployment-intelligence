from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.models.user import User
from app.models.project import Project
from app.models.site import Site

from app.routers.location import router as location_router

from app.routers.user import router as user_router

from app.routers.project import router as project_router
from app.routers.site import router as site_router

app = FastAPI()
Base.metadata.create_all(bind=engine)
# Add this line here
app.include_router(location_router)
app.include_router(user_router)
app.include_router(project_router)
app.include_router(site_router)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Solar & Wind Deployment Intelligence Platform"
    }