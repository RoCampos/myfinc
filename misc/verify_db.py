from app.services.database import get_connection
from sqlalchemy import text
import time

def test_connection():
    print("Tentando conectar ao banco de dados...")
    try:
        with get_connection() as session:
            # Executa uma query simples
            result = session.execute(text("SELECT * from users"))
            print(f"✅ Sucesso! Conexão estabelecida. Resultado do teste: {result.scalar()}")
            return True
    except Exception as e:
        print(f"❌ Falha na conexão: {e}")
        return False

if __name__ == "__main__":
    test_connection()
