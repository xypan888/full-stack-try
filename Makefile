.PHONY: dev

dev:
	COMPOSE_BAKE=true docker compose up --build
