import click
from init_db import create_database

@click.group()
def cli():
    """Database management CLI."""
    pass

@cli.command()
def create():
    """Create the database if it doesn't exist."""
    click.echo("Creating database...")
    create_database()
    click.echo("Done!")

if __name__ == "__main__":
    cli()

