from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from database import SessionLocal
from models import OnlineRecords, OnlineCounter


def cleanup_old_records():
    """
    Cron job function that:
    1. Deletes all rows from online_records table older than 30 minutes
    2. Subtracts the number of deleted rows from online_counter.count
    """
    db: Session = SessionLocal()
    try:
        # Calculate the cutoff time (30 minutes ago)
        cutoff_time = datetime.now() - timedelta(minutes=30)
        
        # Find and count records older than 30 minutes
        old_records = db.query(OnlineRecords).filter(
            OnlineRecords.created_at < cutoff_time
        ).all()
        
        deleted_count = len(old_records)
        
        if deleted_count > 0:
            # Delete the old records
            db.query(OnlineRecords).filter(
                OnlineRecords.created_at < cutoff_time
            ).delete()
            
            # Update the online counter
            counter = db.query(OnlineCounter).first()
            if counter:
                counter.count = counter.count - deleted_count
            
            db.commit()
            print(f"Cleaned up {deleted_count} old records. Updated counter.")
        else:
            print("No old records to clean up.")
            
    except Exception as e:
        db.rollback()
        print(f"Error in cleanup_old_records: {e}")
    finally:
        db.close()

