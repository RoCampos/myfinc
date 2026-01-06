
consultar banco de dados
> docker compose exec db psql -U admin -l

> docker exec -it postgres psql -U romerito -d myfinc -c "SELECT * FROM users;" 