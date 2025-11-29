"""
Database initialization script.
Usage: python init_db.py
"""
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os
import sys

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def parse_database_url(url):
    """Parse PostgreSQL URL to extract components."""
    # Format: postgresql://user:password@host:port/database
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "")
    
    if "@" in url:
        auth, rest = url.split("@", 1)
        if ":" in auth:
            user, password = auth.split(":", 1)
        else:
            user, password = auth, ""
    else:
        user, password = "postgres", ""
        rest = url
    
    if "/" in rest:
        host_port, database = rest.rsplit("/", 1)
        if ":" in host_port:
            host, port = host_port.split(":", 1)
        else:
            host, port = host_port, "5432"
    else:
        host, port = rest, "5432"
        database = ""
    
    return {
        "user": user,
        "password": password,
        "host": host,
        "port": port,
        "database": database
    }

def create_database():
    """Create the database if it doesn't exist."""
    db_config = parse_database_url(DATABASE_URL)
    database_name = db_config["database"]
    
    if not database_name:
        print("Error: No database name specified in DATABASE_URL")
        sys.exit(1)
    
    # Connect to postgres database to create our database
    admin_url = f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/postgres"
    
    try:
        admin_engine = create_engine(admin_url, isolation_level="AUTOCOMMIT")
        with admin_engine.connect() as conn:
            # Check if database exists
            result = conn.execute(
                text("SELECT 1 FROM pg_database WHERE datname = :dbname"),
                {"dbname": database_name}
            )
            exists = result.fetchone()
            
            if exists:
                print(f"Database '{database_name}' already exists.")
            else:
                # Create database
                conn.execute(text(f'CREATE DATABASE "{database_name}"'))
                print(f"Database '{database_name}' created successfully.")
        
        admin_engine.dispose()
        return True
    except Exception as e:
        print(f"Error creating database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("Initializing database...")
    create_database()
    print("Database initialization complete!")

